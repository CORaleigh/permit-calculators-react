export const tfCategories = [
  {
    category: 'Residential', selected: true, landuses: [
      {
        category: 'Residential', landuse: 'Single Family', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, thresholds: [
          { min: 0, max: 999, per: 1790, label: '# of units less than 1,000 sq. ft.', value: null, total: 0 },
          { min: 1000, max: 1999, per: 2128, label: '# of units 1,000 – 1,999 sq. ft.', value: null, total: 0 },
          { min: 2000, max: 2999, per: 2360, label: '# of units 2,000 – 2,999 sq. ft.', value: null, total: 0 },
          { min: 3000, max: 3999, per: 2539, label: '# of units 3,000 – 3,999 sq. ft.', value: null, total: 0 },
          { min: 4000, max: 4999, per: 2680, label: '# of units 4,000 – 4,999 sq. ft.', value: null, total: 0 },
          { min: 5000, max: null, per: 2867, label: '# of units greater than 5,000 sq. ft.', value: null, total: 0 },
        ]
      },
      { category: 'Residential', landuse: 'Multi-Family', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, per: 1578 },
      { category: 'Residential', landuse: 'Group Living, Social Service', measure: 'unit', label: '# of units', selected: false, value: null, total: 0, per: 662 }
    ]
  },
  {
    category: 'Commercial', selected: false, landuses: [
      { category: "Commercial", landuse: "Hotel/Motel", measure: "unit", label: "Rooms", selected: false, value: null, total: 0, per: 2251 },
      { category: "Commercial", landuse: "Retail/Commercial", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 3831.51 },
      { category: "Commercial", landuse: "Retail uses that include the sale of motor fuels to public", measure: "unit", label: "Fueling Stations", selected: false, value: null, total: 0, per: 8510.52 },
      { category: "Commercial", landuse: "Office", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 2921.26 },
      { category: "Commercial", landuse: "Industrial/manufacturing/agricultural", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 1846.51 },
      { category: "Commercial", landuse: "Warehouse", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 1061.74 },
      { category: "Commercial", landuse: "Mini warehousing", measure: "area", label: "Gross Floor Area (sq. ft.)", selected: false, value: null, total: 0, per: 536.19 }
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
        per: 1473.65
      },
      {
        category: "Public/Institutional",
        landuse: "Elementary,Middle and High Schools",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 537.39
      },
      {
        category: "Public/Institutional",
        landuse: "College/University",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 5879.25
      },
      {
        category: "Public/Institutional",
        landuse: "Daycare facilities",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 4065.88
      },
      {
        category: "Public/Institutional",
        landuse: "Hospitals/medical care facilities",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 4664.81
      },
      {
        category: "Public/Institutional",
        landuse: "Nursing Home/Group Quarters",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 1311.50
      },
      {
        category: "Public/Institutional",
        landuse: "Cemetery",
        measure: "unit",
        label: "Acres",
        selected: false,
        value: null,
        total: 0,
        per: 1013.21
      },
      {
        category: "Public/Institutional",
        landuse: "Passenger Transportation facility",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 1061.74
      },
      {
        category: "Public/Institutional",
        landuse: "Emergency Service facility",
        measure: "area",
        label: "Gross Floor Area (sq. ft.)",
        selected: false,
        value: null,
        total: 0,
        per: 1061.74
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
        per: 7642.89
      },
      {
        category: "Recreational",
        landuse: "Public parks",
        measure: "unit",
        label: "Acres",
        selected: false,
        value: null,
        total: 0,
        per: 344.44
      },
      {
        category: "Recreational",
        landuse: "Stadiums/coliseums/race tracks",
        measure: "unit",
        label: "Seats",
        selected: false,
        value: null,
        total: 0,
        per: 132.57
      },
      {
        category: "Recreational",
        landuse: "General recreation/all other",
        measure: "unit",
        label: "Parking Spaces",
        selected: false,
        value: null,
        total: 0,
        per: 358.65
      }
    ]
  }
];
