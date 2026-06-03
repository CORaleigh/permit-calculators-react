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
        multiplier: 250,
        total: 0
      },
      {
        name: 'Land Disturbing Permit Fees',
        multiplier: 400,
        total: 0
      }
    ]
  },
  {
    name: 'Stormwater Control Permit',
    label: 'Property or project acres (rounded to nearest 1/10)',
    units: 'acres',
    multiplier: 250,
    minimum: 250,
    url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
    total: 0,
    value: 0
  },
  ];
  
  export const sections = [
    {
      name: 'Flood Permit Required?',
      falseValue: 0,
      trueValue: 250,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      map: true,
      selected: false
    },
    {
      name: 'Flood Study Required?',
      falseValue: 0,
      trueValue: 1558,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    },
    {
      name: 'Watercourse Buffer Permit Required?',
      trueValue: 250,
      falseValue: 0,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    },
    {
      name: 'Watershed Permit Required?',
      trueValue: 250,
      falseValue: 0,
      url: 'https://www.raleighnc.gov/DevelopmentFeeSchedule',
      total: 0,
      selected: false
    }];
  