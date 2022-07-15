import * as React from 'react';
// import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

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
    TextInput,
    TouchableHighlight
} from "react-native";
// import Timeline from 'react-native-timeline-flatlist'

// import { useNavigation } from '@react-navigation/native';

const SubmitReview = () => {
    const { width, height } = useWindowDimensions()
    const [starCount, setStarCount] = React.useState(3.5)
    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }
    const [heightInput, setHeight] = React.useState(50);
    const [comment, setComment] = React.useState('Contrary to popular belief, Lorem Ipsum is notsimply random text.');
    return (
        <ScrollView style={{ width: width, height: height}} >
            <View style={{justifyContent:"space-between", height: height/1.13,backgroundColor:"#fff" }}>

         
            <View style={[styles.container, { width, height: height / 3 }]}>
                <View style={[styles.summary, { height: height / 5 }]}>
                    <View
                        style={[styles.elementContainer, {  width: width / 1.1, height: height / 4 }]}>
                        <View style={{  width: width / 1.1 }}>
                            <Text style={[styles.StatusText, {  color: "#190708", fontWeight: "bold", margin: "3%" }]} >
                                Give Review
                            </Text>
                        </View>
                        <View style={[{ flexDirection: "row",  justifyContent: "space-between", alignItems: "center", width: width / 1.1, height: height / 10 }]}>
                            <View style={{ width: width / 2.5 }} >
                                <Text style={[styles.StatusText, { fontSize: 18, margin: "3%", width: width / 1.1 }]}>
                                    Support
                                </Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    rating={starCount}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    fullStarColor={'#FF4956'}
                                    emptyStarColor={'#FF4956'}
                                    starSize={18}
                                    // buttonStyle={{backgroundColor:"#123"}}
                                    starStyle={{ marginHorizontal: 2 }}
                                    containerStyle={{ width: '50%' }}
                                />
                            </View>
                            <View style={{ width: width / 2.5 }} >
                                <Text style={[styles.StatusText, { fontSize: 18, margin: "3%", width: width / 1.1 }]}>
                                    Functionality
                                </Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    rating={starCount}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    fullStarColor={'#FF4956'}
                                    emptyStarColor={'#FF4956'}
                                    starSize={18}
                                    // buttonStyle={{backgroundColor:"#123"}}
                                    starStyle={{ marginHorizontal: 2 }}
                                    containerStyle={{ width: '50%' }}
                                />
                            </View>
                        </View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width / 1.1 }]}>
                            <View style={{ width: width / 2.5 }} >
                                <Text style={[styles.StatusText, { fontSize: 18, margin: "3%", width: width / 1.1 }]}>
                                    Communication
                                </Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    rating={starCount}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    fullStarColor={'#FF4956'}
                                    emptyStarColor={'#FF4956'}
                                    starSize={18}
                                    // buttonStyle={{backgroundColor:"#123"}}
                                    starStyle={{ marginHorizontal: 2 }}
                                    containerStyle={{ width: '50%' }}
                                />
                            </View>
                            <View style={{ width: width / 2.5 }} >
                                <Text style={[styles.StatusText, { fontSize: 18, margin: "3%", width: width / 1.1 }]}>
                                    Parking Systym
                                </Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    rating={starCount}
                                    selectedStar={(rating) => onStarRatingPress(rating)}
                                    fullStarColor={'#FF4956'}
                                    emptyStarColor={'#FF4956'}
                                    starSize={18}
                                    // buttonStyle={{backgroundColor:"#123"}}
                                    starStyle={{ marginHorizontal: 2 }}
                                    containerStyle={{ width: '50%' }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: "#fff",justifyContent:"center",alignItems:"center"}} >
                <View style={{ alignItems: "flex-start", width: width / 1.2 }}>
                    <Text style={[styles.StatusText, {  color: "#190708", fontWeight: "bold", marginBottom: "8%" }]}>
                        Your Comment
                    </Text>
                </View>
                <View style={[styles.inputContainer, {height: heightInput*2}] }>
                    <TextInput
                        style={[styles.inputs, { height: heightInput*2 }]}
                        multiline
                        placeholder="Write Your Review here . . ."
                        value={comment}

                        underlineColorAndroid='transparent'
                        placeholderTextColor={"#000"}
                        onContentSizeChange={(event) => {
                            setHeight(event.nativeEvent.contentSize.height);
                        }}
                    onChangeText={(fullName) => setComment({ fullName })}
                    />
                </View>
            </View>
                <View style={{ justifyContent: "center", alignItems: "center",padding:"5%" }} >
                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.signupButton, { backgroundColor: "#FF4956" }]}
                        onPress={() => { setEdit(true); forceUpdate() }}>
                        <Text style={[styles.signUpText, { color: "#fff" }]}>SUBMIT REVIEW</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>); 
};




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff"
    }, summary: {
        // width: "100%"
    },
    orderStatus: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#CDD4D9",
    }, Status: {
        flex: .2,
        width: "20%",
        alignItems: "center",
        padding: 0
    }, StatusText: {
        color: '#190708',
        fontSize: 20
    }, timeline: {
        // height:"80%",
        margin: "3%"
    },
    elementContainer: {
        margin: 8,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 5,
    }, inputContainer: {
        borderColor: '#CDD4D9',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        width: "90%",
        height: "20%",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems:"flex-start"
    },
    inputs: {
        marginLeft: 16,
        fontSize: 15,
        textAlignVertical: 'top'
        }, buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#FFECEE",
    },
    signUpText: {
        color: '#000',
    },
});
export default SubmitReview;
