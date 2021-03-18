import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import TextBox from './TextBox';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [pass, setPass] = useState('');
  const [submit, setSubmit] = useState([]); // state for submissions
  const [valid, setValid] = useState({name:false,age:false,pass:false}); // object of each input and validations results

  const submition = () => {
    setSubmit([...'test']);
    if(!Object.values(valid).includes(false)){
      alert('Done')
      /**
       * do here your successfull submission code
       */
    }else{
      alert('Data missing')
      /**
       * do here your unsuccessfull submission code
       */
    }
  };

  return (
    <View style={styles.container}>
      <TextBox
        placeholder="name"
        initValue={name}
        submit={submit}
        required={true}
        enum={'string'}
        onChange={(text) => {
          setName(text);
        }}
        onValid={(val)=>{setValid({...valid,name:val})}}
      />
      <TextBox
        placeholder="age"
        initValue={age}
        submit={submit}
        required={true}
        enum={'valueableNumber'}
        onChange={(text) => {
          setAge(text);
        }}
        onValid={(val)=>{setValid({...valid,age:val})}}
      />
      <TextBox
        placeholder="password"
        initValue={pass}
        submit={submit}
        required={true}
        enum={'number'}
        onChange={(text) => {
          setPass(text);
        }}
        onValid={(val)=>{setValid({...valid,pass:val})}}
      />
      <Button
        title="save"
        onPress={() => {
          submition();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
