import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import {useTranslation}  from '../../../context/languageContext';

import { useNavigation } from '@react-navigation/native';

const LoginAsDriver = () => {
  const { height, width } = useWindowDimensions()
  const {login,Forgot_your_password,
    or_login_with,
    By_signing_up_you_agree_to_our_Privacy_Policy_and_Terms,Enter_your_password,
    Not_a_member,Sign_Up,Phone_Number}=useTranslation()
  const navigation = useNavigation();
  return (
    <View style={[styles.container,{height:height/16}]}>
      <View style={{ alignItems: "center", marginTop: height / 3 }}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Phone_Number}
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            // onChangeText={(fullName) => this.setState({ fullName })} 
            />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/9.png")} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Enter_your_password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            // onChangeText={(email) => this.setState({ email })} 
            />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/10.png")} />
        </View>
        <View style={{ flex: .5, color: "#AAAAAA", textAlign: "right", width: 300, maxHeight: 100 }}>
          <Text style={{ color: "#AAAAAA", textAlign: "right" }}>
            {Forgot_your_password}
          </Text>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => navigation.navigate("Dashboard")} >
          <Text style={styles.signUpText}>{login}</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 17,color:"#190708" }}>{or_login_with}</Text>
      </View>
      <View style={styles.Footer}>
        {/* <Text style={[styles.footerText, { fontSize: 12, paddingHorizontal: 70 }]}> By signing up you agree to our Privacy Policy and Terms. </Text> */}
        <View style={[{ flex: .7, justifyContent: "center", flexDirection: "row" }]}>
          <Text style={[{ textAlign: "center", fontSize: 12, paddingHorizontal: 5,color:"#190708" }]} >
            {Not_a_member}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("CreateAccountForm")}>
            <Text style={[{ textAlign: "center", fontSize: 12, paddingHorizontal: 5, color: "#FF4956" }]} >
              {Sign_Up}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: '#FFECEE',
  },
  Footer: {
    maxHeight: "35%",
    justifyContent: 'center',
    alignItems: "stretch",
    bottom: -30
  },
  footerText: {
    textAlign: "center",
    flex: .6
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontStyle: "italic",
    fontSize: 14,
  },
  inputIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginRight: "5%"

  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#FF4956",
  },
  signUpText: {
    color: 'white',
  }
});

export default LoginAsDriver;
