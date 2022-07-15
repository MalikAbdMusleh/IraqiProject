import React from 'react';
import {
    Button, StyleSheet,
    Text, useWindowDimensions,
    View, TouchableOpacity, Image,
    ImageBackground,ScrollView
} from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
// import MapView from 'react-native-maps';
import VitaminSupplement from "../shop/NearByVitaminSupplement";
import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';

import Footer from "../body/Footer";
const NearBy = ({ data }) => {
    const [visible, setVisible] = React.useState(false)
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation();

    return (
        <View style={[styles.container , width,height]}>
            <ImageBackground
                source={require('../../assets/MyImages/NearBy.png')}
                  imageStyle={{
                    resizeMode: "cover",
                    alignSelf: "flex-start",
                    marginBottom:"35%"
                  }}
            >
                <View style={[styles.body, width, height]}>
                    <View style={[{ height: "40%", marginBottom: 5 }]}>
                        <ScrollView style={[styles.btnContainer,{ width:width, height:height}]}>
                            <VitaminSupplement />
                        </ScrollView>
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
        marginBottom: "4%",
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
        // flexDirection: "row",
        // justifyContent: "space-evenly",
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
export default NearBy;
