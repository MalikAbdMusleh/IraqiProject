import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont().then();

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    TextInput,
    ScrollView
} from "react-native";
import VitaminSupplement from "./VitaminSupplement";
import FoodSupplement from "./foodSupplement";
import BabyCare from "./BabyCare";
import Header from "../body/Header";
import Footer from "../body/Footer";
import Deals from "./Deals";
import Category from "./Categotry";
// import Drawer from '../../stack/Drawer'
const Home = () => {
    const { width,height } = useWindowDimensions()
    const navigation = useNavigation();



    return (
<View style={{width:width,height:height/1.1}}>
        <ScrollView style={styles.container}>
            <StatusBar 
            translucent
             barStyle="light-content" 
            backgroundColor="#FF4956"
             /> 
            <Header />
            <View style={styles.inputContainer} >
                      <Ionicons
           name='search'
           size={25}
           color={"#FF4956"}
           onPress={()=>chooseFile()}
         />
                <TextInput style={[styles.input2, { width: width - 120 }]} inputStyle={{ backgroundColor: '#fff' }} />
                <TouchableOpacity  onPress={()=>navigation.navigate("Filter")}>
                    <Image source={require("../../assets/MyImages/h4.png")} />
                </TouchableOpacity>

            </View>
            <Category />
            <Deals />
            <VitaminSupplement />
            <View style={[{ justifyContent: "center", alignItems: "center", width: width - 5 }]}>
                <Image source={require("../../assets/MyImages/b1.png")} />
            </View>
            <FoodSupplement />
            <BabyCare />
            {/* <MyTabs/> */}
        </ScrollView>
        <View style={[{ backgroundColor:"#fff" ,height:height/9,position:"absolute",bottom:-height/10}]}>
            <Footer page={"home"} />
        </View>
            </View>);
};




const styles = StyleSheet.create({
    input_container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#fff"

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    input2: {
        height: 40,
        marginTop: 12,
        marginLeft: 12,
        padding: 10,

    }, inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 20,
        margin: 20,
        alignItems: "center",
        padding: 7,
    }
});
export default Home;

