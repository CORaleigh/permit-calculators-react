export const meansLocationFactor = 1; //already applied to building types, setting to 1
export const minFee = 124; //changed FY27 from 123
export const techFee = 0.04; //unchanged FY27
export const feesMultipliers = {
    building: { commercial: 0, residential: 0.0038 }, //changed FY27 from 0.0035
    electrical: { commercial: 1, residential: 0.49 }, //changed FY27 from 0.54
    mechanical: { commercial: 0.76, residential: 0.28 }, //unchanged FY27
    plumbing: { commercial: 0.56, residential: 0.34 }, //unchanged FY27
    planReview: { commercial: 0.65, residential: 0.57 }//unchanged FY27
  };

export const tiers = [
    { tier: 1, min: 0, max: 500000, costper: 0.0021, cumulative: 0 }, //changed FY27 from 0.0020
    { tier: 2, min: 500001.00, max: 10000000.00, costper: 0.0006, cumulative: 1050 }, //changed FY27 from 1000
    { tier: 3, min: 10000001.00, max: 999999999999999.00, costper: 0.0001, cumulative: 7250 } //changed FY27 from 6900
];
export const constructionScopes = [
  { name: 'New Construction', percent: 1 },  //unchanged FY27
  { name: 'Level 1 Alteration', percent: 0.28 }, //changed FY27
  { name: 'Level 2 Alteration', percent: 0.5 }, //unchanged FY27
  { name: 'Level 3 Alteration', percent: 0.75 }, //unchanged FY27
  { name: 'Addition', percent: 1 }]//unchanged FY27


export const buildingTypes = [//changed for FY27, values already have the means location factor applied
  {group: 'A-1 Assembly, theaters, without stage', 
    values: [
        {key: "IA", value: 287.83},
        {key: "IB", value: 276.92},
        {key: "IIA", value: 267.35},
        {key: "IIB", value: 256.01},
        {key: "IIIA", value: 237.82},
        {key: "IIIB", value: 230.36},
        {key: "IV", value: 246.39},
        {key: "VA", value: 220.28},
        {key: "VB", value: 210.77},
    ]
  },
  {group: 'A-1 Assembly, theaters, with stage', 
    values: [
        {key: "IA", value: 313.02},
        {key: "IB", value: 302.12},
        {key: "IIA", value: 292.55},
        {key: "IIB", value: 281.21},
        {key: "IIIA", value: 263.23},
        {key: "IIIB", value: 255.77},
        {key: "IV", value: 271.59},
        {key: "VA", value: 245.69},
        {key: "VB", value: 236.18},
    ]
  },
  {group: 'A-2 Assembly, nightclubs', 
    values: [
        {key: "IA", value: 243.04},
        {key: "IB", value: 235.91},
        {key: "IIA", value: 228.50},
        {key: "IIB", value: 219.78},
        {key: "IIIA", value: 205.85},
        {key: "IIIB", value: 200.26},
        {key: "IV", value: 212.24},
        {key: "VA", value: 187.19},
        {key: "VB", value: 180.09},
    ]
  },
  {group: 'A-2 Assembly, restaurants, bars, banquet halls', 
    values: [
        {key: "IA", value: 242.16},
        {key: "IB", value: 235.03},
        {key: "IIA", value: 226.75},
        {key: "IIB", value: 218.91},
        {key: "IIIA", value: 204.10},
        {key: "IIIB", value: 199.38},
        {key: "IV", value: 211.36},
        {key: "VA", value: 185.44},
        {key: "VB", value: 179.22},
    ]
  },
  {group: 'A-3 Assembly, churches', 
    values: [
        {key: "IA", value: 290.60},
        {key: "IB", value: 279.70},
        {key: "IIA", value: 270.13},
        {key: "IIB", value: 258.78},
        {key: "IIIA", value: 241.02},
        {key: "IIIB", value: 233.56},
        {key: "IV", value: 249.16},
        {key: "VA", value: 223.48},
        {key: "VB", value: 213.97},
    ]
  },
  {group: 'A-3 Assembly, general, community halls, libraries, museums', 
    values: [
        {key: "IA", value: 241.88},
        {key: "IB", value: 230.98},
        {key: "IIA", value: 220.53},
        {key: "IIB", value: 210.07},
        {key: "IIIA", value: 191.21},
        {key: "IIIB", value: 184.63},
        {key: "IV", value: 200.44},
        {key: "VA", value: 173.67},
        {key: "VB", value: 165.04},
    ]
  },
  {group: 'A-4 Assembly, arenas', 
    values: [
        {key: "IA", value: 286.95},
        {key: "IB", value: 276.05},
        {key: "IIA", value: 265.60},
        {key: "IIB", value: 255.14},
        {key: "IIIA", value: 236.07},
        {key: "IIIB", value: 229.48},
        {key: "IV", value: 245.51},
        {key: "VA", value: 218.53},
        {key: "VB", value: 209.89},
    ]
  },
  {group: 'B Business', 
    values: [
        {key: "IA", value: 270.69},
        {key: "IB", value: 260.95},
        {key: "IIA", value: 251.44},
        {key: "IIB", value: 240.70},
        {key: "IIIA", value: 219.15},
        {key: "IIIB", value: 211.41},
        {key: "IV", value: 231.42},
        {key: "VA", value: 195.87},
        {key: "VB", value: 186.83},
    ]
  },
  {group: 'E Educational', 
    values: [
        {key: "IA", value: 259.31},
        {key: "IB", value: 250.07},
        {key: "IIA", value: 241.63},
        {key: "IIB", value: 231.47},
        {key: "IIIA", value: 214.91},
        {key: "IIIB", value: 203.96},
        {key: "IV", value: 223.51},
        {key: "VA", value: 188.11},
        {key: "VB", value: 182.02},
    ]
  },
  {group: 'F-1 Factory and industrial, moderate hazard', 
    values: [
        {key: "IA", value: 148.14},
        {key: "IB", value: 141.00},
        {key: "IIA", value: 132.14},
        {key: "IIB", value: 127.14},
        {key: "IIIA", value: 113.22},
        {key: "IIIB", value: 107.70},
        {key: "IV", value: 121.21},
        {key: "VA", value: 93.89},
        {key: "VB", value: 87.40},
    ]
  },
  {group: 'F-2 Factory and industrial, low hazard', 
    values: [
        {key: "IA", value: 147.27},
        {key: "IB", value: 140.12},
        {key: "IIA", value: 132.14},
        {key: "IIB", value: 126.26},
        {key: "IIIA", value: 113.22},
        {key: "IIIB", value: 106.82},
        {key: "IV", value: 120.34},
        {key: "VA", value: 93.89},
        {key: "VB", value: 86.52},
    ]
  },
  {group: 'H-1 High Hazard, explosives', 
    values: [
        {key: "IA", value: 138.19},
        {key: "IB", value: 131.04},
        {key: "IIA", value: 123.06},
        {key: "IIB", value: 117.18},
        {key: "IIIA", value: 104.42},
        {key: "IIIB", value: 98.02},
        {key: "IV", value: 111.26},
        {key: "VA", value: 85.09},
        {key: "VB", value: 0},
    ]
  },
  {group: 'H234 High Hazard', 
    values: [
        {key: "IA", value: 138.19},
        {key: "IB", value: 131.04},
        {key: "IIA", value: 123.06},
        {key: "IIB", value: 117.18},
        {key: "IIIA", value: 104.42},
        {key: "IIIB", value: 98.02},
        {key: "IV", value: 111.26},
        {key: "VA", value: 85.09},
        {key: "VB", value: 77.72},
    ]
  },
  {group: 'H-5 HPM', 
    values: [
        {key: "IA", value: 270.69},
        {key: "IB", value: 260.95},
        {key: "IIA", value: 251.44},
        {key: "IIB", value: 240.70},
        {key: "IIIA", value: 219.15},
        {key: "IIIB", value: 211.41},
        {key: "IV", value: 231.42},
        {key: "VA", value: 195.87},
        {key: "VB", value: 186.83},
    ]
  },
  {group: 'I-1 Institutional, supervised environment', 
    values: [
        {key: "IA", value: 248.13},
        {key: "IB", value: 239.24},
        {key: "IIA", value: 230.69},
        {key: "IIB", value: 221.97},
        {key: "IIIA", value: 203.17},
        {key: "IIIB", value: 197.71},
        {key: "IV", value: 221.51},
        {key: "VA", value: 182.98},
        {key: "VB", value: 176.45},
    ]
  },
  {group: 'I-2 Institutional, hospitals', 
    values: [
        {key: "IA", value: 424.89},
        {key: "IB", value: 415.15},
        {key: "IIA", value: 405.65},
        {key: "IIB", value: 394.90},
        {key: "IIIA", value: 372.51},
        {key: "IIIB", value: 0},
        {key: "IV", value: 385.62},
        {key: "VA", value: 349.23},
        {key: "VB", value: 0},
    ]
  },
  {group: 'I-2 Institutional, nursing homes', 
    values: [
        {key: "IA", value: 293.12},
        {key: "IB", value: 283.37},
        {key: "IIA", value: 273.87},
        {key: "IIB", value: 263.12},
        {key: "IIIA", value: 243.31},
        {key: "IIIB", value: 0},
        {key: "IV", value: 253.84},
        {key: "VA", value: 220.02},
        {key: "VB", value: 0},
    ]
  },
  {group: 'I-3 Institutional, restrained', 
    values: [
        {key: "IA", value: 285.37},
        {key: "IB", value: 275.63},
        {key: "IIA", value: 266.12},
        {key: "IIB", value: 255.38},
        {key: "IIIA", value: 236.42},
        {key: "IIIB", value: 227.81},
        {key: "IV", value: 246.10},
        {key: "VA", value: 230.95},
        {key: "VB", value: 202.35},
    ]
  },
  {group: 'I-4 Institutional, day care facilities', 
    values: [
        {key: "IA", value: 248.13},
        {key: "IB", value: 239.24},
        {key: "IIA", value: 230.69},
        {key: "IIB", value: 221.97},
        {key: "IIIA", value: 203.17},
        {key: "IIIB", value: 197.71},
        {key: "IV", value: 221.51},
        {key: "VA", value: 182.98},
        {key: "VB", value: 176.45},
    ]
  },
  {group: 'M Mercantile', 
    values: [
        {key: "IA", value: 181.40},
        {key: "IB", value: 174.27},
        {key: "IIA", value: 165.99},
        {key: "IIB", value: 158.15},
        {key: "IIIA", value: 143.93},
        {key: "IIIB", value: 139.21},
        {key: "IV", value: 150.60},
        {key: "VA", value: 125.27},
        {key: "VB", value: 119.04},
    ]
  },
  {group: 'R-1 Residential, hotels', 
    values: [
        {key: "IA", value: 251.00},
        {key: "IB", value: 242.11},
        {key: "IIA", value: 233.57},
        {key: "IIB", value: 224.85},
        {key: "IIIA", value: 205.60},
        {key: "IIIB", value: 200.14},
        {key: "IV", value: 224.39},
        {key: "VA", value: 185.41},
        {key: "VB", value: 178.88},
    ]
  },
  {group: 'R-2 Residential, multiple family', 
    values: [
        {key: "IA", value: 209.57},
        {key: "IB", value: 200.68},
        {key: "IIA", value: 192.14},
        {key: "IIB", value: 183.42},
        {key: "IIIA", value: 165.29},
        {key: "IIIB", value: 159.83},
        {key: "IV", value: 182.95},
        {key: "VA", value: 145.09},
        {key: "VB", value: 138.56},
    ]
  },
  {group: 'R-3 Residential, one- and two-family', 
    values: [
        {key: "IA", value: 196.77},
        {key: "IB", value: 191.54},
        {key: "IIA", value: 186.93},
        {key: "IIB", value: 182.95},
        {key: "IIIA", value: 176.83},
        {key: "IIIB", value: 170.53},
        {key: "IV", value: 186.64},
        {key: "VA", value: 164.42},
        {key: "VB", value: 154.11},
    ]
  },
  {group: 'R-4 Residential, care/assisted living facilities', 
    values: [
        {key: "IA", value: 248.13},
        {key: "IB", value: 239.24},
        {key: "IIA", value: 230.69},
        {key: "IIB", value: 221.97},
        {key: "IIIA", value: 203.17},
        {key: "IIIB", value: 197.71},
        {key: "IV", value: 221.51},
        {key: "VA", value: 182.98},
        {key: "VB", value: 176.45},
    ]
  },
  {group: 'S-1 Storage, moderate hazard', 
    values: [
        {key: "IA", value: 137.31},
        {key: "IB", value: 130.16},
        {key: "IIA", value: 121.31},
        {key: "IIB", value: 116.30},
        {key: "IIIA", value: 102.67},
        {key: "IIIB", value: 97.15},
        {key: "IV", value: 110.38},
        {key: "VA", value: 83.33},
        {key: "VB", value: 76.85},
    ]
  },
  {group: 'S-2 Storage, low hazard', 
    values: [
        {key: "IA", value: 136.43},
        {key: "IB", value: 129.29},
        {key: "IIA", value: 121.31},
        {key: "IIB", value: 115.43},
        {key: "IIIA", value: 102.67},
        {key: "IIIB", value: 96.27},
        {key: "IV", value: 109.50},
        {key: "VA", value: 83.33},
        {key: "VB", value: 75.97},
    ]
  },
  {group: 'U Utility, miscellaneous', 
    values: [
        {key: "IA", value: 109.65},
        {key: "IB", value: 103.41},
        {key: "IIA", value: 95.77},
        {key: "IIB", value: 91.90},
        {key: "IIIA", value: 81.87},
        {key: "IIIB", value: 76.69},
        {key: "IV", value: 87.50},
        {key: "VA", value: 65.16},
        {key: "VB", value: 62.26},
    ]
  }
]