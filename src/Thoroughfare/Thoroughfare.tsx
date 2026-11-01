import React from "react";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-tab";
import "@esri/calcite-components/components/calcite-tab-nav";
import "@esri/calcite-components/components/calcite-tab-title";
import "@esri/calcite-components/components/calcite-tabs";

import { dollar, inputValue } from "../config";
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
      <calcite-card>
        <span slot="heading">Thoroughfare Fee Calculator</span>
        <calcite-tabs scale="l">
          <calcite-tab-nav slot="title-group" oncalciteTabChange={tabChanged}>
            {categories.map((category, i) => (
              <calcite-tab-title
                key={`tab-title-${i}`}
                selected={category.selected}
              >
                {category.category}
              </calcite-tab-title>
            ))}
          </calcite-tab-nav>
          {categories.map((category, i) => (
            <calcite-tab
              key={`tab-${i}`}
              selected={!!category.selected}
            >
              {category.landuses &&
                category.landuses.map((landuse, j) => (
                  <calcite-block
                    key={`landuse-block-${i}-${j}`}
                    heading={landuse.landuse}
                    expanded={landuse.selected}
                    oncalciteBlockExpand={(e) => !landuse.selected && blockToggled(e, landuse)}
                    oncalciteBlockCollapse={(e) => landuse.selected && blockToggled(e, landuse)}
                    expandable
                  >
                    <calcite-checkbox
                      scale="l"
                      key={`landuse-checkbox-${i}-${j}`}
                      slot="content-start"
                      checked={!!landuse.selected}
                      oncalciteCheckboxChange={(e) =>
                        checkboxChanged(e, landuse)
                      }
                    ></calcite-checkbox>
                    {landuse.thresholds &&
                      landuse.thresholds.map((threshold, k) => (
                        <calcite-input
                          min={0}
                          scale="l"
                          value={inputValue(threshold.value)}
                          key={`landuse-input-${i}-${j}-${k}`}
                          placeholder={threshold.label}
                          type="number"
                          oncalciteInputInput={(e) =>
                            thresholdInputChange(e, threshold, landuse)
                          }
                        ></calcite-input>
                      ))}
                    {!landuse.thresholds && (
                      <calcite-input
                        type="number"
                        min={0}
                        scale="l"
                        value={inputValue(landuse.value)}
                        placeholder={landuse.label}
                        oncalciteInputInput={(e) =>
                          landuseInputChanged(e, landuse)
                        }
                      ></calcite-input>
                    )}

                    <div slot="content-end" className="block-control">
                      {dollar.format(landuse.total)}
                    </div>
                  </calcite-block>
                ))}
            </calcite-tab>
          ))}
        </calcite-tabs>
        <calcite-label slot="description">
          Total {dollar.format(total)}
        </calcite-label>
      </calcite-card>
    </div>
  );
}

const MemoizedThoroughfare = React.memo(Thoroughfare);
export default MemoizedThoroughfare;
