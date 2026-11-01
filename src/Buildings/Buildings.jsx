import React from "react";
import "@esri/calcite-components/components/calcite-alert";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-dialog";
import "@esri/calcite-components/components/calcite-fab";
import "@esri/calcite-components/components/calcite-icon";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-input-message";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-link";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";


import "./Buildings.css";

import { dollar, inputValue } from "../config";
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
    deleteTitle
  } = useBuildings({ totalUpdated });

  return (
    <div id="buildings">

      {cards.map((card, cardNum) => {
        return (
          <calcite-card
            key={`card${cardNum}`}
            hidden={currentCardIndex !== card.id}
          >
            <span slot="heading">
              {`Occupancy ${cardNum + 1}`}
              <calcite-icon
                className="info-icon"
                icon="information"
                onClick={() => setShowModal((prev) => !prev)}
              ></calcite-icon>
            </span>

            <calcite-label>
              Building Type
              <calcite-select
                scale="l"
                oncalciteSelectChange={(e) => buildingTypeSelected(e, card, cardNum)}
              >
                {!card.buildingType && (
                  <calcite-option value={""} selected></calcite-option>
                )}
                {buildingTypes.map((type, i) => (
                  showBuildingType(type.group, cardNum) && 
                  <calcite-option
                    key={`card${cardNum}-buildingType${i}`}
                    value={type}
                    selected={type.group === card.buildingType?.group}

                  >
                    {type.group}
                  </calcite-option>
                ))}
              </calcite-select>
              <calcite-input-message scale="s">
                * for Detached Accessory Structure, use Building Type U -
                Utility, miscellaneous
              </calcite-input-message>
            </calcite-label>
            <calcite-label>
              Construction Type
              <calcite-select
                scale="l"
                oncalciteSelectChange={(e) => constructionTypeSelected(e, card, cardNum)}
              >
                {!card.constructionType && (
                  <calcite-option value={""} selected></calcite-option>
                )}
                {card.buildingType &&
                  card.buildingType.values.map((value) => (
                    <calcite-option
                      key={`card${cardNum}-constType-${value.key}`}
                      value={value}
                      selected={value.key === card.constructionType?.key}

                    >
                      {value.key}
                    </calcite-option>
                  ))}
              </calcite-select>
            </calcite-label>
            <calcite-label>
              Construction Scope
              <calcite-select
                scale="l"
                oncalciteSelectChange={(e) =>
                  constructionScopeSelected(e, card, cardNum)
                }
              >
                {!card.constructionScope && (
                  <calcite-option value={""} selected></calcite-option>
                )}
                {constructionScopes.map((scope) => (
                  showScope(scope.name, cardNum) && 
                  <calcite-option
                    key={`card${cardNum}-${scope.name}`}
                    value={scope}
                    selected={scope.name === card.constructionScope?.name}
                  >
                    {scope.name}
                  </calcite-option>
                ))}
              </calcite-select>
            </calcite-label>
            <calcite-label>
              Square Feet
              <calcite-input
                scale="l"
                value={inputValue(card.squareFeet)}
                oncalciteInputInput={(e) => squareFeetChanged(e, card, cardNum)}
                type="number"
                min={0}
                maxLength={12}
              ></calcite-input>
            </calcite-label>
            <div>
              Occupancy Valuation:{" "}
              {calculations[cardNum]
                ? dollar.format(calculations[cardNum].valuation)
                : "--"}
            </div>
            
            <div slot="footer-start">
              <calcite-icon
                icon="chevron-left"
                onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
                className={`${currentCardIndex > 0 ? null : "hidden"}`}
              ></calcite-icon>
              <div className="card-index">{`${currentCardIndex + 1} of ${
                cards.length
              }`}</div>
              <calcite-icon
                icon="chevron-right"
                onClick={() => setCurrentCardIndex(currentCardIndex + 1)}
                className={`${
                  cards.length > 1 && currentCardIndex !== cards.length - 1
                    ? null
                    : "hidden"
                }`}
              ></calcite-icon>
            </div>
            <div slot="footer-end">
              <calcite-fab slot="footer-end" onClick={addCard}></calcite-fab>
              {cards.length > 1 && cardNum > 0 && (
                <calcite-fab
                  slot="footer-end"
                  kind="danger"
                  onClick={removeCard}
                  icon="trash"
                ></calcite-fab>
              )}
            </div>
          </calcite-card>
        );
      })}
      <calcite-card>
        <span slot="heading">Total Project Fees*</span>
        <calcite-label>
          Valuation <div>{dollar.format(totals.valuation)}</div>
        </calcite-label>
        <calcite-label>
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
        </calcite-label>

        <calcite-label>
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
        </calcite-label>
        <calcite-label>
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
        </calcite-label>
        <calcite-label>
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
        </calcite-label>
        <calcite-label>
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
        </calcite-label>
        <calcite-label className="total">
          Permit Total
          <div>
            {" "}
            {totals.fees.planReview.value ? dollar.format(totals.total) : "--"}
          </div>
        </calcite-label>
        <div slot="footer-start">
          * only represents Building and Trade permit fees
      
        </div>
      </calcite-card>
      <calcite-alert kind="warning" autoCloseDuration="medium" autoClose  open={showDeleteModal} label="A report alert" oncalciteAlertClose={() => setShowDeleteModal(false)}>
        <div slot="title">{deleteTitle}</div>
        <div slot="message">{deleteMessage}</div>
      </calcite-alert>
      <calcite-dialog
        modal
        open={showModal}
        heading="Instructions"
        oncalciteDialogClose={() => setShowModal(false)}
      >
        <div>
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
            <calcite-link
              iconStart="link"
              href="https://www.raleighnc.gov/DevelopmentFeeSchedule"
              target="_blank"
            >
              Guide for Raleigh Development Fees
            </calcite-link>{" "}
            for more information. If you need additional assistance please feel
            free to email us at{" "}
            <calcite-link
              iconStart="envelope"
              href="mailto:ds.help@raleighnc.gov"
              target="_blank"
            >
              ds.help@raleighnc.gov
            </calcite-link>{" "}
            .
          </p>
        </div>
      </calcite-dialog>
    </div>
  );
}
const MemoizedBuildings = React.memo(Buildings);
export default MemoizedBuildings;
