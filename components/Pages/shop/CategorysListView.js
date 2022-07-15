import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
    ScrollView,
    VirtualizedList
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {
    Icon
} from "react-native-elements";

const CategorysListView = () => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation();
    const [providersList,setProvidersList]=React.useState([])

    const [userInfo, setUserInfo] = React.useState('');
   
    const getData = async () => {
        try {
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)  
            json != null ? setUserInfo(json)  : null;
        } catch(e) { 
          // error reading value
          alert(e)  
                      
        }   
      }   
      
        // React.useEffect(()=>{
        //     getData();
        // },[])

        const getProducts= async()=>{
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)
var config = {
    method: 'get',
    url: `http://52.202.149.74/pharmacy-online/shop/get_categorys.php?lang=${json.lang}`,
    headers: { 
        headers:new Headers({'Content-Type':'application/form-data'}),
    }
  }

  axios(config)
  .then(function (response) {
    //console.log(response.data);
    setProvidersList(response.data)
  })
  .catch(function (error) {
    //console.log(error);
  });
}
React.useEffect(()=>{
    getProducts();
},[])

    return (
        <ScrollView>
            <View style={styles.listContainer} >
                <FlatList data={providersList}
                scrollEnabled={false}
                    renderItem={({ item }) =>
                    <>
                        <TouchableOpacity 
                        key={item.id} 
                        style={[styles.elementContainer, { height: height / 5, width: width / 1.13 }]} 
                        onPress={()=>navigation.navigate("ItemsList",{title:item.title,title_en:item.title})} 
                        >
                            <View  >
                                <View style={[styles.rate, { width: width / 5, paddingHorizontal: 3, paddingVertical: 2, position: "absolute", top: 0, right: 0, borderTopEndRadius: 12 }]}>
                                    <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                    Hot Deals 
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                               <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <Image style={[{ width: width / 4, height: width / 4, borderRadius: 100 }, { resizeMode: "contain" }]}
                                    source={{uri:item.image}}
                                />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row"}]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1 ,width: width / 4,}]}>
                                            {item.title}
                                        </Text>
                                        <View style={[styles.priceContainer1, { maxHeight: height / 3, justifyContent: "flex-end" }]}>
                                            <View style={[styles.rate, { width: width / 6}]}>
                                                <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                                    {/* {item.rating.toFixed(2)} */}
                                                </Text>
                                                <Icon
                                                    name='star'
                                                    type='font-awesome'
                                                    size={15}
                                                    color='#E6EE0E'
                                                    onPress={() => console.log('hello')}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </TouchableOpacity></>}
                />
            </View>
        </ScrollView>);
};




const styles = StyleSheet.create({
    input_container: {
        margin: 15,
        marginBottom: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",


    },
    listContainer: {
        margin: 15,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    elementContainer: {
        margin: 8,
        padding: 2,
        backgroundColor: "white",
        borderRadius: 12,
        justifyContent: "center",
        // alignItems:"center",
        width: "50%",
        paddingLeft: 5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
    ,
    title: {
        color: "#000",
        fontSize: 20,
        fontWeight: "300",
        textAlign:"left"

    },
    priceContainer: {
        flex: .1,
        backgroundColor: "#FF4956",
        flexDirection: "row",
        borderRadius: 2,
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "30%",
        maxWidth: 35,
    },
    priceContainer1: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        maxHeight: "30%",
        width: 70,
        marginTop: 10,


    },
    price: {
        color: "#FFf",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,

    },
    price1: {
        color: "#000",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",

    },
    discount: {
        color: "#555",
        fontSize: 10,
        margin: 5,
        alignItems: "center",
        textDecorationLine: "line-through",
        fontWeight: "500",
        textAlignVertical: "bottom"

    }, titleContainer: {
        marginBottom: 5,
        width: 100,
        alignItems: "flex-start"
    }, discreption: {
        color: "#555",
        fontSize: 12,
        margin: 5,
        marginRight: 1,
        alignItems: "center",
        fontWeight: "400",
        textAlignVertical: "bottom"
    },
    rate: {
        backgroundColor: "#FF4956",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});
export default CategorysListView;

