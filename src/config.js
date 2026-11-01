export const dollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
// calcite-input expects a string value; numbers, null, and NaN would throw
export const inputValue = (value) => (value == null || Number.isNaN(value) ? "" : String(value));

export const addressLocator = {
  url: "https://maps.raleighnc.gov/arcgis/rest/services/Locators/Locator/GeocodeServer",
  singleLineFieldName: "SingleLine",
  name: "Search by Address",
  placeholder: "Search by Address",
};

export const mapPopup = {
  dockEnabled: true,
  dockOptions: {
    // Disables the dock button from the popup
    buttonEnabled: false,
    // Ignore the default sizes that trigger responsive docking
    breakpoint: false,
    position: "top-right",
  },
};
