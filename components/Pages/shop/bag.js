
import * as React from 'react';
import bagList from "./bagList";
import { CheckBox, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormData from'form-data';
import BagTab from "./BagTab";
import {useTranslation}  from '../../../context/languageContext';

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
    VirtualizedList,
    TouchableHighlight
} from "react-native";
import productList from './productList';


const Bag = ({ route, navigation }) => {
    const {CHECK_OUT,Total}=useTranslation()

    const { width, height } = useWindowDimensions()
    const [checkedProductList, setCheckedProductList] = React.useState({});
    const [newProductsList, setNewProductsList] = React.useState([]);
    const [isEmptyBag, setisEmptyBag] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [, updateState] = React.useState();
 
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const getBagData = async () => {
        try {
          const jsonValue1 = await AsyncStorage.getItem('bag_data')
        //   alert(jsonValue1) 
        //   const jsonValue = JSON.parse(jsonValue1)  
          const json = JSON.parse(jsonValue1) 
        //   setisEmptyBag(json.length==0)
          json != null ? setNewProductsList(json)  : setisEmptyBag(true);
          forceUpdate() 
        } catch(e) { 
          // error reading value
          alert(e)
        }
      }   
 
    React.useEffect(() => {
        getBagData()
      }, []);

    const updateList = async(id, price, quantity) => {
        var checkedProductList2 = checkedProductList

        var totalPrice2 = Number(totalPrice)
        // alert(JSON.stringify(checkedProductList));
        if (checkedProductList[id]) {
            delete checkedProductList2[id];
            totalPrice2 -= Number(price)*Number(quantity)
        } else {
            checkedProductList2[id] = Number(price)
            totalPrice2 += Number(price)*Number(quantity)
        }
        setCheckedProductList(checkedProductList2)
        setTotalPrice(totalPrice2)
        forceUpdate()
    }

    const selectAll = () => {
        if (Object.entries(checkedProductList).length == newProductsList.length) {
            let totalPrice=0;
            setCheckedProductList({});
            setTotalPrice(totalPrice)
            forceUpdate()
        } else {
            let totalPrice=0;
            setCheckedProductList({});
            let output = {}
            const checkedProductList2 = newProductsList.map(e => {
                let id = e.id.toString()
                let price = e.price
                totalPrice+=Number(e.price)//*Number(e.quantity)
                output[id] = price
                return output
            })
            setCheckedProductList(output);
            setTotalPrice(totalPrice)
            forceUpdate()
        }
    }

    const updateQuantityAdd = (id, price, quantity) => {
        //console.log(checkedProductList);
        if (checkedProductList[id]) {
            let newProductsList1=newProductsList
            let newArr=[]
            setTotalPrice(totalPrice+Number(price))
            for (let index = 0; index < newProductsList1.length; index++) {
               const element = newProductsList1[index];
               if (Number(element.id)==Number(id)) {
                   element.quantity=element.quantity+1
                   newArr[newArr.length]=element
               }else{
                   newArr[newArr.length]=element
               }
            }
            //console.log(newArr)

            setNewProductsList(newArr)
            forceUpdate()
        }
    }
    const updateQuantityRemove = (id, price, quantity) => {
        if (quantity > 0 && checkedProductList[Number(id)]) {
            setTotalPrice(totalPrice-Number(price))
         let newProductsList1=newProductsList
         let newArr=[]
         for (let index = 0; index < newProductsList1.length; index++) {
            const element = newProductsList1[index];
            if (Number(element.id)==Number(id)) {
                element.quantity=element.quantity-1
                newArr[newArr.length]=element
            }else{
                newArr[newArr.length]=element
            }
         }
         setNewProductsList(newArr)
            forceUpdate()
        }
    }
 const passToCheckout=()=>{
    if (Object.entries(checkedProductList).length==0) {
        alert("no selected items !")
    } else {
        let passedList=newProductsList.filter(e=>checkedProductList[Number(e.id)])
        let summary=passedList.reduce((a,b)=>(Number(b.quantity))+a,0)
        //console.log("CheckoutInfo",passedList);
        navigation.navigate("CheckoutInfo",{total:totalPrice,products:passedList,summary:summary})
    }
 }
 return isEmptyBag?
     (<BagTab/>):(
        <View style={{ width: width, height: height }} >
            <View style={{ width: width, height: height/1.1, justifyContent: "space-between" }}>
               <ScrollView style={{ width: width, height: height/2 }}>
                <View style={styles.listContainer} >
                    <FlatList data={newProductsList}
                        renderItem={({ item,index }) =>
                            <TouchableOpacity key={item.id} style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]} >
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <CheckBox
                                            center
                                            checkedIcon='check-circle'
                                            checkedColor='#f23'
                                            uncheckedColor='#f45'
                                            uncheckedIcon='circle-o'
                                            checked={checkedProductList[Number(item.id)]}
                                            onPress={() => updateList(Number(item.id), item.price,item.quantity)}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                           <Image
                                style={[{ width: width / 5,height:width / 5,borderWidth:2}, { resizeMode: "contain" }]}
                                source={item.image?{uri:item.image}:require('../../assets/MyImages/it1.png')}
                            />
                                    </View>
                                    <View style={[{ width: width / 3, flexDirection: "row" }]} >
                                        <View style={[{ width: width / 1.5 }]} >
                                            <Text style={[styles.title, { marginHorizontal: 1 }]}>
                                                {item.title}
                                            </Text>
                                            <View style={[styles.priceContainer1, { maxHeight: height / 3, justifyContent: "flex-end" }]}>
                                                <Text style={[styles.discount]}>
                                                    USD {Number(item.price).toFixed(2)} X {item.quantity}
                                                </Text>
                                                <Text style={[styles.price1]}>
                                                    USD  {Number(item.price).toFixed(2)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[{ width: width / 6, flexDirection: "row", justifyContent: "center" }]}>
                                        <TouchableOpacity onPress={() => updateQuantityRemove(Number(item.id), item.price,item.quantity)}
                                        >
                                            <Image source={require('../../assets/MyImages/i1.png')} />
                                        </TouchableOpacity  >
                                        <Text style={{ marginHorizontal: 2 }} >
                                            {item.quantity} 
                                        </Text>
                                        <TouchableOpacity onPress={() => updateQuantityAdd(Number(item.id), Number(item.price),item.quantity)}>
                                            <Image source={require('../../assets/MyImages/i2.png')} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </TouchableOpacity>}
                    />
                </View>
                </ScrollView>
                <View style={[styles.checkoutContainer, { borderWidth: 0, width, height: height/8 }]}>
                    <CheckBox
                        center
                        title={'All'}
                        checkedIcon='check-circle'
                        checkedColor='#f23'
                        uncheckedColor='#f45'
                        uncheckedIcon='circle-o'
                        checked={Object.entries(checkedProductList).length == newProductsList.length}
                        onPress={() => selectAll()}
                    />
                    <View style={{ flexDirection: "row",justifyContent:"center" }}>
                        <Text>
                            {Total}:
                        </Text>
                        <Text style={[styles.price1, { marginHorizontal: 1 }]}>
                            USD  {totalPrice}
                        </Text>
                    </View>
                    <TouchableHighlight style={[styles.buttonContainer]} onPress={() =>passToCheckout()} >
                        <Text style={styles.signUpText}>{CHECK_OUT}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        );
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
        fontSize: 15,
        fontWeight: "300",
    },
    priceContainer: {
        // flex: .1,
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
        height: "50%",
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
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff"
    }
});
export default Bag;

