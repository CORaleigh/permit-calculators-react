
import React, { useEffect, useRef, useState } from "react";

import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
import Search from "@arcgis/core/widgets/Search.js";

import { zones } from "./openSpaceConfig";


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
    return {
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
        multiChanged
    };
};
export default useOpenSpace;
