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
       // card = { ...card, fees: calculateFees(card) };
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
        if (card.constructionScope && card.squareFeet && card.constructionType) {
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
    // const calcBuildingFee = (card, valuation) => {
    //     let value = 0;
    //     if (valuation > 0 && !card.isResidential) {
    //         const tier = tiers.find((t) => {
    //             return valuation > t["min"] && valuation < t["max"];
    //         });
    //         value = valuation * tier["costper"] + tier["cumulative"];
    //     }
    //     if (card.isResidential) {
    //         value = valuation * feesMultipliers.building.residential;
    //     }
    //     if (value < minFee) {
    //         value = minFee;
    //     }

    //     return value;
    // };
    const setBuildingFee = (isResidential, valuation) => {
        let value = 0;
        if (valuation > 0 && !isResidential) {
            const tier = tiers.find((t) => {
                return valuation > t["min"] && valuation < t["max"];
            });
            value = valuation * tier["costper"] + tier["cumulative"];
        }
        if (isResidential) {
            value = valuation * feesMultipliers.building.residential;
        }
        if (value < minFee) {
            value = minFee;
        }

        return value;        
    }
    const showBuildingType = (type, cardNum) => {
        if (cardNum === 0) {
          return true;
        } else if (cardNum > 0 && cards[0].isResidential && type.indexOf("R-3") > -1) {
          return true;
        } else if (cardNum > 0 && !cards[0].isResidential && type.indexOf("R-3") === -1) {
          return true;
        } else {
          return false;
        }
      }
      const showScope = (scope, cardNum) => {
        if (cardNum === 0) {
          return true;
        } else if (cardNum > 0 && cards[0].isAlteration && scope.indexOf("Alteration") > -1) {
          return true;
        } else if (cardNum > 0 && !cards[0].isAlteration && scope.indexOf("Alteration") === -1) {
          return true;
        } else {
          return false;
        }
      }
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
            return { valuation: valuation};
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
        calculations.forEach((calculation) => {
            valuation += calculation.valuation;
        });
        let isResidential = false;
        let isAlteration = false;
        let value = 0;
        cards.forEach(card => {
            if (card.isResidential) {
                isResidential = true;
            }
            if (card.isAlteration) {
                isAlteration = true;
            }
        });
        calculations.forEach(calculation => {

            value += calculation.valuation;
        });
                

        const buildingFee = Math.round(setBuildingFee(isResidential, value));
        let electricalFee = isResidential
        ? buildingFee * feesMultipliers.electrical.residential
        : buildingFee * feesMultipliers.electrical.commercial;
        electricalFee = Math.round(electricalFee < minFee ? minFee : electricalFee);
        let mechanicalFee = isResidential
            ? buildingFee * feesMultipliers.mechanical.residential
            : buildingFee * feesMultipliers.mechanical.commercial;
        mechanicalFee = Math.round(mechanicalFee < minFee ? minFee : mechanicalFee);
        let plumbingFee = isResidential
            ? buildingFee * feesMultipliers.plumbing.residential
            : buildingFee * feesMultipliers.plumbing.commercial;
        plumbingFee = Math.round(plumbingFee < minFee ? minFee : plumbingFee);

        let planReviewFee = isAlteration
            ? buildingFee * 0.5
            : isResidential
                ? buildingFee * feesMultipliers.planReview.residential
                : buildingFee * feesMultipliers.planReview.commercial;  
        planReviewFee = Math.round(planReviewFee);      
        setTotals({
            ...totals,
            valuation: valuation,
            fees: {
                building: {
                    value: buildingFee,
                    techFee: Math.round(buildingFee * techFee),
                    total: buildingFee + Math.round(buildingFee * techFee),
                },
                electrical: {
                    value: electricalFee,
                    techFee: Math.round(electricalFee * techFee),
                    total: electricalFee +  Math.round(electricalFee * techFee),
                },
                mechanical: {
                    value: mechanicalFee,
                    techFee: Math.round(mechanicalFee * techFee),
                    total: mechanicalFee +  Math.round(mechanicalFee * techFee),
                },
                plumbing: {
                    value: plumbingFee,
                    techFee: Math.round(plumbingFee * techFee),
                    total: plumbingFee + Math.round(plumbingFee * techFee),
                },
                planReview: {
                    value: planReviewFee,
                    techFee: Math.round(planReviewFee * techFee),
                    total: planReviewFee + Math.round(planReviewFee * techFee),
                },
            },
            total:
                buildingFee +
                Math.round(buildingFee * techFee) +
                electricalFee +
                Math.round(electricalFee * techFee) +
                mechanicalFee +
                Math.round(mechanicalFee * techFee) +
                plumbingFee +
                Math.round(plumbingFee * techFee) +
                planReviewFee +
                Math.round(planReviewFee * techFee),
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
        constructionScopes,
        showBuildingType,
        showScope
    };
};
export default useBuildings;
