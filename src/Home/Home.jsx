import React, { useState, createContext } from "react";

import Tile from "../Tile/Tile";

function Home() {
  return <>
  <div className="grid">
  <Tile title="BUILDING PERMIT FEES" icon="./building.svg" path="buildings"></Tile>
  <Tile title="STORMWATER FEES" icon="./stormwater.svg" path="stormwater"></Tile>
  <Tile title="OPEN SPACE FEES" icon="./openspace.svg" path="openspace"></Tile>
  <Tile title="THOROUGHFARE FEES" icon="./thoroughfare.svg" path="thoroughfare"></Tile>
  <Tile title="RIGHT-OF-WAY OCCUPANCY FEES" icon="./rightofway.svg" path="rightofway"></Tile>
  <Tile title="RALEIGH WATER FEES" icon="./water.svg" path="water"></Tile>
  </div>
  </>;
}

export default Home;
