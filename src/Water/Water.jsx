import React from "react";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";

import { dollar, inputValue } from "../config";
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
      <calcite-card>
        <span slot="heading">Water Utility Fee Calculator</span>
        <calcite-label slot="description">
          Total {dollar.format(infrastructure.total + capital.total)}
        </calcite-label>
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title>Infrastructure Fees</calcite-tab-title>
            <calcite-tab-title>Capital Fees</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab>
            <calcite-label>
              {`Infrastructure Fees Total ${dollar.format(
                infrastructure.total
              )}`}
            </calcite-label>
            <calcite-label layout="inline">
              Project in Raleigh?
              <calcite-checkbox
                checked={infrastructure.inRaleigh ? true : undefined}
                oncalciteCheckboxChange={inRaleighChanged}
              ></calcite-checkbox>
            </calcite-label>

            {infrastructure.inputs.map((input, i) => (
              <calcite-label
                key={`infrastructure-input${i}`}
                hidden={infrastructure.inRaleigh && input.units === "stubs"}
              >
                {input.label}
                <calcite-input
                  suffixText={input.units}
                  type="number"
                  min={0}
                  value={inputValue(input.value)}
                  oncalciteInputInput={(e) =>
                    infrastructureInputChanged(
                      e.target.value,
                      input,
                      infrastructure.inRaleigh
                    )
                  }
                ></calcite-input>
              </calcite-label>
            ))}
            <calcite-label layout="inline">
              Pump Station?
              <calcite-checkbox
                checked={infrastructure.pumpStation ? true : undefined}
                oncalciteCheckboxChange={pumpStationChanged}
              ></calcite-checkbox>
            </calcite-label>
            <div className="water-infrastructure-totals">
              <div className="water-infrastructure-total">
                <h3>Plan Review Fees</h3>
                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Plan Review Fees" && (
                      <calcite-label key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </calcite-label>
                    )
                  );
                })}
              </div>
              <div className="water-infrastructure-total">
                <h3>Inspection Fees</h3>

                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Inspections Fees" && (
                      <calcite-label key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </calcite-label>
                    )
                  );
                })}
              </div>
              <div className="water-infrastructure-total">
                <h3>Stub Fees</h3>

                {infrastructure.fees.map((fee) => {
                  return (
                    fee.category === "Stub Fees" && (
                      <calcite-label key={fee.title}>
                        {fee.title}
                        <div>{dollar.format(fee.fee)}</div>
                      </calcite-label>
                    )
                  );
                })}
              </div>
            </div>
          </calcite-tab>
          <calcite-tab>
            <calcite-label>
              {`Capital Fees Total ${dollar.format(capital.total)}`}
            </calcite-label>
            {capital.meterSizes.map((size) => (
              <div key={size.size}>
                <div>{size.size} Meters</div>
                <div className="size-inputs">
                  {size.utilities.map((utility) => {
                    return (
                      <calcite-label key={`${size.size}-${utility.type}`}>
                        {utility.label}
                        <calcite-input
                          oncalciteInputInput={(e) =>
                            sizeUpdated(e, size, utility)
                          }
                          suffixText="meters"
                          type="number"
                          min={0}
                          value={inputValue(utility.units)}
                        ></calcite-input>
                      </calcite-label>
                    );
                  })}
                </div>
              </div>
            ))}
          </calcite-tab>
        </calcite-tabs>
      </calcite-card>
    </div>
  );
}

export default React.memo(Water);
