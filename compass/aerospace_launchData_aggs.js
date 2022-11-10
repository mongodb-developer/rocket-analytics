// ================================================================
// launchData Collection - Atlas Cluster
// ================================================================

// ReadingsCountByDevice

[{
 $group: {
  _id: '$meta.device',
  readingsCount: {
   $count: {}
  }
 }
}]

// rollingWindowCalc

[{
 $match: {
  'meta.device': 'truth'
 }
}, {
 $setWindowFields: {
  partitionBy: null,
  sortBy: {
   time: 1
  },
  output: {
   velocityRollAvg: {
    $avg: '$truth_vel_CON_ECEF_ECEF_MpS2',
    window: {
     documents: [
      -5,
      5
     ]
    }
   },
   velocityWindowMax: {
    $max: '$truth_vel_CON_ECEF_ECEF_MpS2',
    window: {
     documents: [
      -5,
      5
     ]
    }
   },
   velocityWindowMin: {
    $min: '$truth_vel_CON_ECEF_ECEF_MpS2',
    window: {
     documents: [
      -5,
      5
     ]
    }
   }
  }
 }
}]

