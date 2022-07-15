import * as React from 'react';
import { StyleSheet, Text, View, Button, useWindowDimensions,ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import { NavigationContainer ,useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation}  from '../../context/languageContext';

const HomeScreen = ({ navigation }) => {
  const navigation1=useNavigation()
  const {start}=useTranslation()
  
  var { width, height } = useWindowDimensions();
  
  const [isLoading,setIsLoading]=React.useState(true)
  const [userInfo, setUserInfo] = React.useState({});
  const getData = async () => {
    try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        // const jsonValue = JSON.parse(jsonValue1)  
        const json = JSON.parse(jsonValue1)  
        // alert(json.number)   
        // setCheckedProduct(json.lang) 
        json != null ? setUserInfo(json)  : null;
        if (json) {
          json=='en'? alert(`Welcome back ${json.name}`): alert(json.name+`مرحبا بك مجدداً`)
         
          navigation.navigate("Drawer")
        }
        setIsLoading(false)
    } catch(e) { 
      // error reading value
      alert(e)  
                  
    }   
  }  
  
    React.useEffect(()=>{
        getData();
      },[])
     
       return (
       <View style={[styles.container,{height:height,width:width}]}>
        {isLoading?
        <View style={[styles.container,{height:height,width:width}]}>
          <ImageBackground
            source={require('../assets/drawable-hdpi/RX.png')}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={{
              width: "100%", height: "100%", alignItems: "center",
              justifyContent: "space-evenly", backgroundColor: "rgba(255,73,86,.6)"
            }}>
              <Image style={styles.image2}
                source={require("../assets/MyImages/7.png")} />
                <Text style={styles.text}>Loading . . .</Text>
            </View>
          </ImageBackground>
          </View>
        :<View style={[styles.container,{height:height,width:width}]}>
           <ImageBackground
             source={require('../assets/drawable-hdpi/RX.png')}
             resizeMode="cover"
             style={styles.image}
           >
             <View style={{
               width: "100%", height: "100%", alignItems: "center",
               justifyContent: "space-evenly", backgroundColor: "rgba(255,73,86,.6)"
             }}>
               <Image style={styles.image2}
                 source={require("../assets/MyImages/7.png")} />
     
               <TouchableOpacity
                 style={styles.button}
                 // hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                 onPress={() =>
                   navigation.navigate('Slides', { name: 'Jane' })
                 }
               >
                 <Text style={styles.text} >{start}</Text>
               </TouchableOpacity>
             </View>
           </ImageBackground>
           </View>}
         </View>)
         }
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFECEE",
    borderRadius: 50,
    backgroundColor: "#feb3b3"
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image2: {
    opacity: 1,
    marginLeft: 30
  }

});
export default HomeScreen;