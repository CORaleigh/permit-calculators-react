import React from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-action";

import {
  CalciteBlock,
  CalciteCard,
  CalciteCheckbox,
  CalciteInput,
  CalciteLabel,
  CalciteAction,
} from "@esri/calcite-components-react";
import { dollar } from "../config";
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
      <CalciteCard>
        <span slot="title">Stormwater Fee Calculator</span>
        {feeBlocks.map((block, i) => (
          <CalciteBlock
            collapsible
            onCalciteBlockToggle={() => feeHeadingClicked(block)}
            key={`stormwater-fee-section-${i}`}
            heading={block.name}
            open={block.selected}
          >
            <CalciteCheckbox
              slot="icon"
              checked={block.selected ? true : undefined}
              onCalciteCheckboxChange={(e) => feeBlockToggled(e, block)}
            ></CalciteCheckbox>

            <div slot="control" className="stormwater-total">
              {dollar.format(block.total)}
            </div>
            {block.url && (
              <a href={block.url} target="_blank" slot="control">
                <CalciteAction
                  text="Information"
                  icon="information"
                ></CalciteAction>
              </a>
            )}
            <div>
              <CalciteInput
                type="number"
                min={0}
                scale="l"
                value={block.value}
                placeholder={block.label}
                onCalciteInputInput={(e) => feeInputChanged(e, block)}
              ></CalciteInput>
              {block.subfees &&
                block.subfees.map((subfee) => (
                  <div key={subfee.name}>
                    {subfee.name} {dollar.format(subfee.total)}
                  </div>
                ))}
            </div>
          </CalciteBlock>
        ))}
        {blocks.map((block, i) => (
          <CalciteBlock
            collapsible
            key={`stormwater-section-${i}`}
            heading={block.name}
            onCalciteBlockToggle={() => headingClicked(block)}
          >
            <CalciteCheckbox
              slot="icon"
              checked={block.selected ? true : undefined}
              onCalciteCheckboxChange={(e) => blockToggled(e, block)}
            ></CalciteCheckbox>
            <div slot="control" className="stormwater-total">
              {dollar.format(block.total)}
            </div>
            {block.url && (
              <a href={block.url} target="_blank" slot="control">
                <CalciteAction
                  text="Information"
                  icon="information"
                ></CalciteAction>
              </a>
            )}
          </CalciteBlock>
        ))}
        <CalciteLabel slot="subtitle">
          Total {dollar.format(total)}
        </CalciteLabel>
      </CalciteCard>
    </div>
  );
}

export default React.memo(Stormwater);
