import { useEffect, useRef, useState} from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-fab";

import "./RightOfWay.css";
import {
  CalciteButton,
  CalciteCard,
  CalciteCheckbox,
  CalciteFab,
  CalciteInput,
  CalciteLabel,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";
import React from "react";
import { fees } from "./assets/rightofwayConfig";
import { dollar } from "./assets/config";

function RightOfWay() {
  const [occupancies, setOccupancies] = useState(window.localStorage.getItem('occupancies') ? JSON.parse(window.localStorage.getItem('occupancies')) : [
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
  ]);
  const [config, setConfig] = useState(fees);
  const [totals, setTotals] = useState({
    totalPerDay: 0,
    totalProject: 0,
    projectReview: 0,
    maxPrimary: 0,
  });
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
    setOccupancies([
      ...occupancies.slice(0, i),
      ...occupancies.slice(i + 1),
    ]);
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
        console.log(occupancy.projectCost)
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
      window.localStorage.setItem('occupancies', JSON.stringify(occupancies));
  }, [occupancies])

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
                <span>{dollar.format(totals.totalProject + totals.projectReview)}</span>
            </CalciteLabel>               
        </div>
        {occupancies.map((item, i) => (
          <div key={`occupancy${i}`}>
            <div className="rightofway-row">
              <CalciteLabel>
                Classification
                <CalciteSelect
                  onCalciteSelectChange={(e) => classChanged(e, item)}
                >
                 {!item.occupancyClass && <CalciteOption value={""}></CalciteOption>}
                  {config.map((classification) => 
                    <CalciteOption
                      key={classification.class}
                      value={classification}
                    >
                      {classification.class}
                    </CalciteOption>
                  )}
                </CalciteSelect>
              </CalciteLabel>

              {item.occupancyClass && !item.occupancyClass.class.includes('Dumpster') &&<CalciteLabel>
                Linear Feet
                <CalciteInput
                  value={item.lf}
                  onCalciteInputInput={(e) => linearFeetChanged(e, item)}
                  type="number"
                  min="0"
                ></CalciteInput>
              </CalciteLabel>}
              {item.occupancyClass && item.occupancyClass.class.includes('Dumpster') &&<CalciteLabel>
                # of dumpsters
                <CalciteInput
                  value={item.dumpsters}
                  onCalciteInputInput={(e) => dumpstersChanged(e, item)}
                  type="number"
                  min="0"
                ></CalciteInput>
              </CalciteLabel>}              
             <CalciteLabel className={`${!item.occupancyClass ? 'hidden': null }`}   >
                Days
                <CalciteInput
                  value={item.days}
                  onCalciteInputInput={(e) => daysChanged(e, item)}
                  type="number"
                ></CalciteInput>
              </CalciteLabel>
              <CalciteLabel className={`${!item.occupancyClass ? 'hidden': null }`} layout="inline" alignment="end">
                Downtown Zone
                <CalciteCheckbox
                  checked={item.downtown ? true : undefined}
                  onCalciteCheckboxChange={(e) => downtownChanged(e, item)}
                ></CalciteCheckbox>
              </CalciteLabel>
              <CalciteFab className={`${!item.occupancyClass ? 'hidden': null }`}  icon="trash" onClick={e => removeRow(i)}></CalciteFab>
            </div>
          </div>
        ))}
        <CalciteButton onClick={addRow}>Add</CalciteButton>
      </CalciteCard>
    </div>
  );
}

export default RightOfWay;
