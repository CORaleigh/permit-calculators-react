import React from "react";
import "@esri/calcite-components/components/calcite-card";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-fab";
import "@esri/calcite-components/components/calcite-input";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-link";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-dialog";
import "@esri/calcite-components/components/calcite-select";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-legend";

import "./RightOfWay.css";
import { dollar, inputValue, mapPopup } from "../config";
import useRightOfWay from "./useRightOfWay";


function RightOfWay({ totalUpdated }) {
  const {
    occupancies,
    fees,
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
    webMapId,
    searchSources
  } = useRightOfWay({ totalUpdated });

  return (
    <div id="rightofway">
      <calcite-card>
        <span slot="heading">Right-of-Way Occupancy Calculator</span>
        <div className="rightofway-row rightofway-totals">
          <calcite-label>
            Project Total
            <div>{dollar.format(totals.totalProject)}</div>
          </calcite-label>
          <calcite-label>
            Project Review
            <div>{dollar.format(totals.projectReview)}</div>
          </calcite-label>
          <calcite-label>
            Total Due
            <div>
              {dollar.format(totals.totalProject + totals.projectReview)}
            </div>
          </calcite-label>
        </div>
        <arcgis-map itemId={webMapId} popup={mapPopup}>
          <arcgis-search
            slot="top-right"
            includeDefaultSourcesDisabled
            sources={searchSources}
          ></arcgis-search>
          <arcgis-expand slot="bottom-left" expandTooltip="Legend">
            <arcgis-legend></arcgis-legend>
          </arcgis-expand>
        </arcgis-map>

        <calcite-link
          iconStart="information"
          onClick={() => setShowModal((prev) => !prev)}
        >
          View Definitions
        </calcite-link>
        {occupancies.map((item, i) => (
          <div key={`occupancy${i}`}>
            <div className="rightofway-row">
              <calcite-label>
                Classification
                <calcite-select
                  scale="l"
                  oncalciteSelectChange={(e) => classChanged(e, item)}
                >
                  {!item.occupancyClass && (
                    <calcite-option value={""}></calcite-option>
                  )}
                  {fees.map((classification) => (
                    <calcite-option
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
                    </calcite-option>
                  ))}
                </calcite-select>
              </calcite-label>
              {!item.occupancyClass?.class.includes("Dumpster") && (
                <calcite-label>
                  Linear Feet
                  <calcite-input
                    scale="l"
                    value={inputValue(item.lf)}
                    oncalciteInputInput={(e) => linearFeetChanged(e, item)}
                    type="number"
                    min="0"
                  ></calcite-input>
                </calcite-label>
              )}
              {item.occupancyClass?.class.includes("Dumpster") && (
                <calcite-label>
                  # of dumpsters
                  <calcite-input
                    scale="l"
                    value={inputValue(item.dumpsters)}
                    oncalciteInputInput={(e) => dumpstersChanged(e, item)}
                    type="number"
                    min="0"
                  ></calcite-input>
                </calcite-label>
              )}
              <calcite-label>
                Days
                <calcite-input
                  scale="l"
                  value={inputValue(item.days)}
                  oncalciteInputInput={(e) => daysChanged(e, item)}
                  type="number"
                  min={0}
                ></calcite-input>
              </calcite-label>
              <calcite-label layout="inline" alignment="end">
                Downtown Zone
                <calcite-checkbox
                  scale="l"
                  checked={!!item.downtown}
                  oncalciteCheckboxChange={(e) => downtownChanged(e, item)}
                ></calcite-checkbox>
              </calcite-label>
              <calcite-fab
                className={`${!item.occupancyClass ? "hidden" : null}`}
                icon="trash"
                onClick={() => removeRow(i)}
              ></calcite-fab>
            </div>
          </div>
        ))}

        <calcite-fab icon="plus" onClick={addRow}>
          Add
        </calcite-fab>
      </calcite-card>
      <calcite-dialog
        modal
        open={showModal}
        heading="Right-of-Way Occupancy Fee Definitions"
        oncalciteDialogClose={() => setShowModal(false)}
      >
        <div>
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
      </calcite-dialog>
    </div>
  );
}

const MemoizedRightOfWay = React.memo(RightOfWay);
export default MemoizedRightOfWay;