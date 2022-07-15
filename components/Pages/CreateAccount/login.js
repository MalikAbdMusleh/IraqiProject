import React, { Component,useState } from 'react';
import axios from 'axios';
import FormData from'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation}  from '../../../context/languageContext';
import * as RNLocalize from "react-native-localize";

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
  useWindowDimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
const storeData = async (value) => {
  try {
    // const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user_info', value)
  } catch (e) {
    // saving error
  }
}
const Login = () => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation();
  const [number,setNumber]=useState('')
  const [pass,setPass]=useState('')
  const {login,Forgot_your_password,
    or_login_with,
    By_signing_up_you_agree_to_our_Privacy_Policy_and_Terms,Enter_your_password,
    Not_a_member,Sign_Up,Phone_Number}=useTranslation()

// Make a request for a user with a given ID
const logApi= async()=>{
  var data = new FormData();
data.append('number', number.toString());
data.append('password', pass.toString());
var config = {
  method: 'post',
  url: 'http://52.202.149.74/pharmacy-online/accounts/login.php',
 headers:new Headers({'Content-Type':'application/form-data'}),
  data : data
};

await axios(config)
    .then(function (res) {
if (res.data.status==200) {
  // alert(res.data.massage); 

 

  console.log(res.data);
  let res_data_info=JSON.parse(res.data.info)
  // res_data.lang='en'
  res_data_info.lang='en'
  storeData(JSON.stringify(res_data_info))
  let myLang =RNLocalize.getLocales();
  let myLang2=myLang[0]["languageCode"]
  myLang2=='en'? alert(`Welcome back ${res_data_info.name}`): alert(res_data_info.name+`مرحبا بك مجدداً`)


navigation.navigate("Success") 
} else {
  //console.log(res.data);
  alert(res.data.massage); 
}
    })
    .catch(function (error) {
      //console.log(error);
    })
}
 

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: height / 3 }}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Phone_Number}
            underlineColorAndroid='transparent'
            onChangeText={(NewEmail) => setNumber( NewEmail )}
             />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/9.png")} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder={Enter_your_password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(pass) => setPass( pass )}
            />
          <Image style={[styles.inputIcon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/10.png")} />
        </View>
        <View style={{ flex: .5, color: "#AAAAAA", textAlign: "right", width: 300, maxHeight: 100 }}>
          <Text style={{ color: "#AAAAAA", textAlign: "right" }}>
            {Forgot_your_password}?
          </Text>
        </View>
        <TouchableHighlight 
        style={[styles.buttonContainer, styles.signupButton]} 
        onPress={() =>logApi()
         } >
          <Text style={styles.signUpText}>{login}</Text>
        </TouchableHighlight>

        <Text style={{ fontSize: 17 }}>{or_login_with}</Text>
      </View>
      <View style={styles.Footer}>
        <Text style={[styles.footerText, { fontSize: 12, paddingHorizontal: 70 }]}> 
        {By_signing_up_you_agree_to_our_Privacy_Policy_and_Terms}.
         </Text>
        <View style={[{ flex: .1, justifyContent: "center", flexDirection: "row" }]}>
          <Text style={[{ textAlign: "center", fontSize: 12, paddingHorizontal: 5 }]} >
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
    borderBottomColor: '#FFFFFF',
    justifyContent:"space-between",
    alignItems:"center",
    fontStyle: "italic",
    fontSize: 14,
    width: '90%',
    textAlign:"left",
    paddingLeft:'10%'

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

export default Login;
