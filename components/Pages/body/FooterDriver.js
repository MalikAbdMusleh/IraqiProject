import * as React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = ({ page }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions()
  return (
    <View style={[styles.container, { width, height: height / 9 }]}>
      <TouchableOpacity style={[styles.containerImage, page == "home" ? { borderBottomWidth: 3, borderColor: "#FF4956" } : {}]} onPress={() => navigation.navigate("Dashboard")} >
        {page == "Dashboard" ? <Image source={require("../../assets/MyImages/df1.png")} style={[styles.image, { resizeMode: "contain" }]} />
          : <Image source={require("../../assets/MyImages/df1.png")} style={[styles.image, { resizeMode: "contain" }]} />}
        <Text style={[styles.title]} >
          Dashboard
        </Text>
      </TouchableOpacity  >
      <TouchableOpacity style={[styles.containerImage, page == "bag" ? { borderBottomWidth: 3, borderColor: "#FF4956" } : {}]} onPress={() => navigation.navigate("Orders")}>
        {page == "Orders" ?
          <Image source={require("../../assets/MyImages/df2.png")} style={[styles.image, { resizeMode: "contain" }]} />
          : <Image source={require("../../assets/MyImages/df2.png")} style={[styles.image, { resizeMode: "contain" }]} />}
        <Text style={[styles.title]} >
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerImage, page == "myorder" ? { borderBottomWidth: 3, borderColor: "#FF4956", resizeMode: "contain" } : {}]} onPress={() => navigation.navigate("MyOrder")}>
        {page == "myorder" ?
          <Image source={require("../../assets/MyImages/df3.png")} style={[styles.image, { resizeMethod: "scale", resizeMode: "contain" }]} />
          : <Image source={require("../../assets/MyImages/df3.png")} style={[styles.image, { resizeMethod: "scale", resizeMode: "contain" }]} />}
        <Text style={[styles.title]} >
          My Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// BagTab

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FF696A",
    // borderTopEndRadius: 20,
    // borderTopStartRadius: 20,
    padding: 15,
    shadowColor: '#999',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 8,
    borderTopWidth: .1
  },
  container2: {
    // flex: .3,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
  }, image: {
    flex: .5,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
  }, title: {
    textAlign: "center",
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold"
  }
});
export default Footer;