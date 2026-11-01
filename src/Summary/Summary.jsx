import React, { useState } from "react";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-label";

import { dollar } from "../config";
import './Summary.css'
function Summary() {
  const [totals, setTotals] = useState(window.localStorage.getItem('permit-calculator-totals') ? JSON.parse(window.localStorage.getItem('permit-calculator-totals')) : {  openspace: 0,
    building: 0,
    stormwater: 0,
    thoroughfare: 0,
    rightofway: 0,
    total: 0
  });
  return <div id="summary">
    <calcite-card>
      <span slot="heading">Summary</span>
      <calcite-label>
        Building Permit Fees
        <div>{dollar.format(totals.building)}</div>
      </calcite-label>
      <calcite-label>
        Stormwater Fees
        <div>{dollar.format(totals.stormwater)}</div>
      </calcite-label>      
      <calcite-label>
        Open Space Fees
        <div>{dollar.format(totals.openspace)}</div>
      </calcite-label>         
      <calcite-label>
        Thoroughfare Fees
        <div>{dollar.format(totals.thoroughfare)}</div>
      </calcite-label>          
      <calcite-label>
        Right of Way Occupancy Fees
        <div>{dollar.format(totals.rightofway)}</div>
      </calcite-label>             
      <calcite-label className="summary-total">
        Total Estimated Fees
        <div>{dollar.format(totals.total)}</div>
      </calcite-label>     
    </calcite-card>
  </div>;
}

export default React.memo(Summary);
