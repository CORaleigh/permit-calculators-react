
import { useEffect, useMemo, useRef, useState } from "react";

import LocatorSearchSource from "@arcgis/core/widgets/Search/LocatorSearchSource.js";

import { addressLocator } from "../config";
import { webMapId, zones } from "./openSpaceConfig";


const useOpenSpace = ({ totalUpdated }) => {

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

    const mapRef = useRef(null);
    const searchSources = useMemo(() => [new LocatorSearchSource(addressLocator)], []);
    const hitTest = async (screenPoint) => {
        const mapEl = mapRef.current;
        let layer = mapEl.map.allLayers.find(function (layer) {
            return layer.title === "Open Space Facility Fee Zones";
        });
        const result = await mapEl.hitTest(screenPoint, { include: [layer] });
        if (result.results.length) {
            const zoneNumber = result.results[0].graphic.getAttribute("ZONE_NUMBER");
            const zone = zones.find((z) => z.zone === zoneNumber);
            setSelectedZone(zone);
        }
    };
    const mapClicked = (e) => {
        hitTest(e.detail.screenPoint);
    };
    const searchCompleted = (e) => {
        const geometry = e.detail.results[0]?.results[0]?.feature.geometry;
        if (geometry) {
            hitTest(mapRef.current.toScreen(geometry));
        }
    };

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
    return {
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
        multiChanged
    };
};
export default useOpenSpace;
