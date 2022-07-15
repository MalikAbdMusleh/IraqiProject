import * as React from 'react';
import {useRef, useState} from 'react';
import Footer from '../body/Footer';
import productList from '../shop/productList';
import {useTranslation} from '../../../context/languageContext';

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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Icon} from 'react-native-elements';

const MyOrders = ({navigation}) => {
  var {width, height} = useWindowDimensions();
  const navigation2 = useNavigation();
  const [newProductsList, setNewProductsList] = React.useState([]);
  const {
    items, Confirming,
    Procssed, Picked,
    Shipped, Delivered,
    Order_Timeline, Order_Summary,
    Subtotal, Delivery_Charge,
    Payment_Status, Paid_by,Total,Product
    } = useTranslation();
  const addStarting = async () => {
    // setNewProductsList(bagList)
    try {
      const jsonValue1 = await AsyncStorage.getItem('user_info');
      // const jsonValue = JSON.parse(jsonValue1);
      const json = JSON.parse(jsonValue1);
      var config = {  
        method: 'get',
        url:
          'http://52.202.149.74/pharmacy-online/orders/get_orders.php?user_id=' +
          json.id,
        headers: {
          headers: new Headers({'Content-Type': 'application/form-data'}),
        },
      };
      axios(config)
        .then(function (response) {
          let ordersArr = response.data;
          let ordersObj = {};
          for (let index = 0; index < ordersArr.length; index++) {
            const element = ordersArr[index];
            if (ordersObj[element.order_id]) {
              var tempArr = ordersObj[element.order_id];
              tempArr.push(element);
              ordersObj[element.order_id] = tempArr;
            } else {
              ordersObj[element.order_id] = [];
              var tempArr = ordersObj[element.order_id];
              tempArr.push(element);
              ordersObj[element.order_id] = tempArr;
            }
          }
          //console.log('Object.entries(ordersObj)', Object.entries(ordersObj));
          // alert(JSON.stringify(Object.entries(ordersObj)))//[0][1][0]
          let newArr = Object.entries(ordersObj);
          setNewProductsList(newArr);
          // if (response.data.length==0) {
          //     navigation.navigate("BagTab")
          // }
        })
        .catch(function (error) {
          //console.log(error);
        });
    } catch (e) {
      // error reading value
      //console.log(e);
    }
  };
  React.useEffect(() => {
    addStarting();
  }, []);
  return (
    <View>
      <View style={[styles.container, {height: '100%', borderBottomWidth: 2}]}>
        <View style={[styles.listContainer, {height: height / 1.15}]}>
          <ScrollView style={[{height: height / 1.15, borderBottomWidth: 2}]}>
            {newProductsList.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.elementContainer,
                  {height: height / 7, width: width / 1.1},
                ]}
                onPress={() =>
                  navigation2.navigate('OrderDetails', {orderDetails: item[1]})
                }
                OrderDetails>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={[
                        {width: width / 5, height: width / 5, borderWidth: 2,borderRadius:5},
                        {resizeMode: 'contain'},
                      ]}
                      source={
                        item[1][0].pharmacy_image
                          ? {uri: item[1][0].pharmacy_image}
                          : require('../../assets/MyImages/it1.png')
                      }
                    />
                  </View>
                  <View style={[{width: width / 1.6, flexDirection: 'row'}]}>
                    <View style={[{width: width}]}>
                      <Text style={[styles.title, {marginHorizontal: 1}]}>
                        {item[1][0].pharmacy_name}
                      </Text>
                      <View
                        style={[
                          styles.priceContainer1,
                          {maxHeight: height / 3},
                        ]}>
                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.discount,
                              {
                                marginHorizontal: 1,
                                justifyContent: 'space-between',
                              },
                            ]}>
                            X {item[1].length.toFixed(2)} {items}
                          </Text>

                          <View>
                            <View
                              style={[
                                styles.rate,
                                {
                                  width: width / 5,
                                  paddingHorizontal: 3,
                                  paddingVertical: 2,
                                  borderRadius: 12,
                                },
                              ]}>
                              <Text
                                style={[
                                  styles.price,
                                  {
                                    marginHorizontal: 1,
                                  },
                                ]}>
                                {/* {(item.discount * 100 / item.price).toFixed()}% OFF */}
                                {Procssed}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.rate, {width: width / 6}]}>
                          <Text style={[styles.price, {marginHorizontal: 1}]}>
                            {item[1][0].pharmacy_rating.toFixed(2)}
                          </Text>
                          <Icon
                            name="star"
                            type="font-awesome"
                            size={15}
                            color="#E6EE0E"
                           onPress={() => console.log('hello')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{height: height / 8, position: 'absolute', bottom: 0}}>
          <Footer page={'myorder'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  elementContainer: {
    margin: 8,
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    // alignItems:"center",
    width: '50%',
    paddingLeft: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
  },
  priceContainer: {
    flex: 0.1,
    backgroundColor: '#FF4956',
    flexDirection: 'row',
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '30%',
    maxWidth: 35,
  },
  priceContainer1: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // alignItems: "center",
    maxHeight: '30%',
    width: '60%',
    marginTop: 10,
  },
  price: {
    color: '#000',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 15,
  },
  price1: {
    color: '#FF4956',
    fontSize: 12,
    fontWeight: 'bold',
    // textAlign: "center",
  },
  discount: {
    color: '#6D7177',
    fontSize: 12,
    margin: 5,
    alignItems: 'center',
    // textDecorationLine: "line-through",
    fontWeight: '500',
    textAlignVertical: 'bottom',
  },
  titleContainer: {
    marginBottom: 5,
    width: 100,
    alignItems: 'flex-start',
  },
  discreption: {
    color: '#555',
    fontSize: 12,
    margin: 5,
    marginRight: 1,
    alignItems: 'center',
    fontWeight: '400',
    textAlignVertical: 'bottom',
  },
  rate: {
    backgroundColor: '#FFECEE',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default MyOrders;
