import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import dealsList from "./dealsList";
import LinearGradient  from 'react-native-linear-gradient';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';
const Deals = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions()
    const {Deals_and_Offers,See_All}=useTranslation()

    const [productsList,setProductsList]=React.useState([])

       
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
    
   
       const getProducts= async()=>{
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)
    var config = {
        method: 'get',
        url: `http://52.202.149.74/pharmacy-online/shop/get_products.php?lang=${json.lang}&deal=30`,
        headers: { 
            headers:new Headers({'Content-Type':'application/form-data'}),
        }
      };
      
      axios(config)
      .then(function (response) {
        // alert()
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
        <View  >
            <View style={styles.input_container}>
                <Text style={styles.title} >
                    {Deals_and_Offers}
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("DealsProducts",{title:Deals_and_Offers,product_list:productsList})}>
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
                        style={styles.elementContainer} >

                            <LinearGradient colors={['#FEB3B3', '#fff']}  style={{borderRadius:12}}>

                                <Image
                                style={[{ width: width / 4,height: width / 4}, { resizeMode: "contain" }]}
                                    source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                                />
                                <Text style={[styles.title,{width: width / 4,}]}>
                                       {item.title}
                                    </Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>
                                        $ {item.price.toFixed(2)}
                                    </Text>
                                    <Text style={styles.discount}>
                                        {item.discount.toFixed(2)}
                                    </Text>
                                </View>
                            </LinearGradient>
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

    },//listContainer
    listContainer: {
        margin: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    elementContainer: {
        margin: 15,
        width: 200,
        borderRadius:12,
        padding:'1%'
        
    }
    ,
    title: {
        color: "#000",
        fontSize: 17,
        fontWeight: "500",
        textAlign:"left"

    },
    priceContainer: {
        flexDirection: "row"
    },
    price: {
        color: "#FF4956",
        fontSize: 15,
        margin: 5
    },
    discount: {
        color: "#000",
        fontSize: 12,
        margin: 5,
        alignItems: "center",
        textDecorationLine:"line-through",
        fontWeight:"500",
        textAlignVertical:"bottom"

    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
      },
      signupButton: {
        backgroundColor: "#FF4956",
      },
});
export default Deals;

