import * as React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = ({page}) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions()
  return (
    <View style={[styles.container, { width, height: height / 8}]}>
      {/* <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
      >
        <Image source={require("../../assets/MyImages/fo1.png")} />
      </TouchableOpacity> */}

      <TouchableOpacity style={[styles.containerImage,page=="home"?{borderBottomWidth:3,borderColor:"#FF4956"}:{}]}onPress={()=>navigation.navigate("Home")} >
      {page=="home"?<Image source={require("../../assets/MyImages/fo1.jpg")} style={[styles.image]}   />
      :<Image source={require("../../assets/MyImages/fo2.png")} style={[styles.image]}   />}
      </TouchableOpacity  >
      <TouchableOpacity style={[styles.containerImage,page=="location"?{borderBottomWidth:3,borderColor:"#FF4956"}:{}]}  onPress={()=>navigation.navigate("NearBy")}>
        {page=="location"?
      <Image source={require("../../assets/MyImages/fo3.jpg")} style={[styles.image]}   />
      :<Image source={require("../../assets/MyImages/fo4.png")} style={[styles.image]}   />}
      </TouchableOpacity >
      <TouchableOpacity style={[styles.containerImage,page=="bag"?{borderBottomWidth:3,borderColor:"#FF4956"}:{}]}  onPress={()=>navigation.navigate("MedicineBag")}>
        {page=="bag"?
      <Image source={require("../../assets/MyImages/fo5.jpg")} style={[styles.image]}   />
      :<Image source={require("../../assets/MyImages/fo5.png")} style={[styles.image]}   />}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerImage,page=="myorder"?{borderBottomWidth:3,borderColor:"#FF4956"}:{}]} onPress={()=>navigation.navigate("MyOrder")}>
        {page=="myorder"?
      <Image source={require("../../assets/MyImages/fo6.jpg")} style={[styles.image]}   />
      :<Image source={require("../../assets/MyImages/fo6.png")} style={[styles.image]}   />}
      </TouchableOpacity>
    </View>
  );
};
// BagTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    shadowColor: '#999',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 8,
    borderTopWidth:.1
  },
  container2: {
    flex: .3,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
  },image:{
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage:{
    flex: 0.05,
    alignItems: "center",
    justifyContent: "center",
    // width:"2%",
    paddingBottom:19,
  }
});
export default Footer;