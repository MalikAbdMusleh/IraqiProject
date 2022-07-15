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


const Orders = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("new")
    return (
        <View style={[styles.container, width, height]}>
            <HeaderDriver page="" />
            <View style={[styles.secHeader, { height: height / 10, width: width, backgroundColor: "#fff" }]}>
                <Ionicons
                    name='arrow-back'
                    size={30}
                    color={"#FF4956"}
                />
                <Text style={[styles.title, { marginHorizontal: 15, fontSize: 22, color: "#2D2E4A", fontWeight: "600" }]}>
                    Orders
                </Text>
            </View>
            <View style={[{ height: height / 10, width: width,  flexDirection: "row", justifyContent: "space-evenly", alignItems: "center",borderColor:'#2D2E4A',borderBottomWidth:1,borderColor:'#ddd' }]}>
                <TouchableOpacity
                style={[styles.title, { padding: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" },selectedTab=="new"?{borderBottomWidth:2,borderColor:'#752FFF'}:{}]}
                onPress={() => setSelectedTab('new')}>
                    <Text style={[ { marginHorizontal: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" }]}>
                        New
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 style={[styles.title, { padding: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" },selectedTab=="Active"?{borderBottomWidth:2,borderColor:'#752FFF'}:{}]}
                onPress={() => setSelectedTab('Active')}>
                    <Text style={[styles.title, { marginHorizontal: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" }]}>
                        Active
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.title, { padding: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" },selectedTab=="Deliverd"?{borderBottomWidth:2,borderColor:'#752FFF'}:{}]}
                 onPress={() => setSelectedTab('Deliverd')}>
                    <Text style={[styles.title, { marginHorizontal: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" }]}>
                        Deliverd
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={[styles.title, { padding: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" },selectedTab=="Return"?{borderBottomWidth:2,borderColor:'#752FFF'}:{}]}
                onPress={() => setSelectedTab('Return')}>
                    <Text style={[styles.title, { marginHorizontal: 15, fontSize: 15, color: "#2D2E4A", fontWeight: "400" }]}>
                        Return
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[{ height: height / 1.8, width: width }]}>
                <FlatList data={OrdersList}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.elementContainer, { height: height / 13, width: width / 1.13 }]}
                        // onPress={() => navigation.navigate("ItemCheck", {
                        //     title: item.title,
                        //     price: item.price,
                        //     discount: item.discount,
                        //     discreption: item.discreption,
                        //     rate: item.rate
                        // })}
                        >
                            <View
                                style={[styles.elementContainer2, { height: height / 10, width: width / 1.1 }]}
                            >
                                <View>
                                    <View style={[styles.rate, { width: width / 5, paddingHorizontal: 3, paddingVertical: 2, position: "absolute", top: 0, right: 0, borderTopEndRadius: 12 }]}>
                                        <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <View style={{ width: "25%", alignItems: "center", }}>
                                        <View style={styles.iconContainer}>
                                            <Image source={require("../../assets/MyImages/t1.png")} />
                                        </View>
                                    </View>
                                    <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                        <View style={[{ width: width / 1.5 }]} >
                                            <Text style={[styles.title, { marginHorizontal: 1, color: "#2D2E4A", fontWeight: "600" }]}>
                                                {item.title}
                                            </Text>
                                            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                                                <Ionicons
                                                    name='location'
                                                    size={10}
                                                    color={"#000"}
                                                />
                                                <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                                    {item.discreption}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>}
                />
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
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#FFECEE',
    }, secHeader: {
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
        alignItems: "center",
        flexDirection: "row",
    },

    analysis: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    }, Earning: {
        backgroundColor: "#752FFF",
        alignItems: "center",
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
    },
    Delivery: {
        backgroundColor: "#FF696A",
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    MinCatogery: {
        backgroundColor: "#FF696A",
        borderRadius: 15
    }, Icon: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    }, input_container: {
        marginBottom: 1,
        // marginTop: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#FFECEE",
        // borderRadius: 100,
        width: 45,
        height: 45,

    }
    , listContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    elementContainer: {
        margin: "3%",
        padding: 2,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "5%",
    }, elementContainer2: {
        marginTop: "0%",
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        backgroundColor: "#FBFDFF",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 8,
    },
    title: {
        color: "#777777",
        fontSize: 15,
        fontWeight: "bold",
    },
    price: {
        color: "#AAAAAA",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 10,

    }, discreption: {
        color: "#555555",
        fontSize: 12,
        margin: 5,
        marginRight: 1,
        alignItems: "center",
        fontWeight: "400",
        textAlignVertical: "bottom",
        width: "70%",

    },
    rate: {
        backgroundColor: "#FFf",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",

    }
});

export default Orders;
