import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import { ArrowDown, ArrowUp, Droplet } from "react-native-feather";
import { useEffect } from "react";
import { useState } from "react";



const Header = (fav) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ alignSelf: "flex-start" }}>
      <Text category="h6">{fav.city}</Text>
      <Text category="s1">{fav.weather}</Text>
    </View>

    <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
      <ArrowDown stroke="white" />
      <Text>{fav.down}°C</Text>
      <ArrowUp stroke="white" />
      <Text>{fav.up}°C</Text>
    </View>
  </View>
);


const ItemEvolution = (item) => (
  <View style={{ alignItems: "center" }}>
    <Text>{item.time}</Text>
    <Droplet stroke="white" />
    <Text>15°C</Text>
  </View>
);

export const FavCard = ({ data }) => {
  //const [hours, setHours] = useState([{id:"1", time:""}, {id:"2", time:""}, {id:"3", time:""}, {id:"4", time:""}])

  useEffect(()=> {
    /* const temp = [];
    for(var i = 0; i < 4 ; i++) {
      temp[i].time = ((new Date().getHours()+4*(i+1))%24);
    }
    console.log(temp)
    setHours(temp); */
   
  }, [])
  return (
  <React.Fragment>
    <Layout style={styles.topContainer} level="1">
      <Card style={styles.card} header={() => Header(data)}>
       {/* <FlatList
          data={hours}
          renderItem={({item})=> ItemEvolution(item)}
          keyExtractor={(item) => item.id}
        />  */}
        

      </Card>
    </Layout>
  </React.Fragment>
);}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 20,
  },
});
