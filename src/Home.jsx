import { useState, createContext } from "react";

import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import {
    CalciteCard,
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteOption,
  CalciteSelect,
} from "@esri/calcite-components-react";


function Home() {


  return (
    <>
      <CalciteCard>
        
        <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/280/200"/>
        <span slot="title">Buildings</span>

      </CalciteCard>
    </>
  );
}

export default Home;
