import React from 'react';
import {
    Button, StyleSheet,
    Text, useWindowDimensions,
    View, TouchableOpacity, Image,
    ImageBackground
} from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
// import MapView from 'react-native-maps';
import {useTranslation}  from '../../../context/languageContext';

import Footer from "../body/Footer";
const TrackOrder = ({ data }) => {
    const [visible, setVisible] = React.useState(false)
    const { width, height } = useWindowDimensions()
    const {Cencel,Call,Report}=useTranslation()

    return (
        <View style={[styles.container, width, height]}>
            <ImageBackground
                source={require('../../assets/MyImages/map.png')}
            >
                <View style={[styles.body, width, height]}>
                    <View style={[styles.btnContainer, width, height]}>
                        <View style={[styles.listContainer]} >
                            <TouchableOpacity style={[styles.locationBox, { height: height / 9, width: width / 1.13, }]} >
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                        <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                            source={require("../../assets/MyImages/t1.png")}
                                        />
                                    </View>
                                    <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                        <View style={[{ width: width / 1.5 }]} >
                                            <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                                SER215689
                                            </Text>
                                            <View style={[{ maxHeight: height / 3, width: width / 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                                <Image style={[{ resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/t2.png")}
                                                />
                                                <Text style={[styles.discount]}>
                                                    Baghdad
                                                </Text>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> 
                    <View  style={[{height:"27%",marginBottom:5}]}> 
                        <View style={[styles.btnContainer,{height:"15%",marginBottom:5}]}>
                            <Text style={[{textAlignVertical:"center"}]}>
                                25May - Sunday - 11:30 am
                            </Text>
                        </View>
                        <View style={[styles.btnContainer, width, height]}>
                            <TouchableOpacity style={[styles.btn]}>
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>{Report}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { flexDirection: "row", backgroundColor: "#FF696A" }]}>
                                <Icon
                                    name='phone'
                                    type='font-awesome'
                                    color='#FFF'
                                    iconStyle={[{ marginRight: 20 }]}
                                />
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>{Call}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { flexDirection: "row" }]}>
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>{Cencel}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            <View style={[styles.footer]}>
                <Footer page={"location"} />
            </View>
            </ImageBackground>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8
    }, locationBox: {
        justifyContent: "center",
        marginTop: "-15%",
        marginBottom:"4%",
        backgroundColor: "#fff",
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
        zIndex: 3
    }
    ,
    body: {
        height: "100%",
        justifyContent: "flex-end",
    },
    footer: {
        height: "14%",
        position: "absolute",
        bottom: 0,
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 55 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
        zIndex: 3,
    }, btnContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        // borderWidth: 2,
        backgroundColor: "#fff",
        // position:"absolute",
        // bottom:"30%"
    }, btn: {
        borderRadius: 5,
        backgroundColor: "#752FFF",
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        height: "60%"
    }, title: {
        color: "#000",
        fontSize: 15,
        fontWeight: "300",
    },
})
export default TrackOrder;
