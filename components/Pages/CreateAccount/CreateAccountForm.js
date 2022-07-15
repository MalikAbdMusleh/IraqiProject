import React, { Component,useState } from 'react';
// import * as React from "react";
import axios from 'axios';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import {useTranslation}  from '../../../context/languageContext';

import { useNavigation } from '@react-navigation/native';


const SignUpView = () => {
  const navigation = useNavigation();
  const [number,setNumber]=useState('')
  const [pass,setPass]=useState('')
  const [secPass,setSecPass]=useState('')
  const {Repeat_password,Sign_In,
    or_login_with,
    Create_a_strong_password,Create_an_account,
    By_signing_up_you_agree_to_our_Privacy_Policy_and_Terms,Already_have_an_account,Phone_Number}=useTranslation()
// Make a request for a user with a given ID
const regApi= async()=>{
if (pass==secPass) {
  var FormData = require('form-data');

  var data = new FormData();
  data.append('name', 'anonymous');
  data.append('number',  number.toString());
  data.append('password',  pass.toString());
  data.append('user_type', 'user');
  
  var config = {
    method: 'post',
    url: 'http://52.202.149.74/pharmacy-online/accounts/registration.php',
   headers:new Headers({'Content-Type':'application/form-data'}),
    data : data
  };
  
  axios(config)
    .then(function (res) {
if (res.data.status==200) {
  //console.log(res);
  alert(res.data.massage); 
  // navigation.navigate("Success") 

  navigation.navigate("login")
} 
  else {
  alert(res.data.massage); 
}
    })
    .catch(function (error) {
      alert(error);
    })
  } else {
    alert('The passwords are not matched'); 
  }
}

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 80 }}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Phone_Number}
            underlineColorAndroid='transparent'
            onChangeText={(newNumber) => setNumber(newNumber)}  
            />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/9.png")} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Create_a_strong_password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => setPass(password)}
             />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/10.png")} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Repeat_password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => setSecPass( password )}
             />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/10.png")} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
        onPress={() =>regApi()}
        >
          <Text style={styles.signUpText}>{Create_an_account}</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 17 }}>{or_login_with}</Text>
      </View>
      <View style={styles.Footer}>
        <Text style={[styles.footerText, { fontSize: 12, paddingHorizontal: 70 }]}> {By_signing_up_you_agree_to_our_Privacy_Policy_and_Terms} </Text>
        <View style={[{ flex: .1, justifyContent: "center", flexDirection: "row" }]}>
          <Text style={[{ textAlign: "center", fontSize: 12, paddingHorizontal: 5 }]} >
            {Already_have_an_account}
          </Text>
          <TouchableOpacity 
        onPress={()=>navigation.navigate("login")}
        >
            <Text style={[{ textAlign: "center", fontSize: 12, paddingHorizontal: 5, color: "#FF4956" }]} >
              {Sign_In}
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
    // flex: .5,
    maxHeight: "30%",
    justifyContent: 'center',
    alignItems: "stretch",
    bottom: -50
  },
  footerText: {
    textAlign: "center",
    flex: .6
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    // borderBottomWidth: 1,
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
    // marginLeft:15,
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

export default SignUpView;