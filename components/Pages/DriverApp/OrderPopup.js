import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    FlatList,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
import OrdersList from "./OrdersList";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Footer from "../body/FooterDriver";
import HeaderDriver from "../body/HeaderDriver";

import { useNavigation } from '@react-navigation/native';


const OrderPopup = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("new")
    const OrdersList2 = OrdersList.slice(6, 7)
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <HeaderDriver page="Dashboard" />
            <View style={[{ height: height / 1.6, width: width / 1.15 }]}>
                <View style={[styles.title, { height: height / 16 }]}>
                    <Text style={[{ textAlign: "center", color: "#752FFF", fontSize: 20 }]}>
                        B2W 5896325
                    </Text>
                </View>
                <View style={[styles.orderContainer, { height: height / 5 }]}>
                    <View style={[{width: "100%", justifyContent: "flex-start" }]}>
                        <Text style={[{ textAlign: "left", color: "#666", fontSize: 20 }]}>
                            Order
                        </Text>
                        <View>
                            <View style={[{borderWidth: 1, borderColor: "#ccd",borderRadius:12}]}>
                            <View style={[{  height: height / 10,padding:'2%', width: width / 1.15, flexDirection: "row" }]}>
                                <View style={{ width: "20%" }}>
                                        <Image source={require("../../assets/MyImages/t1.png")} />
                                </View>
                                <View style={{ width: "50%", alignItems: "flex-start" }}>
                                    <View style={styles.iconContainer}>
                                        <Text style={[{ textAlign: "left", color: "#2D2E4A", fontSize: 15 }]}>
                                            Low Blush Bean
                                        </Text>
                                        <Text style={[{ textAlign: "left", color: "#2D2E4A", fontSize: 10 }]}>
                                            Variation : Yellow, XXL
                                        </Text>
                                        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                                            <Ionicons 
                                                name='help-circle-sharp' 
                                                size={10}
                                                color={"#11D458"}
                                            />
                                            <Text style={[{ textAlign: "left", color: "#2D2E4A", fontSize: 10 }]}>
                                                Already paid
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ flexDirection: "row", alignItems: "center", borderColor: "#ccd", justifyContent: "space-between",borderTopWidth:1,margint:'2%',marginHorizontal:'5%' }]}>
                                <Text style={[{ textAlign: "left", color: "#2D2E4A", fontSize: 10 }]}>
                                    Total Order (03)
                                </Text>
                                <Text style={[{ textAlign: "right", color: "#555555", fontSize: 15 }]}>
                                    $596
                                </Text>
                            </View>
                            </View>
                        </View>
                    </View>
                    <View style={[{ width: '100%', padding: '2%', justifyContent: "flex-start" }]}>
                        <Text style={[{ textAlign: "left", color: "#666", fontSize: 20 }]}>
                            Location
                        </Text>
                        <View style={[{ flexDirection: "row", alignItems: "center", width: '100%', padding: '5%', borderWidth: 1, borderColor: "#ccd", borderRadius: 12 }]}>
                            <Ionicons
                                name='location'
                                size={10}
                                color={"#000"}
                            />
                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                11/B,Vest surat - 5696
                            </Text>
                        </View>
                    </View>
                    <View style={[{ width: '100%', padding: '2%', justifyContent: "flex-start" }]}>
                        <Text style={[{ textAlign: "left", color: "#666", fontSize: 20 }]}>
                            Customer
                        </Text>
                        <View style={[{ width: '100%', paddingBottom: '5%', borderWidth: 1, borderColor: "#ccd", borderRadius: 12, padding: '3%' }]}>
                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                Name : Zusus Alias
                            </Text>
                            {/* Name : Zusus Alias */}
                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                +1(415) 896 - 8965
                            </Text>
                        </View>
                    </View>
                    <View style={[{ width: '100%', padding: '2%', justifyContent: "flex-start" }]}>
                        <Text style={[{ textAlign: "left", color: "#666", fontSize: 20 }]}>
                            Payment
                        </Text>
                        <View style={[{ flexDirection: "row", alignItems: "center", width: '100%', padding: '3.5%', borderWidth: 1, borderColor: "#ccd", borderRadius: 12 }]}>
                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                Cash On Delivery
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[{ justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", width: '80%', padding: '3.5%', height: '14%' }]}>
                <TouchableOpacity
                style={[styles.btn]}
                onPress={()=>navigation.navigate("OrderReject")}
                >
                    <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.btn, { flexDirection: "row", backgroundColor: "#FF696A" }]}
                onPress={()=>navigation.navigate("DriverTrackOrder")}

                >
                    <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Accept</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.Icon, { height: height / 9 }]}>
                <Footer />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FFECEE',
    }, Icon: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    }, title: {
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: .2
       , borderColor: "#ccd"
    }, orderContainer: {
        justifyContent: "flex-start",
        alignItems: "center"
    }, elementContainer: {
        margin: "3%",
        padding: 2,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    }, elementContainer2: {
        marginTop: "0%",
        borderWidth: 1,
        borderBottomWidth: 0,

        backgroundColor: "#FFECEE",
        borderRadius: 5,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        justifyContent: "center",
        shadowColor: '#171717',
        borderColor: "#707070"
    }, icon: {
        alignItems: "center",
        justifyContent: "center",
    }, btn: {
        borderRadius: 5,
        backgroundColor: "#752FFF",
        width: "38%",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        marginHorizontal: "2%"
    }
});

export default OrderPopup;
