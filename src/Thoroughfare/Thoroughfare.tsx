import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import "@esri/calcite-components/dist/components/calcite-label";

import {
  CalciteBlock,
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
import "./Thoroughfare.css";
import useThoroughfare from "./useThoroughfare";
function Thoroughfare({ totalUpdated }) {
  const {
    categories,
    total,
    blockToggled,
    checkboxChanged,
    landuseInputChanged,
    thresholdInputChange,
    tabChanged,
  } = useThoroughfare({ totalUpdated });
  return (
    <div id="thoroughfare">
      <CalciteCard>
        <span slot="title">Thoroughfare Fee Calculator</span>
        <CalciteTabs scale="l">
          <CalciteTabNav slot="title-group" onCalciteTabChange={tabChanged}>
            {categories.map((category, i) => (
              <CalciteTabTitle
                key={`tab-title-${i}`}
                selected={category.selected}
              >
                {category.category}
              </CalciteTabTitle>
            ))}
          </CalciteTabNav>
          {categories.map((category, i) => (
            <CalciteTab
              key={`tab-${i}`}
              selected={category.selected ? true : undefined}
            >
              {category.landuses &&
                category.landuses.map((landuse, j) => (
                  <CalciteBlock
                    key={`landuse-block-${i}-${j}`}
                    heading={landuse.landuse}
                    open={landuse.selected}
                    onCalciteBlockToggle={(e) => blockToggled(e, landuse)}
                    collapsible
                  >
                    <CalciteCheckbox
                      scale="l"
                      key={`landuse-checkbox-${i}-${j}`}
                      slot="icon"
                      checked={landuse.selected ? true : undefined}
                      onCalciteCheckboxChange={(e) =>
                        checkboxChanged(e, landuse)
                      }
                    ></CalciteCheckbox>
                    {landuse.thresholds &&
                      landuse.thresholds.map((threshold, k) => (
                        <CalciteInput
                          min={0}
                          scale="l"
                          value={threshold.value}
                          key={`landuse-input-${i}-${j}-${k}`}
                          placeholder={threshold.label}
                          type="number"
                          onCalciteInputInput={(e) =>
                            thresholdInputChange(e, threshold, landuse)
                          }
                        ></CalciteInput>
                      ))}
                    {!landuse.thresholds && (
                      <CalciteInput
                        type="number"
                        min={0}
                        scale="l"
                        value={landuse.value}
                        placeholder={landuse.label}
                        onCalciteInputInput={(e) =>
                          landuseInputChanged(e, landuse)
                        }
                      ></CalciteInput>
                    )}

                    <div slot="control" className="block-control">
                      {dollar.format(landuse.total)}
                    </div>
                  </CalciteBlock>
                ))}
            </CalciteTab>
          ))}
        </CalciteTabs>
        <CalciteLabel slot="subtitle">
          Total {dollar.format(total)}
        </CalciteLabel>
      </CalciteCard>
    </div>
  );
}

export default React.memo(Thoroughfare);
