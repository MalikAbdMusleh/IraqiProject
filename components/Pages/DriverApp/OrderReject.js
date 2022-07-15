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


const OrderReject = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("new")
    const OrdersList2 = OrdersList.slice(6, 7)
    return (
        <View style={[styles.container, { width: width, height: height }]}>
           
            <HeaderDriver page="Dashboard" />
            <View style={[{ height: height / 1.3, width: width / 1.15, justifyContent: "center", alignItems: "center" }]}>
                {/* <View style={[styles.popContainer]}> */}
                <View style={[styles.popContainer, { height: "35%" }]}>
                    <Text style={[{ fontSize: 15, color: "#2D2E4A", textAlign: "center" }]}>
                        Write a Specific reason to reject
                        order
                    </Text>
                    <TextInput
                        placeholder='Type something here'
                        style={{ borderBottomColor: "#CDD4D9", borderBottomWidth: 1, width: "100%" }}
                    />
                </View>
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
    }, popContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        width: '90%',
        padding: '10%',
        borderColor: "#ccd",
        borderRadius: 12,
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 25,
        borderTopWidth: .1
    },
    title: {
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

export default OrderReject;
