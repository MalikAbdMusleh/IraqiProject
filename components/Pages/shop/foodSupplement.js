import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as React from 'react';
import foodList from "./foodList";
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import FormData from'form-data';
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

import {
    Icon
} from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';

const foodSupplement = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions()
    const {Food_Supplement,See_All,OFF}=useTranslation()

    const [productsList,setProductsList]=React.useState([])
    const [, updateState] = React.useState();

    const [userInfo, setUserInfo] = React.useState('');
    const forceUpdate = React.useCallback(() => updateState({}), []);

  const getData = async () => {
      try {
          const jsonValue1 = await AsyncStorage.getItem('user_info')
          const json = JSON.parse(jsonValue1)  
          json != null ? setUserInfo(json)  : null;
          forceUpdate()
      } catch(e) { 
        // error reading value
        alert(e) 

      }   
    }   
    
 
    const getProducts=async()=>{
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const json = JSON.parse(jsonValue1)
    var config = {
        method: 'get',
        url: `http://52.202.149.74/pharmacy-online/shop/get_products.php?lang=${json.lang}&category=food_supplements`,
        headers: { 
            headers:new Headers({'Content-Type':'application/form-data'}),
        }
      };
      
      axios(config)
      .then(function (response) {
        // //console.log(response.data);
        setProductsList(response.data)
      })
      .catch(function (error) {
        //console.log(error);
      });
    }
    React.useEffect(()=>{
        getProducts();
    },[])
    return (
        <View>
            <View style={styles.input_container}>
                <Text style={styles.title} >
                {Food_Supplement}
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("ItemsList",{title:Food_Supplement,title_en:'Food Supplements'})}>
                <Text>
                    {See_All}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer} >
                <FlatList data={productsList}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                         key={item.id} 
                         onPress={()=>navigation.navigate("ItemCheck",{
                            title:item.title,
                            id:item.id,
                            price:item.price,
                            discount:item.discount,
                            discreption:item.discreption,
                            rate:item.rating,
                            item:item,
                            recommended:productsList.slice(1,5)
                        })}
                         style={[styles.elementContainer, { height: height / 4, width: width / 1.5 }]} >
                            <View>
                                <View style={[styles.rate, { width: width / 5, paddingHorizontal: 3, paddingVertical: 2, position: "absolute", top: 0, right: 0, borderTopEndRadius: 12 }]}>
                                    <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                        {(item.discount * 100 / item.price).toFixed()}% {OFF}
                                    </Text>
                                </View>
                            </View> 
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Image style={[{ width: width / 4,height: '70%'}, { resizeMode: "contain" }]}
                                    source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                                />
                                <View style={[styles.priceContainer1, { maxHeight: height / 2, justifyContent: "flex-end" }]}>
                                    <Text style={[styles.price1, { marginHorizontal: 1 }]}>
                                        USD  {item.price.toFixed(2)}
                                    </Text>
                                    <Text style={[styles.discount, { marginHorizontal: 1 }]}>
                                        USD  {item.discount.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                            <View style={[{ width: width / 1.55,justifyContent: "space-between", flexDirection: "row" ,alignItems:"center" }]} >
                                {/* <View style={[{ width: width / 1.5 }]} > */} 
                                    <Text style={[styles.title, {width: width / 4, marginHorizontal: 1 }]}>
                                        {item.title}
                                    </Text>
                                    <View style={{ justifyContent: "space-between", flexDirection: "row" ,alignItems:"center"}}>
                                        <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                            {item.discreption} 
                                        </Text> 
                                        <View style={[styles.rate, { width: width / 6 }]}>
                                            <Text style={[styles.price]}>
                                                {item.rating.toFixed(2)}
                                            </Text>
                                            <Icon
                                                name='star'
                                                type='font-awesome'
                                                size={15}
                                                color='#E6EE0E'
                                                onPress={() => console.log('hello')}
                                            />
                                        {/* </View> */}
                                    </View>
                                </View>
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
        backgroundColor: "#FFECEE",
        borderRadius: 12,
        justifyContent: "space-evenly",
        width: "50%"
    }
    ,
    title: {
        color: "#000",
        fontSize: 15,
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
export default foodSupplement;

