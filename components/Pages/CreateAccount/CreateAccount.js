import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';

const CreateAccount = (props) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const {Start_by_creating_an_account,Sign_In_As_A_Driver,Create_an_account,Im_not_superstitious,but_I_am_a_little_stitious,Sign_In}=useTranslation()

  return (
    <View style={styles.container} >
      <View style={[styles.container2, { width, height }]} >
        <Text style={styles.Title}  >{Start_by_creating_an_account}</Text>
        <Text style={styles.description} >{Im_not_superstitious}, {but_I_am_a_little_stitious}</Text>
      </View>
      <View style={[styles.container2, { width }]}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("CreateAccountForm")}
        >
          <Text style={[styles.description, { color: "#fff" }]}>{Create_an_account}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signBtn}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.description}>{Sign_In}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signBtn}
          onPress={() => navigation.navigate("LoginAsDriver")}
        >
          <Text style={styles.description}>{Sign_In_As_A_Driver}</Text>
        </TouchableOpacity>

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
    flex: .2,
    alignItems: "center",
    justifyContent:"space-around",
    // borderWidth: 2,
    minHeight: "32%",
    marginBottom: 10
  },
  container3: {
    flex: .5,
    alignItems: "flex-end",
  },
  Title: {
    fontSize: 34,
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: "5%"
  },
  description: {
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "center",
    paddingHorizontal: 50

  },
  createBtn: {
    // flex: .2,
    backgroundColor: "#FF4956",
    borderRadius: 30,
    paddingVertical: 10,
    width: "80%",
    marginBottom:-30,
    alignItems: "center",
  },
  signBtn: {
    backgroundColor: "#FEB3B3",
    textAlign: "center",
    borderRadius: 30,
    paddingVertical: 10,
    width: "80%",
    alignItems: "center",
    marginBottom:-30,


  },
  footer: {
    position: "relative",
    bottom: -40,
    maxHeight: "70%"

  }
});

export default CreateAccount;
