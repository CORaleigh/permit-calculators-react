export const tfCategories = [
    {
        category: 'Residential', selected: true, landuses: [
            {
                category: 'Residential', landuse: 'Single Family', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, thresholds: [
                    { min: 0, max: 999, per: 1762, label: '# of units less than 1,000 sq. ft.', value: null, total: 0 },
                    { min: 1000, max: 999, per: 2094, label: '# of units 1,000 – 1,999 sq. ft.', value: null, total: 0 },
                    { min: 2000, max: 1999, per: 2323, label: '# of units 2,000 – 2,999 sq. ft.', value: null, total: 0 },
                    { min: 3000, max: 2999, per: 2499, label: '# of units 3,000 – 3,999 sq. ft.', value: null, total: 0 },
                    { min: 4000, max: 3999, per: 2638, label: '# of units 4,000 – 4,999 sq. ft..', value: null, total: 0 },
                    { min: 5000, max: null, per: 2822, label: '# of units greater than 5,000 sq. ft.', value: null, total: 0 },
                ]
            },
            { category: 'Residential', landuse: 'Multi-Family', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, per: 1553 },
            { category: 'Residential', landuse: 'Group Living, Social Service', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, per: 652 }
        ]
    },
    {
        category: 'Commercial', selected: false, landuses: [
            { category: "Commercial", landuse: "Hotel/Motel", measure: "unit", label: "Rooms", selected: false, value: null, total: 0, per: 2216 },
            { category: "Commercial", landuse: "Retail/Commercial", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 3771.17 },
            { category: "Commercial", landuse: "Retail uses that include the sale of motor fuels to public", measure: "unit", label: "Fueling Stations", selected: false, value: null, total: 0, per: 8376.50 },
            { category: "Commercial", landuse: "Office", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 2875.26 },
            { category: "Commercial", landuse: "Industrial/manufacturing/agricultural", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 1817.42 },
            { category: "Commercial", landuse: "Warehouse", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 1045.02 },
            { category: "Commercial", landuse: "Mini warehousing", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 527.75 }
        ]
    },
    {
        category: 'Public/Institutional', selected: false, landuses: [
            {
                category: "Public/Institutional",
                landuse: "Churches/Synagogues",
                measure: "area",
                label: "Square Feet",
                selected: false,
                value: null,
                total: 0,
                per: 1450.44
            },
            {
                category: "Public/Institutional",
                landuse: "Elementary,Middle and High Schools",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 528.93
            },
            {
                category: "Public/Institutional",
                landuse: "College/University",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 5786.66
            },
            {
                category: "Public/Institutional",
                landuse: "Daycare facilities",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 4001.85
            },
            {
                category: "Public/Institutional",
                landuse: "Hospitals/medical care facilities",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 4591.35
            },
            {
                category: "Public/Institutional",
                landuse: "Nursing Home/Group Quarters",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 1290.85
            },
            {
                category: "Public/Institutional",
                landuse: "Cemetery",
                measure: "unit",
                label: "Acres",
                selected: false,
                value: null,
                total: 0,
                per: 997.25
            },
            {
                category: "Public/Institutional",
                landuse: "Passenger Transportation facility",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 1045.02
            },
            {
                category: "Public/Institutional",
                landuse: "Emergency Service facility",
                measure: "area",
                label: "Gross Floor Area (sq. ft.)",
                selected: false,
                value: null,
                total: 0,
                per: 1045.02
            }
        ]
    },
    {
        category: 'Recreational', selected: false, landuses: [
            {
                category: "Recreational",
                landuse: "Golf course",
                measure: "unit",
                label: "Holes",
                selected: false,
                value: null,
                total: 0,
                per: 7552.53
            },
            {
                category: "Recreational",
                landuse: "Public parks",
                measure: "unit",
                label: "Acres",
                selected: false,
                value: null,
                total: 0,
                per: 339.02
            },
            {
                category: "Recreational",
                landuse: "Stadiums/coliseums/race tracks",
                measure: "unit",
                label: "Seats",
                selected: false,
                value: null,
                total: 0,
                per: 130.48
            },
            {
                category: "Recreational",
                landuse: "General recreation/all other",
                measure: "unit",
                label: "Parking Spaces",
                selected: false,
                value: null,
                total: 0,
                per: 353.00
            }
        ]
    }
]