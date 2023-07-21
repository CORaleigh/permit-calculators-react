import React, { useEffect, useRef, useState } from "react";
import "@esri/calcite-components/dist/components/calcite-card";

import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";

import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-fab";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-input-message";


import {
  CalciteCard,
  CalciteInput,
  CalciteSelect,
  CalciteOption,
  CalciteLabel,
  CalciteFab,
  CalciteIcon,
  CalciteModal,
  CalciteLink,
  CalciteInputMessage
} from "@esri/calcite-components-react";

import "./Buildings.css";
import {
  buildingTypes,
  constructionScopes,
  feesMultipliers,
  meansLocationFactor,
  minFee,
  techFee,
  tiers,
} from "./assets/buildingConfig";
import { dollar } from "./assets/config";
function Buildings({ totalUpdated }) {
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
    console.log(card);
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

    return valuation;
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
        console.log(
          valuation > t["min"] && valuation < t["max"],
          valuation,
          t["min"],
          t["max"]
        );
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
    return Math.round(value);
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
        techFee: building * techFee,
        total: building + building * techFee,
      },
      electrical: {
        value: electrical,
        techFee: electrical * techFee,
        total: electrical + electrical * techFee,
      },
      mechanical: {
        value: mechanical,
        techFee: mechanical * techFee,
        total: mechanical + mechanical * techFee,
      },
      plumbing: {
        value: plumbing,
        techFee: plumbing * techFee,
        total: plumbing + plumbing * techFee,
      },
      planReview: {
        value: planReview,
        techFee: planReview * techFee,
        total: planReview + planReview * techFee,
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
    console.log(calculations);
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
    totalUpdated(totals.total, "building");
  }, [totals]);
  return (
    <div id="buildings">
      {cards.map((card, cardNum) => {
        return (
          <CalciteCard
            key={`card${cardNum}`}
            hidden={currentCardIndex !== card.id}
          >
            <span slot="title">
              {`Occupancy ${cardNum + 1}`}
              <CalciteIcon
                className="info-icon"
                slot="title"
                icon="information"
                onClick={() => setShowModal((prev) => !prev)}
              ></CalciteIcon>
            </span>

            <CalciteLabel>
              Building Type
              <CalciteSelect
                onCalciteSelectChange={(e) => buildingTypeSelected(e, card)}
              >
                {!card.buildingType && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {buildingTypes.map((type, i) => (
                  <CalciteOption
                    key={`card${cardNum}-buildingType${i}`}
                    value={type}
                  >
                    {type.group}
                  </CalciteOption>
                ))}
              </CalciteSelect>
              <CalciteInputMessage scale="s">* for Detached Accessory Structure, use Building Type U - Utility, miscellaneous
</CalciteInputMessage>
            </CalciteLabel>
            <CalciteLabel>
              Construction Type
              <CalciteSelect
                onCalciteSelectChange={(e) => constructionTypeSelected(e, card)}
              >
                {!card.constructionType && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {card.buildingType &&
                  card.buildingType.values.map((value) => (
                    <CalciteOption
                      key={`card${cardNum}-constType-${value.key}`}
                      value={value}
                    >
                      {value.key}
                    </CalciteOption>
                  ))}
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel>
              Construction Scope
              <CalciteSelect
                onCalciteSelectChange={(e) =>
                  constructionScopeSelected(e, card)
                }
              >
                {!card.constructionScope && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {constructionScopes.map((scope) => (
                  <CalciteOption
                    key={`card${cardNum}-${scope.name}`}
                    value={scope}
                  >
                    {scope.name}
                  </CalciteOption>
                ))}
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel>
              Square Feet
              <CalciteInput
                value={card.squareFeet}
                onCalciteInputInput={(e) => squareFeetChanged(e, card)}
              ></CalciteInput>
            </CalciteLabel>
            <div>
              Valuation:{" "}
              {calculations[cardNum]
                ? dollar.format(calculations[cardNum].valuation)
                : "--"}
            </div>
            <div>
              Building:{" "}
              {calculations[cardNum]
                ? calculations[cardNum].fees.building.value
                  ? `${dollar.format(
                      calculations[cardNum].fees.building.value +
                        calculations[cardNum].fees.building.techFee
                    )} (${dollar.format(
                      calculations[cardNum].fees.building.value
                    )} + ${dollar.format(
                      calculations[cardNum].fees.building.techFee
                    )} technology fee)`
                  : "--"
                : "--"}
            </div>
            <div>
              Electrical:{" "}
              {calculations[cardNum]
                ? calculations[cardNum].fees.electrical.value
                  ? `${dollar.format(
                      calculations[cardNum].fees.electrical.value +
                        calculations[cardNum].fees.electrical.techFee
                    )} (${dollar.format(
                      calculations[cardNum].fees.electrical.value
                    )} + ${dollar.format(
                      calculations[cardNum].fees.electrical.techFee
                    )} technology fee)`
                  : "--"
                : "--"}
            </div>
            <div>
              Mechanical:{" "}
              {calculations[cardNum]
                ? calculations[cardNum].fees.mechanical.value
                  ? `${dollar.format(
                      calculations[cardNum].fees.mechanical.value +
                        calculations[cardNum].fees.mechanical.techFee
                    )} (${dollar.format(
                      calculations[cardNum].fees.mechanical.value
                    )} + ${dollar.format(
                      calculations[cardNum].fees.mechanical.techFee
                    )} technology fee)`
                  : "--"
                : "--"}
            </div>
            <div>
              Plumbing:{" "}
              {calculations[cardNum]
                ? calculations[cardNum].fees.plumbing.value
                  ? `${dollar.format(
                      calculations[cardNum].fees.plumbing.value +
                        calculations[cardNum].fees.plumbing.techFee
                    )} (${dollar.format(
                      calculations[cardNum].fees.plumbing.value
                    )} + ${dollar.format(
                      calculations[cardNum].fees.plumbing.techFee
                    )} technology fee)`
                  : "--"
                : "--"}
            </div>
            <div>
              Plan Review:{" "}
              {calculations[cardNum]
                ? calculations[cardNum].fees.planReview.value
                  ? `${dollar.format(
                      calculations[cardNum].fees.planReview.value +
                        calculations[cardNum].fees.planReview.techFee
                    )} (${dollar.format(
                      calculations[cardNum].fees.planReview.value
                    )} + ${dollar.format(
                      calculations[cardNum].fees.planReview.techFee
                    )} technology fee)`
                  : "--"
                : "--"}
            </div>
            <div slot="footer-start">
              <CalciteIcon
                icon="chevron-left"
                onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
                className={`${currentCardIndex > 0 ? null : "hidden"}`}
              ></CalciteIcon>
              <span className="card-index">{`${currentCardIndex + 1} of ${
                cards.length
              }`}</span>
              <CalciteIcon
                icon="chevron-right"
                onClick={() => setCurrentCardIndex(currentCardIndex + 1)}
                className={`${
                  cards.length > 1 && currentCardIndex !== cards.length - 1
                    ? null
                    : "hidden"
                }`}
              ></CalciteIcon>
            </div>
            <div slot="footer-end">
              <CalciteFab slot="footer-end" onClick={addCard}></CalciteFab>
              {cards.length > 1 && (
                <CalciteFab
                  slot="footer-end"
                  kind="danger"
                  onClick={removeCard}
                  icon="trash"
                ></CalciteFab>
              )}
            </div>
          </CalciteCard>
        );
      })}
      <CalciteCard>
        <span slot="title">Total Project Fees*</span>
        <CalciteLabel>
          Valuation <span>{dollar.format(totals.valuation)}</span>
        </CalciteLabel>
        <CalciteLabel>
          Building
          <span>
            {" "}
            {totals.fees.building.value
              ? dollar.format(
                  Math.round(totals.fees.building.value) +
                    Math.round(totals.fees.building.techFee)
                )
              : "--"}
          </span>
          <span>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.building.value
                )} + ${dollar.format(
                  totals.fees.building.techFee
                )} technology fee)`
              : ""}
          </span>
        </CalciteLabel>

        <CalciteLabel>
          Electrical
          <span>
            {" "}
            {totals.fees.electrical.value
              ? dollar.format(
                  totals.fees.electrical.value + totals.fees.electrical.techFee
                )
              : "--"}
          </span>
          <span>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.electrical.value
                )} + ${dollar.format(
                  totals.fees.electrical.techFee
                )} technology fee)`
              : ""}
          </span>
        </CalciteLabel>
        <CalciteLabel>
          Mechanical
          <span>
            {" "}
            {totals.fees.mechanical.value
              ? dollar.format(
                  totals.fees.mechanical.value + totals.fees.mechanical.techFee
                )
              : "--"}
          </span>
          <span>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.mechanical.value
                )} + ${dollar.format(
                  totals.fees.mechanical.techFee
                )} technology fee)`
              : ""}
          </span>
        </CalciteLabel>
        <CalciteLabel>
          Plumbing
          <span>
            {" "}
            {totals.fees.plumbing.value
              ? dollar.format(
                  totals.fees.plumbing.value + totals.fees.plumbing.techFee
                )
              : "--"}
          </span>
          <span>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.plumbing.value
                )} + ${dollar.format(
                  totals.fees.plumbing.techFee
                )} technology fee)`
              : ""}
          </span>
        </CalciteLabel>
        <CalciteLabel>
          Plan Review
          <span>
            {" "}
            {totals.fees.planReview.value
              ? dollar.format(
                  totals.fees.planReview.value + totals.fees.planReview.techFee
                )
              : "--"}
          </span>
          <span>
            {totals.fees.planReview.value
              ? `(${dollar.format(
                  totals.fees.planReview.value
                )} + ${dollar.format(
                  totals.fees.planReview.techFee
                )} technology fee)`
              : ""}
          </span>
        </CalciteLabel>
        <CalciteLabel className="total">
          Permit Total
          <span>
            {" "}
            {totals.fees.planReview.value ? dollar.format(totals.total) : "--"}
          </span>
        </CalciteLabel>
        <span slot="footer-start">* only represents Building and Trade permit fees</span>
      </CalciteCard>
      <CalciteModal
        open={showModal ? true : undefined}
        aria-labelledby="instructions-title"
        onCalciteModalClose={() => setShowModal((prev) => !prev)}
      >
        <div slot="header" id="instructions-title">
          Instructions
        </div>
        <div slot="content">
          <p>
            This calculator is intended to provide fee estimates for building
            permits, trades permits and plan review fees for both commercial and
            residential construction projects. Please note that this calculator
            is for informational purposes only and the final calculation of fees
            will be provided by the Development Services Customer Services
            Center.
          </p>
          <p>
            In order to calculate an estimate please select from the drop downs
            a Building Type, Construction Type, Construction Scope and square
            feet of the project. Note that mixed use projects can be calculated
            by adding additional occupancies with the “Add” button which appears
            once all fields have values.
          </p>
          <p>
            If you have questions about how these fees are calculated please
            visit our{" "}


            <CalciteLink iconStart="link" href="https://www.raleighnc.gov/DevelopmentFeeSchedule" target="_blank">
              Guide for Raleigh Development Fees
            </CalciteLink>{" "}
            for more information. If you need additional assistance please feel
            free to email us at{" "}
            <CalciteLink iconStart="envelope" href="mailto:ds.help@raleighnc.gov" target="_blank">
              ds.help@raleighnc.gov
            </CalciteLink>{" "}

            .
          </p>
        </div>
      </CalciteModal>
    </div>
  );
}
export default React.memo(Buildings);
