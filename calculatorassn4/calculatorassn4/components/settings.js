/**
 *  file: settings.js
 *  author: Keerat Singh Tanwar <keerattanwar21@gmail.com>
 *  version: 0.1
 *  date-created: 6-apr-2022
 *  last-modified: 6-apr-2022
 */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
   * NOT WORKIN
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
   * Setter
   * Purpose: To able tochange the settings from dark mode to light mode and vice versa and toggle the vibrations.
   * Parameter(s):
   *  <1> Navigation
   * 
   * Precondition(s): 
   * Navigation requirements
   * 
   * Returns: rendering of setting screen.
   * 
   * Side effect:
   * <1> extract string values
   * <2> background color and text color may or may not be stored in async storage
   * <3> background color change
   * 
   * MALFUNCTIONS
   */
const Setter = ({navigation}) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  var a,b ;
  const [value, setValue] = useState('');

    var [bgColor, bgColorSet] = useState('white');
  var [txtColor, txtSet] = useState('black');
  var [isEnabled, setIsEnabled] = useState(false);

  var [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    console.log(value);
  };

useEffect(()=>
a = getMyStringValue('bcolor'),
b = getMyStringValue('tcolor'));

useEffect(()=> bgColor = a, txtColor = b);

/**
   * checkDarkMode
   * Purpose: To check if the mode changes to dark or light, and call toggleSwitch() and setStringValue()
   * Parameter(s):
   *  <1> switchMode
   * 
   * Precondition(s): 
   * Switch requirements
   * setStringValue()
   * toggleSwitch()
   * 
   * Returns: rendering of setting screen.
   * 
   * Side effect:
   * <1> setting background color
   * <1> setting text color
   * 
   */
  const checkDarkMode = (switchMode) => {
    if (switchMode) {
bgColorSet('black');
txtSet('grey');
    } else {
bgColorSet('white');
txtSet('black');
    }
    toggleSwitch(switchMode);
    console.log(bgColor);
    console.log(txtColor);

    setStringValue(bgColor,txtColor);
    
  };


  return (
    <View style={[styles.container, { backgroundColor:  bgColor  }]}>

    {/* Text color does not change  */}
     <Text style={ { color:  txtColor  } }>You clicked the egg {count} times! </Text>
    <Switch
        style={[{ marginTop: 30, marginBottom: 30 }]}
        onValueChange={(value) =>
        {
          checkDarkMode(value);
          toggleSwitch(value);
          
          }
        }
        value={switchValue}
      />

      <View style={{ flexDirection: 'row', backgroundColor: { bgColor } }}>
        <Pressable style={{ flex: 5 }} onPress={() => setCount(count + 1)}>
          <Text style={styles.eggButton}>🥚</Text>
        </Pressable>
        <Pressable
          style={{ flex: 'flexEnd', textAlign: 'right' }}
          onPress={() => setCount(count + 1)}>
          <Text>🥚</Text>
        </Pressable>
      </View>

      <Text>{count}</Text>
      <Text style={{ fontSize: 2, textAlign: 'center' }}></Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,

    alignItems: 'center',
  },

  eggButton: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default Setter;
