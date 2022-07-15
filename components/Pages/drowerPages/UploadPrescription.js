
import * as React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FormData from'form-data';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadPrescription = ({ route, navigation }) => {
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = React.useState(false)
    const [pic,setPic]=React.useState('http://52.202.149.74/pharmacy-online/uploads/issets/MyImages/ch6.png')
    const [userInfo, setUserInfo] = React.useState('');
 //   image picker start
 const getData = async () => {
    try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const jsonValue = JSON.parse(jsonValue1)  
        const json = JSON.parse(jsonValue)  
        setPic(json.prescription_location)
       jsonValue != null ? setUserInfo(json)  : null;
    } catch(e) { 
      // error reading value
      alert(e)  
                  
    }   
  } 
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user_info', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  React.useEffect(()=>{
    getData();
},[])
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
    data.append('file',{uri:assets.uri,type:assets.type,name:assets.fileName,id:userInfo.id});    
    data.append('Content-Type','application/form-data');    
    data.append('id',userInfo.id);    

    var config = {
      method: 'post',
      url: 'http://52.202.149.74/pharmacy-online/accounts/upload_prescription.php',
     headers:new Headers({'Content-Type':'application/form-data'}),
      data : data
    };
   await  axios(config)
        .then(function (res) {
      //console.log(res.data);
      if (res.data.massage) {
        alert(res.data.massage)
        setPic(res.data.location)
        let userInfo1=userInfo
        userInfo1.prescription_location=res.data.location
        storeData(userInfo1)
        setUserInfo(userInfo1)

      } else {
        alert(res.data)
      }
        })
        .catch(function (error) {
          //console.log('error');
        })
  });
} catch (error) {
  alert(error)
}
}; 
//image picker end
    return (
        <ScrollView style={{ backgroundColor: "#fff" }} >
            <View style={{ width: width, height: height/1.2, backgroundColor: "#fff" }}>
                <View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: "3%" }}  >
                        <Text style={{ marginHorizontal: "5%", fontSize: 15, fontFamily: "bold", color: '#000' }}>
                            Delivery Address
                        </Text>
                    </View>
                    <View style={[styles.listContainer]} >

                        <TouchableOpacity style={[styles.elementContainer, { justifyContent: "center", height: height / 9, width: width / 1.13 }]} >

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch1.png")}
                                    />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1, }]}>
                                            Haya Rahman
                                        </Text>
                                        <View style={[{ maxHeight: height / 3 }]}>
                                            <Text style={[styles.discount, { width }]}>
                                                Tala Al Ali, Amman
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
                            Contact Number
                        </Text>
                    </View>
                    <View style={styles.listContainer} >

                        <TouchableOpacity style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]} >

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={require("../../assets/MyImages/ch2.png")}
                                    />
                                </View>
                                <View style={[{ width: width / 2, flexDirection: "row" }]} >
                                    <View style={[{ width: width / 1.5 }]} >
                                        <Text style={[styles.title, { marginHorizontal: 1 }]}>
                                            07909090909
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
                            Upload Prescription
                        </Text>
                    </View>
                    <View style={styles.listContainer} >

                        <TouchableOpacity style={[styles.elementContainer, { height: height / 9, width: width / 1.13 }]} >

                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <Image style={[{ width: width / 5, height: height / 20 }, { resizeMode: "contain" }]}
                                        source={userInfo.prescription_location?{uri:pic}:require("../../assets/MyImages/ch6.png")}
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
                        590X600 or larger recommended
                        up to 2MB each
                    </Text>
                </View>

             
            </View >
                <View  style={[{alignItems:"center"}]}>
                    <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={()=>chooseFile()}>
                        <Text style={styles.signUpText}>UPLOAD NOW</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
        );
};




const styles = StyleSheet.create({
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
        textAlign: "auto",

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
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "55%",
        borderRadius: 30,
        backgroundColor: "#FF4956",
        marginBottom:"3%"
    },

    signUpText: {
        color: 'white',
    },
    checkoutContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff"
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
export default UploadPrescription;

