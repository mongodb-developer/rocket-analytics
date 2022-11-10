-- Query S3
SELECT time_tag, metric, temperature, "speed" FROM ClimateData.SolarWind WHERE metric = 'plasma-5-minute';


--Query Atlas Cluster
SELECT "time", meta.device, "OMPS_Range_M1", "OMPS_Range_M4" FROM lastLaunch.launchData as l WHERE meta.device = 'lidar';


--Query Data Lake
SELECT "time", meta.device, "OMPS_Range_M1", "OMPS_Range_M4" FROM LaunchData.launchData_20220821T185010Z as l WHERE meta.device = 'lidar';



-- JOIN Atlas cluster data with S3
SELECT t1."time", t1.device, t1."OMPS_Range_M1", t1."OMPS_Range_M4", t2.time_tag, t2.metric, t2.density
FROM (SELECT l1."time", l1.meta.device, l1."OMPS_Range_M1", l1."OMPS_Range_M4" 
      FROM lastLaunch.launchData as l1 
      WHERE l1.meta.device = 'lidar' AND l1."time" > CAST('2020-10-13T13:44:18.891Z' AS BSON_DATE)) as t1
INNER JOIN (SELECT l2.time_tag, l2.metric, l2.density
            FROM ClimateData.SolarWind  as l2 
            WHERE l2.metric = 'plasma-7-day' 
               AND l2.time_tag > CAST('2020-10-13T13:40:00.000Z' AS BSON_DATE)
               AND l2.time_tag < CAST('2020-10-13T13:48:00.000Z' AS BSON_DATE)
           ) as t2
      ON t1."time" > DATEADD(MINUTE, -1, t2.time_tag) AND t1."time" < DATEADD(MINUTE, 1, t2.time_tag);
