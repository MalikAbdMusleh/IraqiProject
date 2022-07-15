/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';

import React from 'react';
import Stack from './components/stack/navigator.js';
// import Drower from './components/stack/Drower.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
     <Text>
      asdasdasdasdasdasdasdasd
     </Text>
    </View>
  );
};
import {useTranslation} from './context/languageContext';

const App= () => {
  const isDarkMode = useColorScheme() === 'dark';
const {start}=useTranslation()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <Section/>
    <>
  <Stack/>
    </>
  
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height:1000,

    // marginTop: 32,
    // paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
