import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import {
  CalciteButton,
  CalciteLabel,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteOption,
  CalciteSelect,
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

    </>
  );
}

export default App;
