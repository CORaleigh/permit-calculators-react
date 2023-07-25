export const meansLocationFactor = 0.867;
export const minFee = 112;
export const techFee = 0.04;
export const feesMultipliers = {
    building: { commercial: 0, residential: 0.0032 },
    electrical: { commercial: 1, residential: 0.54 },
    mechanical: { commercial: 0.76, residential: 0.28 },
    plumbing: { commercial: 0.56, residential: 0.34 },
    planReview: { commercial: 0.56, residential: 0.57 }
};

export const tiers = [
    { tier: 1, min: 0, max: 500000, costper: 0.002, cumulative: 0 },
    { tier: 2, min: 500001.00, max: 10000000.00, costper: 0.0006, cumulative: 1000 },
    { tier: 3, min: 100000001.00, max: 999999999999999.00, costper: 0.0001, cumulative: 6900 }
];
export const constructionScopes = [{ name: 'New Construction', percent: 1 }, { name: 'Level 1 Alteration', percent: 0.25 }, { name: 'Level 2 Alteration', percent: 0.5 }, { name: 'Level 3 Alteration', percent: 0.75 }, { name: 'Addition', percent: 1 }]
export const buildingTypes = [
    {
        "group": "A-1 Assembly, theaters, with stage",
        "values": [
            {
                "key": "IA ",
                "value": 338.88
            },
            {
                "key": "IB ",
                "value": 327.46
            },
            {
                "key": "IIA ",
                "value": 319.76
            },
            {
                "key": "IIB ",
                "value": 307.63
            },
            {
                "key": "IIIA ",
                "value": 289.42
            },
            {
                "key": "IIIB ",
                "value": 280.47
            },
            {
                "key": "IV ",
                "value": 298.24
            },
            {
                "key": "VA ",
                "value": 268.37
            },
            {
                "key": "VB ",
                "value": 259.83
            }
        ]
    },
    {
        "group": "A-1 Assembly, theaters, without stage",
        "values": [
            {
                "key": "IA ",
                "value": 310.12
            },
            {
                "key": "IB ",
                "value": 298.7
            },
            {
                "key": "IIA ",
                "value": 291
            },
            {
                "key": "IIB ",
                "value": 278.87
            },
            {
                "key": "IIIA ",
                "value": 260.66
            },
            {
                "key": "IIIB ",
                "value": 251.71
            },
            {
                "key": "IV ",
                "value": 269.48
            },
            {
                "key": "VA ",
                "value": 239.62
            },
            {
                "key": "VB ",
                "value": 231.07
            }
        ]
    },
    {
        "group": "A-2 Assembly, nightclubs",
        "values": [
            {
                "key": "IA ",
                "value": 275.09
            },
            {
                "key": "IB ",
                "value": 266.93
            },
            {
                "key": "IIA ",
                "value": 259.34
            },
            {
                "key": "IIB ",
                "value": 250.54
            },
            {
                "key": "IIIA ",
                "value": 234.96
            },
            {
                "key": "IIIB ",
                "value": 228.26
            },
            {
                "key": "IV ",
                "value": 241.54
            },
            {
                "key": "VA ",
                "value": 213.57
            },
            {
                "key": "VB ",
                "value": 206.65
            }
        ]
    },
    {
        "group": "A-2 Assembly, restaurants, bars, banquet halls",
        "values": [
            {
                "key": "IA ",
                "value": 274.09
            },
            {
                "key": "IB ",
                "value": 265.93
            },
            {
                "key": "IIA ",
                "value": 257.34
            },
            {
                "key": "IIB ",
                "value": 249.54
            },
            {
                "key": "IIIA ",
                "value": 232.96
            },
            {
                "key": "IIIB ",
                "value": 227.26
            },
            {
                "key": "IV ",
                "value": 240.54
            },
            {
                "key": "VA ",
                "value": 211.57
            },
            {
                "key": "VB ",
                "value": 205.65
            }
        ]
    },
    {
        "group": "A-3 Assembly, churches",
        "values": [
            {
                "key": "IA ",
                "value": 314.65
            },
            {
                "key": "IB ",
                "value": 303.24
            },
            {
                "key": "IIA ",
                "value": 295.53
            },
            {
                "key": "IIB ",
                "value": 283.41
            },
            {
                "key": "IIIA ",
                "value": 265.65
            },
            {
                "key": "IIIB ",
                "value": 256.7
            },
            {
                "key": "IV ",
                "value": 274.02
            },
            {
                "key": "VA ",
                "value": 244.61
            },
            {
                "key": "VB ",
                "value": 236.06
            }
        ]
    },
    {
        "group": "A-3 Assembly, general, community halls, libraries, museums",
        "values": [
            {
                "key": "IA ",
                "value": 268.44
            },
            {
                "key": "IB ",
                "value": 257.02
            },
            {
                "key": "IIA ",
                "value": 248.32
            },
            {
                "key": "IIB ",
                "value": 237.19
            },
            {
                "key": "IIIA ",
                "value": 218.26
            },
            {
                "key": "IIIB ",
                "value": 210.31
            },
            {
                "key": "IV ",
                "value": 227.8
            },
            {
                "key": "VA ",
                "value": 197.22
            },
            {
                "key": "VB ",
                "value": 189.68
            }
        ]
    },
    {
        "group": "A-4 Assembly, arenas",
        "values": [
            {
                "key": "IA ",
                "value": 309.12
            },
            {
                "key": "IB ",
                "value": 297.7
            },
            {
                "key": "IIA ",
                "value": 289
            },
            {
                "key": "IIB ",
                "value": 277.87
            },
            {
                "key": "IIIA ",
                "value": 258.66
            },
            {
                "key": "IIIB ",
                "value": 250.71
            },
            {
                "key": "IV ",
                "value": 268.48
            },
            {
                "key": "VA ",
                "value": 237.62
            },
            {
                "key": "VB ",
                "value": 230.07
            }
        ]
    },
    {
        "group": "B Business",
        "values": [
            {
                "key": "IA ",
                "value": 263.16
            },
            {
                "key": "IB ",
                "value": 253.51
            },
            {
                "key": "IIA ",
                "value": 244.15
            },
            {
                "key": "IIB ",
                "value": 233.85
            },
            {
                "key": "IIIA ",
                "value": 213
            },
            {
                "key": "IIIB ",
                "value": 204.65
            },
            {
                "key": "IV ",
                "value": 224.67
            },
            {
                "key": "VA ",
                "value": 187.98
            },
            {
                "key": "VB ",
                "value": 179.49
            }
        ]
    },
    {
        "group": "E Educational",
        "values": [
            {
                "key": "IA ",
                "value": 280.42
            },
            {
                "key": "IB ",
                "value": 270.83
            },
            {
                "key": "IIA ",
                "value": 263.7
            },
            {
                "key": "IIB ",
                "value": 252.34
            },
            {
                "key": "IIIA ",
                "value": 235.54
            },
            {
                "key": "IIIB ",
                "value": 223.64
            },
            {
                "key": "IV ",
                "value": 243.64
            },
            {
                "key": "VA ",
                "value": 205.87
            },
            {
                "key": "VB ",
                "value": 199.45
            }
        ]
    },
    {
        "group": "F-1 Factory and industrial, moderate hazard",
        "values": [
            {
                "key": "IA ",
                "value": 161.7
            },
            {
                "key": "IB ",
                "value": 154.21
            },
            {
                "key": "IIA ",
                "value": 144.7
            },
            {
                "key": "IIB ",
                "value": 139.94
            },
            {
                "key": "IIIA ",
                "value": 124.72
            },
            {
                "key": "IIIB ",
                "value": 118.51
            },
            {
                "key": "IV ",
                "value": 133.72
            },
            {
                "key": "VA ",
                "value": 103.4
            },
            {
                "key": "VB ",
                "value": 96.83
            }
        ]
    },
    {
        "group": "F-2 Factory and industrial, low hazard",
        "values": [
            {
                "key": "IA ",
                "value": 160.7
            },
            {
                "key": "IB ",
                "value": 153.21
            },
            {
                "key": "IIA ",
                "value": 144.7
            },
            {
                "key": "IIB ",
                "value": 138.94
            },
            {
                "key": "IIIA ",
                "value": 124.72
            },
            {
                "key": "IIIB ",
                "value": 117.51
            },
            {
                "key": "IV ",
                "value": 132.72
            },
            {
                "key": "VA ",
                "value": 103.4
            },
            {
                "key": "VB ",
                "value": 95.83
            }
        ]
    },
    {
        "group": "H-1 High Hazard, explosives",
        "values": [
            {
                "key": "IA ",
                "value": 150.85
            },
            {
                "key": "IB ",
                "value": 143.36
            },
            {
                "key": "IIA ",
                "value": 134.84
            },
            {
                "key": "IIB ",
                "value": 129.08
            },
            {
                "key": "IIIA ",
                "value": 115.17
            },
            {
                "key": "IIIB ",
                "value": 107.96
            },
            {
                "key": "IV ",
                "value": 122.87
            },
            {
                "key": "VA ",
                "value": 93.86
            },
            {
                "key": "VB ",
                "value": 0
            }
        ]
    },
    {
        "group": "H234 High Hazard",
        "values": [
            {
                "key": "IA ",
                "value": 150.85
            },
            {
                "key": "IB ",
                "value": 143.36
            },
            {
                "key": "IIA ",
                "value": 134.84
            },
            {
                "key": "IIB ",
                "value": 129.08
            },
            {
                "key": "IIIA ",
                "value": 115.17
            },
            {
                "key": "IIIB ",
                "value": 107.96
            },
            {
                "key": "IV ",
                "value": 122.87
            },
            {
                "key": "VA ",
                "value": 93.86
            },
            {
                "key": "VB ",
                "value": 86.28
            }
        ]
    },
    {
        "group": "H-5 HPM",
        "values": [
            {
                "key": "IA ",
                "value": 263.16
            },
            {
                "key": "IB ",
                "value": 253.51
            },
            {
                "key": "IIA ",
                "value": 244.15
            },
            {
                "key": "IIB ",
                "value": 233.85
            },
            {
                "key": "IIIA ",
                "value": 213
            },
            {
                "key": "IIIB ",
                "value": 204.65
            },
            {
                "key": "IV ",
                "value": 224.67
            },
            {
                "key": "VA ",
                "value": 187.98
            },
            {
                "key": "VB ",
                "value": 179.49
            }
        ]
    },
    {
        "group": "I-1 Institutional, supervised environment",
        "values": [
            {
                "key": "IA ",
                "value": 264.93
            },
            {
                "key": "IB ",
                "value": 255.57
            },
            {
                "key": "IIA ",
                "value": 246.84
            },
            {
                "key": "IIB ",
                "value": 238.11
            },
            {
                "key": "IIIA ",
                "value": 217.64
            },
            {
                "key": "IIIB ",
                "value": 211.63
            },
            {
                "key": "IV ",
                "value": 238.15
            },
            {
                "key": "VA ",
                "value": 195.82
            },
            {
                "key": "VB ",
                "value": 189.67
            }
        ]
    },
    {
        "group": "I-2 Institutional, hospitals",
        "values": [
            {
                "key": "IA ",
                "value": 438.26
            },
            {
                "key": "IB ",
                "value": 428.62
            },
            {
                "key": "IIA ",
                "value": 419.26
            },
            {
                "key": "IIB ",
                "value": 408.96
            },
            {
                "key": "IIIA ",
                "value": 386.98
            },
            {
                "key": "IIIB ",
                "value": 0
            },
            {
                "key": "IV ",
                "value": 399.78
            },
            {
                "key": "VA ",
                "value": 361.97
            },
            {
                "key": "VB ",
                "value": 0
            }
        ]
    },
    {
        "group": "I-2 Institutional, nursing homes",
        "values": [
            {
                "key": "IA ",
                "value": 304.86
            },
            {
                "key": "IB ",
                "value": 295.22
            },
            {
                "key": "IIA ",
                "value": 285.86
            },
            {
                "key": "IIB ",
                "value": 275.55
            },
            {
                "key": "IIIA ",
                "value": 256.23
            },
            {
                "key": "IIIB ",
                "value": 0
            },
            {
                "key": "IV ",
                "value": 266.37
            },
            {
                "key": "VA ",
                "value": 231.21
            },
            {
                "key": "VB ",
                "value": 0
            }
        ]
    },
    {
        "group": "I-3 Institutional, restrained",
        "values": [
            {
                "key": "IA ",
                "value": 298.67
            },
            {
                "key": "IB ",
                "value": 289.02
            },
            {
                "key": "IIA ",
                "value": 279.66
            },
            {
                "key": "IIB ",
                "value": 269.36
            },
            {
                "key": "IIIA ",
                "value": 250.3
            },
            {
                "key": "IIIB ",
                "value": 240.95
            },
            {
                "key": "IV ",
                "value": 260.18
            },
            {
                "key": "VA ",
                "value": 225.29
            },
            {
                "key": "VB ",
                "value": 214.8
            }
        ]
    },
    {
        "group": "I-4 Institutional, day care facilities",
        "values": [
            {
                "key": "IA ",
                "value": 264.93
            },
            {
                "key": "IB ",
                "value": 255.57
            },
            {
                "key": "IIA ",
                "value": 246.84
            },
            {
                "key": "IIB ",
                "value": 238.11
            },
            {
                "key": "IIIA ",
                "value": 217.64
            },
            {
                "key": "IIIB ",
                "value": 211.63
            },
            {
                "key": "IV ",
                "value": 238.15
            },
            {
                "key": "VA ",
                "value": 195.82
            },
            {
                "key": "VB ",
                "value": 189.67
            }
        ]
    },
    {
        "group": "M Mercantile",
        "values": [
            {
                "key": "IA ",
                "value": 205.22
            },
            {
                "key": "IB ",
                "value": 197.06
            },
            {
                "key": "IIA ",
                "value": 188.47
            },
            {
                "key": "IIB ",
                "value": 180.67
            },
            {
                "key": "IIIA ",
                "value": 164.83
            },
            {
                "key": "IIIB ",
                "value": 159.13
            },
            {
                "key": "IV ",
                "value": 171.67
            },
            {
                "key": "VA ",
                "value": 143.44
            },
            {
                "key": "VB ",
                "value": 137.53
            }
        ]
    },
    {
        "group": "R-1 Residential, hotels",
        "values": [
            {
                "key": "IA ",
                "value": 267.42
            },
            {
                "key": "IB ",
                "value": 258.06
            },
            {
                "key": "IIA ",
                "value": 249.33
            },
            {
                "key": "IIB ",
                "value": 240.6
            },
            {
                "key": "IIIA ",
                "value": 220.62
            },
            {
                "key": "IIIB ",
                "value": 214.6
            },
            {
                "key": "IV ",
                "value": 240.64
            },
            {
                "key": "VA ",
                "value": 198.79
            },
            {
                "key": "VB ",
                "value": 192.64
            }
        ]
    },
    {
        "group": "R-2 Residential, multiple family",
        "values": [
            {
                "key": "IA ",
                "value": 223.61
            },
            {
                "key": "IB ",
                "value": 214.25
            },
            {
                "key": "IIA ",
                "value": 205.52
            },
            {
                "key": "IIB ",
                "value": 196.79
            },
            {
                "key": "IIIA ",
                "value": 177.77
            },
            {
                "key": "IIIB ",
                "value": 171.76
            },
            {
                "key": "IV ",
                "value": 196.82
            },
            {
                "key": "VA ",
                "value": 155.95
            },
            {
                "key": "VB ",
                "value": 149.8
            }
        ]
    },
    {
        "group": "R-3 Residential, one- and two-family dwelling",
        "values": [
            {
                "key": "IA ",
                "value": 211.77
            },
            {
                "key": "IB ",
                "value": 205.84
            },
            {
                "key": "IIA ",
                "value": 200.99
            },
            {
                "key": "IIB ",
                "value": 197.13
            },
            {
                "key": "IIIA ",
                "value": 190.36
            },
            {
                "key": "IIIB ",
                "value": 183.32
            },
            {
                "key": "IV ",
                "value": 193.75
            },
            {
                "key": "VA ",
                "value": 177.67
            },
            {
                "key": "VB ",
                "value": 167.37
            }
        ]
    },
    {
        "group": "R-4 Residential, care/assisted living facilities",
        "values": [
            {
                "key": "IA ",
                "value": 264.93
            },
            {
                "key": "IB ",
                "value": 255.57
            },
            {
                "key": "IIA ",
                "value": 246.84
            },
            {
                "key": "IIB ",
                "value": 238.11
            },
            {
                "key": "IIIA ",
                "value": 217.64
            },
            {
                "key": "IIIB ",
                "value": 211.63
            },
            {
                "key": "IV ",
                "value": 238.15
            },
            {
                "key": "VA ",
                "value": 195.82
            },
            {
                "key": "VB ",
                "value": 189.67
            }
        ]
    },
    {
        "group": "S-1 Storage, moderate hazard",
        "values": [
            {
                "key": "IA ",
                "value": 149.85
            },
            {
                "key": "IB ",
                "value": 142.36
            },
            {
                "key": "IIA ",
                "value": 132.84
            },
            {
                "key": "IIB ",
                "value": 128.08
            },
            {
                "key": "IIIA ",
                "value": 113.17
            },
            {
                "key": "IIIB ",
                "value": 106.96
            },
            {
                "key": "IV ",
                "value": 121.87
            },
            {
                "key": "VA ",
                "value": 91.86
            },
            {
                "key": "VB ",
                "value": 85.28
            }
        ]
    },
    {
        "group": "S-2 Storage, low hazard",
        "values": [
            {
                "key": "IA ",
                "value": 148.85
            },
            {
                "key": "IB ",
                "value": 141.36
            },
            {
                "key": "IIA ",
                "value": 132.84
            },
            {
                "key": "IIB ",
                "value": 127.08
            },
            {
                "key": "IIIA ",
                "value": 113.17
            },
            {
                "key": "IIIB ",
                "value": 105.96
            },
            {
                "key": "IV ",
                "value": 120.87
            },
            {
                "key": "VA ",
                "value": 91.86
            },
            {
                "key": "VB ",
                "value": 84.28
            }
        ]
    },
    {
        "group": "U Utility, miscellaneous",
        "values": [
            {
                "key": "IA ",
                "value": 115.48
            },
            {
                "key": "IB ",
                "value": 108.95
            },
            {
                "key": "IIA ",
                "value": 102.64
            },
            {
                "key": "IIB ",
                "value": 98.13
            },
            {
                "key": "IIIA ",
                "value": 88.49
            },
            {
                "key": "IIIB ",
                "value": 81.89
            },
            {
                "key": "IV ",
                "value": 93.86
            },
            {
                "key": "VA ",
                "value": 69.76
            },
            {
                "key": "VB ",
                "value": 66.48
            }
        ]
    }
]