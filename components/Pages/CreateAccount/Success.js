import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';

const Success = (props) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const {Now_check_your_email_for_confirmation_link,Success}=useTranslation()

  setTimeout(() => {
    navigation.navigate("Drawer")
  }, 2500); 
  return (
    <View style={styles.container} >
      <View style={styles.container}>

      </View>
      <View style={[styles.container2, { width }]}>
      <Image
          style={[styles.footer, { width:width/3 }]}
          source={require("../../assets/MyImages/s1.png")} />
      </View>
      <View style={[styles.container2, { width, height }]} >
        <Text style={styles.Title}  >{Success}!</Text>
        <Text style={styles.description} >{Now_check_your_email_for_confirmation_link}.</Text>
      </View>
      <View style={styles.container3} >
        <Image
          style={[styles.footer, { width }]}
          source={require("../../assets/MyImages/6.png")} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFECEE"

  },
  container2: {
    flex: .3,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    minHeight: "20%",
    marginBottom: 10
  },
  container3: {
    flex: .8,
    alignItems: "flex-end",
  },
  Title: {
    color:"#000",
    fontSize: 34,
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: "5%"
  },
  description: {
    color:"#6D7177",
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "center",
    paddingHorizontal: 50

  },
  createBtn: {
    flex: .2,
    backgroundColor: "#FF4956",
    borderRadius: 30,
    paddingVertical: 10,
    width: "80%",
    marginBottom: "5%"
  },
  signBtn: {
    backgroundColor: "#FEB3B3",
    textAlign: "center",
    borderRadius: 30,
    paddingVertical: 15,
    width: "80%"
  },
  footer: {
    position: "relative",
    bottom: -40,
    maxHeight: "70%"

  }
});

export default Success;
