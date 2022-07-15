import * as React from 'react';
import foodList from "./foodList";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

import Footer from "../../Pages/body/Footer";
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
 
import { 
    Icon
} from "react-native-elements";

import { useNavigation } from '@react-navigation/native';

const BagTab = () => {
    const { width, height } = useWindowDimensions()


    return (
        <ScrollView >
            <View style={[styles.container,{height:height/1.15,width}]}>
            <Image style={[{ width: width , height: height / 2 }, { resizeMode: "contain" }]}
                 source={require("../../assets/MyImages/mb1.png")}
                                    />
            </View>
           <Footer page="bag" />
        </ScrollView>);
};




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    }
 
});
export default BagTab;

