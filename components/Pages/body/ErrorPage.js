import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    FlatList,
    ScrollView
} from "react-native";



const ItemCheck = () => {
    const { width, height } = useWindowDimensions()


    return (
        <View style={styles.container} >
             <StatusBar 
            translucent
             barStyle="dark-content" 
            backgroundColor="#FF4956"
             />
            <View style={[styles.container,{height:height/1.3,width:width/1.2}]}>
            <Image style={[{ width: width/1.2 , height: height / 2 }, { resizeMode: "contain" }]}
                 source={require("../../assets/MyImages/e1.png")}
                                    />
            </View>
        </View>);
};




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        height:"100%",
    }
 
});
export default ItemCheck;

