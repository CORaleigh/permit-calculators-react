import { useCallback, useEffect, useRef, useState } from "react";
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-dialog";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import "@esri/calcite-components/components/calcite-option";
import "@esri/calcite-components/components/calcite-select";

import "./App";
import "./App.css"

import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router";
import Buildings from "./Buildings/Buildings";
import OpenSpace from "./OpenSpace/OpenSpace";
import Stormwater from "./Stormwater/Stormwater";
import Thoroughfare from "./Thoroughfare/Thoroughfare";
import RightOfWay from "./RightOfWay/RightOfWay";
import Water from "./Water/Water";

import Home from "./Home/Home";
import { dollar } from "./config";
import Summary from "./Summary/Summary";

function App() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoute, setSelectedRoute] = useState();
  const [showModal, setShowModal] = useState(true);

const total = useRef();
useEffect(() => {
  const totals = window.localStorage.getItem('permit-calculator-totals');
  if (totals) {
    total.current = JSON.parse(totals);
  } else {
    total.current = {  openspace: 0,
      building: 0,
      stormwater: 0,
      thoroughfare: 0,
      rightofway: 0,
      total: 0
    }}
    totalRef.current.innerHTML = 'Total Fees '  + dollar.format(total.current.total);

  }, [])

const totalRef = useRef(null);
const [reset, setReset] = useState(false);
const [inStorage, setInStorage] = useState(false);
const resetCalculator = () => {
  window.localStorage.clear();
  total.current = {  openspace: 0,
    building: 0,
    stormwater: 0,
    thoroughfare: 0,
    rightofway: 0,
    total: 0
  };
  totalRef.current.innerHTML = 'Total Fees ' + dollar.format(0);  
  setReset(prev => !prev);
}
const updateTotal = useCallback((value, key) => {
  if (total.current && key) {
  
    total.current[key] = value
    total.current.total = total.current.openspace + total.current.building + total.current.stormwater + total.current.thoroughfare + total.current.rightofway;// + total.current.water;
    totalRef.current.innerHTML = 'Total Fees ' + dollar.format(total.current.total);
    window.localStorage.setItem('permit-calculator-totals', JSON.stringify(total.current));
  }

},[total]);

useEffect(() => {
  if(window.localStorage.getItem('permit-calculator-totals')) {
    setInStorage(true);
  }
}, [])
  const BuildingsNav = () => {
    return <Buildings totalUpdated={updateTotal}></Buildings>;
  };
  const OpenSpaceNav = () => {
    return <OpenSpace totalUpdated={updateTotal}></OpenSpace>;
  };
  const StormwaterNav = () => {
    return <Stormwater  totalUpdated={updateTotal}></Stormwater>;
  };
  const ThoroughfareNav = () => {
    return <Thoroughfare totalUpdated={updateTotal}></Thoroughfare>;
  };
  const RightOfWayNav = () => {
    return <RightOfWay  totalUpdated={updateTotal}></RightOfWay>;
  };
  const SummaryNav = () => {
    return <Summary></Summary>;
  };  
  const WaterNav = () => {
    return <Water  totalUpdated={updateTotal}></Water>;
  };  
  const HomeNav = () => {
    return <Home></Home>;
  };

  return (
    <>
      <calcite-navigation slot="header">
        <calcite-navigation-logo
          slot="logo"
          heading="Development Fee Calculator"
          thumbnail="https://raleighnc.gov/themes/custom/cityofraleigh/logo.svg"
        ></calcite-navigation-logo>
      </calcite-navigation>
      <div className="subheader">
      <calcite-label id="selectLabel" scale="l" alignment="center">
        Select a calculator
        <calcite-select
        scale="l"
        id="routeSelect"
        oncalciteSelectChange={(e) => {
          navigate(e.target.selectedOption.value);
        }}
      >
        <calcite-option value="/" selected={location.pathname === "/"}>
        </calcite-option>
        <calcite-option
          value="/building"
          selected={location.pathname === "/building"}
        >
          Buildings
        </calcite-option>
        <calcite-option
          value="/stormwater"
          selected={location.pathname === "/stormwater"}
        >
          Stormwater
        </calcite-option>

        <calcite-option
          value="/openspace"
          selected={location.pathname === "/openspace"}
        >
          Open Space
        </calcite-option>
        <calcite-option
          value="/thoroughfare"
          selected={location.pathname === "/thoroughfare"}
        >
          Thoroughfare
        </calcite-option>
        <calcite-option
          value="/rightofway"
          selected={location.pathname === "/rightofway"}
        >
          Right-of-Way
        </calcite-option>   
        {/* <calcite-option
          value="/raleighwater"
          selected={location.pathname === "/raleighwater"}
        >
          Water
        </calcite-option>          */}
        <calcite-option
          value="/summary"
          selected={location.pathname === "/summary"}
        >
          Summary
        </calcite-option>           

      </calcite-select>        
      </calcite-label>
      
      </div>
    

      <calcite-label id="total" scale="l">
         <span ref={totalRef}>Total Fees {dollar.format(0)}</span>
        </calcite-label>  
      <Routes>
        <Route path="/" element={<HomeNav />}></Route>
        <Route path="/building" element={<BuildingsNav />}></Route>
        <Route path="/openspace" element={<OpenSpaceNav />}></Route>
        <Route path="/stormwater" element={<StormwaterNav />}></Route>
        <Route path="/thoroughfare" element={<ThoroughfareNav />}></Route>
        <Route path="/rightofway" element={<RightOfWayNav />}></Route>
        {/* <Route path="/raleighwater" element={<WaterNav />}></Route> */}
        <Route path="/summary" element={<SummaryNav />}></Route>

      </Routes>
      <calcite-button scale="l" width="full" iconStart="reset" onClick={resetCalculator}>Reset Calculators</calcite-button>
      <calcite-dialog modal open={showModal} heading="Disclaimer" oncalciteDialogClose={() => setShowModal(false)}>
        <div>
          This calculator is made available by the City of Raleigh for informational and planning purposes only and may not reflect the final cost to obtain plan review, building and trade permits. By using this calculator you understand that the fee details provided are estimates based on the information entered and the final calculation of fees will be provided by the Development Services Customer Services Center.
          <div>
          &nbsp;
          { inStorage && <calcite-button scale="l" width="full" onClick={() => setShowModal(false)}>Resume Calculation</calcite-button>}&nbsp;
          { inStorage && <calcite-button scale="l" width="full" onClick={() => {window.localStorage.clear();resetCalculator(); setShowModal(false);}}>New Calculation</calcite-button>}
          { !inStorage && <calcite-button scale="l" width="full" onClick={() => setShowModal(false)}>Agree</calcite-button>}        
        </div>
        </div>

      </calcite-dialog>  
    </>
  );
}

export default App;
