import * as React from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated, Image, useWindowDimensions } from 'react-native';
import slidesList from "./slidesList";
import slidesListAr from "./slidesListAr";
import OnboardingItem from "./onboardingItem";
import Paginator from "./Paginator";
import * as RNLocalize from "react-native-localize";

const Slides = ({ navigation }) => {

  var { width, height } = useWindowDimensions();


  const scrollX = useRef(new Animated.Value(0)).current

  const [currentIndex, setCurrentIndex] = useState(0)
  const [lang, setLang] = useState('ar')
  const [newSlidesList, setNewslidesList] = useState([])

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current;

  const veiwConfig = useRef({ veiwAreaCoveragePercentThreshold: 50 }).current
  
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
          alert(`Welcome back ${json.name}`);
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
React.useEffect(()=>{
  let myLang =RNLocalize.getLocales();
  let myLang2=myLang[0]["languageCode"]
  if (myLang2=='en') {
    setNewslidesList(slidesList)
  }else{
    setNewslidesList(slidesListAr)
  }
})
  return (
    <View style={styles.container}>

      <FlatList data={newSlidesList}
        renderItem={({ item }) =><><OnboardingItem  navigation={navigation} item={item} /></>}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={viewableItemsChanged}
        veiwabilityConfig={veiwConfig}
        scrollEventThrottle={32}
//        ref={slidesList}
      />
      <Paginator data={slidesList} scrollX={scrollX} />
      <Image
        style={[styles.footer, { width }]}
        source={require("../assets/MyImages/6.png")} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFECEE"
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  button: {
    flex: .1,
    maxWidth: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFECEE",
    borderRadius: "50%",
    // paddingHorizontal:'50',
    backgroundColor: "#FFECEE"
  },
  footer:{
    // flex: 1,
    position: "relative",
    top:0,
    maxHeight:"10%"
    
    // flex: .9,
    // width: "100%",
  }
});
export default Slides;