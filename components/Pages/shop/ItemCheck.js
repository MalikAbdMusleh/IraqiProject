import * as React from 'react';
import foodList from "./foodList";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {useTranslation}  from '../../../context/languageContext';

import { useNavigation } from '@react-navigation/native';

const ItemCheck = ({ route, navigation }) => {
    // const navigation1 = useNavigation();
    const { width, height } = useWindowDimensions()
    const [productData,setProductData]=React.useState({})
    const [quantity,setQuantity]=React.useState(1)
    const [total,setTotal]=React.useState(route.params.price)
    const [itemData,setItemData]=React.useState({})
    const [typeButtons, setTypeButtons] = React.useState(['50mg', '100mg', '500mg']);
    const [type, setType] = React.useState("100mg");
    const [recommendedList, setRecommendedList] = React.useState([]);
    const {
        Prescription_Requment,Indications,
        Exactly_as_your_doctor_has_told_you,Pharmacist_if_you_are_not_sure,
        Therapeutic_Class,Side_Effects,
        Overdose_Effects,Storage_Conditions,
        Recommended_Medicine,Add_to_cart,OFF,Total,See_All
    }=useTranslation()
    const [userInfo, setUserInfo] = React.useState('');
   
    const getData2 = async () => {
        try {
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)  
            json != null ? setUserInfo(json)  : null;
        } catch(e) { 
          // error reading value
          alert(e)  
                      
        }   
      }   
      
        React.useEffect(()=>{
            getData2();
        },[])
        const getProducts= async()=>{
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const json = JSON.parse(jsonValue1)        
        var data = new FormData();
        data.append('id', route.params.id);
    var config = {
        method: 'get',
        url: `http://52.202.149.74/pharmacy-online/shop/get_products.php?lang=${json.lang}&id=`+route.params.id,
        headers: { 
            headers:new Headers({'Content-Type':'application/form-data'}),
        },
      };
     await axios(config)
      .then(function (response) {
        // alert()
        console.log('setProductData',response.data);
        setProductData(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
        alert()
      });
    }

    const updateQuantityAdd = () => {
        setTotal(total+Number(route.params.price))
        setQuantity(quantity+1)
    }
    const updateQuantityRemove = () => {
        if (quantity > 0 ) {
            setTotal(total-Number(route.params.price))
            setQuantity(quantity-1)
        }
    }
    const [bagData, setBagData] = React.useState([]);

    const storeBagData = async () => {
        try {
            let productData=route.params.item
            productData.quantity=quantity
            productData.total=total
            productData.size=type
            let bagData2= bagData

            // alert(bagData)
            if ( bagData.length!==0) {
                var checkIfExist=bagData2.filter(e=>(Number(e.id)==Number(productData.id)||e.title==productData.title))
            }else{
                var checkIfExist=[]
            }
            console.log(bagData);
           if (checkIfExist.length>=1) {
            alert(productData.title+' is already exist in your bag');
           }else{
              bagData2.push(productData)
              const jsonValue = JSON.stringify(bagData2)
              await AsyncStorage.setItem('bag_data', jsonValue)
              navigation.navigate("MedicineBag")
           }
        } catch (e) {
            // saving error
            // alert('storing error'+e)
        }
    }
  const getBagData = async () => {
      try {
        const jsonValue1 = await AsyncStorage.getItem('bag_data')
        const jsonValue = JSON.parse(jsonValue1)  
        jsonValue != null ? setBagData(jsonValue)  : setBagData([]);
      } catch(e) { 
        // error reading value
        alert(e)
      }
    }   

    const getData=()=>{
        console.log(route.params);
        let itemData=route.params.item;
        let btnSize=itemData.size.split(",");
        setTypeButtons(btnSize);
        setItemData(itemData);
        let recommended_list=route.params.recommended;
        setRecommendedList(recommended_list);
    }
    React.useEffect(()=>{
        getData();
        getProducts();
        getBagData();
    },[])
    navigation.setOptions({
        title: route.params.title === '' ? 'No title' : route.params.title,
      });

  

    var typeButtons2 = typeButtons.map((e, i) => <TouchableOpacity
        style={{ margin: 4 }}
        onPress={() => setType(e)}
        key={i}
    ><Text style={[styles.eleTXT, { color: "#FF4956", backgroundColor: "#FFECEE" }, e == type ? { backgroundColor: "#FF4956", color: "#fff" } : {}]}>{e}</Text>
    </TouchableOpacity>)

    return (
        <ScrollView >
            <View style={[{ justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff" }]}>
                <View style={[styles.imageContainer, { width: width / 1.1}]}>
                    <View style={[styles.image, { width: width / 1.1 }]}> 
                        <Image style={[{ width: width / 4, height: height/3 }, { resizeMode: "contain" }]}
                        source={itemData.image?{uri:itemData.image}:require('../../assets/MyImages/it1.png')}
                           />
                        <View style={[styles.discount,{marginLeft:"-10%",marginBottom:"-20%",backgroundColor:"#FF4956",padding:2}]} >
                            <Text style={[{ color: "#fff" }]}> 
                                {(itemData.discount * 100 / itemData.price).toFixed()} {OFF}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.size}>
                        {typeButtons2}
                    </View>
                </View>

                <View style={[styles.elementContainer, { height: height / 7, width: width / 1.1, flexDirection: "row", backgroundColor: "#fff", borderColor: "#ddd", borderBottomWidth: 4 }]} >
                    <View style={[{ width: "50%", flexDirection: "row" }]} >
                        <View style={[{ width: width / 1.5 }]} >
                            <Text style={[styles.title]}>
                                {route.params.title}
                            </Text>
                            <View style={{ justifyContent: "space-between" }}>
                                <Text style={[styles.discreption]}>
                                {route.params.discreption}

                                </Text>
                                <View style={[styles.rate, { width: width / 6 }]}>
                                    <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                    {route.params.rate}

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
                    <View style={{ width: "50%", alignItems: "flex-end", margin: 0 }}>
                        <View style={[styles.priceContainer1, { marginTop: "9%" }]}>
                            <Text style={[styles.price1, { marginHorizontal: 1, color: "#FF4956", fontSize: 19, margin: 0 }]}>
                                $ {(route.params.price).toFixed(2)}
                            </Text>
                            <Text style={[styles.discount, { marginHorizontal: 1, fontSize: 15, margin: 0 }]}>
                            $ {(route.params.discount).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.elementContainer, { height: height / 7, width: width / 1.1, backgroundColor: "#FFECEE", padding: "3%" }]} >
                    <View style={[{ width: "100%", flexDirection: "row" }]} >
                        <View style={[{ width: width / 1.2 }]} >
                            <Text style={[styles.title, { fontSize: 12, fontWeight: "600" }]}>
                                {Prescription_Requment}
                            </Text>
                            <View style={{ justifyContent: "space-between" }}>
                                <Text style={[styles.discreption, { fontSize: 12 }]}>
                                   {itemData.prescription}
                                </Text>

                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Indications}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >{itemData.indications}</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Exactly as your doctor has told you
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Pharmacist if you are not sure
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Therapeutic_Class}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />

                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >{itemData.Therapeutic}</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    {Exactly_as_your_doctor_has_told_you}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    {Pharmacist_if_you_are_not_sure}
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Indications}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />

                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >Plastic oi is a prescription medicine & a preparation of Cetirizine; which is a potent antihistamine.</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Exactly as your doctor has told you
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Pharmacist if you are not sure
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Side_Effects}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >{itemData.side_effects}</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Exactly as your doctor has told you
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Pharmacist if you are not sure
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Overdose_Effects}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />

                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >{itemData.overdose_effects}</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                   Exactly as your doctor has told you
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Pharmacist if you are not sure
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                    <Collapse style={{ width: width / 1.1, borderBottomWidth: 1, padding: 5, borderRadius: 2, borderColor: "#C5C1C1", backgroundColor: "#F2F2F2", marginTop: "5%" }} >
                        <CollapseHeader >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width, alignItems: "center" }} >
                                <Text style={{ fontWeight: "bold", color: "#444", fontSize: 15 }}>{Storage_Conditions}</Text>
                                <Image style={[{ width: width / 4, maxHeight: height }, { resizeMode: "contain" }]}
                                    source={require('../../assets/MyImages/pi1.png')} />

                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={{ color: "#444", fontSize: 12 }} >{itemData.storage_conditions}</Text>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Exactly as your doctor has told you
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", margin: 12, fontSize: 12, justifyContent: "flex-start", width: width / 1.6 }}>
                                <Icon
                                    name='circle'
                                    type='font-awesome'
                                    size={15}
                                    color='#FF4956'
                                    onPress={() => console.log('hello')}
                                />
                                <Text style={{ fontWeight: "bold", color: "#444", marginLeft: "2%" }}>
                                    Pharmacist if you are not sure
                                </Text>
                            </View>
                        </CollapseBody>
                    </Collapse>

                </View>
                <View style={styles.input_container}>
                    <Text style={styles.title} >
                        {Recommended_Medicine}
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("ItemsList",{title:'Baby Care'})}>
                    <Text>
                        {See_All}
                    </Text>
                    </TouchableOpacity>
                </View>
                {/* recommended */}
                <View style={styles.listContainer} >
                    <FlatList data={recommendedList}
                        renderItem={({ item }) =>
                            <TouchableOpacity  
                            key={item.id} 
                            style={[styles.elementContainer, { height: height / 4, width: width / 1.6 ,paddingBottom:"2%"}]} 
                            onPress={()=>navigation.navigate("ItemCheck",{
                                title:item.title,
                                id:item.id,
                                price:item.price,
                                discount:item.discount,
                                discreption:item.discreption,
                                rate:item.rating,
                                item:item
                            })}
                            >
                                <View  >
                                    <View style={[styles.rate, { width: width / 5, paddingHorizontal: 3, paddingVertical: 2, position: "absolute", top: 0, right: 0, borderTopEndRadius: 12 }]}>
                                        <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                            {(item.discount * 100 / item.price).toFixed()}% {OFF}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Image
                                style={[{ width: width / 4,height: width / 4,borderWidth:2}, { resizeMode: "contain" }]}
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
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1 }]}>
                                            {item.title}
                                        </Text>
                                        <View style={{ justifyContent: "space-between", flexDirection: "row",width:width/1.65 }}>
                                            <Text style={[styles.discreption, { marginHorizontal: 1 }]}>
                                                {item.discreption}
                                            </Text>
                                            <View style={[styles.rate, { width: width / 8 }]}>
                                                <Text style={[styles.price, { marginHorizontal: 1 }]}>
                                                    {item.rating.toFixed(2)}
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
                            </TouchableOpacity>
                        }
                        horizontal
                    />
                </View>
                <View style={[{ width: width/1.1 , flexDirection: "row", justifyContent:"space-between",alignItems:"center",paddingBottom:20}]}>
                    <View style={[styles.checkoutContainer, { borderWidth: 0,  maxHeight: height }]}>
          
                    <View style={{ flexDirection: "row" }}>
                        <Text>
                            {Total}:
                        </Text>
                        <Text style={[styles.price1, { marginHorizontal: 1,color:"#FF4956" }]}>
                            USD  {((total).toFixed(2))}
                        </Text>
                    </View>
                </View>
                <View style={[{ width: width / 6, flexDirection: "row", justifyContent: "center" }]}>
                    <TouchableOpacity onPress={() => updateQuantityRemove()}
                    >
                        <Image source={require('../../assets/MyImages/i1.png')} />
                    </TouchableOpacity  >
                    <Text style={{ marginHorizontal: 2 }} >
                       {quantity}
                    </Text>
                    <TouchableOpacity onPress={() => updateQuantityAdd()}>
                        <Image source={require('../../assets/MyImages/i2.png')} />
                    </TouchableOpacity> 
                    </View>
                    <View style={[styles.buttonContainer,{height:50}]} >
                    <TouchableOpacity onPress={() => storeBagData()} >
                        <Text style={styles.signUpText}>{Add_to_cart}</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </View>
        </ScrollView>);
};




const styles = StyleSheet.create({
    buttonContainer: {
        height: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "30%",
        borderRadius: 30,
        backgroundColor: "#FF4956",
    },
    signUpText: {
        color: 'white',
    },
    input_container: {
        margin: 15,
        marginBottom: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",


    },
    imageContainer: {
        width: "90%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        // padding: 20,
        marginTop:"2%",
        borderRadius: 20,
        shadowColor: '#888',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        // elevation: 20
    },
    image: {
        backgroundColor: "#FF4956",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
        borderTopEndRadius:20,
        borderTopStartRadius:20,

    },
    listContainer: {
        margin: 15,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    elementContainer: {
        margin: 8,
        padding: 2,
        backgroundColor: "#FFECEE",
        borderRadius: 12,
        justifyContent: "space-evenly",
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
        textAlignVertical: "bottom",
        shadowColor: '#111',
        // borderWidth:.5,
        // borderColor:"#FF4956",
        // padding:2,
        // shadowOffset: { width: -4, height: 4 },
        // shadowOpacity: 1,
        // shadowRadius: 3,
        elevation: 8,
        zIndex:3
        // borderTopEndRadius:15
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
    }, size: {
        flexDirection: "row"
    }, eleTXT: {
        color: "#6D7177",
        fontWeight: "500",
        padding: 3
    },
});
export default ItemCheck;

