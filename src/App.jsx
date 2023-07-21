import { useState, useRef, useCallback } from "react";

import "./App.css";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import {
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



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoute, setSelectedRoute] = useState();

  const BuildingsNav = () => {
    return <Buildings></Buildings>;
  };
  const OpenSpaceNav = () => {
    return <OpenSpace></OpenSpace>;
  };
  const StormwaterNav = () => {
    return <Stormwater></Stormwater>;
  };
  const ThoroughfareNav = () => {
    return <Thoroughfare></Thoroughfare>;
  };
  const RightOfWayNav = () => {
    return <RightOfWay></RightOfWay>;
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
      <Routes>
        <Route path="/" element={<HomeNav />}></Route>
        <Route path="/buildings" element={<BuildingsNav />}></Route>
        <Route path="/openspace" element={<OpenSpaceNav />}></Route>
        <Route path="/stormwater" element={<StormwaterNav />}></Route>
        <Route path="/thoroughfare" element={<ThoroughfareNav />}></Route>
        <Route path="/rightofway" element={<RightOfWayNav />}></Route>

      </Routes>
    </>
  );
}

export default App;
