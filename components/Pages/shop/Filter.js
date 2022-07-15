import React, { Component } from 'react';
// import * as React from "react";
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import { ButtonGroup } from "@rneui/themed";
import axios from "axios";


import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import {useTranslation}  from '../../../context/languageContext';


const Filter = () => {
    const [checkedProduct, setCheckedProduct] = React.useState('Tablets');
    const [brandButtons, setbrandButtons] = React.useState(['Kukis', 'Bulikas oscan', 'Okasa', 'Bescikos Cox', 'Meuokls olo', 'Ollsa']);
    const [brand, setbrand] = React.useState("Kukis");
    const {Product_Type,Brand,APPLY_FILTER,
        Cost_low_to_high,Cost_high_to_low,the_size,
        Most_Popular_Review,Vitamin,Syrup,Tablets,All
    }=useTranslation()

    var brandButtons2 = brandButtons.map((e, i) => <TouchableOpacity
        style={[styles.eleBTN, e == brand ? { backgroundColor: "#FF4956" } : {}]}
        onPress={() => setbrand(e)}
        key={i}
    ><Text style={[styles.eleTXT, e == brand ? { color: "#fff" } : {}]}>{e}</Text>
    </TouchableOpacity>)

    const [mgButtons, setMgButtons] = React.useState(['50mg', '100mg', '500mg', '25mg']);
    const [mg, setMg] = React.useState("50mg");

    var mgButtons2 = mgButtons.map((e, i) => <TouchableOpacity
        style={[styles.eleBTN, e == mg ? { backgroundColor: "#FF4956" } : {}]}
        onPress={() => setMg(e)}
        key={i}
    ><Text style={[styles.eleTXT, e == mg ? { color: "#fff" } : {}]}>{e}</Text>
    </TouchableOpacity>)


    const [typeButtons, setTypeButtons] = React.useState([Cost_low_to_high,Cost_high_to_low,Most_Popular_Review]);
    const [type, setType] = React.useState(Cost_low_to_high);

    var typeButtons2 = typeButtons.map((e, i) => <TouchableOpacity
        style={{ margin: 4 }}
        onPress={() => setType(e)}
        key={i}
    ><Text style={[styles.eleTXT, { color: "#444" }, e == type ? { color: "#FF4956", textDecorationLine: "underline" } : {}]}>{e}</Text>
    </TouchableOpacity>)
    const navigation = useNavigation();

    const [productsList,setProductsList]=React.useState([])
    const [userInfo, setUserInfo] = React.useState('');
   
  
      
      
    const getFiltered=async()=>{
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        const json = JSON.parse(jsonValue1)
var config = {
  method: 'get',
  url: `http://52.202.149.74/pharmacy-online/shop/filter_products.php?lang=${json.lang}&type=${checkedProduct.toLowerCase()}&size=50mg&brand=${brand.toLowerCase()}&ordered_by=${type.toLowerCase()}`,
  headers: { 
    headers:new Headers({'Content-Type':'application/form-data'}),
},
};

axios(config)
.then( async (response)=> {
    // alert(response.data)
    alert(response.data.length+" result found.")
    // setProductsList(response.data);
   setTimeout(() => {
       navigation.navigate("FilteredList",{filtered_list:response.data})
   }, 2000);
})
.catch(function (error) {
  alert(error);
});
}
// React.useEffect(()=>{
//     getFiltered()
// },[])
    return (
        <View style={styles.container}>
            <View>
                <View style={{ marginHorizontal: 15, marginTop: 14 }}>
                    <View >
                        <Text style={{ fontWeight: "500", color: "#000" }}>{Product_Type}</Text>
                    </View>
                    <View style={[styles.product]}>
                        <CheckBox
                            center
                            title={All}
                            checkedIcon='dot-circle-o'
                            checkedColor='#f23'
                            uncheckedColor='#f45'
                            uncheckedIcon='circle-o'
                            checked={checkedProduct == "All"}
                            style={styles.button}
                            onPress={() => setCheckedProduct('All')}
                        />
                        <CheckBox
                            center
                            title={Tablets}
                            checkedIcon='dot-circle-o'
                            checkedColor='#f23'
                            uncheckedColor='#f45'
                            uncheckedIcon='circle-o'
                            checked={checkedProduct == "Tablets"}
                            onPress={() => setCheckedProduct('Tablets')}

                        />
                        <CheckBox
                            center
                            title={Syrup}
                            checkedIcon='dot-circle-o'
                            checkedColor='#f23'
                            uncheckedColor='#f45'
                            uncheckedIcon='circle-o'
                            checked={checkedProduct == "Syrup"}
                            onPress={() => setCheckedProduct('Syrup')}
                        />
                        <CheckBox
                            center
                            title={Vitamin}
                            checkedColor='#f23'
                            uncheckedColor='#f45'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={checkedProduct == "Vitamin"}
                            onPress={() => setCheckedProduct('Vitamin')}
                        />
                    </View>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <View>
                        <Text style={{ margin: 15, fontWeight: "500", color: "#000" }}>{Brand}</Text>
                    </View>
                    <View style={[styles.product]}>
                        {brandButtons2}
                    </View>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <View>
                        <Text style={{ margin: 15, fontWeight: "500", color: "#000" }}>{the_size}</Text>
                    </View>
                    <View style={[styles.product]}>
                        {mgButtons2}
                    </View>
                </View>
                <View style={{ margin: 15 }}>
                    <View>
                        <Text style={{ margin: 15, fontWeight: "500", color: "#000" }}>{Product_Type}</Text>
                    </View>
                    <View style={[styles.product]}>
                        {typeButtons2}
                    </View>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableHighlight style={[styles.buttonContainer]} 
                onPress={() =>getFiltered()} >
                    <Text style={styles.signUpText}>{APPLY_FILTER}</Text>
                </TouchableHighlight>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#FFf',
    }, brand: {
        justifyContent: "space-evenly",
        borderWidth: 2
    },
    eleBTN: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#FFECEE"
        , margin: 5,
        padding: 2,
    }, eleTXT: {
        color: "#6D7177",
        fontWeight: "500"
    },
    Footer: {
        maxHeight: "35%",
        justifyContent: 'center',
        alignItems: "stretch",
        bottom: -30
    },
    footerText: {
        textAlign: "center",
        flex: .6
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontStyle: "italic",
        fontSize: 14,
    },
    inputIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        marginRight: "5%"

    },
    product: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderRadius: 30,
        flexWrap: "wrap",
    },
    button: {
        fontSize: 2,
        backgroundColor: "#fff"
    },
    signUpText: {
        color: 'white',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: "#FF4956",

    },

    signUpText: {
        color: 'white',
    }
});

export default Filter;
