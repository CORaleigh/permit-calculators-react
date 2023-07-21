import { useEffect, useRef, useState } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-block";

import {
  CalciteBlock,
  CalciteCard,
  CalciteCheckbox,
  CalciteInput,
  CalciteLabel,
} from "@esri/calcite-components-react";
import { fees, sections } from "./assets/stormwaterConfig";
import { dollar } from "./assets/config";
import "./Stormwater.css";
function Stormwater() {
  const [blocks, setBlocks] = useState(window.localStorage.getItem('stormwaterBlocks') ? JSON.parse(window.localStorage.getItem('stormwaterBlocks')) : sections);
  const [feeBlocks, setFeeBlocks] = useState(window.localStorage.getItem('stormwaterFeeBlocks') ? JSON.parse(window.localStorage.getItem('stormwaterFeeBlocks')) : fees);

  const [total, setTotal] = useState(0);
  const blockToggled = (e, block) => {
    setBlocks(
      blocks.map((old) =>
        old.name === block.name
          ? {
              ...old,
              selected: e.target.checked,
              total: e.target.checked ? block.trueValue : block.falseValue,
            }
          : old
      )
    );
  };
  const feeBlockToggled = (e, block) => {
    setFeeBlocks(
      feeBlocks.map((old) =>
        old.name === block.name ? { ...old, selected: e.target.checked } : old
      )
    );
  };
  const feeInputChanged = (e, block) => {
    let subfees;
    let total = 0;
    if (block.subfees) {
      subfees = block.subfees.map((subfee) => {
        return { ...subfee, total: subfee.multiplier * e.target.value };
      });
      block.subfees.forEach((subfee) => (total += subfee.total));
    } else {
      total = e.target.value * block.multiplier;
    }
    console.log(subfees);
    setFeeBlocks(
      feeBlocks.map((old) =>
        old.name === block.name
          ? { ...old, total: total, value: e.target.value, subfees: subfees }
          : old
      )
    );
  };
  useEffect(() => {
    let total = 0;
    blocks.forEach((block) => (total += block.total));
    feeBlocks.forEach((block) => (total += block.total));
    setTotal(total);
  }, [blocks, feeBlocks]);
  useEffect(() => {
    window.localStorage.setItem('stormwaterBlocks', JSON.stringify(blocks));
    window.localStorage.setItem('stormwaterFeeBlocks', JSON.stringify(feeBlocks));

  }, [blocks, feeBlocks]);  
  return (
    <div id="stormwater">
      <CalciteCard>
        <span slot="title">Stormwater Fee Calculator</span>
        {feeBlocks.map((block, i) => (
          <CalciteBlock
            key={`stormwater-fee-section-${i}`}
            heading={block.name}
            open={block.selected}
          >
            <CalciteCheckbox
              slot="icon"
              checked={block.selected ? true : undefined}
              onCalciteCheckboxChange={(e) => feeBlockToggled(e, block)}
            ></CalciteCheckbox>
            <div slot="control">{dollar.format(block.total)}</div>
            <div>
              <CalciteInput
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
          <CalciteBlock key={`stormwater-section-${i}`} heading={block.name}>
            <CalciteCheckbox
              slot="icon"
              checked={block.selected ? true : undefined}
              onCalciteCheckboxChange={(e) => blockToggled(e, block)}
            ></CalciteCheckbox>
            <div slot="control">{dollar.format(block.total)}</div>
          </CalciteBlock>
        ))}
        <CalciteLabel slot="subtitle">Total {dollar.format(total)}</CalciteLabel>
      </CalciteCard>
    </div>
  );
}

export default Stormwater;
