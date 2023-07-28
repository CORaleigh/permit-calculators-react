import { useEffect, useState } from "react";
import {
    buildingTypes,
    constructionScopes,
    feesMultipliers,
    meansLocationFactor,
    minFee,
    techFee,
    tiers,
} from "./buildingConfig";

const useBuildings = ({ totalUpdated }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [cards, setCards] = useState(
        window.localStorage.getItem("permit-calculators-buildings")
            ? JSON.parse(window.localStorage.getItem("permit-calculators-buildings"))
            : [
                {
                    id: 0,
                    buildingType: null,
                    constructionType: null,
                    constructionScope: null,
                    squareFeet: null,
                    isResidential: null,
                    isAlteration: null,
                },
            ]
    );
    const [calculations, setCalculations] = useState([
        {
            id: 0,
            valuation: null,
            fees: {
                building: { value: null, techFee: null, total: null },
                electrical: { value: null, techFee: null, total: null },
                mechanical: { value: null, techFee: null, total: null },
                plumbing: { value: null, techFee: null, total: null },
                planReview: { value: null, techFee: null, total: null },
            },
        },
    ]);
    const [totals, setTotals] = useState({
        valuation: null,
        fees: {
            building: { value: null, techFee: null, total: null },
            electrical: { value: null, techFee: null, total: null },
            mechanical: { value: null, techFee: null, total: null },
            plumbing: { value: null, techFee: null, total: null },
            planReview: { value: null, techFee: null, total: null },
        },
        total: null,
    });
    const [showModal, setShowModal] = useState(false);

    const squareFeetChanged = (e, card) => {
        setCards(
            cards.map((old) =>
                old.id === card.id
                    ? { ...old, squareFeet: parseInt(e.target.value) }
                    : old
            )
        );
    };
    const buildingTypeSelected = (e, card) => {
        let constructionType = null;
        if (card.constructionType) {
            constructionType = e.target.selectedOption.value.values.find(
                (value) => card.constructionType.key === value.key
            );
        }
        setCards(
            cards.map((old) =>
                old.id === card.id
                    ? {
                        ...old,
                        buildingType: e.target.selectedOption.value,
                        constructionType: constructionType,
                        isResidential: checkIfResidential(e.target.selectedOption.value),
                    }
                    : old
            )
        );
    };
    const constructionTypeSelected = (e, card) => {
        setCards(
            cards.map((old) =>
                old.id === card.id
                    ? { ...old, constructionType: e.target.selectedOption.value }
                    : old
            )
        );
    };
    const constructionScopeSelected = (e, card) => {
        card = { ...card, constructionScope: e.target.selectedOption.value };
        card = { ...card, valuation: calculateValuation(card) };
        card = { ...card, fees: calculateFees(card) };
        setCards(
            cards.map((old) =>
                old.id === card.id
                    ? {
                        ...old,
                        constructionScope: e.target.selectedOption.value,
                        isAlteration: checkIfAlteration(e.target.selectedOption.value),
                    }
                    : old
            )
        );
    };
    const calculateValuation = (card) => {
        let valuation = 0;
        debugger
        if (card.constructionScope && card.squareFeet && card.constructionType) {
            debugger
            valuation =
                parseFloat(
                    (
                        meansLocationFactor *
                        card.constructionType.value *
                        card.constructionScope.percent
                    ).toFixed(2)
                ) * card.squareFeet;
        }

        return valuation;//card.isResidential ? valuation : Math.round(valuation / 1000) * 1000;
    };
    const checkIfResidential = (buildingType) => {
        return buildingType.group.indexOf("R-3") > -1;
    };
    const checkIfAlteration = (constructionScope) => {
        return constructionScope.name.indexOf("Alteration") > -1;
    };
    const calcBuildingFee = (card, valuation) => {
        let value = 0;
        if (valuation > 0 && !card.isResidential) {
            const tier = tiers.find((t) => {
                return valuation > t["min"] && valuation < t["max"];
            });
            value = valuation * tier["costper"] + tier["cumulative"];
        }
        if (card.isResidential) {
            value = valuation * feesMultipliers.building.residential;
        }
        if (value < minFee) {
            value = minFee;
        }

        return value;
    };
    const calculateFees = (card, valuation) => {
        if (valuation === 0) {
            return {
                building: { value: null, techFee: null, total: null },
                electrical: { value: null, techFee: null, total: null },
                mechanical: { value: null, techFee: null, total: null },
                plumbing: { value: null, techFee: null, total: null },
                planReview: { value: null, techFee: null, total: null },
            };
        }
        const building = calcBuildingFee(card, valuation);
        const electrical = card.isResidential
            ? building * feesMultipliers.electrical.residential
            : building * feesMultipliers.electrical.commercial;
        const mechanical = card.isResidential
            ? building * feesMultipliers.mechanical.residential
            : building * feesMultipliers.mechanical.commercial;
        const plumbing = card.isResidential
            ? building * feesMultipliers.plumbing.residential
            : building * feesMultipliers.plumbing.commercial;
        const planReview = card.isAlteration
            ? building * 0.5
            : card.isResidential
                ? building * feesMultipliers.planReview.residential
                : building * feesMultipliers.planReview.commercial;
        let fees = {
            building: {
                value: building,
                techFee: Math.round(building * techFee),
                total: building + Math.round(building * techFee),
            },
            electrical: {
                value: electrical,
                techFee: Math.round(electrical * techFee),
                total: electrical + Math.round(electrical * techFee),
            },
            mechanical: {
                value: mechanical,
                techFee: Math.round(mechanical * techFee),
                total: mechanical + Math.round(mechanical * techFee),
            },
            plumbing: {
                value: plumbing,
                techFee: Math.round(plumbing * techFee),
                total: plumbing + Math.round(plumbing * techFee),
            },
            planReview: {
                value: planReview,
                techFee: Math.round(planReview * techFee),
                total: planReview + Math.round(planReview * techFee),
            },
        };
        return fees;
    };
    const addCard = () => {
        const newCard = {
            id: cards.length,
            buildingType: null,
            constructionType: null,
            constructionScope: null,
            squareFeet: null,
            isResidential: null,
            isAlteration: null,
        };
        setCards([...cards, newCard]);
        setCurrentCardIndex(currentCardIndex + 1);
    };
    const removeCard = () => {
        setCards([
            ...cards.slice(0, currentCardIndex),
            ...cards.slice(currentCardIndex + 1),
        ]);
        setCurrentCardIndex(currentCardIndex - 1);
    };

    useEffect(() => {
        const calculations = cards.map((card) => {
            const valuation = calculateValuation(card);
            const fees = calculateFees(card, valuation);
            return { valuation: valuation, fees: fees };
        });
        setCalculations(calculations);
    }, [cards]);
    useEffect(() => {
        window.localStorage.setItem(
            "permit-calculators-buildings",
            JSON.stringify(cards)
        );
    }, [cards]);
    useEffect(() => {
        let valuation = 0;
        let building = 0;
        let buildingTech = 0;
        let plumbing = 0;
        let plumbingTech = 0;
        let electrical = 0;
        let electricalTech = 0;
        let mechanical = 0;
        let mechanicalTech = 0;
        let planReview = 0;
        let planReviewTech = 0;
        calculations.forEach((calculation) => {
            valuation += calculation.valuation;
            building += calculation.fees.building.value;
            buildingTech += calculation.fees.building.techFee;
            plumbing += calculation.fees.plumbing.value;
            plumbingTech += calculation.fees.plumbing.techFee;
            electrical += calculation.fees.electrical.value;
            electricalTech += calculation.fees.electrical.techFee;
            mechanical += calculation.fees.mechanical.value;
            mechanicalTech += calculation.fees.mechanical.techFee;
            planReview += calculation.fees.planReview.value;
            planReviewTech += calculation.fees.planReview.techFee;
        });

        setTotals({
            ...totals,
            valuation: valuation,
            fees: {
                building: {
                    value: building,
                    techFee: buildingTech,
                    total: building + buildingTech,
                },
                electrical: {
                    value: electrical,
                    techFee: electricalTech,
                    total: electrical + electricalTech,
                },
                mechanical: {
                    value: mechanical,
                    techFee: mechanicalTech,
                    total: mechanical + mechanicalTech,
                },
                plumbing: {
                    value: plumbing,
                    techFee: plumbingTech,
                    total: plumbing + plumbingTech,
                },
                planReview: {
                    value: planReview,
                    techFee: planReviewTech,
                    total: planReview + planReviewTech,
                },
            },
            total:
                building +
                buildingTech +
                electrical +
                electricalTech +
                mechanical +
                mechanicalTech +
                plumbing +
                plumbingTech +
                planReview +
                planReviewTech,
        });
    }, [calculations]);

    useEffect(() => {
        totalUpdated(Math.round(totals.total), "building");
    }, [totals]);
    return {
        currentCardIndex, 
        setCurrentCardIndex, 
        cards, 
        calculations, 
        totals, 
        showModal, 
        setShowModal, 
        squareFeetChanged, 
        buildingTypeSelected, 
        constructionTypeSelected, 
        constructionScopeSelected, 
        addCard, 
        removeCard, 
        buildingTypes,
        constructionScopes
    };
};
export default useBuildings;
