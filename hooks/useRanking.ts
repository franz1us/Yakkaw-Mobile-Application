import { useState } from "react";
import { Ranking_Data, Ranking_type } from "@/constants/Ranking_Data";

const useRanking = () => {
  const [filteredData, setFilteredData] = useState<Ranking_type[]>(() =>
    [...Ranking_Data].sort((a, b) => b.avg_pm25 - a.avg_pm25)
  );

  const handleFilter = (filteredResults: Ranking_type[]) => {
    const sortedResults = [...filteredResults].sort((a, b) => b.avg_pm25 - a.avg_pm25);
    setFilteredData(sortedResults);
  };

  return {
    filteredData,
    handleFilter,
  };
};

export default useRanking;
