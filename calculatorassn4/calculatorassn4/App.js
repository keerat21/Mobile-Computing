/**
 *  file: App.js
 *  author: Keerat Singh Tanwar <keerattanwar21@gmail.com>
 *  version: 0.1
 *  date-created: 6-apr-2022
 *  last-modified: 6-apr-2022
 */
import * as React from 'react';
import { View, Text, Button, TextInput, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EggCalc from './components/home';
import Setter from './components/settings';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

/**
   * setStringValue
   * Purpose: To store/set the string values for background color and text color and pass them through screens. NOT WORKING(6-apr-2022)
   * Parameter(s):
   *  <1> value: string value for backgroundcolor
   *  <2> v2: string valuefor text color
   * 
   * Precondition(s): 
   * useAsyncStorage
   * 
   * Returns: N/A
   * 
   * Side effect:
   * <1> store string values for backgroundcolor and text color 
   * 
   * NOT WORKING
   */
const setStringValue = async (value,v2) => {
  try {
    await AsyncStorage.setItem('bcolor', value);
    await AsyncStorage.setItem('tcolor', v2);
    
  } catch(e) {
    // save error
  }
  console.log('Done.')
}

/**
   * getMyStringValue
   * Purpose: To get/extract the string values for background color and text color and pass them through screens. NOT WORKING(6-apr-2022)
   * Parameter(s):
   *  N/A
   * 
   * Precondition(s): 
   * useAsyncStorage
   * 
   * Returns: N/A
   * 
   * Side effect:
   * <1> extract string values
   * 
   * NOT WORKING
   */
getMyStringValue = async (value) => {
  try {
    return await AsyncStorage.getItem(value)
  } catch(e) {
    // read error
  }

  console.log('Done.')

}

/**
   * HomeScreen
   * Purpose: Make Screen for Home/calculator, including all the buttons and necessary requirements
   * Parameter(s):
   *  <1>Navigation
   * 
   * Precondition(s): 
   * navigation stack, NavigationContainer, createNativeStackNavigator
   * 
   * Returns: Calculator/homepage UI
   * 
   * Side effect:
   * <1> manipulations on main screen
   * 
   */
function HomeScreen({navigation}){
React.useEffect(()=>  bgColor = getMyStringValue('bcolor'));
React.useEffect(()=>  txtColor = getMyStringValue('tcolor'));
  return(
    <View style={{ flex:1, alignItems: 'center'}}>

      <View style={{flex:1,  alignItems: 'spread'}}>
        <EggCalc/>
      </View>
      <View style={{flex:1}}>
        
        <Button
        
          title="Settings"
          onPress={()=> navigation.navigate('Settings')} />
      </View>

    </View>
  );
}

/**
   * Settings
   * Purpose: Make Screen for Settings, including all the buttons and necessary requirements
   * Parameter(s):
   *  <1>Navigation
   * 
   * Precondition(s): 
   * navigation stack, NavigationContainer, createNativeStackNavigator
   * 
   * Returns: Settings screen
   * 
   * Side effect:
   * <1> manipulations on settings screen
   * 
   * 
   */
function Settings({navigation}){

React.useEffect(()=>  bgColor = getMyStringValue('bcolor'));
React.useEffect(()=>  txtColor = getMyStringValue('tcolor'));
  const[text, setText] = React.useState("");
  return(
    <SafeAreaView style={{ flex:1, alignItems: 'center'}}>
    <View style={{ flex:1, alignItems: 'center'}}>
    <Text>Switch Mode</Text>

    <Setter/>

    </View>
    <View style={{ flex:1, alignItems: 'center'}}>
    <Button 
      title="Go to Home"
      onPress={()=> {setStringValue(bgColor,txtColor), navigation.navigate('Home')}} />
    </View>
    </SafeAreaView>
  
  )
}

// To create multiple screens 
const Stack = createNativeStackNavigator();

/**
   * App
   * Purpose: Renders all the screen together
   * Parameter(s):
   *  N/A
   * 
   * Precondition(s): 
   * navigation stack, NavigationContainer, createNativeStackNavigator
   * 
   * Returns: Settings screen
   * 
   * Side effect:
   * <1> manipulations on settings screen
   * 
   * 
   */
function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Home" component ={HomeScreen} />       
      </Stack.Navigator>
    </NavigationContainer>
      );
}

export default App;