import * as React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions()

  const [pic, setPic] = React.useState('');

  const getData = async () => {
    try {
        const jsonValue1 = await AsyncStorage.getItem('user_info')
        // const jsonValue = JSON.parse(jsonValue1)  
        const json = JSON.parse(jsonValue1)  
        // alert(json.number)   
        setPic(json.img_location)
        //console.log(pic);  

      //  jsonValue != null ? setUserInfo(json)  : null;
    } catch(e) { 
      // error reading value
      alert(e)  
                  
    }   
  }  
  
  React.useEffect(()=>{
    getData();
},[])
  return (
    <View style={[styles.container, { width, height: height / 8 }]}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
      >
        <Image source={require("../../assets/MyImages/h2.png")} />
       
      </TouchableOpacity>
      <View style={[styles.container2, { width: width / 5 }]}>
        <TouchableOpacity style={{ flex: 0.5 }}  onPress={() => navigation.navigate("NotificationPage")}>
          <Image source={require("../../assets/MyImages/h1.png")} />
        </TouchableOpacity  >
        <TouchableOpacity  onPress={() => navigation.navigate("MyProfile")} >
          {/* <Image source={require("../../assets/MyImages/h3.png")} /> */}
          <Image
          style={[styles.image,{borderRadius:100}]}
          width={40}
          height={40}
            source={pic?{uri:pic}:
              require("../../assets/MyImages/pr1.png")
          } 
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15
  },
  container2: {
    flex: .3,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
  }

});
export default Header;