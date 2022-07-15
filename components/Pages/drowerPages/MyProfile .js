import React, { Component,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormData from'form-data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from "react-native-image-picker"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';


const MyProfile = () => {
  const {
    SAVE,UPDATE_PROFILE,_Address,Email_Address,Contact_Number
  }=useTranslation()
  let m =useTranslation()
  const navigation = useNavigation();
  var { width, height } = useWindowDimensions();

  const [, updateState] = React.useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [userName,setUserName]=React.useState('')
  const [address,setAddress]=React.useState('')
  const [phoneNumber,setPhoneNumber]=React.useState("")
  const [email,setEmail]=React.useState('')
  const [edit,setEdit]=React.useState(true)
  const [pic,setPic]=React.useState('')


  const [userInfo, setUserInfo] = React.useState('');
   
  const getData = async () => {
      try {
          const jsonValue1 = await AsyncStorage.getItem('user_info')
          // const jsonValue = JSON.parse(jsonValue1)  
          const json = JSON.parse(jsonValue1)  
          // alert(json.number)   
          setEmail(json.email) 
          setPhoneNumber(json.number.toString())  
          setAddress(json.address)
          setPic(json.img_location)
          json != null ? setUserInfo(json)  : null;
      } catch(e) { 
        // error reading value
        alert(e)  
                    
      }   
    }   
    
      React.useEffect(()=>{
          getData();
      },[])


// Make a request for a user with a given ID
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user_info', jsonValue)
  } catch (e) {
    // saving error
  }
}
const editUserApi= async()=>{
 
  var data = new FormData();
data.append('name', userInfo.name);
data.append('number', phoneNumber.toString());
data.append('email', email.toString());
data.append('address', address.toString());
data.append('id', Number(userInfo.id));     
var config = {
  method: 'post',  
  url: 'http://52.202.149.74/pharmacy-online/accounts/edit_delete_user.php',
 headers:new Headers({'Content-Type':'application/form-data'}),
  data : data
};

await axios(config)
    .then(function (res) {
if (res.data.status==200) {
  // alert(res.data.massage); 
  // //console.log(res.data);
  storeData([userInfo])
   
} else {
  //console.log(res.data);
  // alert(res.data.massage); 
}
    })
    .catch(function (error) {
      // //console.log(error);
    })
}
//image picker start
const [filePath, setFilePath] = useState({});
 
const chooseFile = async () => {
  let options= {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      // includeExtra: false,
    }
  }
  try {
   await launchImageLibrary(options,async (result)=>{
    let assets=result.assets[0]
    //console.log(result.assets[0]);
    var data = new FormData();
    data.append('file',{uri:assets.uri,type:assets.type,name:assets.fileName,id:userInfo.id});    
    data.append('Content-Type','application/form-data');    
    data.append('id',userInfo.id);    

    var config = {
      method: 'post',
      url: 'http://52.202.149.74/pharmacy-online/accounts/upload_image.php',
     headers:new Headers({'Content-Type':'application/form-data'}),
      data : data
    };
   await  axios(config)
        .then(function (res) {
      //console.log(res.data);
      if (res.data.massage) {
        setPic(res.data.location)
        alert(res.data.massage)
        // storeData([userInfo]) 
        let userInfo1=userInfo
        userInfo1.img_location=res.data.location
        storeData(userInfo1)
        setUserInfo(userInfo1)
        forceUpdate()
      } else {
        alert(res.data)
      }
        })
        .catch(function (error) {
          //console.log('error');
        })
  });
} catch (error) {
  alert(error)
}
}; 
//image picker end
return (
    <View style={styles.container}>
      <View style={[styles.container2, { width }]}>
        <View style={[ { flexDirection:"row" ,alignItems:"flex-end",marginBottom:"4%"}]}>
        <Image
          style={[styles.image,{borderRadius:100}]}
          width={200}
          height={200}
            source={userInfo.img_location?{uri:pic}:
              require("../../assets/MyImages/pr1.png")
          } 
          />
          <Ionicons
           name='add-circle-sharp'
           size={50}
           color={"#FF4956"}
           onPress={()=>chooseFile()}
         />
        </View>
          <Text  style={[styles.name]}>
         {userInfo.name}
          </Text>
          <Text style={[styles.address]}>
          {userInfo.address}
          </Text>
      </View>
      <View style={{ alignItems: "center"}}>
        <View  style={{ alignItems: "flex-start",width:width/1.2}}>
          <Text style={[styles.label]}>
            {Contact_Number}
          </Text>
          </View>
        <View style={styles.inputContainer}>
          <TextInput style={[styles.inputs,{width:width}]}
            // placeholder={phoneNumber}
            value={phoneNumber} 
            underlineColorAndroid='transparent'
            placeholderTextColor={"#000"}
            editable={edit?false:true} 
            selectTextOnFocus={edit?false:true}
            onChangeText={(NewPhoneNumber) => setPhoneNumber(NewPhoneNumber)}
             />
        </View>
        <View  style={{ alignItems: "flex-start",width:width/1.2}}>
          <Text style={[styles.label]}>
          {Email_Address}
          </Text>
          </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="deom123@gmail.com"
            value={email}
            keyboardType={"email-address"}
            placeholderTextColor={"#000"}
            underlineColorAndroid='transparent'
            editable={edit?false:true} 
            selectTextOnFocus={edit?false:true}
            onChangeText={(NewEmail) => setEmail( NewEmail )}
             />
        </View>
        <View  style={{ alignItems: "flex-start",width:width/1.2}}>
          <Text style={[styles.label]}>
          {_Address}
          </Text>
          </View>
        <View style={[styles.inputContainer,{height:height/10}]}> 
          <TextInput style={styles.inputs}
            value={address}
            placeholder="Tala Al Ali"
            // keyboardType={"web-search"}
            placeholderTextColor={"#000"}
            underlineColorAndroid='transparent'
            editable={edit?false:true} 
            selectTextOnFocus={edit?false:true}
            onChangeText={(newAddress) => setAddress(newAddress)}
             />
        </View>
 
      </View> 
      {edit? <TouchableHighlight 
      style={[styles.buttonContainer, styles.signupButton]}
       onPress={() => {setEdit(false);forceUpdate()}}>
        <Text style={styles.signUpText}>{UPDATE_PROFILE}</Text>
      </TouchableHighlight>: <TouchableHighlight 
      style={[styles.buttonContainer, styles.signupButton,{backgroundColor:"#FF4956"}]}
       onPress={() => {editUserApi();setEdit(true);forceUpdate()}}>
        <Text style={[styles.signUpText,{color:"#fff"}]}>{SAVE}</Text>
      </TouchableHighlight>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: '#FFf',
  },label:{
    fontSize:15,
    color:"#190708"
  },
  Footer: {
    maxHeight: "30%",
    justifyContent: 'center',
    alignItems: "stretch",
    bottom: -50
  },
  footerText: {
    textAlign: "center",
    flex: .6
  },  container2: {
    flex: .3,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "20%",
    marginBottom: 10
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: "90%",
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    shadowColor: '#999',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 8,
    borderTopWidth:.1
  },
  inputs: {
    color:"#000",
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#CDD4D9',
    flex: 1,
    fontSize: 17,
  },name: {
    color:"#000",
    fontSize: 28,
  },address: {
    color:"#190708",
    fontSize: 12,
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
    width: 300,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#FFECEE",
  },
  signUpText: {
    color: '#000',
  },image:{
    marginRight:"-15%",
    marginBottom:"-4%",
    marginTop:"4%",
  }
});

export default MyProfile;