
import React, { useEffect, useRef, useState } from "react";
import { fees } from "./rightofwayConfig";

const useRightOfWay = ({ totalUpdated }) => {
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
                id: occupancies.length,
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
        downtownChanged
    };
};
export default useRightOfWay;
