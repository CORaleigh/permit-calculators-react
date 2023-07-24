import React, { useRef, useState } from "react";

import { dollar } from "./assets/config";
import { CalciteCard, CalciteLabel } from "@esri/calcite-components-react";
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
    <CalciteCard>
      <span slot="title">Summary</span>
      <CalciteLabel>
        Building Permit Fees
        <div>{dollar.format(totals.building)}</div>
      </CalciteLabel>
      <CalciteLabel>
        Stormwater Fees
        <div>{dollar.format(totals.stormwater)}</div>
      </CalciteLabel>      
      <CalciteLabel>
        Open Space Fees
        <div>{dollar.format(totals.openspace)}</div>
      </CalciteLabel>         
      <CalciteLabel>
        Thoroughfare Fees
        <div>{dollar.format(totals.thoroughfare)}</div>
      </CalciteLabel>          
      <CalciteLabel>
        Right of Way Occupancy Fees
        <div>{dollar.format(totals.rightofway)}</div>
      </CalciteLabel>             
      <CalciteLabel className="summary-total">
        Total Estimated Fees
        <div>{dollar.format(totals.total)}</div>
      </CalciteLabel>     
    </CalciteCard>
  </div>;
}

export default React.memo(Summary);
