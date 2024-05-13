export const meansLocationFactor = 0.85;
export const minFee = 112;
export const techFee = 0.04;
export const feesMultipliers = {
    building: { commercial: 0, residential: 0.0035 },
    electrical: { commercial: 1, residential: 0.54 },
    mechanical: { commercial: 0.76, residential: 0.28 },
    plumbing: { commercial: 0.56, residential: 0.34 },
    planReview: { commercial: 0.56, residential: 0.57 }
  };

export const tiers = [
    { tier: 1, min: 0, max: 500000, costper: 0.002, cumulative: 0 },
    { tier: 2, min: 500001.00, max: 10000000.00, costper: 0.0006, cumulative: 1000 },
    { tier: 3, min: 10000001.00, max: 999999999999999.00, costper: 0.0001, cumulative: 6900 }
];
export const constructionScopes = [{ name: 'New Construction', percent: 1 }, { name: 'Level 1 Alteration', percent: 0.25 }, { name: 'Level 2 Alteration', percent: 0.5 }, { name: 'Level 3 Alteration', percent: 0.75 }, { name: 'Addition', percent: 1 }]
export const buildingTypes = [
    {group: 'A-1 Assembly, theaters, without stage', 
      values: [
        {key: 'IA', value: 225.65}, 
        {key: 'IB', value: 217.54}, 
        {key: 'IIA', value: 211.85}, 
        {key: 'IIB', value: 202.22}, 
        {key: 'IIIA', value: 189.15}, 
        {key: 'IIIB', value: 183.09}, 
        {key: 'IV', value: 195.16}, 
        {key: 'VA', value: 170.98}, 
        {key: 'VB', value: 163.79}
      ]
    },
    {group: 'A-1 Assembly, theaters, with stage', 
      values: [
        {key: 'IA', value: 246.61}, 
        {key: 'IB', value: 238.50}, 
        {key: 'IIA', value: 232.82}, 
        {key: 'IIB', value: 223.18}, 
        {key: 'IIIA', value: 209.86}, 
        {key: 'IIIB', value: 203.80}, 
        {key: 'IV', value: 216.12}, 
        {key: 'VA', value: 191.69}, 
        {key: 'VB', value: 184.50}
      ]
    },
    {group: 'A-2 Assembly, nightclubs', 
      values: [
        {key: 'IA', value: 191.96}, 
        {key: 'IB', value: 186.56}, 
        {key: 'IIA', value: 182.12}, 
        {key: 'IIB', value: 174.70}, 
        {key: 'IIIA', value: 164.94}, 
        {key: 'IIIB', value: 160.39}, 
        {key: 'IV', value: 168.64}, 
        {key: 'VA', value: 149.29}, 
        {key: 'VB', value: 144.33}
      ]
    },
    {group: 'A-2 Assembly, restaurants, bars, banquet halls', 
      values: [
        {key: 'IA', value: 190.96}, 
        {key: 'IB', value: 185.56}, 
        {key: 'IIA', value: 180.12}, 
        {key: 'IIB', value: 173.70}, 
        {key: 'IIIA', value: 162.94}, 
        {key: 'IIIB', value: 159.39}, 
        {key: 'IV', value: 167.64}, 
        {key: 'VA', value: 147.29}, 
        {key: 'VB', value: 143.33}
      ]
    },
    {group: 'A-3 Assembly, churches', 
      values: [
        {key: 'IA', value: 226.69}, 
        {key: 'IB', value: 218.58}, 
        {key: 'IIA', value: 212.89}, 
        {key: 'IIB', value: 203.26}, 
        {key: 'IIIA', value: 191.60}, 
        {key: 'IIIB', value: 185.54}, 
        {key: 'IV', value: 196.20}, 
        {key: 'VA', value: 173.43}, 
        {key: 'VB', value: 166.24}
      ]
    },
    {group: 'A-3 Assembly, general, community halls, libraries, museums', 
      values: [
        {key: 'IA', value: 190.63}, 
        {key: 'IB', value: 182.52}, 
        {key: 'IIA', value: 175.84}, 
        {key: 'IIB', value: 167.20}, 
        {key: 'IIIA', value: 153.09}, 
        {key: 'IIIB', value: 148.07}, 
        {key: 'IV', value: 160.14}, 
        {key: 'VA', value: 134.97}, 
        {key: 'VB', value: 128.78}
      ]
    },
    {group: 'A-4 Assembly, arenas', 
      values: [
        {key: 'IA', value: 224.65}, 
        {key: 'IB', value: 216.54}, 
        {key: 'IIA', value: 209.85}, 
        {key: 'IIB', value: 201.22}, 
        {key: 'IIIA', value: 187.15}, 
        {key: 'IIIB', value: 182.09}, 
        {key: 'IV', value: 194.16}, 
        {key: 'VA', value: 168.98}, 
        {key: 'VB', value: 162.79}
      ]
    },
    {group: 'B Business', 
      values: [
        {key: 'IA', value: 197.81}, 
        {key: 'IB', value: 190.62}, 
        {key: 'IIA', value: 184.70}, 
        {key: 'IIB', value: 175.70}, 
        {key: 'IIIA', value: 160.65}, 
        {key: 'IIIB', value: 154.63}, 
        {key: 'IV', value: 168.95}, 
        {key: 'VA', value: 141.15}, 
        {key: 'VB', value: 134.99}
      ]
    },
    {group: 'E Educational', 
      values: [
        {key: 'IA', value: 209.43}, 
        {key: 'IB', value: 202.23}, 
        {key: 'IIA', value: 196.97}, 
        {key: 'IIB', value: 188.01}, 
        {key: 'IIIA', value: 175.28}, 
        {key: 'IIIB', value: 166.43}, 
        {key: 'IV', value: 181.55}, 
        {key: 'VA', value: 153.08}, 
        {key: 'VB', value: 148.70}
      ]
    },
    {group: 'F-1 Factory and industrial, moderate hazard', 
      values: [
        {key: 'IA', value: 117.60}, 
        {key: 'IB', value: 112.19}, 
        {key: 'IIA', value: 105.97}, 
        {key: 'IIB', value: 101.84}, 
        {key: 'IIIA', value: 91.54}, 
        {key: 'IIIB', value: 87.26}, 
        {key: 'IV', value: 97.61}, 
        {key: 'VA', value: 75.29}, 
        {key: 'VB', value: 70.95}
      ]
    },
    {group: 'F-2 Factory and industrial, low hazard', 
      values: [
        {key: 'IA', value: 116.60}, 
        {key: 'IB', value: 111.19}, 
        {key: 'IIA', value: 105.97}, 
        {key: 'IIB', value: 100.84}, 
        {key: 'IIIA', value: 91.54}, 
        {key: 'IIIB', value: 86.26}, 
        {key: 'IV', value: 96.61}, 
        {key: 'VA', value: 75.29}, 
        {key: 'VB', value: 69.95}
      ]
    },
    {group: 'H-1 High Hazard, explosives', 
      values: [
        {key: 'IA', value: 109.99}, 
        {key: 'IB', value: 104.58}, 
        {key: 'IIA', value: 99.35}, 
        {key: 'IIB', value: 94.22}, 
        {key: 'IIIA', value: 85.14}, 
        {key: 'IIIB', value: 79.87}, 
        {key: 'IV', value: 89.99}, 
        {key: 'VA', value: 68.89}, 
        {key: 'VB', value:  0.00}
      ]
    },
    {group: 'H234 High Hazard', 
      values: [
        {key: 'IA', value: 109.99}, 
        {key: 'IB', value: 104.58}, 
        {key: 'IIA', value: 99.35}, 
        {key: 'IIB', value: 94.22}, 
        {key: 'IIIA', value: 85.14}, 
        {key: 'IIIB', value: 79.87}, 
        {key: 'IV', value: 89.99}, 
        {key: 'VA', value: 68.89}, 
        {key: 'VB', value: 63.56}
      ]
    },
    {group: 'H-5 HPM', 
      values: [
        {key: 'IA', value: 197.81}, 
        {key: 'IB', value: 190.62}, 
        {key: 'IIA', value: 184.70}, 
        {key: 'IIB', value: 175.70}, 
        {key: 'IIIA', value: 160.65}, 
        {key: 'IIIB', value: 154.63}, 
        {key: 'IV', value: 168.95}, 
        {key: 'VA', value: 141.15}, 
        {key: 'VB', value: 134.99}
      ]
    },
    {group: 'I-1 Institutional, supervised environment', 
      values: [
        {key: 'IA', value: 197.83}, 
        {key: 'IB', value: 191.05}, 
        {key: 'IIA', value: 185.12}, 
        {key: 'IIB', value: 177.91}, 
        {key: 'IIIA', value: 163.28}, 
        {key: 'IIIB', value: 158.81}, 
        {key: 'IV', value: 178.06}, 
        {key: 'VA', value: 146.98}, 
        {key: 'VB', value: 142.33}
      ]
    },
    {group: 'I-2 Institutional, hospitals', 
      values: [
        {key: 'IA', value: 330.92}, 
        {key: 'IB', value: 323.73}, 
        {key: 'IIA', value: 317.81}, 
        {key: 'IIB', value: 308.81}, 
        {key: 'IIIA', value: 292.72}, 
        {key: 'IIIB', value:  0.00}, 
        {key: 'IV', value: 302.06}, 
        {key: 'VA', value: 273.22}, 
        {key: 'VB', value:  0.00}
      ]
    },
    {group: 'I-2 Institutional, nursing homes', 
      values: [
        {key: 'IA', value: 229.68}, 
        {key: 'IB', value: 222.49}, 
        {key: 'IIA', value: 216.58}, 
        {key: 'IIB', value: 207.57}, 
        {key: 'IIIA', value: 193.53}, 
        {key: 'IIIB', value:  0.00}, 
        {key: 'IV', value: 200.83}, 
        {key: 'VA', value: 174.02}, 
        {key: 'VB', value:  0.00}
      ]
    },
    {group: 'I-3 Institutional, restrained', 
      values: [
        {key: 'IA', value: 224.86}, 
        {key: 'IB', value: 217.67}, 
        {key: 'IIA', value: 211.75}, 
        {key: 'IIB', value: 202.75}, 
        {key: 'IIIA', value: 188.96}, 
        {key: 'IIIB', value: 181.94}, 
        {key: 'IV', value: 196.00}, 
        {key: 'VA', value: 169.45}, 
        {key: 'VB', value: 161.29}
      ]
    },
    {group: 'I-4 Institutional, day care facilities', 
      values: [
        {key: 'IA', value: 197.83}, 
        {key: 'IB', value: 191.05}, 
        {key: 'IIA', value: 185.12}, 
        {key: 'IIB', value: 177.91}, 
        {key: 'IIIA', value: 163.28}, 
        {key: 'IIIB', value: 158.81}, 
        {key: 'IV', value: 178.06}, 
        {key: 'VA', value: 146.98}, 
        {key: 'VB', value: 142.33}
      ]
    },
    {group: 'M Mercantile', 
      values: [
        {key: 'IA', value: 142.95}, 
        {key: 'IB', value: 137.54}, 
        {key: 'IIA', value: 132.11}, 
        {key: 'IIB', value: 125.68}, 
        {key: 'IIIA', value: 115.38}, 
        {key: 'IIIB', value: 111.83}, 
        {key: 'IV', value: 119.62}, 
        {key: 'VA', value: 99.73}, 
        {key: 'VB', value: 95.77}
      ]
    },
    {group: 'R-1 Residential, hotels', 
      values: [
        {key: 'IA', value: 199.70}, 
        {key: 'IB', value: 192.92}, 
        {key: 'IIA', value: 186.99}, 
        {key: 'IIB', value: 179.78}, 
        {key: 'IIIA', value: 164.90}, 
        {key: 'IIIB', value: 160.43}, 
        {key: 'IV', value: 179.93}, 
        {key: 'VA', value: 148.60}, 
        {key: 'VB', value: 143.96}
      ]
    },
    {group: 'R-2 Residential, multiple family', 
      values: [
        {key: 'IA', value: 167.27}, 
        {key: 'IB', value: 160.49}, 
        {key: 'IIA', value: 154.56}, 
        {key: 'IIB', value: 147.35}, 
        {key: 'IIIA', value: 133.71}, 
        {key: 'IIIB', value: 129.23}, 
        {key: 'IV', value: 147.50}, 
        {key: 'VA', value: 117.40}, 
        {key: 'VB', value: 112.76}
      ]
    },
    {group: 'R-3 Residential, one- and two-family', 
      values: [
        {key: 'IA', value: 155.84}, 
        {key: 'IB', value: 151.61}, 
        {key: 'IIA', value: 147.83}, 
        {key: 'IIB', value: 144.09}, 
        {key: 'IIIA', value: 138.94}, 
        {key: 'IIIB', value: 135.27}, 
        {key: 'IV', value: 141.72}, 
        {key: 'VA', value: 130.04}, 
        {key: 'VB', value: 122.46}
      ]
    },
    {group: 'R-4 Residential, care/assisted living facilities', 
      values: [
        {key: 'IA', value: 197.83}, 
        {key: 'IB', value: 191.05}, 
        {key: 'IIA', value: 185.12}, 
        {key: 'IIB', value: 177.91}, 
        {key: 'IIIA', value: 163.28}, 
        {key: 'IIIB', value: 158.81}, 
        {key: 'IV', value: 178.06}, 
        {key: 'VA', value: 146.98}, 
        {key: 'VB', value: 142.33}
      ]
    },
    {group: 'S-1 Storage, moderate hazard', 
      values: [
        {key: 'IA', value: 108.99}, 
        {key: 'IB', value: 103.58}, 
        {key: 'IIA', value: 97.35}, 
        {key: 'IIB', value: 93.22}, 
        {key: 'IIIA', value: 83.14}, 
        {key: 'IIIB', value: 78.87}, 
        {key: 'IV', value: 88.99}, 
        {key: 'VA', value: 66.89}, 
        {key: 'VB', value: 62.56}
      ]
    },
    {group: 'S-2 Storage, low hazard', 
      values: [
        {key: 'IA', value: 107.99}, 
        {key: 'IB', value: 102.58}, 
        {key: 'IIA', value: 97.35}, 
        {key: 'IIB', value: 92.22}, 
        {key: 'IIIA', value: 83.14}, 
        {key: 'IIIB', value: 77.87}, 
        {key: 'IV', value: 87.99}, 
        {key: 'VA', value: 66.89}, 
        {key: 'VB', value: 61.56}
      ]
    },
    {group: 'U Utility, miscellaneous', 
      values: [
        {key: 'IA', value: 85.30}, 
        {key: 'IB', value: 80.55}, 
        {key: 'IIA', value: 75.51}, 
        {key: 'IIB', value: 71.75}, 
        {key: 'IIIA', value: 64.72}, 
        {key: 'IIIB', value: 60.49}, 
        {key: 'IV', value: 68.56}, 
        {key: 'VA', value: 51.18}, 
        {key: 'VB', value: 48.7}
      ]
    }
  ]