import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ranking_type } from "@/constants/Ranking_Data";
import { router } from "expo-router";
import axios from "axios";
import { format } from "date-fns";


interface RankingItemProps {
  item: Ranking_type;
}

const RankingItem: React.FC<RankingItemProps> = ({ item }) => {
  const [dataRanking, setDataranking] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const API_URL = "https://yakkaw.mfu.ac.th/api/yakkaw/devices";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.status === 200 && response.data.response) {
          const today = format(new Date(), "yyyy-MM-dd");
  
         
          const filteredData = response.data.response
            .filter((item: any) => {
              return (
                item.status === "Active" &&
                item.ddate === today && 
                item.latitude &&
                item.longitude &&
                item.pm25 !== null &&
                item.temperature !== null &&
                item.trend !== null
              );
            })
            .map((item: any) => ({
              id: item.dvid,
              place: item.place || "Unknown",
              pm25: item.pm25 ?? 0,
              temperature: item.temperature ?? "N/A",
              trend: item.trend || "No Trend",
              ddate: item.ddate,
              dtime: format(new Date(`${item.ddate} ${item.dtime}`), "hh:mm a"),
            }));
  
          setDataranking(filteredData);
          console.log(response);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if(loading){
    return <ActivityIndicator size="large" color="#000ff"/>
  }

  if(error){
    return <Text>{error}</Text>
  }


  return (
    <TouchableOpacity
      style={styles.ContainerItem}
      onPress={() => router.push({ pathname: "/Station", params: { Station: JSON.stringify(item) } })}
    >
      <View style={styles.ItemContainer}>
        <View style={styles.LeftContainer}>
          <View
            style={[
              styles.Circle,
              {
                borderColor:
                  item.pm25_6hr > 100
                    ? "#FF8787"
                    : item.pm25_6hr > 50
                    ? "#FFFFA8"
                    : item.pm25_6hr > 30
                    ? "#BFFFA1"
                    : "#C1E5FF",
                backgroundColor:
                  item.pm25_6hr > 100
                    ? "red"
                    : item.pm25_6hr > 50
                    ? "#FFFF00"
                    : item.pm25_6hr > 30
                    ? "#38B000"
                    : "#2EA8FF",
              },
              {},
            ]}
          >
            <Text
              style={[
                styles.Text_circle,
                {
                  color:
                    item.avg_pm25 > 100
                      ? "white"
                      : item.avg_pm25 > 50
                      ? "black"
                      : item.avg_pm25 > 30
                      ? "white"
                      : "white",
                },
              ]}
            >
              6 hours
            </Text>
            <Text
              style={[
                styles.big_textcircle,
                {
                  color:
                    item.avg_pm25 > 100
                      ? "white"
                      : item.avg_pm25 > 50
                      ? "black"
                      : item.avg_pm25 > 30
                      ? "white"
                      : "white",
                },
              ]}
            >
              {item.pm25_6hr}
            </Text>
            <Text
              style={[
                styles.Text_circle,
                {
                  color:
                    item.avg_pm25 > 100
                      ? "white"
                      : item.avg_pm25 > 50
                      ? "black"
                      : item.avg_pm25 > 30
                      ? "white"
                      : "white",
                },
              ]}
            >
              ug/m³
            </Text>
            <Text
              style={[
                styles.Text_circle,
                {
                  color:
                    item.avg_pm25 > 100
                      ? "white"
                      : item.avg_pm25 > 50
                      ? "black"
                      : item.avg_pm25 > 30
                      ? "white"
                      : "white",
                },
              ]}
            >
              {item.temperature}°C
            </Text>
          </View>
          <Text style={styles.locationName}>Status</Text>
        </View>

        <View style={styles.CenterContainer}>
          <View>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.Avg_text2}>
              {item.date} {item.time} PM
            </Text>
          </View>
          <Text style={styles.locationName}>Average</Text>

          <View style={styles.Average_Container}>
            <View style={styles.Average_Item}>
              <View
                style={[
                  styles.Average_Item1,
                  {
                    borderColor:
                      item.pm25_6hr > 100
                        ? "#FF8787"
                        : item.pm25_6hr > 50
                        ? "#FFFFA8"
                        : item.pm25_6hr > 30
                        ? "#BFFFA1"
                        : "#C1E5FF",
                    backgroundColor:
                      item.pm25_6hr > 100
                        ? "red"
                        : item.pm25_6hr > 50
                        ? "#FFFF00"
                        : item.pm25_6hr > 30
                        ? "#38B000"
                        : "#2EA8FF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:
                        item.avg_pm25 > 100
                          ? "white"
                          : item.avg_pm25 > 50
                          ? "black"
                          : item.avg_pm25 > 30
                          ? "white"
                          : "white",
                    },
                  ]}
                >
                  {item.pm25_now}
                </Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>Now</Text>
              </View>
            </View>
            <View style={styles.Average_Item}>
              <View
                style={[
                  styles.Average_Item1,
                  {
                    borderColor:
                      item.pm25_6hr > 100
                        ? "#FF8787"
                        : item.pm25_6hr > 50
                        ? "#FFFFA8"
                        : item.pm25_6hr > 30
                        ? "#BFFFA1"
                        : "#C1E5FF",
                    backgroundColor:
                      item.pm25_6hr > 100
                        ? "red"
                        : item.pm25_6hr > 50
                        ? "#FFFF00"
                        : item.pm25_6hr > 30
                        ? "#38B000"
                        : "#2EA8FF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:
                        item.avg_pm25 > 100
                          ? "white"
                          : item.avg_pm25 > 50
                          ? "black"
                          : item.avg_pm25 > 30
                          ? "white"
                          : "white",
                    },
                  ]}
                >
                  {item.pm25_now}
                </Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>3 hours</Text>
              </View>
            </View>
            <View style={styles.Average_Item}>
              <View
                style={[
                  styles.Average_Item1,
                  {
                    borderColor:
                      item.pm25_6hr > 100
                        ? "#FF8787"
                        : item.pm25_6hr > 50
                        ? "#FFFFA8"
                        : item.pm25_6hr > 30
                        ? "#BFFFA1"
                        : "#C1E5FF",
                    backgroundColor:
                      item.pm25_6hr > 100
                        ? "red"
                        : item.pm25_6hr > 50
                        ? "#FFFF00"
                        : item.pm25_6hr > 30
                        ? "#38B000"
                        : "#2EA8FF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:
                        item.avg_pm25 > 100
                          ? "white"
                          : item.avg_pm25 > 50
                          ? "black"
                          : item.avg_pm25 > 30
                          ? "white"
                          : "white",
                    },
                  ]}
                >
                  {item.pm25_now}
                </Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>6 hours</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.locationName}>Trend {item.trend}</Text>
          </View>
        </View>

        <TouchableOpacity
            // onPress={() => toggleFavorite(item.id)}
            style={styles.favoriteIcon}
          >
            <AntDesign
              name={item.favorite ? "heart" : "hearto"}
              size={24}
              color={item.favorite ? "red" : "gray"}
            />
          </TouchableOpacity>

          
          <Image
            source={{
              uri: "https://cdn-cm.freepik.com/resources/0ec440c7-ee7a-4d91-a28b-7423d74fe104.jpg?token=exp=1738057225~hmac=f58fb15da534ad5329a8788ab97b9f14a5589d47247705c194cf99d263e19171", // Replace with your image URL
            }}
            style={styles.itemImage}
          />
      </View>
    </TouchableOpacity>
  );
};


























const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "white",
    },
    ContainerItem: {
      flexDirection: "row",
      padding: 15,
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      elevation: 3,
    },
    ItemContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    Circle: {
      justifyContent: "center",
      alignItems: "center",
      width: 110,
      height: 110,
      borderRadius: 100,
      borderWidth: 6,
    },
    LeftContainer: {
      alignItems: "center",
    },
    CenterContainer: {
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal: 10,
      width: 180,
    },
    RightContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    Average_Container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 10,
    },
    Average_Item: {
      justifyContent: "center",
      alignItems: "center",
    },
    Average_Item1: {
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      backgroundColor: "#FF2C2C",
      borderRadius: 15,
      padding: 5,
      marginHorizontal: 3,
    },
    Avg_text1: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
    Avg_text2: {
      color: "#AEAEAE",
      fontSize: 14,
      fontWeight: "600",
    },
    Average_Item2: {
      marginTop: 2,
      alignItems: "center",
    },
  
    locationName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    emptyText: {
      textAlign: "center",
      color: "#888",
      marginTop: 20,
      fontSize: 16,
    },
    Topic: {
      fontWeight: "bold",
      fontSize: 15,
      marginLeft: 10,
      marginTop: 10,
    },
  
    Text_circle: {
      fontSize: 13,
      fontWeight: "500",
    },
    big_textcircle: {
      fontWeight: "bold",
      fontSize: 22,
    },
    favoriteIcon: {
      position: "absolute",
      top: -10,
      right: -10,
      padding: 5,
    },
    itemImage: {
      width: 50,
      height: 50,
      marginTop: 25, 
      borderRadius: 10,
    },
  });
  

export default RankingItem;
