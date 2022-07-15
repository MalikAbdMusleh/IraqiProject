import React from 'react';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button, StyleSheet, Text } from 'react-native'


const confirmPaymentDialog = ({ data }) => {
    const [visible, setVisible] = React.useState(false)
    return (
        <View style={styles.container}>
            <Button
                title="Show Dialog"
                onPress={() => {
                    setVisible(true);
                }}
            />
            <Dialog
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false);
                }}
            >
                <DialogContent>
                    <Text>
                        heeelloo there
                    </Text>
                </DialogContent>
            </Dialog>
        </View>
    )
};



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
        justifyContent: "center"
    }
})
export default confirmPaymentDialog;
