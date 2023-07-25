import React from "react";

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

import { dollar } from "../config";
import "./Water.css";
import useWater from "./useWater";
function Water({ totalUpdated }) {
  const {
    infrastructure,
    capital,
    inRaleighChanged,
    infrastructureInputChanged,
    sizeUpdated,
    pumpStationChanged
  } = useWater({ totalUpdated });
  return (
    <div id="water">
      <CalciteCard>
        <span slot="title">Water Utility Fee Calculator</span>
        <CalciteLabel slot="subtitle">
          Total {dollar.format(infrastructure.total + capital.total)}
        </CalciteLabel>
        <CalciteTabs>
          <CalciteTabNav slot="title-group">
            <CalciteTabTitle>Infrastructure Fees</CalciteTabTitle>
            <CalciteTabTitle>Capital Fees</CalciteTabTitle>
          </CalciteTabNav>
          <CalciteTab>
            <CalciteLabel>
              {`Infrastructure Fees Total ${dollar.format(
                infrastructure.total
              )}`}
            </CalciteLabel>
            <CalciteLabel layout="inline">
              Project in Raleigh?
              <CalciteCheckbox
                checked={infrastructure.inRaleigh ? true : undefined}
                onCalciteCheckboxChange={inRaleighChanged}
              ></CalciteCheckbox>
            </CalciteLabel>

            {infrastructure.inputs.map((input, i) => (
              <CalciteLabel
                key={`infrastructure-input${i}`}
                hidden={infrastructure.inRaleigh && input.units === "stubs"}
              >
                {input.label}
                <CalciteInput
                  suffixText={input.units}
                  type="number"
                  min={0}
                  value={input.value}
                  onCalciteInputInput={(e) =>
                    infrastructureInputChanged(
                      e.target.value,
                      input,
                      infrastructure.inRaleigh
                    )
                  }
                ></CalciteInput>
              </CalciteLabel>
            ))}
            <CalciteLabel layout="inline">
              Pump Station?
              <CalciteCheckbox
                checked={infrastructure.pumpStation ? true : undefined}
                onCalciteCheckboxChange={pumpStationChanged}
              ></CalciteCheckbox>
            </CalciteLabel>
            <div className="water-infrastructure-totals">
              <div className="water-infrastructure-total">
                <h3>Plan Review Fees</h3>
                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Plan Review Fees" && (
                      <CalciteLabel key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </CalciteLabel>
                    )
                  );
                })}
              </div>
              <div className="water-infrastructure-total">
                <h3>Inspection Fees</h3>

                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Inspections Fees" && (
                      <CalciteLabel key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </CalciteLabel>
                    )
                  );
                })}
              </div>
              <div className="water-infrastructure-total">
                <h3>Stub Fees</h3>

                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Stub Fees" && (
                      <CalciteLabel key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </CalciteLabel>
                    )
                  );
                })}
              </div>
            </div>
          </CalciteTab>
          <CalciteTab>
            <CalciteLabel>
              {`Capital Fees Total ${dollar.format(capital.total)}`}
            </CalciteLabel>
            {capital.meterSizes.map((size) => (
              <div key={size.size}>
                <div>{size.size} Meters</div>
                <div className="size-inputs">
                  {size.utilities.map((utility) => {
                    return (
                      <CalciteLabel key={`${size.size}-${utility.type}`}>
                        {utility.label}
                        <CalciteInput
                          onCalciteInputInput={(e) =>
                            sizeUpdated(e, size, utility)
                          }
                          suffixText="meters"
                          type="number"
                          min={0}
                          value={utility.units}
                        ></CalciteInput>
                      </CalciteLabel>
                    );
                  })}
                </div>
              </div>
            ))}
          </CalciteTab>
        </CalciteTabs>
      </CalciteCard>
    </div>
  );
}

export default React.memo(Water);
