import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Pages/HomeScreen";
import Home from "../Pages/shop/Home";
import Slides from "../Pages/slides";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../Pages/CreateAccount/index";
const Stack = createNativeStackNavigator();
import CreateAccountForm from "../Pages/CreateAccount/CreateAccountForm";
import { Button, TouchableOpacity, Text, Image } from "react-native";
import login from "../Pages/CreateAccount/login";
import LoginAsDriver from "../Pages/CreateAccount/LoginAsDriver";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Success from "../Pages/CreateAccount/Success";
import Filter from "../Pages/shop/Filter"; 
import ItemsList from "../Pages/shop/products";
import ProductsListByProvidors from "../Pages/shop/productsListByProvidors";
import FilteredList from "../Pages/shop/FilteredList";
import MedicineBag from "../Pages/shop/bag";
import DealsProducts from "../Pages/shop/DealsProducts";

import CheckoutInfo from "../Pages/shop/CheckoutInfo";
import TrackOrder from "../Pages/location/TrackOrder";
import NearBy from "../Pages/location/NearBy";
import Map from "../Pages/location/Map";
import OrderDetails from "../Pages/orders/OrderDetails";
// import SubmitReview from "../Pages/orders/SubmitReview";
import ChatApp from "../Pages/chat/ChatApp";
import ItemCheck from "../Pages/shop/ItemCheck";
import BagTab from "../Pages/shop/BagTab";
import ProvidersListView from "../Pages/shop/ProvidersListView";
import CategorysListView from "../Pages/shop/CategorysListView";
import Drawer from "./Drawer"
import UploadPrescription from "../Pages/drowerPages/UploadPrescription";
import MyOrder from "../Pages/drowerPages/MyOrder";
import MyProfile from "../Pages/drowerPages/MyProfile ";
import ErrorPage from "../Pages/body/ErrorPage";
import NotificationPage from "../Pages/body/NotificationPage";
import Dashboard from "../Pages/DriverApp/Dashboard";
import Orders from "../Pages/DriverApp/Orders";
import ActiveOrders from "../Pages/DriverApp/ActiveOrders ";
import OrderPopup from "../Pages/DriverApp/OrderPopup";
import OrderReject from "../Pages/DriverApp/OrderReject";
import DriverTrackOrder from "../Pages/DriverApp/DriverTrackOrder";
import DriverNotification from "../Pages/DriverApp/Notification";

import {useTranslation}  from '../../context/languageContext';


const MyStack = () => {
  const {
    Category,Sign_In_Account,
    Filters_By,Suplements,
    Filtered_List,Medicine_Bag,
    Track_Order,Checkout_Information,
    Near_By,Item_Check,
    _Map,My_Orders,
    My_Profile,Order_Details,
    Submit_Review,Support_Team,
    Notification,Sign_In_For_Driver,
    Providers,Categorys,Upload_Prescription,_CreateAccount,Create_an_account
  }=useTranslation()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Welcome',
            headerShown: false,
            headerShadowVisible: false
          }}
        /> 
       <Stack.Screen name="Slides" component={Slides}
          options={{
            title: 'Welcome',
            headerShown: false,
            headerShadowVisible: false
          }} /> 
       <Stack.Screen name="CreateAccount" component={CreateAccount}
          options={{
            title: _CreateAccount,
            headerShown: false,
            headerShadowVisible: false
          }} />
        <Stack.Screen
          name="CreateAccountForm"
          component={CreateAccountForm}
          options={{
            title: Create_an_account,
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: true,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: '#FFECEE',
            },
            headerTintColor: '#FF4956',
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'black',
              fontWeight: "600"
            }  
          }}
        /> 
        <Stack.Screen
          name="login"
          component={login}
          options={{
            title: Sign_In_Account,
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: true,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: '#FFECEE',
            },
            headerTintColor: '#FF4956',
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'black',
              fontWeight: "600"
            }
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            title: "",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{
            title: "",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            title: Filters_By,
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
            }
          }}
        />
        <Stack.Screen
          name="DealsProducts"
          component={DealsProducts}
          options={{
            title: Suplements,
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
            }
          }}
        />  
           <Stack.Screen
          name="ItemsList"
          component={ItemsList}
          options={{
            title: Suplements,
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
            }
          }}
        />  
          <Stack.Screen
          name="ProductsListByProvidors"
          component={ProductsListByProvidors}
          options={{
            title: Providers,
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
            }
          }}
        />  
              <Stack.Screen
          name="FilteredList"
          component={FilteredList}
          options={{
            title: Filtered_List,
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
            }
          }}
        />  
        <Stack.Screen
          name="MedicineBag"
          component={MedicineBag}
          options={{
            title: Medicine_Bag,
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
            }
          }}
        />
        <Stack.Screen
          name="CheckoutInfo"
          component={CheckoutInfo}
          options={{
            title: Checkout_Information,
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
            }
          }}
        />
        <Stack.Screen name="Home" component={Home}
        options={{
          title: "Home",
          headerShown: false,
          headerBackButtonMenuEnabled: true,
          headerBackVisible: true,
          // headerTintColor: '#FF4956',
          // drawerIcon: ({ focused }) =>
          // <MaterialCommunityIcons
          //   name={'home'}
          //   size={24}
          //   color={"#000"}
          // />
        }}
      /> 
       <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={{
            title: Track_Order,
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
            }
          }}
        /> 
          <Stack.Screen
          name="NearBy"
          component={NearBy}
          options={{
            title: Near_By,
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
            }
          }}
        /> 
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: _Map,
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
            }
          }}
        /> 
            <Stack.Screen
          name="ItemCheck"
          component={ItemCheck}
          options={{
            title: Item_Check,
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
            }
          }}
        /> 
         <Stack.Screen
          name="BagTab"
          component={BagTab}
          options={{
            title: Medicine_Bag,
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
            }
          }}
        />
            <Stack.Screen
          name="UploadPrescription"
          component={UploadPrescription}
          options={{
            title: Upload_Prescription,
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
            }
          }}
        /> 
               <Stack.Screen
          name="MyOrder"
          component={MyOrder}
          options={{
            title: My_Orders,
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
            }
          }}
        />
         <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            title: My_Profile,
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
            }
          }}
        /> 
             <Stack.Screen
          name="ErrorPage"
          component={ErrorPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{
            title: Order_Details,
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
            }
          }}
        /> 
         {/* <Stack.Screen
          name="SubmitReview"
          component={SubmitReview}
          options={{
            title: Submit_Review,
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
            }
          }}
        />  */}
             <Stack.Screen
          name="ChatApp"
          component={ChatApp}
          options={{
            title: Support_Team,
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
            }
          }}
        />  
                    <Stack.Screen
          name="NotificationPage"
          component={NotificationPage}
          options={{
            title: Notification,
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
            }
          }}
        />  
          <Stack.Screen
          name="LoginAsDriver"
          component={LoginAsDriver}
          options={{
            title: Sign_In_For_Driver,
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: true,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: '#FFECEE',
            },
            headerTintColor: '#FF4956',
            headerShadowVisible: false,
            headerTitleStyle: {
              color: 'black',
              fontWeight: "600"
            }
          }}
        />
           <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
              <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerShown: false,
          }}
        />  
       
                  <Stack.Screen
          name="ActiveOrders"
          component={ActiveOrders}
          options={{
            headerShown: false,
          }}
        />  
       <Stack.Screen
          name="OrderPopup"
          component={OrderPopup}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="OrderReject"
          component={OrderReject}
          options={{
            headerShown: false,
          }}
        />  
           <Stack.Screen
          name="DriverTrackOrder"
          component={DriverTrackOrder}
          options={{
            headerShown: false,
          }}
        /> 
               <Stack.Screen
          name="DriverNotification"
          component={DriverNotification}
          options={{
            headerShown: false,
          }}
        />
 <Stack.Screen
          name="ProvidersListView"
          component={ProvidersListView}
          options={{
            title: Providers,
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
            }
          }}
        />  
        <Stack.Screen
          name="CategorysListView"
          component={CategorysListView}
          options={{
            title: Categorys, 
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
            }
          }}
        /> 
         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
