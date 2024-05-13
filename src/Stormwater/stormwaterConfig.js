export const fees = [
  // {
  //   name: 'Stormwater Facility Replacement Fee',
  //   label: 'Construction cost of all stormwater devices',
  //   units: 'dollars',
  //   multiplier: 0.24,
  //   total: 0,
  //   value: 0,
  //   surety: {
  //     name: 'Stormwater Control Measure (SCM) Surety',
  //     multiplier: 1.25,
  //     url: 'https://www.raleighnc.gov/business/content/PlanDev/Articles/DevServ/StormwaterBMPSurety.html'
  //   },
  //   url: 'https://www.raleighnc.gov/business/content/PlanDev/Articles/DevServ/StormwaterReplacementFund.html',
  //   selected: false
  // },
  {
    name: 'Land Disturbing Fees',
    label: 'Disturbed acres (rounded to nearest 1/10)',
    units: 'acres',
    total: 0,
    value: 0,
    url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
    selected: false,
    surety: {
      name: 'Sediment and Erosion Control Surety',
      multiplier: 1000,
      url: 'https://www.raleighnc.gov/business/content/PlanDev/Articles/DevServ/SedimentErosionControlSurety.html'
    },
    subfees: [
      {
        name: 'Land Disturbing Plan Review Fees',
        multiplier: 172,
        total: 0
      },
      {
        name: 'Land Disturbing Permit Fees',
        multiplier: 347,
        total: 0
      }
    ]
  },
  {
    name: 'Stormwater Control Permit',
    label: 'Property or project acres (rounded to nearest 1/10)',
    units: 'acres',
    multiplier: 238,
    minimum: 235,
    url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
    total: 0,
    value: 0
  },
  ];
  
  export const sections = [
    {
      name: 'Flood Permit Required?',
      falseValue: 0,
      trueValue: 238,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      map: true,
      selected: false
    },
    {
      name: 'Flood Study Required?',
      falseValue: 0,
      trueValue: 1442,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    },
    {
      name: 'Watercourse Buffer Permit Required?',
      trueValue: 216,
      falseValue: 0,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    },
    {
      name: 'Watershed Permit Required?',
      trueValue: 216,
      falseValue: 0,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    }];
  