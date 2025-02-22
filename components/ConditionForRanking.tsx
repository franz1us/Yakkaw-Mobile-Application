import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const ConditionRankingStyles = (av6h: number) => {
    return {
      borderColor:
        av6h >= 91 ? "#FF8787"
          : av6h >= 51 ? "#FFD68B"
          : av6h >= 38 ? "#FFFFA8"
          : av6h >= 26 ? "#BFFFA1"
          : "#C1E5FF",
  
      backgroundColor:
        av6h >= 91 ? "#FF2C2C"
          : av6h >= 51 ? "#FFA500"
          : av6h >= 38 ? "#F0F000"
          : av6h >= 26 ? "#38B000"
          : "#2EA8FF",
  
      textColor:
        av6h >= 91 ? "white"
          : av6h >= 51 ? "black"
          : av6h >= 38 ? "black"
          : "white",
    };
  };

export const Status = (av6h: number) => {
    if (av6h >= 91) return "Dangerous";
    if (av6h >= 51) return "Unhealthy";
    if (av6h >= 38) return "Moderate";
    if (av6h >= 26) return "Good";
    return "Excellent";
  };
  
export const trendArrow = (trend: string) => {
    if (trend === "d") return <MaterialIcons name="trending-down" size={20} color="green" />;
    if (trend === "u") return <MaterialIcons name="trending-up" size={20} color="red" />;
    if (trend === "e") return <MaterialIcons name="trending-flat" size={20} color="gray" />;
    return null;
  };

export const trendArrowStation = (trend: string) => {
    if (trend === "d") return <MaterialIcons name="trending-down" size={30} color="green" />;
    if (trend === "u") return <MaterialIcons name="trending-up" size={30} color="red" />;
    if (trend === "e") return <MaterialIcons name="trending-flat" size={30} color="gray" />;
    return null;
  };
  
export const imageStatus = (av6h: number) => {
    if (av6h >= 91) return require('../assets/images/Dangerous.png');
    if (av6h >= 51) return require('../assets/images/Unhealthy.png');
    if (av6h >= 38) return require('../assets/images/Moderate.png');
    if (av6h >= 26) return require('../assets/images/Good.png');
    return require('../assets/images/Excellent.png');
  };

export const getPM25Status = (pm25: number) => {
  if (pm25 >= 91) return "Dangerous";
  if (pm25 >= 51) return "Unhealthy";
  if (pm25 >= 38) return "Moderate";
  if (pm25 >= 26) return "Good";
  return "Excellent";
  };
  
export const getPM25Color = (pm25: number) => {
    if (pm25 >= 91) return "#FF2C2C";
    if (pm25 >= 51) return "#FFA500";
    if (pm25 >= 38) return "#F0F000";
    if (pm25 >= 26) return "#38B000";
    return "#2EA8FF";
  };
  