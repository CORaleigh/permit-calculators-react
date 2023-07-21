import { useEffect, useRef, useState } from "react";

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
import React from "react";
import { tfCategories } from "./assets/thoroughfareConfig";
import { dollar } from "./assets/config";
import "./Thoroughfare.css";
function Thoroughfare({ totalUpdated }) {
  const [categories, setCategories] = useState(
    window.localStorage.getItem("permit-calculators-thoroughfare")
      ? JSON.parse(
          window.localStorage.getItem(
            "permit-calculators-thoroughfare"
          ) as string
        )
      : tfCategories
  );
  const [total, setTotal] = useState(0);

  const checkboxChanged = (e, landuse) => {
    const category = categories.find(
      (category) => category.category === landuse.category
    );
    const updatedLanduses = category?.landuses.map((old) =>
      old.landuse === landuse.landuse
        ? {
            ...old,
            selected: e.target.checked,
            total:
              e.target.checked && landuse.value
                ? landuse.value * landuse.per
                : 0,
          }
        : old
    );
    const updatedCategories = categories.map((old) =>
      old.category === landuse.category
        ? { ...old, landuses: updatedLanduses }
        : old
    );
    setCategories(updatedCategories as any);
  };
  const landuseInputChanged = (e, landuse) => {
    const category = categories.find(
      (category) => category.category === landuse.category
    );
    const updatedLanduses = category?.landuses.map((old) =>
      old.landuse === landuse.landuse
        ? {
            ...old,
            value: e.target.value,
            total: e.target.value * landuse.per,
          }
        : old
    );

    console.log(updatedLanduses);
    const updatedCategories = categories.map((old) =>
      old.category === landuse.category
        ? { ...old, landuses: updatedLanduses }
        : old
    );
    setCategories(updatedCategories as any);
  };
  const thresholdInputChange = (e, threshold, landuse) => {
    const category = categories.find(
      (category) => category.category === landuse.category
    );
    const lu = category?.landuses.find(
      (lu) => lu.category === landuse.category
    );
    const updateThresholds = lu?.thresholds?.map((old) =>
      old.label === threshold.label
        ? {
            ...old,
            value: e.target.value,
            total: e.target.value * threshold.per,
          }
        : old
    );
    let total = 0;
    updateThresholds?.forEach((t) => {
      t.total ? (total += t.total) : (total += 0);
    });
    const updatedLanduses = category?.landuses.map((old) =>
      old.landuse === landuse.landuse
        ? { ...old, total: total, thresholds: updateThresholds }
        : old
    );
    const updatedCategories = categories.map((old) =>
      old.category === landuse.category
        ? { ...old, landuses: updatedLanduses }
        : old
    );
    setCategories(updatedCategories as any);
  };
  const tabChanged = (e) => {
    const title = e.target.selectedTitle.innerHTML;
    const updatedCategories = categories.map((old) =>
      old.category === title
        ? { ...old, selected: true }
        : { ...old, selected: false }
    );
    setCategories(updatedCategories);
  };
  useEffect(() => {
    let total = 0;
    categories.forEach((category) => {
      category.landuses.forEach((landuse) =>
        landuse.selected && landuse.total
          ? (total += landuse.total)
          : (total += 0)
      );
    });
    setTotal(total);
  }, [categories]);

  useEffect(() => {
    window.localStorage.setItem(
      "permit-calculators-thoroughfare",
      JSON.stringify(categories)
    );
  }, [categories]);

  useEffect(() => {
    totalUpdated(total, "thoroughfare");
  }, [total]);
  return (
    <div id="thoroughfare">
      <CalciteCard>
        <span slot="title">Thoroughfare Fee Calculator</span>
        <CalciteTabs>
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
                  >
                    <CalciteCheckbox
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
                        value={landuse.value}
                        placeholder={landuse.label}
                        onCalciteInputInput={(e) =>
                          landuseInputChanged(e, landuse)
                        }
                      ></CalciteInput>
                    )}

                    <div slot="control">{dollar.format(landuse.total)}</div>
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
