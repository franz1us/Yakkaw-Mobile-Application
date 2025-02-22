import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ranking_type } from "@/constants/Ranking_Data";
import { router } from "expo-router";
import { ConditionRankingStyles, Status, trendArrow,imageStatus} from "./ConditionForRanking";

interface RankingItemProps {
  item: Ranking_type;
}

const RankingItem: React.FC<RankingItemProps> = ({ item }) => {
  const styleCondition =  ConditionRankingStyles(item.av6h);

  return (
    <TouchableOpacity
      style={styles.ContainerItem}
      onPress={() =>
        router.push({
          pathname: "/Station",
          params: { Station: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.ItemContainer}>
        <View style={styles.LeftContainer}>
          <View
            style={[
              styles.Circle,{
                borderColor:styleCondition.borderColor,
                backgroundColor:styleCondition.backgroundColor
              },
            ]}
          >
            <Text
              style={[
                styles.Text_circle,
                {
                  color:styleCondition.textColor
                },
              ]}
            >
              6 hours
            </Text>
            <Text
              style={[
                styles.big_textcircle,
                {
                  color:styleCondition.textColor
                },
              ]}
            >
              {item.av6h}
            </Text>
            <Text
              style={[
                styles.Text_circle,
                {
                  color:styleCondition.textColor
                },
              ]}
            >
              ug/m³
            </Text>
            <Text
              style={[
                styles.Text_circle,
                {
                  color:styleCondition.textColor
                },
              ]}
            >
              {item.temperature}°C
            </Text>
          </View>
          <Text style={styles.status_text}>{Status(item.av6h)}</Text>
        </View>



        <View style={styles.CenterContainer}>
          <View>
            <Text style={styles.locationName}>{item.place}</Text>
            <Text style={styles.Avg_text2}>
              {item.date}   {item.time}
            </Text>
          </View>
          <Text style={styles.locationName}>Average</Text>

          <View style={styles.Average_Container}>
            <View style={styles.Average_Item}>
              <View
                style={[
                  styles.Average_Item1,
                  {
                    backgroundColor:styleCondition.backgroundColor
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:styleCondition.textColor
                    },
                  ]}
                >
                  {item.pm25}
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
                    backgroundColor:styleCondition.backgroundColor
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:styleCondition.textColor
                    },
                  ]}
                >
                  {item.av1h}
                </Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>1 hours</Text>
              </View>
            </View>
            <View style={styles.Average_Item}>
              <View
                style={[
                  styles.Average_Item1,
                  {
                    backgroundColor:styleCondition.backgroundColor
                  },
                ]}
              >
                <Text
                  style={[
                    styles.Avg_text1,
                    {
                      color:styleCondition.textColor
                    },
                  ]}
                >
                  {item.av3h}
                </Text>
              </View>
              <View style={styles.Average_Item2}>
                <Text style={styles.Avg_text2}>3 hours</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.locationName}>Trend {trendArrow(item.trend)}</Text>
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
          source={imageStatus(item.av6h)}
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
    position: "relative",
  },
  Circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 6,
    marginBottom:10,
  },
  LeftContainer: {
    alignItems: "center",
    width:110,
  },
  CenterContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    width: 180,
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
    width: 47,
    height:32,
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 3,
  },
  Avg_text1: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
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
  status_text:{
    textAlign:'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default RankingItem;
