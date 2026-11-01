import React from "react";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-block";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";

import { dollar, inputValue } from "../config";
import "./Stormwater.css";
import useStormwater from "./useStormwater";

function Stormwater({ totalUpdated }) {
  const {
    blocks,
    feeBlocks,
    total,
    blockToggled,
    headingClicked,
    feeHeadingClicked,
    feeBlockToggled,
    feeInputChanged,
  } = useStormwater({ totalUpdated });
  return (
    <div id="stormwater">
      <calcite-card>
        <span slot="heading">Stormwater Fee Calculator</span>
        {feeBlocks.map((block, i) => (
          <calcite-block
            expandable
            oncalciteBlockToggle={() => feeHeadingClicked(block)}
            key={`stormwater-fee-section-${i}`}
            heading={block.name}
            expanded={block.selected}
          >
            <calcite-checkbox
              slot="content-start"
              checked={block.selected ? true : undefined}
              oncalciteCheckboxChange={(e) => feeBlockToggled(e, block)}
            ></calcite-checkbox>

            <div slot="content-end" className="stormwater-total">
              {dollar.format(block.total)}
            </div>
            {block.url && (
              <a href={block.url} target="_blank" rel="noreferrer" slot="actions-end">
                <calcite-action
                  text="Information"
                  icon="information"
                ></calcite-action>
              </a>
            )}
            <div>
            <calcite-label>
            {block.label}
            
              <calcite-input
                type="number"
                min={0}
                scale="l"
                value={inputValue(block.value)}
                placeholder={block.label}
                oncalciteInputInput={(e) => feeInputChanged(e, block)}
              ></calcite-input>
          </calcite-label>  
              {block.subfees &&
                block.subfees.map((subfee) => (
                  <div key={subfee.name}>
                    {subfee.name} {dollar.format(subfee.total)}
                  </div>
                ))}
            </div>
          </calcite-block>
        ))}
        {blocks.map((block, i) => (
          <calcite-block
            expandable
            key={`stormwater-section-${i}`}
            heading={block.name}
            oncalciteBlockToggle={() => headingClicked(block)}
          >
            <calcite-checkbox
              slot="content-start"
              checked={block.selected ? true : undefined}
              oncalciteCheckboxChange={(e) => blockToggled(e, block)}
            ></calcite-checkbox>
            <div slot="content-end" className="stormwater-total">
              {dollar.format(block.total)}
            </div>
            {block.url && (
              <a href={block.url} target="_blank" rel="noreferrer" slot="actions-end">
                <calcite-action
                  text="Information"
                  icon="information"
                ></calcite-action>
              </a>
            )}
          </calcite-block>
        ))}
        <calcite-label slot="description">
          Total {dollar.format(total)}
        </calcite-label>
      </calcite-card>
    </div>
  );
}

const MemoizedStormwater = React.memo(Stormwater);
export default MemoizedStormwater;
