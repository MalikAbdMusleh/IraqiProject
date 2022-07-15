import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as React from 'react';
import VitaminList from "./VitaminList";
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import FormData from 'form-data';
import { useNavigation } from '@react-navigation/native';
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
import {useTranslation}  from '../../../context/languageContext';

const VitaminSupplement = () => {
    const { width, height } = useWindowDimensions()

    const navigation = useNavigation();
    const [supplementData,setSupplementData]=React.useState({})
    const {Vitamin_Supplement,See_All}=useTranslation()

      
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
    

    const getSupplement=async ()=>{
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const json = JSON.parse(jsonValue1)
        var config = {
            method: 'get',
            url: `http://52.202.149.74/pharmacy-online/shop/get_providers.php?lang=${json.lang}`,
            headers: { 
                headers:new Headers({'Content-Type':'application/form-data'}),
            },
          };
          axios(config)
          .then(function (response) {
            //console.log(response.data);
            setSupplementData(response.data)
            // alert()

          })
          .catch(function (error) {
            //console.log(error);
          });
    }
    React.useEffect(()=>{
        getSupplement();
    })
    return (
        <View  >
            <View style={styles.input_container}>
                <Text style={styles.title} >
                    {Vitamin_Supplement}
                </Text>
               <TouchableOpacity onPress={()=>navigation.navigate("ProvidersListView")}>
                <Text>
                    {See_All}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer} >
                <FlatList data={supplementData}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate("ProductsListByProvidors",{title:item.title,id:item.id})}
                         key={item.id} 
                         style={[styles.elementContainer]} 
                         >
                            <Image style={[{ width: 100, height: 30 }, { resizeMode: "contain" }]}
                                source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                            /> 
                            <View style={styles.titleContainer}>
                                <Text style={[styles.title,{width: 100, height: 30 }]}>
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                    {item.rating.toFixed(2)}
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
        marginBottom: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    listContainer: {
        margin: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    elementContainer: {
        margin: 8,
        paddingLeft: 2,
        backgroundColor: "#FFECEE",
        borderRadius: 12,
        justifyContent: "space-evenly"
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
        maxHeight: "15%",
        maxWidth: 35,
    },
    price: {
        color: "#FFf",
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "center"
    },
    discount: {
        color: "#000",
        fontSize: 12,
        margin: 5,
        alignItems: "center",
        textDecorationLine: "line-through",
        fontWeight: "500",
        textAlignVertical: "bottom"

    }, titleContainer: {
        marginBottom: 5,
        width: 100,
    }
});
export default VitaminSupplement;

