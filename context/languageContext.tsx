import * as React from 'react';
import ar from "./ar.json";
import en from "./en.json";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    VirtualizedList
} from "react-native";
import App from '../App'
type LanguageContextType={
    start:String;
}
const LanguageContext=React.createContext<LanguageContextType>({} as 
    LanguageContextType,
    );
export const LanguageContextProvidor= ({children}) => {
    const languageObj={
        "en":en,
    "ar":ar,
}
const [selectedLanguage,setSelectedLanguage]=React.useState('en')
const [isLoading,setIsLoading]=React.useState(true)
var { width, height } = useWindowDimensions();

React.useEffect(async ()=>{
    console.log(RNLocalize.getLocales())
    let myLang =RNLocalize.getLocales();
    let myLang2=myLang[0]["languageCode"]
    // alert(myLang2) 
    const currentLanguage=RNLocalize.findBestAvailableLanguage(Object.keys(languageObj));
    const jsonValue1:string|null = await AsyncStorage.getItem('user_info')
    const json = JSON.parse(jsonValue1)
    if (json==null) {
        setSelectedLanguage(myLang2||"en")
        setIsLoading(false)
    }else{
        setSelectedLanguage(json.lang)
        setIsLoading(false)
    }
    // currentLanguage?.languageTag||
},[])
const value ={...languageObj[selectedLanguage ]}
// const value ={...languageObj[selectedLanguage as "en" || "ar"]}

return <LanguageContext.Provider value={value}>
{/* {children} */}
{isLoading?    <View style={[styles.container,{height:height,width:width}]}>
          <ImageBackground
            source={require('../components/assets/drawable-hdpi/RX.png')}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={{
              width: "100%", height: "100%", alignItems: "center",
              justifyContent: "space-evenly", backgroundColor: "rgba(255,73,86,.6)"
            }}>
              <Image style={styles.image2}
                source={require("../components/assets/MyImages/7.png")} />
                <Text style={styles.text}>Loading . . .</Text>
            </View>
          </ImageBackground>
        </View>:<App/>}
  </LanguageContext.Provider>;
};

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
export const useTranslation=()=>React.useContext(LanguageContext)