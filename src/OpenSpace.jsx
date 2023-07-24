import React, { useEffect, useRef, useState } from "react";

import "./App.css";
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
import { zones } from "./assets/openSpaceConfig";

import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
import Search from "@arcgis/core/widgets/Search.js";

import "./OpenSpace.css";
import { dollar } from "./assets/config";

function OpenSpace({ totalUpdated }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [showMultiModal, setShowMultiModal] = useState(false);

  const [fee, setFee] = useState(
    window.localStorage.getItem("permit-calculators-openspace")
      ? JSON.parse(window.localStorage.getItem("permit-calculators-openspace"))
      : {
          zone: null,
          single: { units: null, value: 0 },
          multi: { units: null, value: 0 },
        }
  );

  const mapDiv = useRef(null);
  const searchDiv = useRef(null);
  const mapLoaded = useRef(false);
  const hitTest = async (screenPoint, view) => {
    let layer = view.map.allLayers.find(function (layer) {
      return layer.title === "Open Space Facility Fee Zones";
    });
    const result = await view.hitTest(screenPoint, { include: [layer] });
    if (result.results.length) {
      const zoneNumber = result.results[0].graphic.getAttribute("ZONE_NUMBER");
      const zone = zones.find((z) => z.zone === zoneNumber);
      setSelectedZone(zone);
    }
  };
  useEffect(() => {
    if (!mapLoaded.current) {
      (async () => {
        const map = new WebMap({
          portalItem: {
            id: "47a467200a2a41a8b1bacef6a30b86ae",
          },
        });
        const view = new MapView({
          map: map,
          container: mapDiv.current,
          popup: {
            dockEnabled: true,
            dockOptions: {
              // Disables the dock button from the popup
              buttonEnabled: false,
              // Ignore the default sizes that trigger responsive docking
              breakpoint: false,
              position: "top-right",
            },
          },
        });
        await view.when();
        view.ui.remove("zoom");
        const search = new Search({
          view: view,
          container: searchDiv.current,
          includeDefaultSources: false,
          sources: [
            {
              url: "https://maps.raleighnc.gov/arcgis/rest/services/Locators/Locator/GeocodeServer",
              singleLineFieldName: "SingleLine",
              name: "Search by Address",
              placeholder: "Search by Address",
            },
          ],
        });
        //view.ui.add(search, "top-left");
        search.on("search-complete", (e) => {
          hitTest(
            view.toScreen(e.results[0]?.results[0]?.feature.geometry),
            view
          );
        });
        view.on("click", async (e) => {
          hitTest(e.screenPoint, view);
        });
      })();
      mapLoaded.current = true;

    }
    
  }, []);

  useEffect(() => {
    if (selectedZone) {
      setFee({
        ...fee,
        zone: selectedZone.zone,
        single: {
          units: parseInt(fee.single.units),
          value: fee.single.units ? selectedZone.single * fee.single.units : 0,
        },
        multi: {
          units: parseInt(fee.multi.units),
          value: fee.multi.units ? selectedZone.multi * fee.multi.units : 0,
        },
      });
    }
  }, [selectedZone]);
  const singleChanged = (e) => {
    if (selectedZone) {
      setFee({
        ...fee,
        single: {
          units: parseInt(e.target.value),
          value: selectedZone.single * e.target.value,
        },
      });
    }
  };

  const multiChanged = (e) => {
    if (selectedZone) {
      setFee({
        ...fee,
        multi: {
          units: parseInt(e.target.value),
          value: selectedZone.multi * e.target.value,
        },
      });
    }
  };

  useEffect(() => {
    window.localStorage.setItem(
      "permit-calculators-openspace",
      JSON.stringify(fee)
    );
    totalUpdated(fee.single.value + fee.multi.value, "openspace");
  }, [fee]);

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
        The Open Space Facility Fee varies depending on which zone your project falls in. Enter an address in the search box on the map, click on a location on the map, or select from the dropdown list.

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
