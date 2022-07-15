import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";

const onboardingItem = ({ item, navigation }) => {
  var { width, height } = useWindowDimensions();

  if (item.id == "3") {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View style={[styles.container, { width, height }]}>
          <View
            style={[styles.container4, { width: width, maxHeight: height }]}
          >
            <View
            style={[styles.container2, { width: width, maxHeight:width/1.07 }]}
            >
              <View
                style={[styles.container3, { width: "100%", maxHeight: "20%" }]}
              >
                <Image
                  source={require("../assets/MyImages/5.png")}
                  style={[styles.smallImage]}
                />
              </View>
              <ImageBackground
                source={require("../assets/MyImages/4.png")}
                style={[styles.background]}
              >
                <Image
                  source={item.image}
                  style={[styles.image, { resizeMode: "contain" }]}
                />
              </ImageBackground>
            </View>
          </View>

          <View style={{ flex: 0.3, minHeight: 10, width: "100%" }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View>
      <View
        style={[styles.container, { width, height }]}
      >
        <View style={[styles.container4, { width: width, maxHeight: height }]}>
          <View
            style={[styles.container2, { width: width, maxHeight:width/1.07 }]}
          >
            <View
              style={[styles.container3, { width: width, maxHeight: "20%" }]}
            >
              <Image
                source={require("../assets/MyImages/5.png")}
                style={[styles.smallImage]}
              />
            </View>
            <ImageBackground
              source={require("../assets/MyImages/4.png")}
              style={[styles.background]}
            >
              <Image
                source={item.image}
                style={[styles.image, { resizeMode: "contain" }]}
              />
            </ImageBackground>
          </View>
        </View>

        <View style={{ flex: 0.3, minHeight: 10, width: "100%" }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFECEE",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  container3: {
    flex: 1.2,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  container4: {
    flex: 1.2,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  image: {
    // flex: 1,
    width: "100%",
    minHeight:"50%",
    // resizeMode:"contain"
  },
  smallImage: {
    marginBottom: -19,
  },
  title: {
    fontSize: 34,
    lineHeight: 50,
    fontWeight: "normal",
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  background: {
    flex: 1,
    // width: "86.5%",
    width: "86.5%",
    // maxHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: 15,
    // margin:20,
  },
  footer: {
    flex: 0.2,
    position: "relative",
    top: 0,
    // flex: .9,
    width: "70%",
  },
});
export default onboardingItem;
