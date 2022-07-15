import * as React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderDriver = ({page}) => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions()
  return (
    <View style={[styles.container, { width, height: height / 8 }]}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={[{ width: width / 2, flexDirection: "row",  alignItems: "center"  }]}
      >
        <Image source={require("../../assets/MyImages/dh1.png")} />
        <Text style={[{ color: "#000", fontWeight: "400", fontSize: 22,marginLeft:'10%'}]}>
        {page}
        </Text>
      </TouchableOpacity>
      <View style={[styles.container2, { width: width / 4 ,alignItems:"center"}]}>
        <TouchableOpacity style={{ height:height/10 }} onPress={() => navigation.navigate("DriverNotification")}>
          {/* <Image source={require("../../assets/MyImages/h1.png")} /> */}
          <Ionicons
            name='notifications-outline'
            size={30}
            color={"#000"}
          />
        </TouchableOpacity  >
        <View style={[styles.dot]}>
          <Text style={[{ color: "#fff", fontSize: 10, textAlignVertical: "top" }]}>
            55
          </Text>
        </View>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FFECEE",
    borderRadius: 12,
    padding: 15,

  }, dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF4956",
    marginTop: -68,
    marginRight: -10,
  },
  container2: {
    flex: .2,
    // alignItems: "center",
    backgroundColor: "#FFECEE",
    borderRadius: 12,
  }

});
export default HeaderDriver;