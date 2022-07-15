import React from 'react';
import { View, Text, StyleSheet ,useWindowDimensions,Animated} from 'react-native';

//import { Screen1Wrapper } from './Screen1.styles';

const Paginator = ({ data,scrollX }) => {
    
    
    const {width,height}=useWindowDimensions()
    return(
    <View style={styles.container}>

        {data.map((_, i) => {
            const inputRange=[(i-1)*width,i*width,(i+1)*width];

            const dotWidth=scrollX.interpolate({
                inputRange,
                outputRange:[15,30,15],
                extrapolate:"clamp",
            })
            const opacity=scrollX.interpolate({
                inputRange,
                outputRange:[.3,1,.3],
                extrapolate:"clamp",
            })
       return <Animated.View style={[styles.dot, { width: dotWidth,opacity }]} key={i.toString()} />
        
        })}
    </View>
)};



const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF4956",
        marginHorizontal: 3
    },
    container: {
        flexDirection: "row",
        maxHeight: 64,
        justifyContent:"center"
    }
})
export default Paginator;
