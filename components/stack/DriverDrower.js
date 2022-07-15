import * as React from 'react';
import { View, Text, Button, useWindowDimensions, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements'

import Help from "../Pages/drowerPages/Help&Support";
import MyOrder from "../Pages/drowerPages/MyOrder";
import MyProfile from "../Pages/drowerPages/MyProfile ";
import Offers from "../Pages/drowerPages/Offers&Discounts";
import UploadPrescription from "../Pages/drowerPages/UploadPrescription";
import Dashboard from "../Pages/DriverApp/Dashboard";

// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';


function Feed({ navigation }) {
  const { width, height } = useWindowDimensions()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const { width, height } = useWindowDimensions()

  return (
    <DrawerContentScrollView {...props} style={{  marginTop: -4 }}>
      <View style={{ width: width / 1.4, height: height / 5, backgroundColor: "#FF4956" }}>
      <View style={[styles.listContainer]} >

<TouchableOpacity style={[styles.elementContainer, { justifyContent: "flex-start", height: height / 9, width: width / 1.13}]} >

    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>

        <View style={{ flex:.6 , flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"  }}>
            <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                source={require("../assets/MyImages/dr6.png")}
            />
        </View>
        <View style={[{ width: StyleSheet.hairlineWidth , flexDirection: "row" ,alignItems:"center",justifyContent:"center"}]} >
            <View style={[{ width: width / 1.5 }]} >
                <Text style={[styles.title, { marginHorizontal: 1 ,color:"#FFF" }]}>
                    Haya Rahman
                </Text>
                <View style={[{ maxHeight: height / 3 }]}>
                    <Text style={[styles.discount, { width ,color:"#FFF"}]}>
                    demodesign@gmail.com
                    </Text>

                </View>
            </View>
        </View>

    </View>
</TouchableOpacity>


</View>
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
          onPress={() => props.navigation.toggleDrawer()}
          style={{ marginLeft: 20 }}
        >
          <Text>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
import Home from "../Pages/shop/Home";
const Drawer = createDrawerNavigator();

function MyDriverDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props}

        drawerType="front"
        initialRouteName="Profile"

        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10, color: "#000" },
          labelStyle: {
            fontSize: 80,
            color: "#000"
          },
        }}
      />}

    >
      <Drawer.Screen name="Dashboard" component={Dashboard}
        options={{
          title: "Dashboard",
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
          drawerIcon: ({ focused }) =>
            <MaterialCommunityIcons
              name={'clipboard-text-multiple-outline'}
              size={24}
              color={"#000"}
            />
        }} />
      <Drawer.Screen name="MyOrder" component={MyOrder}
        options={{
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
export default MyDriverDrawer;
