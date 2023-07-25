
import React, { useEffect, useRef, useState } from "react";

import { fees, sections } from "./stormwaterConfig";



const useStormwater = ({ totalUpdated }) => {
    const [blocks, setBlocks] = useState(
        window.localStorage.getItem("permit-calculators-stormwater-blocks")
          ? JSON.parse(
              window.localStorage.getItem("permit-calculators-stormwater-blocks")
            )
          : sections
      );
      const [feeBlocks, setFeeBlocks] = useState(
        window.localStorage.getItem("permit-calculators-stormwater-fee-blocks")
          ? JSON.parse(
              window.localStorage.getItem(
                "permit-calculators-stormwater-fee-blocks"
              )
            )
          : fees
      );
    
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
      const headingClicked = (block) => {
        setBlocks(
          blocks.map((old) =>
            old.name === block.name
              ? {
                  ...old,
                  selected: !old.selected,
                  total: !old.selected ? block.trueValue : block.falseValue,
                }
              : old
          )
        );
      };  
    
      const feeHeadingClicked= (block) => {
        setFeeBlocks(
          feeBlocks.map((old) =>
            old.name === block.name
              ? {
                  ...old,
                  selected: !old.selected,
                  total: !old.selected ? getTotal(block) : 0,
                }
              : old
          )
        );
      };
      const getTotal = (block) => {
        let total = 0;
        if (block.subfees) {
          block.subfees.forEach((subfee) => {
            total += subfee.total;
          });
        } else {
          total = block.value * block.multiplier;
        }
        return total;
      };
      const feeBlockToggled = (e, block) => {
        setFeeBlocks(
          feeBlocks.map((old) =>
            old.name === block.name
              ? {
                  ...old,
                  selected: e.target.checked,
                  total: e.target.checked ? getTotal(block) : 0,
                }
              : old
          )
        );
      };

      const feeInputChanged = (e, block) => {
        let subfees;
        let total = 0;
        if (block.subfees) {
          subfees = block.subfees.map((subfee) => {
            total += subfee.multiplier * e.target.value;
            return { ...subfee, total: subfee.multiplier * e.target.value };
          });
          // block.subfees.forEach((subfee) => {(total += subfee.total);console.log(subfee.total)});
        } else {
          total = e.target.value * block.multiplier;
        }
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
        window.localStorage.setItem(
          "permit-calculators-stormwater-blocks",
          JSON.stringify(blocks)
        );
        window.localStorage.setItem(
          "permit-calculators-stormwater-fee-blocks",
          JSON.stringify(feeBlocks)
        );
      }, [blocks, feeBlocks]);
      useEffect(() => {
        totalUpdated(total, "stormwater");
      }, [total]);    
    return {
        blocks, 
        feeBlocks, 
        total, 
        blockToggled, 
        headingClicked, 
        feeHeadingClicked, 
        feeBlockToggled, 
        feeInputChanged
    };
};
export default useStormwater;
