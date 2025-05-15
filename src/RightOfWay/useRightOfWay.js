
import { useEffect, useRef, useState } from "react";
import { fees } from "./rightofwayConfig";
import WebMap from "@arcgis/core/WebMap.js";
import MapView from "@arcgis/core/views/MapView.js";
import Search from "@arcgis/core/widgets/Search.js";
import Legend from "@arcgis/core/widgets/Legend.js";

const useRightOfWay = ({ totalUpdated }) => {
    const mapDiv = useRef(null);
    const legendDiv = useRef(null);
    const mapLoaded = useRef(false);

    const [occupancies, setOccupancies] = useState(
        window.localStorage.getItem("permit-calculators-rightofway")
            ? JSON.parse(window.localStorage.getItem("permit-calculators-rightofway"))
            : [
                {
                    id: 0,
                    occupancyClass: null,
                    lf: 0,
                    dumpsters: 0,
                    days: 0,
                    primaryCost: 0,
                    secondaryCost: 0,
                    totalCost: 0,
                    projectCost: 0,
                    downtown: false,
                },
            ]
    );
    const [config, setConfig] = useState(fees);
    const [totals, setTotals] = useState({
        totalPerDay: 0,
        totalProject: 0,
        projectReview: 0,
        maxPrimary: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const addRow = () => {
        setOccupancies([
            ...occupancies,
            {
                id: occupancies[occupancies.length-1].id+1,
                occupancyClass: null,
                lf: 0,
                dumpsters: 0,
                days: 0,
                primaryCost: 0,
                secondaryCost: 0,
                totalCost: 0,
                projectCost: 0,
                downtown: false,
            },
        ]);
    };
    const removeRow = (i) => {
        setOccupancies([...occupancies.slice(0, i), ...occupancies.slice(i + 1)]);
    };
    const classChanged = (e, item) => {
        const selectedItem = occupancies.find((i) => i.id === item.id);
        const updatedOccupancies = occupancies.map((old) =>
            old.id === selectedItem.id
                ? {
                    ...old,
                    occupancyClass: e.target.selectedOption.value,
                }
                : old
        );
        setOccupancies(updatedOccupancies);
    };
    const daysChanged = (e, item) => {
        const selectedItem = occupancies.find((i) => i.id === item.id);
        const updatedOccupancies = occupancies.map((old) =>
            old.id === selectedItem.id
                ? {
                    ...old,
                    days: parseInt(e.target.value),
                }
                : old
        );
        setOccupancies(updatedOccupancies);
    };
    const linearFeetChanged = (e, item) => {
        const selectedItem = occupancies.find((i) => i.id === item.id);
        const updatedOccupancies = occupancies.map((old) =>
            old.id === selectedItem.id
                ? {
                    ...old,
                    lf: parseInt(e.target.value),
                }
                : old
        );
        setOccupancies(updatedOccupancies);
    };
    const dumpstersChanged = (e, item) => {
        const updatedOccupancies = occupancies.map((old) =>
            old.id === item.id
                ? {
                    ...old,
                    dumpsters: parseInt(e.target.value),
                }
                : old
        );
        setOccupancies(updatedOccupancies);
    };
    const downtownChanged = (e, item) => {
        let occupancyClass = item.occupancyClass;
        if (item.occupancyClass.class.includes('Minor') && e.target.checked) {
            occupancyClass = config.find(c => c.class === item.occupancyClass.class.replace('Minor', 'Major'));
        }
        const updatedOccupancies = occupancies.map((old) =>
            old.id === item.id
                ? {
                    ...old,
                    downtown: e.target.checked,
                    occupancyClass: occupancyClass
                }
                : old
        );
        setOccupancies(updatedOccupancies);
    };






    const totalProjects = () => {
        let maxPrimary = 0;
        let projectReview = 0;
        let totalPerDay = 0;
        let totalProject = 0;
        occupancies.forEach((occupancy) => {
            if (occupancy.occupancyClass && occupancy.lf && occupancy.days) {
                if (occupancy.primaryCost >= maxPrimary) {
                    maxPrimary = occupancy.primaryCost;
                }
            }
        });
        occupancies.forEach((occupancy) => {
            if (occupancy.occupancyClass && occupancy.lf && occupancy.days) {
                if (occupancy.primaryCost >= maxPrimary) {
                    occupancy.totalCost = occupancy.primaryCost;
                } else {
                    occupancy.totalCost = occupancy.secondaryCost;
                    occupancy.projectCost = occupancy.totalCost * occupancy.days;
                }
                if (occupancy.occupancyClass.review >= projectReview) {
                    projectReview = occupancy.occupancyClass.review;
                }
                occupancy.projectCost = occupancy.totalCost * occupancy.days;
                totalPerDay = totalPerDay += occupancy.totalCost;
                totalProject = totalProject += occupancy.projectCost;
            }
        });

        setOccupancies(occupancies);
        setTotals({
            ...totals,
            maxPrimary: maxPrimary,
            projectReview: projectReview,
            totalPerDay: totalPerDay,
            totalProject: totalProject,
        });
    };

    useEffect(() => {
        occupancies.forEach((occupancy) => {



            
            
            if (occupancy.occupancyClass && occupancy.lf && occupancy.days) {
                if (occupancy.lf < 151) {
                    occupancy.primaryCost = occupancy.occupancyClass.base;
                } else {
                    occupancy.primaryCost =
                        occupancy.occupancyClass.base +
                        (occupancy.lf - 150) * occupancy.occupancyClass.primary;
                }
                occupancy.secondaryCost =
                    occupancy.occupancyClass.secondary * occupancy.lf;
            } else {
                setTotals({ ...totals, maxPrimary: 0 });
                occupancy.primaryCost = 0;
                occupancy.secondaryCost = 0;
            }
            if (!occupancy.days) {
                setTotals({ ...totals, maxPrimary: 0 });
                occupancy.primaryCost = 0;
                occupancy.secondaryCost = 0;
            }
            if (occupancy.dumpsters) {
                occupancy.primaryCost = occupancy.occupancyClass.base;
                occupancy.secondaryCost =
                    occupancy.occupancyClass.base * occupancy.dumpsters;
            }
        });
  
        setOccupancies(occupancies);
        totalProjects();
    }, [occupancies]);
    useEffect(() => {
        window.localStorage.setItem(
            "permit-calculators-rightofway",
            JSON.stringify(occupancies)
        );
    }, [occupancies]);

    useEffect(() => {
        totalUpdated(
            totals.totalProject + totals.projectReview,
            "rightofway"
        );
    }, [totals]);
    useEffect(() => {
        if (!mapLoaded.current) {
            (async () => {
                const map = new WebMap({
                    portalItem: {
                        id: "80e1683103a4487ba54c52ac1044d9aa",
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
                view.ui.add(search, 'top-right');
   
                const legend = new Legend({
                    view: view,
                    container: legendDiv.current,

                });
                view.ui.add(legend, 'bottom-left');

            })();
            mapLoaded.current = true;

        }

    }, []); 
    return {
        occupancies, 
        config, 
        totals, 
        showModal, 
        setShowModal,
        addRow, 
        removeRow, 
        classChanged, 
        daysChanged, 
        linearFeetChanged,
        dumpstersChanged, 
        downtownChanged,
        mapDiv,
        legendDiv
    };
};
export default useRightOfWay;
