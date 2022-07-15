import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import productList from "./productList";
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    FlatList,
    ScrollView,
    VirtualizedList
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {
    Icon
} from "react-native-elements";
import {useTranslation}  from '../../../context/languageContext';

const NotificationPage = ({ route, navigation }) => {
    const { width, height } = useWindowDimensions()
    const navigation2 = useNavigation();
    const {
        Clear,Clear_All
      }=useTranslation()

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={styles.listContainer} >
                <FlatList data={productList}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.elementContainer, { height: height / 7, width: width/ 1.13  }]}
                            onPress={() => navigation2.navigate("ItemCheck", {
                                title: item.title,
                                price: item.price,
                                discount: item.discount,
                                discreption: item.discreption,
                                rate: item.rate
                            })}
                        >
                            {productList[index-1]?(productList[index-1].day!=productList[index].day?
                             (<View style={styles.input_container}>
                              <Text style={[styles.title, {}]} >
                                  {item.day}
                              </Text>
                              <Text style={{ fontWeight: "bold" ,color:"#B3B3B3"}}>
                                  {Clear} 
                              </Text>
                          </View>):<Text></Text>): (<View style={styles.input_container}>
                              <Text style={[styles.title, {}]} >
                                  {item.day}
                              </Text>
                              <Text style={{ fontWeight: "bold" ,color:"#B3B3B3"}}>
                                  {Clear_All}
                              </Text>
                          </View>)}
                            <View
                                style={[styles.elementContainer2, { height: height / 7 , width: width / 1.13 }]}
                            >
                                <View>
                                    <View style={[styles.rate, { width: width / 5, paddingHorizontal: 3, paddingVertical: 2, position: "absolute", top: 0, right: 0, borderTopEndRadius: 12 }]}>
                                        <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <View style={{width:"25%",alignItems: "center",}}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons
                                            name='notifications-outline'
                                            size={25}
                                            color={"#FF4956"}
                                        />
                                    </View>

                                    </View>
                                    <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                        <View style={[{ width: width / 1.5 }]} >
                                            <Text style={[styles.title, { marginHorizontal: 1,color:"#190708",fontWeight:"600" }]}>
                                                {item.title}
                                            </Text>
                                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                                {item.discreption}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>}
                />
            </View>

        </ScrollView>);
};


const styles = StyleSheet.create({
    input_container: {
        marginBottom: 1, 
        marginTop: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFECEE",
        borderRadius: 100,
        width: 45,
        height: 45,

    }
    , listContainer: {
        justifyContent:"center",
        alignItems: "center",
        flexDirection: "row",
    },
    elementContainer: {
        margin: "3%",
        padding: 2,
        borderRadius: 12,
        justifyContent: "center",
        alignItems:"center",
        paddingLeft: "5%",
    }, elementContainer2: {
        marginTop: "0%",
        marginBottom: "1%",
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        backgroundColor: "#FBFDFF",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation:8,
    },
    title: {
        color: "#777777",
        fontSize: 15,
        fontWeight: "bold",
    },
    price: {
        color: "#FF4956",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 10,
        
    }, discreption: {
        color: "#555",
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
export default NotificationPage;

