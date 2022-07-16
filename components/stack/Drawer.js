import * as React from 'react';
import { View, Text, Button, useWindowDimensions, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont().then();
// FontAwesome5.loadFont().then();
import Help from "../Pages/drowerPages/Help&Support";
import MyOrder from "../Pages/drowerPages/MyOrder";
import MyProfile from "../Pages/drowerPages/MyProfile ";
import Offers from "../Pages/drowerPages/Offers&Discounts";
import UploadPrescription from "../Pages/drowerPages/UploadPrescription";
import Language from "../Pages/drowerPages/Language";
import {useTranslation}  from '../../context/languageContext';


function CustomDrawerContent(props) {
  const { width, height } = useWindowDimensions()
  const {
    logout
  }=useTranslation()

  const navigation1=useNavigation()
  const [userInfo, setUserInfo] = React.useState({});
  const [pic, setPic] = React.useState('');
  const [,updateState] = React.useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);
  const getData = async () => {
      try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const jsonValue = JSON.parse(jsonValue1)  
        jsonValue != null ? setUserInfo(jsonValue)  : null;
        setPic(jsonValue.img_location)
        forceUpdate()
      } catch(e) {
        // error reading value
        alert(e)  
                    
      }   
    }   
      React.useEffect(()=>{
          getData();
      },[])
  return (
    <DrawerContentScrollView {...props} style={{  marginTop: '-20%' }}>
 
      <View style={{ width: "100%", height: height / 5, backgroundColor: "#FF4956" ,justifyContent:"center"}}>
      {/* <View style={[styles.listContainer,{borderWidth:2}]} > */}

<TouchableOpacity style={[styles.elementContainer, { justifyContent: "center", height: height / 9, width: width / 1.13}]} >

    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>

        <View style={{ flex:.6 , flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"  }}>

                  <Image
          style={[styles.image,{borderRadius:100}]}
          width={40}
          height={40}
            source={userInfo.img_location?{uri:pic}:
              require("../assets/MyImages/pr1.png")
          } 
          />
        </View>
        <View style={[{ width: StyleSheet.hairlineWidth , flexDirection: "row" ,alignItems:"center",justifyContent:"center"}]} >
            <View style={[{ width: width / 1.5 }]} >
                <Text style={[styles.title, { marginHorizontal: 1 ,color:"#FFF" }]}>
                   {userInfo.name}
                </Text>
                <View style={[{ maxHeight: height / 3 }]}>
                    <Text style={[styles.discount, { width ,color:"#FFF"}]}>
                    {userInfo.email}
                    </Text>
                </View>
            </View>
        </View>

    </View>
</TouchableOpacity>

{/* </View> */}
      </View>
      <DrawerItemList {...props} />
      <View style={{ flexDirection: "row", position: "relative", bottom: "-60%", height: height / 2, marginLeft: "5%" }}>
        <MaterialCommunityIcons
          name='logout'
          size={24}
          color={"#000"}
          backgroundColor={"#000"}
        />
        <TouchableOpacity
          onPress={() =>{AsyncStorage.clear();navigation1.navigate("login");}}
          style={{ marginLeft: 20 }}
        >
          <Text  style={{width:'100%' }}>
          {logout}
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
import Home from "../Pages/shop/Home";
const Drawer = createDrawerNavigator();

function MyDrawer() {
  const [,updateState] = React.useState();
  
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const {
    My_Orders,My_Profile,Offers_and_Discounts,Upload_Prescription,Help_and_Support,_Home,_Language
  }=useTranslation()
  React.useEffect(()=>{ 
    forceUpdate()
  },[])
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props}

        drawerType="front" 
        initialRouteName="Home"

        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10, color: "#000" },
          labelStyle: {
            fontSize: 80,
            color: "#000",
            width:20
          },
        }}
      />}

    >
      <Drawer.Screen 
      name="Home" 
       component={Home}
        options={{
          title: _Home,
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          // headerTintColor: '#FF4956',
          drawerIcon: ({ focused }) =>
          <MaterialCommunityIcons
            name={'home'}
            size={24}
            color={"#000"}
          />
        }}
      />

      <Drawer.Screen name="Upload Prescription" component={UploadPrescription}
        options={{
          title:Upload_Prescription,

          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name={'clipboard-text-multiple-outline'}
              size={24}
              color={"#000"}
            />
        }} />
      <Drawer.Screen name="MyOrder" component={MyOrder}
        options={{
          title:My_Orders,
          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name='cart-variant'
              size={24}
              color={"#000"}
            />
        }}
      />
      <Drawer.Screen name="MyProfile" component={MyProfile}
        options={{
          title:My_Profile,
          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name='file-document-edit-outline'
              size={24}
              color={"#000"}
            />
        }}
      />
      <Drawer.Screen name="Offers & Discounts" component={Offers}
        options={{
          title:Offers_and_Discounts,
          drawerIcon: ({ focused }) =>
            <FontAwesome5
              name='percentage'
              size={24}
              color={"#000"}
            />
        }}
      />
      <Drawer.Screen name="Help & Support" component={Help}
        options={{
          title:Help_and_Support,
          headerShadowVisible: true,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#FF4956',
          headerTitleStyle: {
            color: 'black',
            fontWeight: "normal"
          },
          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name='help-circle-outline'
              size={24}
              color={"#000"}
            />
        }}
      />
        <Drawer.Screen name="language" component={Language}
        options={{
          title:_Language,
          headerShadowVisible: true,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#FF4956',
          headerTitleStyle: {
            color: 'black',
            fontWeight: "normal"
          },
          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name='help-circle-outline'
              size={24}
              color={"#000"}
            />
        }}
      />
    </Drawer.Navigator>
  );
}
const styles=StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
},discount:{
  color: "#fff",
  fontSize: 12,
  fontWeight: "bold",
} ,   elementContainer: {
  margin: 2,
  padding: 2,
 
  borderRadius: 12,
  justifyContent: "center",
 
  paddingLeft: 5,
}
,
})
export default MyDrawer;
