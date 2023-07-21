import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-action";

import {
  CalciteBlock,
  CalciteCard,
  CalciteCheckbox,
  CalciteInput,
  CalciteLabel,
  CalciteAction
} from "@esri/calcite-components-react";
import { fees, sections } from "./assets/stormwaterConfig";
import { dollar } from "./assets/config";
import "./Stormwater.css";
function Stormwater(props) {
  const [blocks, setBlocks] = useState(window.localStorage.getItem('permit-calculators-stormwater-blocks') ? JSON.parse(window.localStorage.getItem('permit-calculators-stormwater-blocks')) : sections);
  const [feeBlocks, setFeeBlocks] = useState(window.localStorage.getItem('permit-calculators-stormwater-fee-blocks') ? JSON.parse(window.localStorage.getItem('permit-calculators-stormwater-fee-blocks')) : fees);

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
  const getTotal = (block) => {
    let total = 0
    if (block.subfees) {
      block.subfees.forEach((subfee) => {(total += subfee.total)});
    } else {
      total =  block.value * block.multiplier;
    }
    return total;
  }
  const feeBlockToggled = (e, block) => {
    setFeeBlocks(
      feeBlocks.map((old) =>
        old.name === block.name ? { ...old, selected: e.target.checked, total: e.target.checked ? getTotal(block) : 0 } : old
      )
    );
  };
  const feeInputChanged = (e, block) => {
    let subfees;
    let total = 0;
    if (block.subfees) {
      subfees = block.subfees.map((subfee) => {
        total += subfee.multiplier * e.target.value ;
        return { ...subfee, total: subfee.multiplier * e.target.value };
      });
     // block.subfees.forEach((subfee) => {(total += subfee.total);console.log(subfee.total)});
    } else {
      total = e.target.value * block.multiplier;
    }
    console.log(total);
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
    window.localStorage.setItem('permit-calculators-stormwater-blocks', JSON.stringify(blocks));
    window.localStorage.setItem('permit-calculators-stormwater-fee-blocks', JSON.stringify(feeBlocks));

  }, [blocks, feeBlocks]);  
  useEffect(() => {
    props.totalUpdated(total, 'stormwater');
  },[total])
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
            ></CalciteCheckbox >




            <div slot="control" className="stormwater-total">{dollar.format(block.total)}</div>
            {block.url && <a href={block.url} target="_blank" slot="control">
               <CalciteAction  text="Information" icon="information"></CalciteAction>                
              </a>}
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
            <div slot="control" className="stormwater-total">{dollar.format(block.total)}</div>
            {block.url && <a href={block.url} target="_blank" slot="control">
               <CalciteAction  text="Information" icon="information"></CalciteAction>                
              </a>  }          
          </CalciteBlock>
        ))}
        <CalciteLabel slot="subtitle">Total {dollar.format(total)}</CalciteLabel>
      </CalciteCard>
    </div>
  );
}

export default React.memo(Stormwater);

