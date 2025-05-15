import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-fab";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-alert";

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
  CalciteInputMessage,
  CalciteAlert,
} from "@esri/calcite-components-react";

import "./Buildings.css";

import { dollar } from "../config";
import useBuildings from "./useBuildings";
function Buildings({ totalUpdated }) {
  const {
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
    showScope,
    showDeleteModal,
    setShowDeleteModal,
    deleteMessage,
    deleteTitle,
    removeOtherCards
  } = useBuildings({ totalUpdated });


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
                scale="l"
                onCalciteSelectChange={(e) => buildingTypeSelected(e, card, cardNum)}
              >
                {!card.buildingType && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {buildingTypes.map((type, i) => (
                  showBuildingType(type.group, cardNum) && 
                  <CalciteOption
                    key={`card${cardNum}-buildingType${i}`}
                    value={type}
                    selected={type.group === card.buildingType?.group}

                  >
                    {type.group}
                  </CalciteOption>
                ))}
              </CalciteSelect>
              <CalciteInputMessage scale="s">
                * for Detached Accessory Structure, use Building Type U -
                Utility, miscellaneous
              </CalciteInputMessage>
            </CalciteLabel>
            <CalciteLabel>
              Construction Type
              <CalciteSelect
                scale="l"
                onCalciteSelectChange={(e) => constructionTypeSelected(e, card, cardNum)}
              >
                {!card.constructionType && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {card.buildingType &&
                  card.buildingType.values.map((value) => (
                    <CalciteOption
                      key={`card${cardNum}-constType-${value.key}`}
                      value={value}
                      selected={value.key === card.constructionType?.key}

                    >
                      {value.key}
                    </CalciteOption>
                  ))}
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel>
              Construction Scope
              <CalciteSelect
                scale="l"
                onCalciteSelectChange={(e) =>
                  constructionScopeSelected(e, card, cardNum)
                }
              >
                {!card.constructionScope && (
                  <CalciteOption value={""} selected></CalciteOption>
                )}
                {constructionScopes.map((scope) => (
                  showScope(scope.name, cardNum) && 
                  <CalciteOption
                    key={`card${cardNum}-${scope.name}`}
                    value={scope}
                    selected={scope.name === card.constructionScope?.name}
                  >
                    {scope.name}
                  </CalciteOption>
                ))}
              </CalciteSelect>
            </CalciteLabel>
            <CalciteLabel>
              Square Feet
              <CalciteInput
                scale="l"
                value={card.squareFeet}
                onCalciteInputInput={(e) => squareFeetChanged(e, card, cardNum)}
                type="number"
                min={0}
                maxLength={12}
              ></CalciteInput>
            </CalciteLabel>
            <div>
              Occupancy Valuation:{" "}
              {calculations[cardNum]
                ? dollar.format(calculations[cardNum].valuation)
                : "--"}
            </div>
            
            <div slot="footer-start">
              <CalciteIcon
                icon="chevron-left"
                onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
                className={`${currentCardIndex > 0 ? null : "hidden"}`}
              ></CalciteIcon>
              <div className="card-index">{`${currentCardIndex + 1} of ${
                cards.length
              }`}</div>
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
              {cards.length > 1 && cardNum > 0 && (
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
          Valuation <div>{dollar.format(totals.valuation)}</div>
        </CalciteLabel>
        <CalciteLabel>
          Building
          <div>
            {" "}
            {totals.fees.building.value
              ? dollar.format(
                  Math.round(totals.fees.building.value) +
                    Math.round(totals.fees.building.techFee)
                )
              : "--"}
          </div>
          <div>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.building.value
                )} + ${dollar.format(
                  totals.fees.building.techFee
                )} technology fee)`
              : ""}
          </div>
        </CalciteLabel>

        <CalciteLabel>
          Electrical
          <div>
            {" "}
            {totals.fees.electrical.value
              ? dollar.format(
                  totals.fees.electrical.value + totals.fees.electrical.techFee
                )
              : "--"}
          </div>
          <div>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.electrical.value
                )} + ${dollar.format(
                  totals.fees.electrical.techFee
                )} technology fee)`
              : ""}
          </div>
        </CalciteLabel>
        <CalciteLabel>
          Mechanical
          <div>
            {" "}
            {totals.fees.mechanical.value
              ? dollar.format(
                  totals.fees.mechanical.value + totals.fees.mechanical.techFee
                )
              : "--"}
          </div>
          <div>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.mechanical.value
                )} + ${dollar.format(
                  totals.fees.mechanical.techFee
                )} technology fee)`
              : ""}
          </div>
        </CalciteLabel>
        <CalciteLabel>
          Plumbing
          <div>
            {" "}
            {totals.fees.plumbing.value
              ? dollar.format(
                  totals.fees.plumbing.value + totals.fees.plumbing.techFee
                )
              : "--"}
          </div>
          <div>
            {totals.fees.plumbing.value
              ? `(${dollar.format(
                  totals.fees.plumbing.value
                )} + ${dollar.format(
                  totals.fees.plumbing.techFee
                )} technology fee)`
              : ""}
          </div>
        </CalciteLabel>
        <CalciteLabel>
          Plan Review
          <div>
            {" "}
            {totals.fees.planReview.value
              ? dollar.format(
                  totals.fees.planReview.value + totals.fees.planReview.techFee
                )
              : "--"}
          </div>
          <div>
            {totals.fees.planReview.value
              ? `(${dollar.format(
                  totals.fees.planReview.value
                )} + ${dollar.format(
                  totals.fees.planReview.techFee
                )} technology fee)`
              : ""}
          </div>
        </CalciteLabel>
        <CalciteLabel className="total">
          Permit Total
          <div>
            {" "}
            {totals.fees.planReview.value ? dollar.format(totals.total) : "--"}
          </div>
        </CalciteLabel>
        <div slot="footer-start">
          * only represents Building and Trade permit fees
      
        </div>
      </CalciteCard>
      <CalciteAlert kind="warning" autoCloseDuration="medium" autoClose  open={showDeleteModal ? true : undefined} label="A report alert" onCalciteAlertClose={() => setShowDeleteModal((prev) => !prev)}>
        <div slot="title">{deleteTitle}</div>
        <div slot="message">{deleteMessage}</div>
      </CalciteAlert>
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
            <CalciteLink
              iconStart="link"
              href="https://www.raleighnc.gov/DevelopmentFeeSchedule"
              target="_blank"
            >
              Guide for Raleigh Development Fees
            </CalciteLink>{" "}
            for more information. If you need additional assistance please feel
            free to email us at{" "}
            <CalciteLink
              iconStart="envelope"
              href="mailto:ds.help@raleighnc.gov"
              target="_blank"
            >
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
