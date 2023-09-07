import React from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-fab";
import "@esri/calcite-components/dist/components/calcite-link";
import "@esri/calcite-components/dist/components/calcite-modal";

import "./RightOfWay.css";
import {
  CalciteCard,
  CalciteCheckbox,
  CalciteFab,
  CalciteInput,
  CalciteLabel,
  CalciteLink,
  CalciteOption,
  CalciteSelect,
  CalciteModal,
} from "@esri/calcite-components-react";
import { dollar } from "../config";
import useRightOfWay from "./useRightOfWay";

function RightOfWay({ totalUpdated }) {
  const {
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
  } = useRightOfWay({ totalUpdated });

  return (
    <div id="rightofway">
      <CalciteCard>
        <span slot="title">Right-of-Way Occupancy Calculator</span>
        <div className="rightofway-row rightofway-totals">
          <CalciteLabel>
            Project Total
            <div>{dollar.format(totals.totalProject)}</div>
          </CalciteLabel>
          <CalciteLabel>
            Project Review
            <div>{dollar.format(totals.projectReview)}</div>
          </CalciteLabel>
          <CalciteLabel>
            Total Due
            <div>
              {dollar.format(totals.totalProject + totals.projectReview)}
            </div>
          </CalciteLabel>
        </div>
        <div ref={mapDiv}></div>
        <div ref={legendDiv}></div>

        <CalciteLink
          iconStart="information"
          onClick={() => setShowModal((prev) => !prev)}
        >
          View Definitions
        </CalciteLink>
        {occupancies.map((item, i) => (
          <div key={`occupancy${i}`}>
            <div className="rightofway-row">
              <CalciteLabel>
                Classification
                <CalciteSelect
                  scale="l"
                  onCalciteSelectChange={(e) => classChanged(e, item)}
                >
                  {!item.occupancyClass && (
                    <CalciteOption value={""}></CalciteOption>
                  )}
                  {config.map((classification) => (
                    <CalciteOption
                      key={classification.class}
                      value={classification}
                      disabled={
                        !item.downtown ||
                        (classification.major && item.downtown)
                          ? undefined
                          : true
                      }
                      selected={item.occupancyClass === classification}
                    >
                      {classification.class}
                    </CalciteOption>
                  ))}
                </CalciteSelect>
              </CalciteLabel>
              {!item.occupancyClass?.class.includes("Dumpster") && (
                <CalciteLabel>
                  Linear Feet
                  <CalciteInput
                    scale="l"
                    value={item.lf}
                    onCalciteInputInput={(e) => linearFeetChanged(e, item)}
                    type="number"
                    min="0"
                  ></CalciteInput>
                </CalciteLabel>
              )}
              {item.occupancyClass?.class.includes("Dumpster") && (
                <CalciteLabel>
                  # of dumpsters
                  <CalciteInput
                    scale="l"
                    value={item.dumpsters}
                    onCalciteInputInput={(e) => dumpstersChanged(e, item)}
                    type="number"
                    min="0"
                  ></CalciteInput>
                </CalciteLabel>
              )}
              <CalciteLabel>
                Days
                <CalciteInput
                  scale="l"
                  value={item.days}
                  onCalciteInputInput={(e) => daysChanged(e, item)}
                  type="number"
                  min={0}
                ></CalciteInput>
              </CalciteLabel>
              <CalciteLabel layout="inline" alignment="end">
                Downtown Zone
                <CalciteCheckbox
                  scale="l"
                  checked={item.downtown ? true : undefined}
                  onCalciteCheckboxChange={(e) => downtownChanged(e, item)}
                ></CalciteCheckbox>
              </CalciteLabel>
              <CalciteFab
                className={`${!item.occupancyClass ? "hidden" : null}`}
                icon="trash"
                onClick={(e) => removeRow(i)}
              ></CalciteFab>
            </div>
          </div>
        ))}

        <CalciteFab icon="plus" onClick={addRow}>
          Add
        </CalciteFab>
      </CalciteCard>
      <CalciteModal
        open={showModal ? true : undefined}
        aria-labelledby="definitions-title"
        onCalciteModalClose={() => setShowModal((prev) => !prev)}
      >
        <div slot="header" id="definitions-title">
          Right-of-Way Occupancy Fee Definitions
        </div>
        <div slot="content">
          <div>
            <u>Primary Occupancy</u>: The requested occupancy for single
            occupancy requests or the highest per day fee rate for multiple
            occupancy requests
          </div>
          <div>
            <u>Secondary Occupancy</u>: Any occupancy other than the primary
            occupancy in multiple occupacy requests
          </div>
          <div>
            <u>Major Street</u>: Any street labeled as a Major Street or divided
            street (turn lane or median) per the Raleigh Street Plan and any
            streets within the DX zoning
          </div>
          <div>
            <u>Minor Street</u>: Any street not fitting the Major Street
            category
          </div>
          <div>
            <u>Full Street</u>: The occupying of a public street (curb to curb
            or edge-of-pavement to edge-of-pavement) such that no access is
            provided to the existing street for general vehicular traffic
          </div>
          <div>
            <u>Street Lane</u>: The occupying of a public street travel lane
            such that limited access is provided to the existing street for
            general vehicular traffic
          </div>
          <div>
            <u>Parking Lane</u>: The occupying of an public on-street parking
            lane (either metered or not) that restricts use of said lane for
            general vehicular traffic
          </div>
          <div>
            <u>Sidewalk - Full</u>: The occupying of a public sidewalk such that
            no access is provided to the existing sidewalk for general
            pedestrian traffic
          </div>
          <div>
            <u>Sidewalk - AUX</u>: The occupying of a public sidewalk such that
            no access is provided to the existing sidewalk for general
            pedestrian traffic, but supplementary or alternative means such as
            cargo containers, scaffolding, and temporarily constructed
            boardwalks/paths are provided to faciliate continued pedestrian
            movement through or adjacent to the occupied sidewalk
          </div>
          <div>
            <u>Sidewalk - Partial</u>: The occupying of a public sidewalk such
            that limited, ADA- and PROWAG-compliant access is provided to the
            existing sidewalk utilizing means such as barricades and traffic
            cones
          </div>
          <div>
            <u>Misc - Dumpster/Pod</u>: Placement of a dumpster or pod within
            the public right-of-way. When placement occurs within metered
            on-street parking, a daily parking space rental fee paid to ParkLink
            is applicable.
          </div>
          <div>
            <u>Review Fee</u>: Shall be the highest applicable review fee per
            request
          </div>
          <div>
            <u>Permit Fee</u>:
          </div>
          <div>
            Primary Occupancy - Base rate (for up to 150 LF) + Primary rate x
            the linear footage (&gt;150 LF)
          </div>
          <div>Seconday Occupancy - Secondary rate x total linear footage</div>
        </div>
      </CalciteModal>
    </div>
  );
}

export default React.memo(RightOfWay);
