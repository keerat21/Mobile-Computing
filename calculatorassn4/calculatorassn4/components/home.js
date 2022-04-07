/**
 *  file: home.js
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
  Vibration,
  Switch,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {submitHandler} from './settings';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


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
   * EggCalc
   * Purpose: To calculate using the buttons, and see the results; settings button to change the settings
   * Parameter(s):
   *  <1> Navigation
   * 
   * Precondition(s): 
   * Navigation requirements
   * 
   * Returns:
   *    <1>rendering of Home/Calculator screen.
   *    <2>calculated result.
   * 
   * Side effect:
   * <1> text change
   * <2> background color and text color may or may not be stored in async storage
   * 
   * 
   */
const EggCalc = ({navigation}) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

 
  var [bgColor, bgColorSet] = useState('white');
  var [txtColor, txtColorSet] = useState('black');
    
  const [value, setValue] = useState('');

 


  const data = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    '+',
    '-',
    '/',
    '*',
    '=',
    'Del',
    'Clear',
  ];




 //future purpose to pass data; no use now(6-apr-2022)
  const submitHandler = (bgColor,txtCcolor) =>{
  bgColorSet(bgColor);
  txtColorSet(txtColor);
    
  }
  
//Calculate the values with given input
  const adder = (value) => {
    if (value != '=' && value != 'Clear' && value != 'Del') {
      setCount(count + value); setLastNumber(value);
    } else if (value === 'Clear') {
      setCount('');
    } else if (value === 'Del') {
      if(lastNumber != '')
      {
        setCount(count.substring(0, count.length - 1)); //remove last character from count
        setLastNumber(count.substring(count.length - 1, count.length)); //put last character in lastNumber
      }
      else
      setCount('');
    } else if (value == '=') {
      setLastNumber('');
      let result = eval(count);
      setCount(result);
 
    }
    
  };

  return (
    <View style={[styles.container, { backgroundColor:  bgColor  }]}>
      <Text style={{ backgroundcolor: txtColor  }}>You clicked the egg {count} times! </Text>
      <View style={{ flexDirection: 'row', backgroundColor: { bgColor } }}>
        <Pressable style={{ flex: 5 }} onPress={() => setCount(count + 1)}>
          <Text style={styles.eggButton}>🥚</Text>
        </Pressable>
        <Pressable
          style={{ flex: 'flexEnd' }}
          onPress={() => setCount(count + 1)}>
          <Text>🥚</Text>
        </Pressable>
      </View>

      <Text>{count}</Text>
      <Text style={{ fontSize: 2, textAlign: 'center' }}></Text>

      {/** Button press and take the value;; Vibration onpress added!  */}
      <View style={styles.buttons}>
        {data.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => [
              Vibration.vibrate(5),
              setCurrentNumber(value),
              
              adder(value),
            ]}
            style={[styles.button, count === value]}>
            <Text>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,

    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '30%',
    flex: 2,
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eggButton: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default EggCalc;
