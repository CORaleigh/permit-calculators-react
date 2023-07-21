import { useEffect, useRef, useState } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";

import {
  CalciteCard,
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import { zones } from "./assets/openSpaceConfig";

import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
import "./OpenSpace.css";
import { dollar } from "./assets/config";

function OpenSpace() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [fee, setFee] = useState({
    zone: null,
    single: { units: null, value: 0 },
    multi: { units: null, value: 0 },
  });
  const mapDiv = useRef(null);
  useEffect(() => {
    (async () => {
      const map = new WebMap({
        portalItem: {
          id: "47a467200a2a41a8b1bacef6a30b86ae",
        },
      });
      const view = new MapView({
        map: map,
        container: mapDiv.current,
      });
      await view.when();
      let layer = view.map.allLayers.find(function (layer) {
        return layer.title === "Open Space Facility Fee Zones";
      });
      view.on("click", async (e) => {
        const result = await view.hitTest(e.screenPoint, { include: [layer] });
        if (result.results.length) {
          const zoneNumber =
            result.results[0].graphic.getAttribute("ZONE_NUMBER");
          const zone = zones.find((z) => z.zone === zoneNumber);
          setSelectedZone(zone);
        }
      });
    })();
  }, []);
  useEffect(() => {
    debugger
    setFee(
      window.localStorage.getItem("openspaceFees")
        ? JSON.parse(window.localStorage.getItem("openspaceFees"))
        : {
            single: { units: null, value: 0 },
            multi: { units: null, value: 0 },
          }
    );
  }, []);
  useEffect(() => {
    if (selectedZone) {
      setFee({
        ...fee,
        zone: selectedZone.zone,
        single: {
          units: parseInt(fee.single.units),
          value: selectedZone.single * fee.single.units,
        },
        multi: {
          units: parseInt(fee.multi.units),
          value: selectedZone.multi * fee.multi.units,
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
    window.localStorage.setItem("openspaceFees", JSON.stringify(fee));
  }, [fee]);

  return (
    <div id="openspace">
      <CalciteCard>
        <span slot="title">Open Space Facility Fee Calculator</span>
        <div ref={mapDiv}></div>
        <p></p>
        <CalciteLabel>
          Open Space Zone
          <CalciteSelect
            value={selectedZone}
            onCalciteSelectChange={(e) =>
              setSelectedZone(e.target.selectedOption.value)
            }
          >
            {!selectedZone && <CalciteOption value={""}></CalciteOption>}
            {zones.map((zone) => (
              <CalciteOption key={zone.zone} value={zone} selected={fee.zone === zone.zone}>
                {zone.zone}
              </CalciteOption>
            ))}
          </CalciteSelect>
        </CalciteLabel>
        <CalciteLabel>
          # of single-family dwelling units
          <CalciteInput
            value={fee.single.units}
            type="number"
            min={0}
            onCalciteInputInput={singleChanged}
          ></CalciteInput>
        </CalciteLabel>
        <CalciteLabel>
          # of multi-family dwelling units
          <CalciteInput
            value={fee.multi.units}
            type="number"
            min={0}
            onCalciteInputInput={multiChanged}
          ></CalciteInput>
        </CalciteLabel>

        <CalciteLabel slot="subtitle">
          Total {dollar.format(fee.multi.value + fee.single.value)}
        </CalciteLabel>
      </CalciteCard>
    </div>
  );
}

export default OpenSpace;
