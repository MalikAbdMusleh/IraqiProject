import * as React from 'react';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    ScrollView
} from "react-native";
import Timeline from 'react-native-timeline-flatlist'

import { useNavigation } from '@react-navigation/native';

const OrderDetails = ({ route, navigation }) => {
    const {
        Pending, Confirming,
        Procssed, Picked,
        Shipped, Delivered,
        Order_Timeline, Order_Summary,
        Subtotal, Delivery_Charge,
        Payment_Status, Paid_by,Total,Product,Pay_from_mastercard_account_usingmastercard_payment_gateway
        } = useTranslation();

    const [subtotal, setsubtotal] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [delivery, setDelivery] = React.useState(0);

    const { width, height } = useWindowDimensions()
    const [timelineData, setTimelineData] = React.useState([
        { date: "09:00", time: '09:00', title: Shipped, description: Pay_from_mastercard_account_usingmastercard_payment_gateway },
        { time: '10:45', title: Picked, description:Pay_from_mastercard_account_usingmastercard_payment_gateway },
        { time: '12:00', title: Procssed, description:Pay_from_mastercard_account_usingmastercard_payment_gateway },
        { time: '14:00', title: Confirming, description:Pay_from_mastercard_account_usingmastercard_payment_gateway },
        { time: '14:00', title: Pending, description: Pay_from_mastercard_account_usingmastercard_payment_gateway },

    ])
    const clcSummery=()=>{
        let products =route.params.orderDetails
        let newTotal=products.reduce((a,b)=>(a+(Number(b.price)*Number(b.quantity))),0)
        setDelivery(40)
        setsubtotal(newTotal)  
     }
     React.useEffect(()=>{
        clcSummery() 
     })
    return ( 
        <ScrollView style={{ width: width, height:'100%'}} >
            <View style={[styles.container, { width, height:(height * 1.6)+(height/6)*route.params.orderDetails.length }]}>
                <View style={[styles.orderStatus, { width: width / 1.03,minHeight: height / 8,maxHeight:height / 8}]}>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#FF4956"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Pending}
                        </Text>
                    </View>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#FF4956"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Confirming}
                        </Text>
                    </View>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#FF4956"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Procssed}
                        </Text>
                    </View>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#FF4956"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Picked}
                        </Text>
                    </View>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#FF4956"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Shipped}
                        </Text>
                    </View>
                    <View style={[styles.Status]}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20}
                            color={"#AAAAAA"}
                        />
                        <Text style={[styles.StatusText]} >
                            {Delivered}
                        </Text>
                    </View>
                </View>
                <View style={[styles.timeline, { width: width, height: height / 1.5 }]}>
                    <Text style={[styles.StatusText, { fontSize: 20, margin: "3%" }]} >
                        {Order_Timeline}
                    </Text>
                    <Timeline
                        data={timelineData}
                        circleSize={10}
                        circleColor='#FF4956'
                        lineColor='#FFECEE'
                        timeContainerStyle={{ minWidth: 52, padding: "2%" }}
                        timeStyle={{ textAlign: 'center', padding: 5 }}
                        descriptionStyle={{ color: '#777777' }}
                        options={{
                            style: { paddingTop: 5 }
                        }}
                        isUsingFlatlist={true}
                    />
                </View>
                <View style={[{height:height/10+(height/5.6)*route.params.orderDetails.length}]}>
                    <View  >
                        <Text style={[styles.StatusText, { fontSize: 20, margin: "3%" }]} >
                            {Product}
                        </Text>
                    </View>
                    
                    <FlatList data={route.params.orderDetails}
                        renderItem={({ item,index }) =>
                    <TouchableOpacity
                        style={[styles.elementContainer, { height: height / 7, width: width / 1.1 }]}
                    >

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Image
                               style={[{ width: width / 5,height:width / 5,borderWidth:2}, { resizeMode: "contain" }]}
                                source={item.product_image?{uri:item.product_image}:require('../../assets/MyImages/it1.png')}
                   />
                            </View>
                            <View style={[{ width: width / 1.6, flexDirection: "row" }]} >
                                <View style={[{ width: width }]} >
                                    <Text style={[styles.StatusText, { fontSize: 20, margin: "3%" }]} >
                                       {item.product_name}
                                    </Text>
                                    <View style={[styles.priceContainer1, { maxHeight: height / 3 }]}>
                                        <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                                            <Text style={[styles.discount, { marginHorizontal: 1, justifyContent: "space-between" }]}>
                                                USD  {item.price.toFixed(2)} X {item.quantity}
                                                {/* USD  {(56).toFixed(2)} X {2} */}
                                            </Text>

                                        </View>

                                        <Text style={[styles.price1, { marginHorizontal: 1, color: "#FF4956" }]}>
                                            USD  {(item.price * item.quantity).toFixed(2)}
                                            {/* USD  {(56 * 2).toFixed(2)} */}
                                        </Text>
                                    </View>
                                    {/* </View> */}
                                </View>
                            </View>

                        </View>

                    </TouchableOpacity>
                        }/>
                </View>
                <View style={[styles.summary,{height:height/3.4}]}>
                    <Text style={[styles.StatusText, { fontSize: 20, margin: "5%", width: width / 1.1 }]} >
                        {Order_Summary}
                    </Text>
                    <View
                        style={[styles.elementContainer, { width: width / 1.1, height:height/5 }]}>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width / 1.1 }]}>
                            <Text style={[{ fontSize: 20, margin: "3%", color: "#6D7177", width: width / 4 }]} >
                                {Subtotal}
                            </Text>
                            <Text style={[{ fontSize: 15, margin: "3%", color: "#190708", width: width / 4, textAlign: "right" }]} >
                                $ {subtotal}
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width / 1.1 }]}>
                            <Text style={[{ fontSize: 20, margin: "3%", color: "#6D7177" }]} >
                                {Delivery_Charge}
                            </Text>
                            <Text style={[{ fontSize: 15, margin: "3%", color: "#190708", textAlign: "right" }]} >
                                $ {delivery}
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width / 1.1 }]}>
                            <Text style={[{ fontSize: 20, margin: "3%", color: "#6D7177" }]} >
                                {Total}
                            </Text>
                            <Text style={[{ fontSize: 15, margin: "3%", color: "#FF4956", textAlign: "right" }]} >
                                $ {delivery+subtotal}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* style={[{ width: width }]}  */}
                <View style={[styles.summary,{  height: height / 5}]}>
                    <Text style={[styles.StatusText, { fontSize: 20, margin: "3%", width: width / 1.1 }]} >
                    {Payment_Status}
                    </Text>
                    <View
                        style={[styles.elementContainer, { width: width / 1.1, height:height/10 }]}>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width / 1.1 }]}>
                            <Text style={[{ fontSize: 20, margin: "3%", color: "#6D7177" }]} >
                            {Paid_by} {route.params.orderDetails[0].payment_method}
                            </Text>
                            <Image style={[{ width: width / 8, height: width / 8 , margin: "3%",}, { resizeMode: "contain" }]}
                                source={require("../../assets/MyImages/ch7.png")}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>);
};




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff"
    }, summary: {
        width: "100%"
    },
    orderStatus: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#CDD4D9",
    }, Status: {
        flex: .2,
        width: "20%",
        alignItems: "center",
        padding: 0
    }, StatusText: {
        color: '#190708',
        fontSize: 12
    }, timeline: {
        // height:"80%",
        margin: "3%"
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
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
        borderTopWidth: .1
    }
});
export default OrderDetails;
