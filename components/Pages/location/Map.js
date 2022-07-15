import React from 'react';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button, StyleSheet, Text, useWindowDimensions, View, TouchableOpacity, Image } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'

// import Footer from "../body/Footer";
const TrackOrder = ({ data }) => {
    const [visible, setVisible] = React.useState(false)
    const { width, height } = useWindowDimensions()

    return (
        <View style={[styles.container, width, height]}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
       </View>
    )
};



const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        shadowColor: '#999',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 8,
        backgroundColor:"#123"
    }
})
export default TrackOrder;
