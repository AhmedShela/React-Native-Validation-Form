import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

/**
 * props{
 * onChange, // on text change function()
 * width, // the TextBox Width
 * required, // treu if the textBox is required
 * onValid, // function update the state of the form's validation
 * enum , // textBox expected data ['','string','number','valueableNumber']
 * initValue, // textBox initialValue
 * submit, // form array state for submissions
 * language, // 'en' from ltr direction and 'ar' for rtl direction
 * placeholder, // textBox lable value
 * autoCompleteType, // react Textinput autoCompleteType
 * keyboardType, // react Textinput keyboardType
 * }
 */
const TextBox = (props) => {
  const [text, setText] = useState('');
  const [boderColor, setBorderColor] = useState('gray');
  const [errMsg, setErrorMsg] = useState(false);

  function changeTextHandler(value) {
    props.onChange(value);
    console.log('Hi')
    validation(value);
  }

  const styles = StyleSheet.create({
    container: {
      height: 50,
      position: 'relative',
      width: props.width || 300,
    },
    labelContainerL: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: -15,
      left: 20,
      padding: 5,
      zIndex: 50,
    },

    labelContainerR: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: -10,
      right: 20,
      padding: 0,
      zIndex: 50,
    },

    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: boderColor,
      justifyContent: 'flex-end',
      height: 5,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
  });

  function validation(textValue) {
    // console.log('now', isNaN(textValue));
    if (textValue.toString().trim().length == 0) {
      // if the textBox is empty
      if (props.required) {
        setBorderColor('red');
        console.log('1');
        props.onValid(false);
        setErrorMsg(true);
        return;
      }
    }

    switch (props.enum) {
      case 'number':
        if (isNaN(textValue)) {
          setBorderColor('red');
          console.log('2');
          props.onValid(false);
          setErrorMsg(true);
          return;
        }
        break;
      case 'valueableNumber':
        if (isNaN(textValue)) {
          console.log('3', typeof textValue);
          console.log('3', textValue);
          setBorderColor('red');
          props.onValid(false);
          setErrorMsg(true);
          return;
        }
        if (Number(textValue) <= 0) {
          setBorderColor('red');
          console.log('4', Number(textValue));
          props.onValid(false);
          setErrorMsg(true);
          return;
        }
        break;
    }
    // }
    // if (boderColor !== 'gray') {
      console.log('logggggg')
      setBorderColor('green');
      props.onValid(true);
      setErrorMsg(false);
    // }
  }

  if (boderColor == 'gray') {
    if (props.submit.length > 0) {
      validation(props.initValue);
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          props.language == 'en'
            ? styles.labelContainerL
            : styles.labelContainerR
        ,{flexDirection:'row'}]}>
        <Text style={{ color: 'gray', paddingHorizontal: 5 }}>
          {props.placeholder || 'lable'}
        </Text>
        <Text style={{ color: 'red' }}>{errMsg ? `  (${props.errMsg})` : ''}</Text>
      </View>

      <TextInput
        autoCompleteType={props.autoCompleteType || 'password'}
        keyboardType={props.keyboardType || 'default'}
        secureTextEntry={props.autoCompleteType == 'password' ? true : false}
        defaultValue={props.initValue}
        onChangeText={(value) => {
          changeTextHandler(value);
        }}
        style={styles.textInput}
        selectTextOnFocus
      />
    </View>
  );
};

export default TextBox;
