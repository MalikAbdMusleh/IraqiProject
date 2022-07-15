import React, { Component } from 'react';
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

import Footer from "../body/FooterDriver";
import HeaderDriver from "../body/HeaderDriver";

import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    return (
        <View style={[styles.container, width, height]}>
            <HeaderDriver page="Dashboard"/>
            <View style={[styles.analysis, { width: width, height: height / 3.2 }]}>
                <View style={[styles.Earning, { width: width / 2.2, height: height / 4 }]}>
                    <View style={[{ width: width / 2.4, height: height / 6,justifyContent:'space-evenly'}]}>
                        <View style={[{ height: height / 32, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                Total Earning
                            </Text>
                            <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/df6.png")} />
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end" }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>
                                $88,302
                            </Text>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                in last month
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: '7%' }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>
                                This week so for
                            </Text>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                78%
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>
                                $7,395.37
                            </Text>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                Vs Last week
                            </Text>
                        </View>
                    </View>
                    <View style={[{ width: width / 2.2, height: height / 11, justifyContent: "flex-end", borderRadius: 15, }]}>
                        <Image style={[styles.Icon, { resizeMode: "cover" }]} source={require("../../assets/MyImages/dach1.png")} />
                    </View>
                </View>
                <View style={[styles.Delivery, { width: width / 2.2, height: height / 4 }]}>
                    <View style={[{ width: width / 2.4}]}>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                Total Delivery
                            </Text>
                            <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/df6.png")} />
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end" }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>
                                $33.56
                            </Text>
                            {/* <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                            in last month
                            </Text> */}
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: '7%' }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>

                            </Text>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                78%
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: height / 30 }]}>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 12 }]}>
                            </Text>
                            <Text style={[{ color: "#fff", fontWeight: "500", fontSize: 8 }]}>
                                Vs Last week
                            </Text>
                        </View>
                    </View>
                    <View style={[{ width: width / 2.2, height: height / 11, justifyContent: "flex-end", borderRadius: 15, alignItems: "center" }]}>
                        <Image style={[styles.Icon, { marginBottom: '-15%', height: height / 15, width: width / 1.5 }]} source={require("../../assets/MyImages/dach2b.png")} />
                        <Image style={[styles.Icon, { resizeMode: "cover" }]} source={require("../../assets/MyImages/dach2a.png")} />
                    </View>
                </View>
            </View>
            <View style={[styles.analysis, { width: width, height: height / 5 }]}>
            <View>
                <View
                    style={[styles.Icon, {
                        width: width / 4,
                        height: width / 4,
                        backgroundColor: '#FFBE00',
                    }]}>
                    <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/da1.png")} />
                </View>
                <Text style={[{ textAlign: "center", fontSize: 18, paddingHorizontal: 5, color: "#2D2E4A" }]} >
                New
                    </Text>
                </View>
                <View>
                    <View style={[styles.Icon, { width: width / 4, height: width / 4, backgroundColor: '#30F385' }]}>
                        <Image style={[styles.Icon, { width: width / 6, height: width / 8, resizeMode: "contain" }]} source={require("../../assets/MyImages/da2.png")} />
                    </View>
                    <Text style={[{ textAlign: "center", fontSize: 18, paddingHorizontal: 5, color: "#2D2E4A" }]} >
                    Active
                    </Text>
                </View>
                <View>
                <View style={[styles.Icon, { width: width / 4, height: width / 4, backgroundColor: '#FF69E1' }]}>
                    <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/da3.png")} />
                </View>
                <Text style={[{ textAlign: "center", fontSize: 18, paddingHorizontal: 5, color: "#2D2E4A" }]} >
                Deliverd
                    </Text>
                </View>

            </View>
            <View style={[styles.analysis, { width: width, height: height / 5, justifyContent: "flex-start" }]}>
            <View style={[styles.Icon]}>
                <View style={[styles.Icon, { width: width / 4, height: width / 4, marginHorizontal: "6%", backgroundColor: '#FF696A' }]}>
                    <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/da4.png")} />
                </View>
                <Text style={[{ textAlign: "center", fontSize: 18, paddingHorizontal: 5, color: "#2D2E4A" }]} >
                Return
                    </Text>
                </View>
                <View>
                <View style={[styles.Icon, { width: width / 4, height: width / 4, backgroundColor: '#752FFF' }]}>
                    <Image style={[styles.Icon, { resizeMode: "contain" }]} source={require("../../assets/MyImages/da5.png")} />
                </View>
                <Text style={[{ textAlign: "center", fontSize: 18, paddingHorizontal: 5, color: "#2D2E4A" }]} >
                Review
                    </Text>
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
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#FFECEE',
    }, analysis: {
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
    }
});

export default Dashboard;
