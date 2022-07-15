import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import FormData from'form-data';

import * as React from 'react';
import categoryList from "./categoryList";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    Alert
} from "react-native";
import {useTranslation}  from '../../../context/languageContext';
import { useNavigation } from '@react-navigation/native';


const Category = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions()
    const [categoryList,setCategoryList]=React.useState([])
    const {Shop_By_Category,See_All}=useTranslation()
    const [userInfo, setUserInfo] = React.useState('');
   
    const getData = async () => {
        try {
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)  
            json != null ? setUserInfo(json)  : null;
            // alert(JSON.stringify(userInfo))
        } catch(e) { 
          // error reading value
          alert(e)  
                      
        }    
      }   

    const getCategorys=async()=>{
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const json = JSON.parse(jsonValue1)  
        // alert(jsonValue1)
    var config = {
        method: 'get',
        url: `http://52.202.149.74/pharmacy-online/shop/get_categorys.php?lang=`+json.lang,
        headers: { 
            headers:new Headers({'Content-Type':'application/form-data'}),
        }
      };
      axios(config)
      .then(function (response) {
        setCategoryList(response.data)
      })
      .catch(function (error) {
        //console.log(error);
      });
    }
    React.useEffect(()=>{
        getCategorys();
    },[])
    return (
        <View >
            <View style={styles.input_container}>
                <Text   style={styles.title} >
                    {Shop_By_Category}
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("CategorysListView",{title:Shop_By_Category})}>
                <Text>
                    {See_All}
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer} >
                <FlatList data={categoryList}
                    renderItem={({ item }) =>
                        <TouchableOpacity key={item.id} style={styles.elementContainer} onPress={()=>navigation.navigate("ItemsList",{title:item.title,title_en:item.title})} >
                            <Image
                                style={[{ width: width / 5,height:width / 5,borderWidth:2}, { resizeMode: "contain" }]}
                                source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                            />
                            <Text style={[{textAlign:"center",width: width / 5}]} >
                                {item.title}
                            </Text>

                        </TouchableOpacity>}
                    horizontal
                />
            </View>

        </View>);
};




const styles = StyleSheet.create({
    input_container: {
        margin: 15,
        marginBottom:1,
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
    }
    ,
    title: {
        color:"#000",
        fontSize:17,
        fontWeight:"500"
    }
});
export default Category;

