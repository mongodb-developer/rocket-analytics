// Query S3
[{
    $match: {
        metric: 'plasma-5-minute'
    }
}, {
    $project: {
        time_tag: "$time_tag",
        metric: "$metric",
        temperature: "$temperature",
        speed: "$speed"
    }
}]

// Query Atlas Cluster
[{
    $match: {
        "meta.device": "lidar"
    }
}, {
        $project: {
            time: "$time",
            device: "$meta.device",
            OMPS_Range_M1: "$OMPS_Range_M1",
            OMPS_Range_M4: "$OMPS_Range_M4"
        }
    }]

// JOIN Atlas cluster data with S3
[
    {
        $match: {
            "meta.device": "lidar",
            time: { $gt: ISODate("2020-10-13T13:44:18.891Z") }
        }
    },
    {
        $lookup: {
            from: { db: "ClimateData", coll: "SolarWind" },
            let: {
                lastLaunchTime: "$time"
            },
            pipeline: [
                {
                    $match: {
                        metric: "plasma-7-day",
                        $expr: {
                            $and:
                                [{
                                    $gt: ["$time_tag", ISODate("2020-10-13T13:40:00.000Z")]
                                }, {
                                    $lt: ["$time_tag", ISODate("2020-10-13T13:48:00.000Z")]
                                },
                                {
                                    $gt: ["$$lastLaunchTime", {
                                        $dateSubtract: {
                                            startDate: "$time_tag",
                                            unit: "minute",
                                            amount: 1,
                                        }
                                    }]
                                },
                                {
                                    $lt: ["$$lastLaunchTime", {
                                        $dateAdd: {
                                            startDate: "$time_tag",
                                            unit: "minute",
                                            amount: 1,
                                        }
                                    }]
                                }]
                        }                 
                    }
                },
                {
                    $project: {
                        time_tag: "$time_tag",
                        metric: "$metric",
                        density: "$density"
                    }
                }
            ],
            as: "solarWindData",
        }
    }
]
