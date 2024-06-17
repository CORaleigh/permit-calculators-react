export const meansLocationFactor = 0.85;
export const minFee = 112;
export const techFee = 0.04;
export const feesMultipliers = {
    building: { commercial: 0, residential: 0.0035 },
    electrical: { commercial: 1, residential: 0.54 },
    mechanical: { commercial: 0.76, residential: 0.28 },
    plumbing: { commercial: 0.56, residential: 0.34 },
    planReview: { commercial: 0.61, residential: 0.57 }
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
      {key: "IA", value: 330.5600}, 
      {key: "IB", value: 318.8000}, 
      {key: "IIA", value: 309.3920}, 
      {key: "IIB", value: 297.2000}, 
      {key: "IIIA", value: 277.7120}, 
      {key: "IIIB", value: 269.6672}, 
      {key: "IV", value: 287.0432}, 
      {key: "VA", value: 258.7904}, 
      {key: "VB", value: 248.8928}
    ]
  },
  {group: 'A-1 Assembly, theaters, with stage', 
    values: [
      {key: "IA", value: 303.4880}, 
      {key: "IB", value: 291.7280}, 
      {key: "IIA", value: 282.3200}, 
      {key: "IIB", value: 270.1280}, 
      {key: "IIIA", value: 250.8800}, 
      {key: "IIIB", value: 242.8352}, 
      {key: "IV", value: 259.9712}, 
      {key: "VA", value: 231.9584}, 
      {key: "VB", value: 222.0608}
    ]
  },
  {group: 'A-2 Assembly, nightclubs', 
    values: [
      {key: "IA", value: 272.5115}, 
      {key: "IB", value: 264.4265}, 
      {key: "IIA", value: 256.9085}, 
      {key: "IIB", value: 248.1935}, 
      {key: "IIIA", value: 232.7585}, 
      {key: "IIIB", value: 226.1225}, 
      {key: "IV", value: 239.2790}, 
      {key: "VA", value: 211.5695}, 
      {key: "VB", value: 204.7235}
    ]
  },
  {group: 'A-2 Assembly, restaurants, bars, banquet halls', 
    values: [
      {key: "IA", value: 271.5115}, 
      {key: "IB", value: 263.4265}, 
      {key: "IIA", value: 254.9085}, 
      {key: "IIB", value: 247.1935}, 
      {key: "IIIA", value: 230.7585}, 
      {key: "IIIB", value: 225.1225}, 
      {key: "IV", value: 238.2790}, 
      {key: "VA", value: 209.5695}, 
      {key: "VB", value: 203.7235}
    ]
  },
  {group: 'A-3 Assembly, churches', 
    values: [
      {key: "IA", value: 308.0080}, 
      {key: "IB", value: 296.2480}, 
      {key: "IIA", value: 286.8400}, 
      {key: "IIB", value: 274.6480}, 
      {key: "IIIA", value: 255.5248}, 
      {key: "IIIB", value: 247.4800}, 
      {key: "IV", value: 264.4912}, 
      {key: "VA", value: 236.6032}, 
      {key: "VB", value: 226.7056}
    ]
  },
  {group: 'A-3 Assembly, general, community halls, libraries, museums', 
    values: [
      {key: "IA", value: 258.6640}, 
      {key: "IB", value: 246.9040}, 
      {key: "IIA", value: 236.4960}, 
      {key: "IIB", value: 225.3040}, 
      {key: "IIIA", value: 205.0560}, 
      {key: "IIIB", value: 198.0112}, 
      {key: "IV", value: 215.1472}, 
      {key: "VA", value: 186.1344}, 
      {key: "VB", value: 177.2368}
    ]
  },
  {group: 'A-4 Assembly, arenas', 
    values: [
      {key: "IA", value: 302.4880}, 
      {key: "IB", value: 290.7280}, 
      {key: "IIA", value: 280.3200}, 
      {key: "IIB", value: 269.1280}, 
      {key: "IIIA", value: 248.8800}, 
      {key: "IIIB", value: 241.8352}, 
      {key: "IV", value: 258.9712}, 
      {key: "VA", value: 229.9584}, 
      {key: "VB", value: 221.0608}
    ]
  },
  {group: 'B Business', 
    values: [
      {key: "IA", value: 289.5071}, 
      {key: "IB", value: 279.2251}, 
      {key: "IIA", value: 269.2050}, 
      {key: "IIB", value: 257.8172}, 
      {key: "IIIA", value: 235.4190}, 
      {key: "IIIB", value: 227.0682}, 
      {key: "IV", value: 247.9135}, 
      {key: "VA", value: 210.3930}, 
      {key: "VB", value: 200.7812}
    ]
  },
  {group: 'E Educational', 
    values: [
      {key: "IA", value: 276.3280}, 
      {key: "IB", value: 266.7280}, 
      {key: "IIA", value: 258.2992}, 
      {key: "IIB", value: 247.6048}, 
      {key: "IIIA", value: 231.0832}, 
      {key: "IIIB", value: 219.2752}, 
      {key: "IV", value: 239.0896}, 
      {key: "VA", value: 202.4560}, 
      {key: "VB", value: 195.9664}
    ]
  },
  {group: 'F-1 Factory and industrial, moderate hazard', 
    values: [
      {key: "IA", value: 160.2014}, 
      {key: "IB", value: 152.7814}, 
      {key: "IIA", value: 143.3438}, 
      {key: "IIB", value: 138.6410}, 
      {key: "IIIA", value: 123.5536}, 
      {key: "IIIB", value: 117.4092}, 
      {key: "IV", value: 132.4824}, 
      {key: "VA", value: 102.4384}, 
      {key: "VB", value: 95.9336}
    ]
  },
  {group: 'F-2 Factory and industrial, low hazard', 
    values: [
      {key: "IA", value: 159.2014}, 
      {key: "IB", value: 151.7814}, 
      {key: "IIA", value: 143.3438}, 
      {key: "IIB", value: 137.6410}, 
      {key: "IIIA", value: 123.5536}, 
      {key: "IIIB", value: 116.4092}, 
      {key: "IV", value: 131.4824}, 
      {key: "VA", value: 102.4384}, 
      {key: "VB", value: 94.9336}
    ]
  },
  {group: 'H-1 High Hazard, explosives', 
    values: [
      {key: "IA", value: 149.4566}, 
      {key: "IB", value: 142.0366}, 
      {key: "IIA", value: 133.5990}, 
      {key: "IIB", value: 127.8962}, 
      {key: "IIIA", value: 114.1162}, 
      {key: "IIIB", value: 106.9718}, 
      {key: "IV", value: 121.7376}, 
      {key: "VA", value: 93.0010}, 
      {key: "VB", value:  0.0000}
    ]
  },
  {group: 'H234 High Hazard', 
    values: [
      {key: "IA", value: 149.4566}, 
      {key: "IB", value: 142.0366}, 
      {key: "IIA", value: 133.5990}, 
      {key: "IIB", value: 127.8962}, 
      {key: "IIIA", value: 114.1162}, 
      {key: "IIIB", value: 106.9718}, 
      {key: "IV", value: 121.7376}, 
      {key: "VA", value: 93.0010}, 
      {key: "VB", value: 85.4962}
    ]
  },
  {group: 'H-5 HPM', 
    values: [
      {key: "IA", value: 289.5071}, 
      {key: "IB", value: 279.2251}, 
      {key: "IIA", value: 269.2050}, 
      {key: "IIB", value: 257.8172}, 
      {key: "IIIA", value: 235.4190}, 
      {key: "IIIB", value: 227.0682}, 
      {key: "IV", value: 247.9135}, 
      {key: "VA", value: 210.3930}, 
      {key: "VB", value: 200.7812}
    ]
  },
  {group: 'I-1 Institutional, supervised environment', 
    values: [
      {key: "IA", value: 262.2176}, 
      {key: "IB", value: 252.9536}, 
      {key: "IIA", value: 244.3136}, 
      {key: "IIB", value: 235.6736}, 
      {key: "IIIA", value: 215.4176}, 
      {key: "IIIB", value: 209.4656}, 
      {key: "IV", value: 235.7120}, 
      {key: "VA", value: 193.8176}, 
      {key: "VB", value: 187.7312}
    ]
  },
  {group: 'I-2 Institutional, hospitals', 
    values: [
      {key: "IA", value: 455.1646}, 
      {key: "IB", value: 444.8826}, 
      {key: "IIA", value: 434.8625}, 
      {key: "IIB", value: 423.4747}, 
      {key: "IIIA", value: 399.1665}, 
      {key: "IIIB", value:  0.0000}, 
      {key: "IV", value: 413.5710}, 
      {key: "VA", value: 374.1405}, 
      {key: "VB", value:  0.0000}
    ]
  },
  {group: 'I-2 Institutional, nursing homes', 
    values: [
      {key: "IA", value: 315.9696}, 
      {key: "IB", value: 303.7476}, 
      {key: "IIA", value: 293.7275}, 
      {key: "IIB", value: 282.3397}, 
      {key: "IIIA", value: 261.4265}, 
      {key: "IIIB", value:  0.0000}, 
      {key: "IV", value: 272.4360}, 
      {key: "VA", value: 236.4005}, 
      {key: "VB", value:  0.0000}
    ]
  },
  {group: 'I-3 Institutional, restrained', 
    values: [
      {key: "IA", value: 338.0071}, 
      {key: "IB", value: 327.7251}, 
      {key: "IIA", value: 317.7050}, 
      {key: "IIB", value: 306.3172}, 
      {key: "IIIA", value: 285.4040}, 
      {key: "IIIB", value: 276.0532}, 
      {key: "IV", value: 296.4135}, 
      {key: "VA", value: 260.3780}, 
      {key: "VB", value: 248.7662}
    ]
  },
  {group: 'I-4 Institutional, day care facilities', 
    values: [
      {key: "IA", value: 262.2176}, 
      {key: "IB", value: 252.9536}, 
      {key: "IIA", value: 244.3136}, 
      {key: "IIB", value: 235.6736}, 
      {key: "IIIA", value: 215.4176}, 
      {key: "IIIB", value: 209.4656}, 
      {key: "IV", value: 235.7120}, 
      {key: "VA", value: 193.8176}, 
      {key: "VB", value: 187.7312}
    ]
  },
  {group: 'M Mercantile', 
    values: [
      {key: "IA", value: 203.2930}, 
      {key: "IB", value: 195.2080}, 
      {key: "IIA", value: 186.6900}, 
      {key: "IIB", value: 178.9750}, 
      {key: "IIIA", value: 163.2750}, 
      {key: "IIIB", value: 157.6390}, 
      {key: "IV", value: 170.0605}, 
      {key: "VA", value: 142.0860}, 
      {key: "VB", value: 136.2400}
    ]
  },
  {group: 'R-1 Residential, hotels', 
    values: [
      {key: "IA", value: 264.6736}, 
      {key: "IB", value: 255.4096}, 
      {key: "IIA", value: 246.7696}, 
      {key: "IIB", value: 238.1296}, 
      {key: "IIIA", value: 218.3536}, 
      {key: "IIIB", value: 212.4016}, 
      {key: "IV", value: 238.1680}, 
      {key: "VA", value: 196.7536}, 
      {key: "VB", value: 190.6672}
    ]
  },
  {group: 'R-2 Residential, multiple family', 
    values: [
      {key: "IA", value: 221.3216}, 
      {key: "IB", value: 212.0576}, 
      {key: "IIA", value: 203.4176}, 
      {key: "IIB", value: 194.7776}, 
      {key: "IIIA", value: 175.9616}, 
      {key: "IIIB", value: 170.0096}, 
      {key: "IV", value: 194.8160}, 
      {key: "VA", value: 154.3616}, 
      {key: "VB", value: 148.2752}
    ]
  },
  {group: 'R-3 Residential, one- and two-family', 
    values: [
      {key: "IA", value: 209.6073}, 
      {key: "IB", value: 203.7388}, 
      {key: "IIA", value: 198.9373}, 
      {key: "IIB", value: 195.1155}, 
      {key: "IIIA", value: 188.4128}, 
      {key: "IIIB", value: 181.4482}, 
      {key: "IV", value: 191.7690}, 
      {key: "VA", value: 175.8610}, 
      {key: "VB", value: 165.6663}
    ]
  },
  {group: 'R-4 Residential, care/assisted living facilities', 
    values: [
      {key: "IA", value: 262.2176}, 
      {key: "IB", value: 252.9536}, 
      {key: "IIA", value: 244.3136}, 
      {key: "IIB", value: 235.6736}, 
      {key: "IIIA", value: 215.4176}, 
      {key: "IIIB", value: 209.4656}, 
      {key: "IV", value: 235.7120}, 
      {key: "VA", value: 193.8176}, 
      {key: "VB", value: 187.7312}
    ]
  },
  {group: 'S-1 Storage, moderate hazard', 
    values: [
      {key: "IA", value: 148.4566}, 
      {key: "IB", value: 141.0366}, 
      {key: "IIA", value: 131.5990}, 
      {key: "IIB", value: 126.8962}, 
      {key: "IIIA", value: 112.1162}, 
      {key: "IIIB", value: 105.9718}, 
      {key: "IV", value: 120.7376}, 
      {key: "VA", value: 91.0010}, 
      {key: "VB", value: 84.4962}
    ]
  },
  {group: 'S-2 Storage, low hazard', 
    values: [
      {key: "IA", value: 147.4566}, 
      {key: "IB", value: 140.0366}, 
      {key: "IIA", value: 131.5990}, 
      {key: "IIB", value: 125.8962}, 
      {key: "IIIA", value: 112.1162}, 
      {key: "IIIB", value: 104.9718}, 
      {key: "IV", value: 119.7376}, 
      {key: "VA", value: 91.0010}, 
      {key: "VB", value: 83.4962}
    ]
  },
  {group: 'U Utility, miscellaneous', 
    values: [
      {key: "IA", value: 114.0864}, 
      {key: "IB", value: 107.3664}, 
      {key: "IIA", value: 99.8880}, 
      {key: "IIB", value: 95.5968}, 
      {key: "IIIA", value:  85.1328}, 
      {key: "IIIB", value: 79.5360}, 
      {key: "IV", value: 90.9888}, 
      {key: "VA", value: 67.3920}, 
      {key: "VB", value: 64.1856}
    ]
  }
]