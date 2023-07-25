
import React, { useEffect, useState } from "react";
import { capitalFees, infrastructureFees } from "./waterConfig";

const useWater = ({ totalUpdated }) => {
    const [infrastructure, setInfrastructure] = useState(
        window.localStorage.getItem("permit-calculators-water-infrastructure")
            ? JSON.parse(
                window.localStorage.getItem("permit-calculators-water-infrastructure")
            )
            : infrastructureFees
    );
    const [capital, setCapital] = useState(
        window.localStorage.getItem("permit-calculators-water-capital")
            ? JSON.parse(
                window.localStorage.getItem("permit-calculators-water-capital")
            )
            : capitalFees
    );

    const inRaleighChanged = (e) => {
        setInfrastructure({
            ...infrastructure,
            inRaleigh: e.target.checked
        });
    };
    useEffect(() => {
        const updatedFees = infrastructure.fees.map(fee => {
            if (fee.inRaleighWaived && infrastructure.inRaleigh) {
                return { ...fee, fee: 0 }
            } else if (fee.inRaleighWaived && !infrastructure.inRaleigh) {
                return { ...fee, fee: fee.units * fee.unitCost }
            } else {
                return fee;
            }
        });
        setInfrastructure({ ...infrastructure, fees: updatedFees, total: getInfrastructureTotal(updatedFees) });
    }, [infrastructure.inRaleigh]);
    const pumpStationChanged = (e) => {
        const updatedFees = infrastructure.fees.map((fee) =>
            fee.title === "Pump Station Review"
                ? {
                    ...fee,
                    fee: e.target.checked ? fee.unitCost : 0,
                }
                : fee.title === "Pump Station Inspection"
                    ? {
                        ...fee,
                        fee: e.target.checked ? fee.unitCost : 0,
                    }
                    : fee
        );
        setInfrastructure({
            ...infrastructure,
            pumpStation: e.target.checked,
            fees: updatedFees,
        });
    };

    const getPerUnitFee = (value, unitCost) => {
        return value * unitCost;
    };
    const infrastructureInputChanged = (value, input, inRaleigh) => {
        let updatedFees;

        if (input.label === "Public Water") {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Public Water Review"
                    ? {
                        ...fee,
                        fee: parseInt(value) > 0 ? fee.unitCost : 0,
                    }
                    : fee.title === "Water Inspection"
                        ? {
                            ...fee,
                            units: parseInt(value),
                            fee: getPerUnitFee(parseInt(value), fee.unitCost),
                        }
                        : fee
            );
        }
        if (input.label.includes("Sewer")) {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Sewer Review"
                    ? {
                        ...fee,
                        fee: parseInt(value) > 0 ? fee.unitCost : 0,
                    }
                    : fee.title === "Sewer Inspection"
                        ? {
                            ...fee,
                            units: getSewerTotal(input.label, parseInt(value)),
                            fee: inRaleigh
                                ? 0
                                : getSewerTotal(input.label, parseInt(value)) *
                                fee.unitCost,
                        }
                        : fee.title === "CCTV Inspection"
                            ? {
                                ...fee,
                                units: getSewerTotal(input.label, parseInt(value)),
                                fee:
                                    getSewerTotal(input.label, parseInt(value)) *
                                    fee.unitCost,
                            }
                            : fee
            );
        }
        if (input.label === "Public Reuse") {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Public Reuse Review"
                    ? {
                        ...fee,
                        fee: inRaleigh
                            ? 0
                            : parseInt(value) > 0
                                ? fee.unitCost
                                : 0,
                    }
                    : fee.title === "Reuse Inspection"
                        ? {
                            ...fee,
                            units: parseInt(value),
                            fee: inRaleigh
                                ? 0
                                : getPerUnitFee(parseInt(value), fee.unitCost),
                        }
                        : fee
            );
        }
        if (input.label === "Water Stubs") {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Water Stubs"
                    ? {
                        ...fee,
                        units: parseInt(value),
                        fee: infrastructure.inRaleigh
                            ? 0
                            : getPerUnitFee(parseInt(value), fee.unitCost),
                    }
                    : fee
            );
        }
        if (input.label === "Sewer Stubs") {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Sewer Stubs"
                    ? {
                        ...fee,
                        units: parseInt(value),
                        fee: inRaleigh
                            ? 0
                            : getPerUnitFee(parseInt(value), fee.unitCost),
                    }
                    : fee
            );
        }
        if (input.label === "Reuse Stubs") {
            updatedFees = infrastructure.fees.map((fee) =>
                fee.title === "Reuse Stubs"
                    ? {
                        ...fee,
                        units: parseInt(value),
                        fee: inRaleigh
                            ? 0
                            : getPerUnitFee(parseInt(value), fee.unitCost),
                    }
                    : fee
            );
        }
        const updatedInputs = infrastructure.inputs.map((old) =>
            old.label === input.label
                ? {
                    ...old,
                    value: parseInt(value),
                }
                : old
        );
        setInfrastructure({
            ...infrastructure,
            total: getInfrastructureTotal(updatedFees),
            inputs: updatedInputs,
            fees: updatedFees ? updatedFees : infrastructure.fees,
        });
    };
    const getSewerTotal = (label, value) => {
        const sewerFees = infrastructure.inputs.filter(
            (fee) => fee.label !== label && fee.label.includes("Sewer")
        );
        let total = 0;
        sewerFees.forEach((fee) => (total += fee.value));
        return (total += value);
    };
    const getInfrastructureTotal = (fees) => {
        let total = 0;
        fees.forEach((fee) => {
            total += fee.fee;
        });
        return total;
    };
    const getCapitalTotal = (sizes) => {
        let total = 0;
        sizes.forEach((size) => {
            size.utilities.forEach((utility) => {
                total += utility.fee;
            });
        });
        return total;
    };
    const sizeUpdated = (e, size, utility) => {
        const updatedUtilities = size.utilities.map((fee) =>
            fee.type === utility.type
                ? {
                    ...fee,
                    units: parseInt(e.target.value),
                    fee: parseInt(e.target.value) * utility.unitCost,
                }
                : fee
        );
        const updatedSizes = capital.meterSizes.map((s) =>
            s.size === size.size
                ? {
                    ...s,
                    utilities: updatedUtilities,
                }
                : s
        );
        setCapital({
            ...capital,
            total: getCapitalTotal(updatedSizes),
            meterSizes: updatedSizes,
        });
    };

    useEffect(() => {
        window.localStorage.setItem(
            "permit-calculators-water-infrastructure",
            JSON.stringify(infrastructure)
        );
        window.localStorage.setItem(
            "permit-calculators-water-capital",
            JSON.stringify(capital)
        );
    }, [capital, infrastructure]);

    useEffect(() => {
        totalUpdated(capital.total + infrastructure.total, "water");
    }, [capital.total, infrastructure.total]);
    return {
        infrastructure, 
        capital, 
        inRaleighChanged,
        infrastructureInputChanged, 
        sizeUpdated, 
        pumpStationChanged
    };
};
export default useWater;
