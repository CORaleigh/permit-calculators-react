import React from "react";
import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-dialog";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";

import "./OpenSpace.css";
import { dollar, inputValue, mapPopup } from "../config";
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
    mapRef,
    webMapId,
    searchSources,
    mapClicked,
    searchCompleted,
    singleChanged,
    multiChanged,
  } = useOpenSpace({ totalUpdated });

  return (
    <div id="openspace">
      <calcite-card>
        <span slot="heading">Open Space Facility Fee Calculator</span>
        <arcgis-search
          referenceElement="openspace-map"
          includeDefaultSourcesDisabled
          sources={searchSources}
          onarcgisSearchComplete={searchCompleted}
        ></arcgis-search>
        <arcgis-map
          id="openspace-map"
          ref={mapRef}
          itemId={webMapId}
          popup={mapPopup}
          onarcgisViewClick={mapClicked}
        ></arcgis-map>
        <p></p>
        <calcite-label>
          Open Space Zone
          <calcite-select
            scale="l"
            value={selectedZone}
            oncalciteSelectChange={(e) =>
              setSelectedZone(e.target.selectedOption.value)
            }
          >
            {!selectedZone && <calcite-option value={""}></calcite-option>}
            {zones.map((zone) => (
              <calcite-option
                key={zone.zone}
                value={zone}
                selected={fee.zone === zone.zone}
              >
                {zone.zone}
              </calcite-option>
            ))}
          </calcite-select>
        </calcite-label>
        <calcite-label>
          # of single-family dwelling units
          <calcite-input
            scale="l"
            value={inputValue(fee.single.units)}
            type="number"
            min={0}
            oncalciteInputInput={singleChanged}
          >
            <calcite-action
              slot="action"
              icon="information"
              text="Information"
              onClick={() => setShowSingleModal((prev) => !prev)}
            ></calcite-action>
          </calcite-input>
        </calcite-label>
        <calcite-label>
          # of multi-family dwelling units
          <calcite-input
            scale="l"
            value={inputValue(fee.multi.units)}
            type="number"
            min={0}
            oncalciteInputInput={multiChanged}
          >
            <calcite-action
              slot="action"
              icon="information"
              text="Information"
              onClick={() => setShowMultiModal((prev) => !prev)}
            ></calcite-action>
          </calcite-input>
        </calcite-label>

        <calcite-label slot="description">
          Total {dollar.format(fee.multi.value + fee.single.value)}
        </calcite-label>
        <calcite-label slot="description">
          The Open Space Facility Fee varies depending on which zone your
          project falls in. Enter an address in the search box on the map, click
          on a location on the map, or select from the dropdown list.
        </calcite-label>
      </calcite-card>
      <calcite-dialog
        modal
        open={showSingleModal}
        heading="Single-Family Dwelling Unit"
        oncalciteDialogClose={() => setShowSingleModal(false)}
      >
        <div>
          <u>Detached Dwelling</u>: A structure containing one dwelling unit on
          its own lot.
        </div>
      </calcite-dialog>
      <calcite-dialog
        modal
        open={showMultiModal}
        heading="Mulit-Family Dwelling Unit"
        oncalciteDialogClose={() => setShowMultiModal(false)}
      >
        <div>
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
      </calcite-dialog>
    </div>
  );
}

const MemoizedOpenSpace = React.memo(OpenSpace);
export default MemoizedOpenSpace;
