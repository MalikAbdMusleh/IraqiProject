import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import VitaminList from "./VitaminList";
import LinearGradient from 'react-native-linear-gradient';

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
import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';


import {
    Icon
} from "react-native-elements";
const VitaminSupplement = () => {
    const {Your_Near_By}=useTranslation()
    // alert(categoryList[0].title)
    const navigation = useNavigation();

    const {width,height}=useWindowDimensions()
    return (
        <View  >
            <View style={styles.input_container}>
                <Text style={[styles.title,{width:width/1.1}]} >
                {Your_Near_By}
                </Text>
            </View>
            <View style={[styles.listContainer,{width:width}]} >
                <FlatList data={VitaminList}
                    renderItem={({ item }) =>
                        <TouchableOpacity key={item.id} style={[styles.elementContainer]}
                           onPress={()=>navigation.navigate("TrackOrder")}
                        >
                            <Image style={[{width:width/4,height:50},{ resizeMode: "contain" }]}
                                source={item.image}
                            />
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                    {item.rate.toFixed(2)}
                                </Text>
                                <Icon
                                    name='star'
                                    type='font-awesome'
                                    size={9}
                                    color='#E6EE0E'
                                    onPress={() => console.log('hello')}
                                />
                            </View>
                        </TouchableOpacity>}
                    horizontal
                />
            </View>

        </View>);
};




const styles = StyleSheet.create({
    input_container: {
        margin: 15,
        // marginBottom: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    listContainer: {
        // margin: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    elementContainer: {
        margin: 4,
        padding: 5,
        backgroundColor: "#FFECEE",
        borderRadius: 12,
        justifyContent: "space-evenly",
        // width:"35%"
    }
    ,
    title: {
        color: "#000",
        fontSize: 15,
        fontWeight: "300",
    },
    priceContainer: {
        flex: .1,
        backgroundColor: "#FF4956",
        flexDirection: "row",
        borderRadius: 2,
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "10%",
        maxWidth: 35,
    },
    price: {
        color: "#FFf",
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "center"
    },
  titleContainer: {
        // marginBottom: 5,
        width: 100,
    }
});
export default VitaminSupplement;

