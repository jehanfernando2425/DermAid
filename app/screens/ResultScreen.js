//import statements
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Linking } from "react-native";
import AppHeader from "../components/AppHeader";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import { useRoute } from "@react-navigation/native";
import diseaseURLs from "../components/utils/diseaseURLs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//renders the result of a diagnosis.
function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { predictedLabel, photo } = route.params; // Handle missing params

  // Extract date and time (assuming these are available from somewhere)
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();

  const findDiseaseURL = () => {
    // Find the matching URL from diseaseURLs based on predictedLabel
    const matchingURL = diseaseURLs.find(
      (disease) => disease.label === predictedLabel
    );
    if (matchingURL) {
      const { url } = matchingURL;

      Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
      });
    } else {
      // Handle the case where no matching URL is found
      console.warn("No URL found for disease:", predictedLabel);
    }
  };

  const [diagnosisMap, setDiagnosisMap] = useState(new Map()); // Use a Map
  const handleSave = async () => {
    const dataToSave = {
      predictedLabel,
      dateString,
      timeString,
      photo: photo.base64,
    };

    try {
      // Generate a unique identifier for the diagnosis (optional)
      const diagnosisId = Math.random().toString(36).substring(2, 15);

      // Add data to the map with a unique key
      setDiagnosisMap(new Map(diagnosisMap).set(diagnosisId, dataToSave)); // Preserve existing data

      // Save the map as a JSON string (Maps aren't directly supported)
      await AsyncStorage.setItem(
        "diagnosisData",
        JSON.stringify(Array.from(diagnosisMap.entries()))
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("diagnosisData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setDiagnosisMap(new Map(parsedData)); // Convert back to a Map
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Screen style={styles.container}>
      <AppHeader title="RESULT" />
      {photo && ( // Conditionally render image if available
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          style={styles.image}
        />
      )}

      <AppText>Disease: {predictedLabel}</AppText>
      <AppText>Date: {dateString}</AppText>
      <AppText>Time: {timeString}</AppText>

      <View style={styles.buttonContainer}>
        <AppButton
          onPress={findDiseaseURL}
          title="Learn More About the Disease.."
          color="orange"
        />
        <AppButton title="SAVE" color="orange" onPress={handleSave} />
        <AppButton
          title="DON'T SAVE"
          color="orange"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </Screen>
  );
}

//styling results screen
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 40,
    width: 360,
    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultScreen;
