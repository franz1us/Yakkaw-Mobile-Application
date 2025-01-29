import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Yakkaw?",
      answer:
        "Yakkaw is a platform designed to help you monitor and manage air quality issues, starting from Chiang Rai and expanding to other northern provinces in Thailand.",
    },
    {
      question: "How can I report air quality issues?",
      answer:
        'You can report air quality issues through the app by navigating to the "Report" section and filling out the required details.',
    },
    {
      question: "How do I use the air quality monitoring device?",
      answer:
        "The device is easy to use. Simply place it in your desired location, and it will automatically measure and report air quality data.",
    },
    {
      question: "Where can I find more information about PM2.5?",
      answer:
        'You can find more information about PM2.5 in the "About" section of the app or by visiting our website.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>FAQ</Text> */}

      {/* FAQ List */}
      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <Icon
            name="help-outline"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  answer: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
