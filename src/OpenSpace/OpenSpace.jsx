import React from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-action";

import {
  CalciteAction,
  CalciteCard,
  CalciteInput,
  CalciteLabel,
  CalciteModal,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";

import "./OpenSpace.css";
import { dollar } from "../config";
import useOpenSpace from "./useOpenSpace";

function OpenSpace({ totalUpdated }) {
  const {
    zones,
    selectedZone,
    setSelectedZone,
    showSingleModal,
    setShowSingleModal,
    showMultiModal,
    setShowMultiModal,
    fee,
    mapDiv,
    searchDiv,
    singleChanged,
    multiChanged,
  } = useOpenSpace({ totalUpdated });

  return (
    <div id="openspace">
      <CalciteCard>
        <span slot="title">Open Space Facility Fee Calculator</span>
        <div ref={searchDiv}></div>
        <div ref={mapDiv}></div>
        <p></p>
        <CalciteLabel>
          Open Space Zone
          <CalciteSelect
            scale="l"
            value={selectedZone}
            onCalciteSelectChange={(e) =>
              setSelectedZone(e.target.selectedOption.value)
            }
          >
            {!selectedZone && <CalciteOption value={""}></CalciteOption>}
            {zones.map((zone) => (
              <CalciteOption
                key={zone.zone}
                value={zone}
                selected={fee.zone === zone.zone}
              >
                {zone.zone}
              </CalciteOption>
            ))}
          </CalciteSelect>
        </CalciteLabel>
        <CalciteLabel>
          # of single-family dwelling units
          <CalciteInput
            scale="l"
            value={fee.single.units}
            type="number"
            min={0}
            onCalciteInputInput={singleChanged}
          >
            <CalciteAction
              slot="action"
              icon="information"
              text="Information"
              onClick={() => setShowSingleModal((prev) => !prev)}
            ></CalciteAction>
          </CalciteInput>
        </CalciteLabel>
        <CalciteLabel>
          # of multi-family dwelling units
          <CalciteInput
            scale="l"
            value={fee.multi.units}
            type="number"
            min={0}
            onCalciteInputInput={multiChanged}
          >
            <CalciteAction
              slot="action"
              icon="information"
              text="Information"
              onClick={() => setShowMultiModal((prev) => !prev)}
            ></CalciteAction>
          </CalciteInput>
        </CalciteLabel>

        <CalciteLabel slot="subtitle">
          Total {dollar.format(fee.multi.value + fee.single.value)}
        </CalciteLabel>
        <CalciteLabel slot="subtitle">
          The Open Space Facility Fee varies depending on which zone your
          project falls in. Enter an address in the search box on the map, click
          on a location on the map, or select from the dropdown list.
        </CalciteLabel>
      </CalciteCard>
      <CalciteModal
        open={showSingleModal ? true : undefined}
        aria-labelledby="single-family-title"
        onCalciteModalClose={() => setShowSingleModal((prev) => !prev)}
      >
        <div slot="header" id="single-family-title">
          Single-Family Dwelling Unit
        </div>
        <div slot="content">
          <u>Detached Dwelling</u>: A structure containing one dwelling unit on
          its own lot.
        </div>
      </CalciteModal>
      <CalciteModal
        open={showMultiModal ? true : undefined}
        aria-labelledby="multi-family-title"
        onCalciteModalClose={() => setShowMultiModal((prev) => !prev)}
      >
        <div slot="header" id="multi-family-title">
          Mulit-Family Dwelling Unit
        </div>
        <div slot="content">
          <div>
            Housing in which more than one dwelling unit is located in the same
            structure. Multifamily development includes duplexes, townhomes,
            apartments and residential condominiums.
          </div>
          <br />
          <div>
            <u>Duplex (Triplex or Quad)</u>: A multi-family residence divided
            into two dwelling units on one lot, each a separate independent unit
            with its own independent entrance.
          </div>
          <br />
          <div>
            <u>Townhouses</u>: A multi-family residence consisting of one or
            more single-family dwelling units, where land underneath each
            dwelling unit is sold with that dwelling unit. Most townhouse units
            are attached by a shared wall; however, a townhouse development may
            contain detached townhouse units.
          </div>
          <br />
          <div>
            <u>Apartments</u>: Any multi-family residence containing three or
            more rented dwelling units.
          </div>
          <br />
          <div>
            <u>Condominiums</u>: Multi-family residence units or other building
            spaces in which the owner of the dwelling unit or space owns only
            the air space of the dwelling unit and not the structure or land on
            which the structure sits. Condominiums are often multi-story
            buildings.
          </div>
          <br />
        </div>
      </CalciteModal>
    </div>
  );
}

export default React.memo(OpenSpace);
