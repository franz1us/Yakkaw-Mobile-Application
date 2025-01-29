import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ranking_type } from "@/constants/Ranking_Data";
import { router } from "expo-router";


interface RankingItemProps {
  item: Ranking_type;
}

const RankingItem: React.FC<RankingItemProps> = ({ item }) => {
  const route = router;

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
          <Text style={styles.locationName}>{item.context_status}</Text>
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

          {/* Image Below Heart */}
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
