import { useEffect, useRef, useState } from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-input";

import {
  CalciteCard,
  CalciteCheckbox,
  CalciteInput,
  CalciteLabel,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs,
} from "@esri/calcite-components-react";
import React from "react";
import { dollar } from "./assets/config";
import "./Water.css";
import { infrastructureFees } from "./assets/waterConfig";
function Water({ totalUpdated }) {
  const [infrastructure, setInfrastructure] = useState(infrastructureFees);
  const inRaleighChanged = e => {
    setInfrastructure({...infrastructure, inRaleigh: e.target.checked});
  }
  const pumpStationChanged = e => {
    const updatedFees = infrastructure.fees.map((fee) =>
    fee.title === 'Pump Station Review'
      ? {
          ...fee,
          fee: e.target.checked ? fee.unitCost : 0,
        }
      : fee.title === 'Pump Station Inspection' ?
      {
        ...fee,
        fee: e.target.checked ? fee.unitCost : 0
      } :
      fee
  );
    setInfrastructure({...infrastructure, pumpStation: e.target.checked, fees: updatedFees});
  }  
  const infrastructureInputChanged = (e, input) => {
    let updatedFees;

    if (input.label === 'Public Water') {
      updatedFees = infrastructure.fees.map(fee => fee.title === 'Public Water Review'
      ? {
        ...fee,
        fee: parseInt(e.target.value) > 0 ? fee.unitCost : 0
      } :
      fee.title === 'Water Inspection' ?
      {
        ...fee,
        fee: parseInt(e.target.value) * fee.unitCost
      } : fee
      )
    }
    if (input.label === 'Public Reuse') {
      updatedFees = infrastructure.fees.map(fee => fee.title === 'Public Reuse Review'
      ? {
        ...fee,
        fee: parseInt(e.target.value) > 0 ? fee.unitCost : 0
      } :
      fee.title === 'Reuse Inspection' ?
      {
        ...fee,
        fee: parseInt(e.target.value) * fee.unitCost
      } : fee
      )
    }    
    const updatedInputs = infrastructure.inputs.map((old) =>
    old.label === input.label
      ? {
          ...old,
          value: parseInt(e.target.value),
        }: old);
    setInfrastructure({...infrastructure, inputs: updatedInputs, fees: updatedFees});

  }
  return (
    <div id="water">
      <CalciteCard>
        <span slot="title">Water Utility Fee Calculator</span>
        <CalciteTabs>
          <CalciteTabNav  slot="title-group"  >
            <CalciteTabTitle>
              Infrastructure Fees
            </CalciteTabTitle>
            <CalciteTabTitle>
              Capital Fees
            </CalciteTabTitle>            
          </CalciteTabNav>
            <CalciteTab>
              <CalciteLabel layout="inline">
              Project in Raleigh?

                <CalciteCheckbox checked={infrastructure.inRaleigh ? true : undefined}
                onCalciteCheckboxChange={inRaleighChanged}
                ></CalciteCheckbox>
              </CalciteLabel>
              
              {infrastructure.inputs.map((input, i) => 
                <CalciteLabel key={`infrastructure-input${i}`}  hidden={!infrastructure.inRaleigh && input.units === 'stubs'}>
                  {input.label}
                  <CalciteInput type="number" value={input.value} onCalciteInputInput={e => infrastructureInputChanged(e, input)}></CalciteInput>
                </CalciteLabel>
              )}
              <CalciteLabel layout="inline">
              Pump Station?

                <CalciteCheckbox checked={infrastructure.pumpStation ? true : undefined}
                onCalciteCheckboxChange={pumpStationChanged}
                ></CalciteCheckbox>
              </CalciteLabel>              
            </CalciteTab>
            <CalciteTab>
             
            </CalciteTab>            
        </CalciteTabs>     
        {JSON.stringify(infrastructure)}   
      </CalciteCard>
    </div>
  );
}

export default React.memo(Water);
