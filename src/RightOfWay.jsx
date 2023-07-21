import React, { useEffect, useRef, useState } from "react";

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
  CalciteButton,
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
import { fees } from "./assets/rightofwayConfig";
import { dollar } from "./assets/config";

function RightOfWay(props) {
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
    const selectedItem = occupancies.find((i) => i.id === item.id);
    const updatedOccupancies = occupancies.map((old) =>
      old.id === selectedItem.id
        ? {
            ...old,
            dumpsters: parseInt(e.target.value),
          }
        : old
    );
    setOccupancies(updatedOccupancies);
  };
  const downtownChanged = (e, item) => {
    const selectedItem = occupancies.find((i) => i.id === item.id);
    const updatedOccupancies = occupancies.map((old) =>
      old.id === selectedItem.id
        ? {
            ...old,
            downtown: e.target.checked,
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
        if (occupancy.primaryCost >= totals.maxPrimary) {
          maxPrimary = occupancy.primaryCost;
          occupancy.totalCost = occupancy.primaryCost;
        } else {
          occupancy.totalCost = occupancy.secondaryCost;
          occupancy.projectCost = occupancy.totalCost * occupancy.days;
        }
        if (occupancy.occupancyClass.review >= totals.projectReview) {
          projectReview = occupancy.occupancyClass.review;
        }
        occupancy.projectCost = occupancy.totalCost * occupancy.days;
        totalPerDay = totalPerDay += occupancy.totalCost;
        console.log(occupancy.projectCost);
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
    props.totalUpdated(
      totals.totalProject + totals.projectReview,
      "rightofway"
    );
  }, [totals]);

  return (
    <div id="rightofway">
      <CalciteCard>
        <span slot="title">Right-of-Way Occupancy Calculator</span>
        <div className="rightofway-row rightofway-totals">
          <CalciteLabel>
            Project Total
            <span>{dollar.format(totals.totalProject)}</span>
          </CalciteLabel>
          <CalciteLabel>
            Project Review
            <span>{dollar.format(totals.projectReview)}</span>
          </CalciteLabel>
          <CalciteLabel>
            Total Due
            <span>
              {dollar.format(totals.totalProject + totals.projectReview)}
            </span>
          </CalciteLabel>
        </div>
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
                  onCalciteSelectChange={(e) => classChanged(e, item)}
                >
                  {!item.occupancyClass && (
                    <CalciteOption value={""}></CalciteOption>
                  )}
                  {config.map((classification) => (
                    <CalciteOption
                      key={classification.class}
                      value={classification}
                    >
                      {classification.class}
                    </CalciteOption>
                  ))}
                </CalciteSelect>
              </CalciteLabel>

              {item.occupancyClass &&
                !item.occupancyClass.class.includes("Dumpster") && (
                  <CalciteLabel>
                    Linear Feet
                    <CalciteInput
                      value={item.lf}
                      onCalciteInputInput={(e) => linearFeetChanged(e, item)}
                      type="number"
                      min="0"
                    ></CalciteInput>
                  </CalciteLabel>
                )}
              {item.occupancyClass &&
                item.occupancyClass.class.includes("Dumpster") && (
                  <CalciteLabel>
                    # of dumpsters
                    <CalciteInput
                      value={item.dumpsters}
                      onCalciteInputInput={(e) => dumpstersChanged(e, item)}
                      type="number"
                      min="0"
                    ></CalciteInput>
                  </CalciteLabel>
                )}
              <CalciteLabel
                className={`${!item.occupancyClass ? "hidden" : null}`}
              >
                Days
                <CalciteInput
                  value={item.days}
                  onCalciteInputInput={(e) => daysChanged(e, item)}
                  type="number"
                ></CalciteInput>
              </CalciteLabel>
              <CalciteLabel
                className={`${!item.occupancyClass ? "hidden" : null}`}
                layout="inline"
                alignment="end"
              >
                Downtown Zone
                <CalciteCheckbox
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
