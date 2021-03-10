import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;


const chartConfig = {
  //backgroundColor: "blue",
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.5,
 // backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  propsForLabels: {textAnchor:"middle"},
  useShadowColorFromDataset: true, // optional
};

export const PrecipitationGraph = ({ data, timezone }) => {

  const [labelHours, setLabelHours] = useState([]);
  const [datasets, setDataset] = useState([]);
  useEffect(() => {
 

    const labels = [];
    const precipitations = [];
    if (Array.isArray(data)) {
      data.forEach((element) => {
        const time = new Date((element.dt + timezone) * 1000)
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .substring(0, 5);
        labels.push(time);
        precipitations.push(element.precipitation);
        setLabelHours(labels);
        setDataset(precipitations);
      });
    }
  }, [data]);

  const hidePoints = Array.from(Array(61).keys()).filter( i  => i !== 0 && i!==20  && i !== 40 && i !== 55);

  const DATA = {
    labels: labelHours,
    datasets: [
      {
        data: datasets,
        color: (opacity = 1) => `rgba(134, 65, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    //legend: ["Précipitation"], // optional
  };


  if(labelHours.length > 0)
  return (
    <View style={{margin:15}}>
      <Text category="65546az">Précipitations</Text>
      <LineChart
        data={DATA}
        width={screenWidth -50}
        height={180}
        chartConfig={chartConfig}
        hidePointsAtIndex={hidePoints}
        withDots={false}
        withVerticalLines= {false}
        style={{ paddingRight: 40, paddingLeft: -30}}
      
      />
    </View>
  );
  else
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
};
