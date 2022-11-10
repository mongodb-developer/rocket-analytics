// ================================================================
// Notes Collection - Atlas Cluster
// ================================================================

// searchMetaFacets

[{
 $searchMeta: {
  index: 'default',
  facet: {
   operator: {
    text: {
     query: 'Parameter',
     path: [
      'title',
      'notes'
     ]
    }
   },
   facets: {
    stringFacet: {
     type: 'string',
     path: 'author.name',
     numBuckets: 5
    },
    dateFacet: {
     type: 'date',
     path: 'timeStamp',
     boundaries: [
      ISODate('2020-10-13T13:33:30.000Z'),
      ISODate('2020-10-13T13:38:30.000Z'),
      ISODate('2020-10-13T13:43:30.000Z'),
      ISODate('2020-10-13T13:48:30.000Z')
     ],
     'default': 'other'
    },
    deviceFacet: {
     type: 'string',
     path: 'device'
    },
    parameterFacet: {
     type: 'string',
     path: 'parameter'
    },
    violationFacet: {
     type: 'string',
     path: 'violationType'
    }
   }
  },
  count: {
   type: 'total'
  }
 }
}]

// Data Near Bounds

[{
 $lookup: {
  from: 'launchData',
  'let': {
   device: '$device',
   parameter: '$parameter',
   startTimeStamp: {
    $dateSubtract: {
     startDate: '$timeStamp',
     unit: 'millisecond',
     amount: 500,
     timezone: 'GMT'
    }
   },
   endTimeStamp: {
    $dateAdd: {
     startDate: '$timeStamp',
     unit: 'millisecond',
     amount: 500,
     timezone: 'GMT'
    }
   }
  },
  pipeline: [
   {
    $match: {
     $expr: {
      $and: [
       {
        $eq: [
         '$meta.device',
         '$$device'
        ]
       },
       {
        $gte: [
         '$time',
         '$$startTimeStamp'
        ]
       },
       {
        $lte: [
         '$time',
         '$$endTimeStamp'
        ]
       }
      ]
     }
    }
   },
   {
    $replaceWith: {
     $arrayToObject: {
      $filter: {
       input: {
        $objectToArray: '$$CURRENT'
       },
       cond: {
        $in: [
         '$$this.k',
         [
          '$$parameter',
          'time'
         ]
        ]
       }
      }
     }
    }
   }
  ],
  as: 'metricData'
 }
}, {
 $addFields: {
  metricsCount: {
   $size: '$metricData'
  },
  metricsOnly: {
   $map: {
    input: '$metricData',
    as: 'metricObj',
    'in': {
     $let: {
      vars: {
       metricKVObj: {
        $first: {
         $filter: {
          input: {
           $objectToArray: '$$metricObj'
          },
          cond: {
           $ne: [
            '$$this.k',
            'time'
           ]
          }
         }
        }
       }
      },
      'in': '$$metricKVObj.v'
     }
    }
   }
  }
 }
}, {
 $addFields: {
  metricStats: {
   avg: {
    $avg: '$metricsOnly'
   },
   min: {
    $min: '$metricsOnly'
   },
   max: {
    $max: '$metricsOnly'
   },
   stdDev: {
    $stdDevPop: '$metricsOnly'
   },
   durationMS: {
    $subtract: [
     {
      $max: '$metricData.time'
     },
     {
      $min: '$metricData.time'
     }
    ]
   }
  }
 }
}]