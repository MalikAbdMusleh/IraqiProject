import * as React from 'react';
import {CheckBox} from 'react-native-elements';
import RNRestart from 'react-native-restart'; 
import Footer from '../../Pages/body/Footer';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from '../../../context/languageContext';

import {Icon} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

const Language = () => {
    const {_Language, Arabic, English, _Default} = useTranslation();
    const [, updateState] = React.useState();

    const [checkedProduct, setCheckedProduct] = React.useState('ar');
    
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [isLoading,setIsLoading]=React.useState(true)

    const {width, height} = useWindowDimensions();
    const [userInfo, setUserInfo] = React.useState('');
  const getData = async () => {
    try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        // const jsonValue = JSON.parse(jsonValue1)  
        const json = JSON.parse(jsonValue1)  
        // alert(json.number)   
        setCheckedProduct(json.lang) 
        json != null ? setUserInfo(json)  : null;
// setIsLoading(false)
    } catch(e) { 
      // error reading value
      alert(e)  
                  
    }   
  }  



// Make a request for a user with a given ID
const storeData = async (value) => {
try {
    setCheckedProduct(value)
    let userInfo1=userInfo
    userInfo1.lang=value
const jsonValue = JSON.stringify(userInfo1)

await AsyncStorage.setItem('user_info', jsonValue)
// alert(`The language is changed to ${value}`)
RNRestart.Restart();
// alert(jsonValue)
forceUpdate()
} catch (e) {
// saving error
}
}

  React.useEffect(()=>{
    getData();
},[])
  return (
    <ScrollView style={[ {height: height/1.1, width}]}>
      <View style={[styles.container, {height: height / 1.3, width}]}>
        {isLoading?   <View style={[styles.loading, {height:width/1.2,width:width/1.2}]}>
        <View>
            <Text style={{fontWeight: '500',fontSize:20, color: '#FF4956',textAlign:"center"}}>Looding . . .</Text>
          </View>
        </View>:   <View style={[styles.product,{height:height/4,width:width/1.2}]}>
          <View>
            <Text style={{fontWeight: '500',fontSize:20, color: '#000'}}>{_Language}:</Text>
          </View>
          <View style={[styles.product,{height:height/5,width:width/1.2}]}>
            <CheckBox
              
              iconRight
              title={Arabic}
              checkedIcon="dot-circle-o"
              checkedColor="#f23"
              uncheckedColor="#f45"
              uncheckedIcon="circle-o"
              checked={checkedProduct == 'ar'}
              style={styles.button}
              wrapperStyle={{alignItems:"space-between",justifyContent:"space-between"}}

              onPress={() => storeData('ar')}
            />
            <CheckBox
              
              iconRight
              wrapperStyle={{alignItems:"space-between",justifyContent:"space-between"}}

              title={English}
              checkedIcon="dot-circle-o"
              checkedColor="#f23"
              uncheckedColor="#f45"
              uncheckedIcon="circle-o"
              checked={checkedProduct == 'en'}
              onPress={() => storeData('en')}
            />
            <CheckBox
             iconRight
              title={_Default}
              checkedIcon="dot-circle-o"
              checkedColor="#f23"
              uncheckedColor="#f45"
              uncheckedIcon="circle-o"
              checked={checkedProduct == 'de'}
              wrapperStyle={{alignItems:"space-between",justifyContent:"space-between"}}

              onPress={() => storeData('de')}
            />
          </View>
        </View>}
      </View>
      <Footer page="home" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },button:{
    alignItems:"space-between"
  },loading:{
   justifyContent:"center",
   alignItems:"center",
  //  borderWidth:1,
   borderColor:"#999",
   borderRadius:20,
   shadowColor: '#f45',
   shadowOffset: { width: -2, height: 4 },
   shadowOpacity: .2,
   shadowRadius: 30,
   elevation: 25,
   borderTopWidth:.1
  }
});
export default Language;
