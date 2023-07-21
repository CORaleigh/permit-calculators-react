import { useState } from "react";



const useCalculations = () => {
    const [rightofwayOccupancies, setRightofwayOccupancies] = useState([
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
      const [rightofwayTotals, setRightofwayTotals] = useState({
        totalPerDay: 0,
        totalProject: 0,
        projectReview: 0,
        maxPrimary: 0,
      });      
  return {
    rightofwayOccupancies, setRightofwayOccupancies,rightofwayTotals, setRightofwayTotals
  };
};
export default useCalculations;
