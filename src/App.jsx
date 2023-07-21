import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-button";

import {
  CalciteButton,
  CalciteLabel,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteOption,
  CalciteSelect,
  CalciteModal
} from "@esri/calcite-components-react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Buildings from "./Buildings";
import OpenSpace from "./OpenSpace";
import Stormwater from "./Stormwater";
import Thoroughfare from "./Thoroughfare";
import RightOfWay from "./RightOfWay";
import Home from "./Home";
import Total from "./Total";
import { dollar } from "./assets/config";


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
  if (value && key) {
    total.current[key] = value
    total.current.total = total.current.openspace + total.current.building + total.current.stormwater + total.current.thoroughfare + total.current.rightofway;
    totalRef.current.innerHTML = 'Total Fees ' + dollar.format(total.current.total);
    window.localStorage.setItem('permit-calculator-totals', JSON.stringify(total.current));
  }

},[total]);
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
  const HomeNav = () => {
    return <Home></Home>;
  };

  return (
    <>
      <CalciteNavigation slot="header">
        <CalciteNavigationLogo
          slot="logo"
          heading="Permit Calculators"
          thumbnail="https://raleighnc.gov/themes/custom/cityofraleigh/logo.svg"
        ></CalciteNavigationLogo>
      </CalciteNavigation>

    
      <CalciteSelect
        id="routeSelect"
        onCalciteSelectChange={(e) => {
          navigate(e.target.selectedOption.value);
        }}
      >
        <CalciteOption value="/" selected={location.pathname === "/"}>
          Home
        </CalciteOption>
        <CalciteOption
          value="/buildings"
          selected={location.pathname === "/buildings"}
        >
          Buildings
        </CalciteOption>
        <CalciteOption
          value="/stormwater"
          selected={location.pathname === "/stormwater"}
        >
          Stormwater
        </CalciteOption>

        <CalciteOption
          value="/openspace"
          selected={location.pathname === "/openspace"}
        >
          Open Space
        </CalciteOption>
        <CalciteOption
          value="/thoroughfare"
          selected={location.pathname === "/thoroughfare"}
        >
          Thoroughfare
        </CalciteOption>
        <CalciteOption
          value="/rightofway"
          selected={location.pathname === "/rightofway"}
        >
          Right-of-Way
        </CalciteOption>   

      </CalciteSelect>

      <CalciteLabel id="total" scale="l">
         <span ref={totalRef}>Total Fees {dollar.format(0)}</span>
        </CalciteLabel>  
      <Routes>
        <Route path="/" element={<HomeNav />}></Route>
        <Route path="/buildings" element={<BuildingsNav />}></Route>
        <Route path="/openspace" element={<OpenSpaceNav />}></Route>
        <Route path="/stormwater" element={<StormwaterNav />}></Route>
        <Route path="/thoroughfare" element={<ThoroughfareNav />}></Route>
        <Route path="/rightofway" element={<RightOfWayNav />}></Route>

      </Routes>
      <CalciteButton scale="l" width="full" iconStart="reset" onClick={resetCalculator}>Reset Calculators</CalciteButton>
      <CalciteModal open={showModal ? true : undefined} aria-labelledby="intro-title">
        <div slot="header" id="intro-title">
          Disclaimer
        </div>
        <div slot="content">
          This calculator is made available by the City of Raleigh for informational and planning purposes only and may not reflect the final cost to obtain plan review, building and trade permits. By using this calculator you understand that the fee details provided are estimates based on the information entered and the final calculation of fees will be provided by the Development Services Customer Services Center.
        </div>
        <div slot="content-bottom">
          <CalciteButton scale="l" width="full" onClick={() => setShowModal(false)}>Agree</CalciteButton>
        </div>
      </CalciteModal>  
    </>
  );
}

export default App;
