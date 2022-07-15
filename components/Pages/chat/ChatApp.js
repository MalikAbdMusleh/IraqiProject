// import { View } from 'native-base';
import React, { useState, useCallback, useEffect } from 'react'
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon } from 'react-native-elements'

export function ChatApp() {
    const [messages, setMessages] = useState([]);
    const { height, width } = useWindowDimensions()
    // const currentdate= new Date(2018, 11, 24, 10, 33, 30, 0)
    const currentdate= new Date(null, 11, 24, 10, 33, 30, 0)
    return (
        <ScrollView style={{ height: height / 1.1, backgroundColor: "#fff" }}>
            <View style={[styles.line, { height: height / 5 }]}>
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
                    Chat With Support
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.dot, { height: width / 9, width: width / 9 }]}>

                    </View>
                    <View style={[styles.dot, { height: width / 9, width: width / 9 }]}>

                    </View>
                    <View style={[styles.dot, { height: width / 9, width: width / 9 }]}>

                    </View>
                </View>
            </View>
            <ScrollView style={{ height: height / 1.5, backgroundColor: "#fff" }}>
                <View style={styles.sysMassage}>
                    <TouchableOpacity 
                    onPress={() => console.log("Filter")}
                    >
                        <Image source={require("../../assets/MyImages/bb.png")} />
                    </TouchableOpacity>
                    <View style={styles.inputContainer2} >
                        <Text style={[styles.input2, { fontSize: 15,width:width/1.6 }]} >
                        You can track  delivery in the "Orders" section
                        </Text>

                    </View> 
                </View>
                <View style={{  borderWidth:0,alignItems:"center",justifyContent:"center",width:width}}>
                <View style={{ borderTopWidth:1.2,borderColor:"#707070",width:width/1.2,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{ textAlign:"center",backgroundColor:"#fff",marginTop:-15,padding:4,color:"#000"}}>
                    Sunday,20 December
                    </Text>
                </View>
                </View>
                <View style={styles.userMassage}>
                    <View style={styles.inputContainer2} >
                        <Text style={[styles.input2, { fontSize: 15}]} >
                         Hi
                        </Text>

                    </View> 
                </View>
            </ScrollView>
            <View style={[styles.inputContainer, { height: height / 14 }]} >
                <MaterialCommunityIcons
                    name='emoticon-happy-outline'
                    color='#555'
                    size={30}
                    onPress={() => console.log("e")}
                />
                <MaterialCommunityIcons
                    name='image-outline'
                    color='#555'
                    size={30}
                    onPress={() => console.log("e")}
                />
                <TextInput
                    style={[styles.input2, { width: width / 1.6, fontSize: 18, color: "#CDD4D9" }]}
                    inputStyle={{ backgroundColor: '#fff' }}
                    placeholder="Type Message....."

                />
                <TouchableOpacity
                // onPress={() => navigation.navigate("Filter")}
                >
                    <MaterialCommunityIcons
                        name='send'
                        size={24}
                        color={"#FF4956"}
                    />
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input_container: {
        // margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#fff"

    }, line: {
        backgroundColor: "#FF4956",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        padding: '4%',
        marginTop: "10%"
    }, sysMassage: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
       paddingLeft: '5%', 
    },
    userMassage: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
       paddingLeft: '5%', 
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
        // height: 40,
        // marginTop: 12,
        marginLeft: 12,
        // padding: 10,

    }, inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#EFEEEE",
        borderWidth: 1.6,
        margin: 20, 
        alignItems: "center",
        padding: 7,
        position: "absolute",
        bottom: 0
    }, inputContainer2: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFECEE",
        borderRadius: 10,
        borderColor: "#EFEEEE",
        borderWidth: 1.6,
        margin: 20,
        alignItems: "center",
        padding: 7,
    },
    dot: {
        borderRadius: 100,
        backgroundColor: "#AAAAAA",
        borderColor: "#fff",
        borderWidth: 1.4,
        margin: "1%"
    }
});
export default ChatApp;