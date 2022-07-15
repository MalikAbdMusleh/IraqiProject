
import * as React from 'react';
import bagList from "./bagList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Icon } from 'react-native-elements'
import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';

import axios from 'axios';
import FormData from'form-data';
//
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    FlatList,
    ScrollView,
    VirtualizedList,
    TouchableHighlight,
    TextInput
} from "react-native";

import {useTranslation}  from '../../../context/languageContext';

const CheckoutInfo = ({ route, navigation }) => {
    const {Delivery_Address,Change,Upload_Prescription,Contact_Number,Product_List,items,Cash_on_Delivery,CONFIRM_PAYMENT
        ,Select_Payment_method,Total,
        PLACE_ORDER,Card_Number,Expiry_Date,_590X600_or_larger_recommended_up_to_2MB_each}=useTranslation()


    const { width, height } = useWindowDimensions()
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalQuantityList, setTotalQuantityList] = React.useState({});
    const [, updateState] = React.useState();
    const [visible, setVisible] = React.useState(false)
    const [visibleCard, setVisibleCard] = React.useState(false)
    const [paymentMethod, setPaymentMethod] = React.useState('cod')
    const [date, setDate] = React.useState('09-10-2021');
    const [pic,setPic]=React.useState('http://52.202.149.74/pharmacy-online/uploads/issets/MyImages/ch6.png')
   

    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [userInfo, setUserInfo] = React.useState('');

     const [newProductsList, setNewProductsList] = React.useState([]);

     const chooseFile = async () => {
        let options= {
          title: 'Select Image',
          type: 'library',
          options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            // includeExtra: false,
          }
        }
        try {
         await launchImageLibrary(options,async (result)=>{
          let assets=result.assets[0]
          //console.log(result.assets[0]);
          var data = new FormData();
          data.append('file',{uri:assets.uri,type:assets.type,name:assets.fileName});    
          data.append('Content-Type','application/form-data');    
          data.append('is_order','1');    
      
          var config = {
            method: 'post',
            url: 'http://52.202.149.74/pharmacy-online/accounts/upload_prescription.php',
           headers:new Headers({'Content-Type':'application/form-data'}),
            data : data
          };
         await  axios(config)
              .then(function (res) {
            if (res.data.massage) {
              alert(res.data.massage)
              setPic(res.data.location)
            //   forceUpdate();
            } else {
              alert(res.data)
            }
              })
              .catch(function (error) {
                //console.log('error');
                alert(error)
              })
        });
      } catch (error) {
        alert(error)
      }
      }; 
     const addStarting = async() => {
        try {
            const jsonValue1 = await AsyncStorage.getItem('user_info')
            const jsonValue = JSON.parse(jsonValue1)  
            const json = JSON.parse(jsonValue)  
        var config = {
            method: 'get',
            url: 'http://52.202.149.74/pharmacy-online/orders/get_orders.php?user_id='+json.id,
            headers: { 
                headers:new Headers({'Content-Type':'application/form-data'}),
            }
          };
          axios(config) 
          .then(function (response) {
            let ordersArr=response.data
            let ordersObj={}
            for (let index = 0; index < ordersArr.length; index++) {
              const element = ordersArr[index];
              if (ordersObj[element.order_id]) {
                var tempArr=ordersObj[element.order_id]
                tempArr.push(element)
                ordersObj[element.order_id]=tempArr
              }else{ 
                ordersObj[element.order_id]=[]
                var tempArr=ordersObj[element.order_id]
                tempArr.push(element)
                ordersObj[element.order_id]=tempArr
              }
            }
            //console.log('Object.entries(ordersObj)',Object.entries(ordersObj))
            // alert(JSON.stringify(Object.entries(ordersObj)))//[0][1][0]
            let newArr=Object.entries(ordersObj)
            setNewProductsList(newArr)
            // if (response.data.length==0) {
            //     navigation.navigate("BagTab")
            // }
          })
          .catch(function (error) {
            //console.log(error);
          });
        } catch(e) { 
            // error reading value
            //console.log(e)  
                        
          }  
    }


    const insertApi= async()=>{
        // if (paymentMethod&&userInfo) {
            if (1) {
                var FormData = require('form-data');
        //   'userInfo.id'
          var data = new FormData();
          data.append('name',userInfo.name);
          data.append('order_id',newProductsList.length+1);
          data.append('user_id', userInfo.id);
          data.append('location',  userInfo.address);
          data.append('phone', userInfo.number);
          data.append('delivery_fee', 22);
          data.append('user_type', 'user');
          data.append('payment_method', paymentMethod);
          data.append('prescription_location', pic);
          let size=route.params.products.map(e=>e.size)
          let product_id=route.params.products.map(e=>e.id)
          let price=route.params.products.map(e=>Number(e.price)*Number(e.quantity))
          let note=route.params.products.map(e=>e.note)
          let quantity=route.params.products.map(e=>e.quantity)
          let name=route.params.products.map(e=>e.name)
          let pharmacy_id=route.params.products.map(e=>e.provider_id)
          let total=route.params.products.map(e=>e.quantity*e.price)
          data.append('size', JSON.stringify(size));
          data.append('product_id', JSON.stringify(product_id));
          data.append('price', JSON.stringify(price));
          data.append('note', JSON.stringify(note));
          data.append('count', JSON.stringify(quantity));
          data.append('pharmacy_id', JSON.stringify(pharmacy_id));
          data.append('total', JSON.stringify(total));

          var config = {
            method: 'post',
            url: 'http://52.202.149.74/pharmacy-online/orders/add_order.php',
           headers:new Headers({'Content-Type':'application/form-data'}),
            data : data
          };
          
        await  axios(config)
            .then( async (res)=> {
                // //console.log(res.data);
                // alert('alert ')
        if (res.data.status==200) {
           await AsyncStorage.removeItem('bag_data')
            alert(res.data.massage); 
          setVisibleCard(false)
          setVisible(false)
          navigation.navigate("TrackOrder")
        } 
          else {
          alert(res.data.massage); 
        }
            })
            .catch(function (error) {
                //console.log(error);
                alert(error); 

            })
          } else {
            alert('Missing info !'); 
          }
        }
const getData = async () => {
    try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const jsonValue = JSON.parse(jsonValue1)  
        // alert(jsonValue1)
        // const json = JSON.parse(jsonValue)  
        // alert(jsonValue1)    
       jsonValue != null ? setUserInfo(jsonValue)  : null;
    } catch(e) { 
      // error reading value
      alert(e)  
                  
    }   
  }   
  
    React.useEffect(()=>{
        addStarting();
        getData();
    },[])

    return (
        <ScrollView style={{ width: width, height: height, backgroundColor: "#fff" }} >
            <View style={{ width: width, backgroundColor: "#fff",borderWidth:2 }}>
                <View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: "3%" }}  >
                        <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }}>
                            {Delivery_Address}
                        </Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate("MyProfile")}
                        >
                            <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: 'red' }}>
                                {Change}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.listContainer]} >
                        <TouchableOpacity 
                        style={[styles.elementContainer, { justifyContent: "center", height: height / 9, width: width / 1.13 }]} 
                        onPress={()=> navigation.navigate("MyProfile")}
                        >
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch1.png")}
                                    />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            {userInfo.name} 
                                        </Text>
                                        <View style={[{height:"50%",justifyContent:"center" }]}>
                                            <Text style={[styles.discount, { width }]}>
                                            {userInfo.address} 
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch3.png")}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{ justifyContent: "flex-start" }}  >
                        <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }} >
                            {Contact_Number}
                        </Text>
                    </View>
                    <View style={styles.listContainer} >
                        <TouchableOpacity 
                        style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]}
                        onPress={()=> navigation.navigate("MyProfile")}
                        >
                            <View style={{  flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch2.png")}
                                    />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1 }]}>
                                        {userInfo.number} 
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch3.png")}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{ justifyContent: "flex-start" }}  >
                        <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }} >
                            {Upload_Prescription}
                        </Text>
                    </View>
                    <View style={styles.listContainer} >

                        <TouchableOpacity 
                        onPress={()=>chooseFile()}
                        style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]}
                         >

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={{uri:pic}}
                                    />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >

                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch5.png")}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: "flex-start", marginLeft: "5%", width: width / 2 }}  >
                    <Text style={{ fontSize: 11 }}>
                        {_590X600_or_larger_recommended_up_to_2MB_each}
                    </Text>
                </View>
                <View>
                    <View style={{ justifyContent: "flex-start" }}  >
                        <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }}>
                            {Product_List}
                        </Text>
                    </View>
                    <View style={[styles.listContainer,{height:height/4.2}]} >
                        <ScrollView style={[{height:height/4.2}]}>
                        <FlatList data={route.params.products}
                            renderItem={({ item }) =>
                                <TouchableOpacity key={item.id} style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]} >

                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Image
                                style={[{ width: width / 5,height:width / 5,borderWidth:2}, { resizeMode: "contain" }]}
                                source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                            />
                                        </View>
                                        <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                            <View style={[{ width: width / 1.5 }]} >
                                                <Text style={[styles.title, { marginHorizontal: 1 }]}>
                                                    {item.title}
                                                </Text>
                                                <View style={[styles.priceContainer1, { maxHeight: height / 3, justifyContent: "flex-end" }]}>
                                                    <Text style={[styles.discount]}>
                                                        USD {item.price.toFixed(2)} X {item.quantity}
                                                    </Text>
                                                    <Text style={[styles.price1]}>
                                                        USD  {item.price.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </ScrollView>
                    </View>
                </View>
                <View style={[styles.checkoutContainer, { width, height: height / 15 }]}>
                    <Text style={{ fontWeight: "bold" }}>{items} :  {route.params.summary}</Text>
                    <View style={{ flexDirection: "row", fontWeight: "bold",justifyContent:"center"}}>
                        <Text style={{ fontWeight: "bold" }}>
                            {Total}:
                        </Text>
                        <Text style={[styles.price1]}>
                            USD  {route.params.total}
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.buttonContainer, { height: "100%" }]}
                        onPress={() => setVisible(true)} >
                        <Text style={styles.signUpText}>{PLACE_ORDER}</Text>
                    </TouchableOpacity>
                    <Dialog
                        visible={visible}
                        onTouchOutside={() => {
                            setVisible(false);
                        }}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom', 
                        })}

                        dialogStyle={{
                            position: "absolute",
                            borderWidth: 1,
                            paddingTop: 20,
                            borderTopEndRadius: 45,
                            borderTopStartRadius: 45,
                            borderColor: "#CDD4D9",
                            height: "89%",
                            bottom: 0
                        }}
                        footer={<View style={{ justifyContent: "flex-start", width: width, height: height / 12, alignItems: "center" }}>
                        <TouchableOpacity style={[styles.buttonContainer, { justifyContent: "center", height: height / 15, width: width / 2}]}
                            onPress={() => {
                                setVisibleCard(true);
                                forceUpdate()
                            }}>
                            <Text style={styles.signUpText}>{CONFIRM_PAYMENT}</Text>
                        </TouchableOpacity>
                    </View>}
                    >

                        <DialogContent >
                            <View>
                                <View style={{ justifyContent: "space-between" }}  >
                                    <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }}>
                                        {Select_Payment_method}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.paymentMethod}>
                                <CheckBox
                                    center
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#999'
                                    uncheckedColor='#999'
                                    uncheckedIcon='circle-o'
                                    style={{}}
                                    checked={paymentMethod == "mastercard"}
                                    onPress={() => setPaymentMethod('mastercard')}
                                />
                                <View style={[{ width: width / 1.5, flexDirection: "row" }]} >
                                    <View style={[{ width: width }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            Mastercard
                                        </Text>
                                        <View style={[{ maxHeight: height, width: width / 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                            <Text style={[styles.discount, { width: width / 2, margin: 0 }]}>
                                                Pay from mastercard account using
                                                mastercard payment gateway
                                            </Text>
                                            <View style={[{ justifyContent: "flex-end", alignItems: "flex-end" }]}>
                                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/ch7.png")}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.paymentMethod}>
                                <CheckBox
                                    center
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#999'
                                    uncheckedColor='#999'
                                    uncheckedIcon='circle-o'
                                    style={{}}
                                    checked={paymentMethod == "Discover"}
                                    onPress={() => setPaymentMethod('Discover')}
                                />
                                <View style={[{ width: width / 1.5, flexDirection: "row" }]} >
                                    <View style={[{ width: width }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            Discover
                                        </Text>
                                        <View style={[{ maxHeight: height, width: width / 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                            <Text style={[styles.discount, { width: width / 2, margin: 0 }]}>
                                                Pay from mastercard account using
                                                mastercard payment gateway
                                            </Text>
                                            <View style={[{ justifyContent: "flex-end", alignItems: "flex-end" }]}>
                                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/ch7.png")}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.paymentMethod}>
                                <CheckBox
                                    center
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#999'
                                    uncheckedColor='#999'
                                    uncheckedIcon='circle-o'
                                    style={{}}
                                    checked={paymentMethod == "Visa"}
                                    onPress={() => setPaymentMethod('Visa')}
                                />
                                <View style={[{ width: width / 1.5, flexDirection: "row" }]} >
                                    <View style={[{ width: width }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            Visa Card
                                        </Text>
                                        <View style={[{ maxHeight: height, width: width / 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                            <Text style={[styles.discount, { width: width / 2, margin: 0 }]}>
                                                Pay from mastercard account using
                                                mastercard payment gateway
                                            </Text>
                                            <View style={[{ justifyContent: "flex-end", alignItems: "flex-end" }]}>
                                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/ch7.png")}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.paymentMethod}>
                                <CheckBox
                                    center
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#999'
                                    uncheckedColor='#999'
                                    uncheckedIcon='circle-o'
                                    style={{}}
                                    checked={paymentMethod == "Paypal"}
                                    onPress={() => setPaymentMethod('Paypal')}
                                />
                                <View style={[{ width: width / 1.5, flexDirection: "row" }]} >
                                    <View style={[{ width: width }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            Paypal
                                        </Text>
                                        <View style={[{ maxHeight: height, width: width / 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                            <Text style={[styles.discount, { width: width / 2, margin: 0 }]}>
                                                Pay from paypal account using
                                                paypal payment gateway
                                            </Text>
                                            <View style={[{ justifyContent: "flex-end", alignItems: "flex-end" }]}>
                                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/ch7.png")}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.paymentMethod}>
                                <CheckBox
                                    center
                                    checkedIcon='dot-circle-o'
                                    checkedColor='#999'
                                    uncheckedColor='#999'
                                    uncheckedIcon='circle-o'
                                    style={{}}
                                    checked={paymentMethod == "cod"}
                                    onPress={() => setPaymentMethod('cod')}
                                />
                                <View style={[{ width: width / 1.5, flexDirection: "row" }]} >
                                    <View style={[{ width: width }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            {Cash_on_Delivery}
                                        </Text>
                                        <View style={[{ maxHeight: height, width: width / 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                            <Text style={[styles.discount, { width: width / 2, margin: 0 }]}>
                                                Pay from american account using
                                                express payment gateway
                                            </Text>
                                            <View style={[{ justifyContent: "flex-end", alignItems: "flex-end" }]}>
                                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                                    source={require("../../assets/MyImages/ch7.png")}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View>
                            </View>
                      
                        </DialogContent>

                    </Dialog>
                    <Dialog
                        visible={visibleCard}
                        onTouchOutside={() => {
                            setVisibleCard(false); 
                            // setVisible(true);
                            forceUpdate()
                        }}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                        dialogStyle={{
                            position: "absolute",
                            borderWidth: 1,
                            paddingTop: 50,
                            borderTopEndRadius: 45,
                            borderTopStartRadius: 45,
                            borderColor: "#CDD4D9",
                            height: "50%",
                            bottom: 0
                        }}
                        footer={
                            <View style={{ justifyContent: "flex-end", width: width, height: height / 9, alignItems: "center" }}>
                                <TouchableOpacity style={[styles.buttonContainer, { justifyContent: "center", height: height / 15, width: width / 2, margin: 5 }]}
                                    onPress={() => {insertApi()}}>
                                    <Text style={styles.signUpText}>{CONFIRM_PAYMENT}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    >

                        <DialogContent style={{ width: width }}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <Text >
                                    {Card_Number}
                                </Text>
                                <Image style={[{ width: 20, height: 20 }, { resizeMode: "contain" }]}
                                    source={require("../../assets/MyImages/ch7.png")}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={{ backgroundColor: "#fff", borderColor: "#CDD4D9", borderWidth: 2 }}
                                    placeholder={"1234 5678 90125 4563"}
                                />
                            </View>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View>
                                    <Text>
                                    {Expiry_Date}
                                    </Text>
                                    <TextInput
                                        style={{ backgroundColor: "#fff", borderColor: "#CDD4D9", borderWidth: 2, width: width / 2.5 }}
                                   placeholder={"MM     /     YY"}
                                        // onChangeText={onChangeText}
                                    />
                                  
                                </View>
                                <View>
                                    <Text >
                                        CVV/ CVC
                                    </Text>
                                    <TextInput
                                   placeholder={"123"}
                                        style={{ backgroundColor: "#fff", borderColor: "#CDD4D9", borderWidth: 2, width: width / 2.5 }}
                                    />
                                </View>
                            </View>
                        </DialogContent>

                    </Dialog >
                </View>
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
        // flexDirection: "row",
        width: "90%",
    },
    elementContainer: {
        margin: 2,
        padding: 2,
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        justifyContent: "center",
        // alignItems:"center",
        width: "50%",
        paddingLeft: 5,
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8
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
        color: "#FF4956",
        fontSize: 12,
        fontWeight: "bold",
        textAlignVertical:"bottom",

    },
    discount: {
        color: "#555",
        fontSize: 10,
        margin: 5,
        alignItems: "center",
        // textDecorationLine: "line-through",
        fontWeight: "500",
        textAlignVertical: "bottom"

    }, titleContainer: {
        // marginBottom: 1,
        width: 100,
        alignItems: "flex-start"
    }, discreption: {
        color: "#555",
        fontSize: 12,
        // margin: 5,
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
    },
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
    checkoutContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        // position:"absolute",
        // bottom:0
    },
    paymentMethod: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderBottomColor: "#f3f3f3",
        borderBottomWidth: 1,
        height: "17%"
    }
});
export default CheckoutInfo;

