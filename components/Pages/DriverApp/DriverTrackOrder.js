import React from 'react';
import {
    Button, StyleSheet,
    Text, useWindowDimensions,
    View, TouchableOpacity, Image,
    ImageBackground, TextInput
} from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';

import Footer from "../body/FooterDriver";
import HeaderDriver from "../body/HeaderDriver";
const TrackOrder = ({ data }) => {
    const [visible, setVisible] = React.useState(false)
    const { width, height } = useWindowDimensions()
    const [visibleCard, setVisibleCard] = React.useState(false)

    return (
        <View style={[styles.container, width, height]}>
            <ImageBackground
                source={require('../../assets/MyImages/dmap2.png')}
            >
                <View style={[styles.Icon, { height: height / 9 }]}>
                    <HeaderDriver page={"Dashboard"} />
                </View>
                <View style={[styles.body, width, height]}>
                    <Image style={[{ resizeMode: "cover", height: height / 2, width: width }]}
                        source={require("../../assets/MyImages/dmap1.png")}
                    />
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
                    <View style={[{ height: "27%", marginBottom: 5 }]}>
                        <View style={[styles.btnContainer, { height: "15%", marginBottom: 5 }]}>
                            <Text style={[{ textAlignVertical: "center" }]}>
                                25May - Sunday - 11:30 am
                            </Text>
                        </View>
                        <View style={[styles.btnContainer, width, height]}>
                            <TouchableOpacity style={[styles.btn, { flexDirection: "row" }]}>
                                <Icon
                                    name='phone'
                                    type='font-awesome'
                                    color='#FFF'
                                    iconStyle={[{ marginRight: 20 }]}
                                />
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: "#FF696A" }]}>
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Finish</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    // {
                                    // setVisible(false);
                                    // setTimeout(() => {
                                    setVisibleCard(true)
                                    // }, 2000);
                                    // }
                                }
                                style={[styles.btn, { flexDirection: "row" }]}
                            >
                                <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Dialog
                    visible={visibleCard}
                    onTouchOutside={() => {
                        setVisibleCard(false);
                        setVisible(true);
                    }}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    
                    dialogStyle={{
                        position: "absolute",
                        borderWidth: 1,
                        // paddingTop: 50,
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        borderColor: "#CDD4D9",
                        height: "40%",
                        bottom: 0
                    }}
  
                    footer={
                        <View style={[{ justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", width: '100%', height: '25%'}]}>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => setVisibleCard(false)}
                        >
                            <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { flexDirection: "row", backgroundColor: "#FF696A" }]}
                            onPress={() => navigation.navigate("DriverTrackOrder")}
                        >
                            <Text style={[{ color: "#fff", fontWeight: "bold", fontSize: 15 }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    }
                >

                    <DialogContent style={{ width: width}}>
                        <View style={{  }}>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                                Order Code : SER215689
                            </Text>
                            <Text >
                                Cancel Issue
                            </Text>
                        </View>
                        <View style={{  height:"50%",marginBottom:0}}
 >
                            <TextInput
                                style={{ backgroundColor: "#fff",borderWidth:2, borderColor: "#F1F4F6",  height:"125%",alignContent:"flex-start",textAlignVertical:"top"}}
                                placeholder={"Type cancel issue"}
                            />
                        </View>
                    </DialogContent>

                </Dialog >
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
        justifyContent: "space-between",
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8
    }, locationBox: {
        justifyContent: "center",
        marginTop: "4%",
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
        height: "90%",
        justifyContent: "flex-end",
        backgroundColor: "#FFECEE"
    },
    footer: {
        height: "12%",
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
        backgroundColor: "#FFECEE",
        // position:"absolute",
        // bottom:"30%"
    }, btn: {
        borderRadius: 5,
        backgroundColor: "#752FFF",
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        height: "65%"
    }, title: {
        color: "#000",
        fontSize: 15,
        fontWeight: "300",
    },
})
export default TrackOrder;
