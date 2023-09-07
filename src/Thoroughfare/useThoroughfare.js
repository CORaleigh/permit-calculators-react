
import React, { useEffect, useRef, useState } from "react";
import { tfCategories } from "./thoroughfareConfig";

const useThoroughfare = ({ totalUpdated }) => {
    const [categories, setCategories] = useState(
        window.localStorage.getItem("permit-calculators-thoroughfare")
            ? JSON.parse(
                window.localStorage.getItem(
                    "permit-calculators-thoroughfare"
                )
            )
            : tfCategories
    );
    const [total, setTotal] = useState(0);

    const blockToggled = (e, landuse) => {
        const category = categories.find(
            (category) => category.category === landuse.category
        );
        const updatedLanduses = category?.landuses.map((old) => {
            let total = 0;
            if (!old.selected && landuse.value && !landuse.thresholds) {
                total = old.value / 1000 * old.per
            }
            if (!old.selected && landuse.thresholds) {
                landuse.thresholds?.forEach((t) => {
                    t.total ? (total += t.total) : (total += 0);
                });
            }


            return old.landuse === landuse.landuse
                ? {
                    ...old,
                    selected: !old.selected,
                    total: total
                }
                : old
        });
        const updatedCategories = categories.map((old) =>
            old.category === landuse.category
                ? { ...old, landuses: updatedLanduses }
                : old
        );
        setCategories(updatedCategories);
    }
    const checkboxChanged = (e, landuse) => {
        const category = categories.find(
            (category) => category.category === landuse.category
        );
        const updatedLanduses = category?.landuses.map((old) => {

            return old.landuse === landuse.landuse
                ? {
                    ...old,
                    selected: e.target.checked,
                    total:
                        e.target.checked && landuse.value
                            ? landuse.measure === 'area' ? (landuse.value / 1000) * landuse.per : landuse.value  * landuse.per
                            : 0,
                }
                : old}
        );
        const updatedCategories = categories.map((old) =>
            old.category === landuse.category
                ? { ...old, landuses: updatedLanduses }
                : old
        );
        setCategories(updatedCategories);
    };
    const landuseInputChanged = (e, landuse) => {
        const category = categories.find(
            (category) => category.category === landuse.category
        );
        const updatedLanduses = category?.landuses.map((old) =>
            old.landuse === landuse.landuse
                ? {
                    ...old,
                    value: parseInt(e.target.value),
                    total: landuse.measure === 'area' ? (parseInt(e.target.value) / 1000) * landuse.per : parseInt(e.target.value)  * landuse.per,
                }
                : old
        );
        const updatedCategories = categories.map((old) =>
            old.category === landuse.category
                ? { ...old, landuses: updatedLanduses }
                : old
        );
        setCategories(updatedCategories);
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
        setCategories(updatedCategories);
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
    return {
        categories, 
        total, 
        blockToggled, 
        checkboxChanged,
        landuseInputChanged, 
        thresholdInputChange, 
        tabChanged
    };
};
export default useThoroughfare;
