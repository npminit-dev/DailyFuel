import { Overlay, Input, Button } from "@rneui/base"
import { AddModalProps, addModalStateType, addModalStateTypeNames } from '../../types/types';
import { Text, StyleSheet, View, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useEffect, useState } from "react";
import Ionicon from '@expo/vector-icons/Ionicons';

const defaultInputState: addModalStateType = {
  name_input: '',
  grams_input: '',
  cal_input: ''
}

export default function AddModal({ modalVisible, addMeal, setModalVisible }: AddModalProps): JSX.Element {

  const [inputsState, setInputState] = useState<addModalStateType>(defaultInputState)
  const [valid, setValid] = useState<boolean>(false)

  const update = (prop: addModalStateTypeNames, value: string) => {
    setInputState(prev => {
      let newState = {...prev}
      newState[prop] = value
      isValid(newState)
      return newState
    })
  }

  function addNewMeal() {    
    let err = addMeal({ 
      name: inputsState.name_input,
      grams: parseInt(inputsState.grams_input),
      cal: parseInt(inputsState.cal_input)
    })
    if(err === 'error') {
      handleClose(true);
      Alert.alert('Something went wrong...', err + '', [{  text: 'Ok' }])
    } else {
      Alert.alert('Item added to list!', 'Now you can add it to the consumed list, now or later',[{  text: 'Ok' }])
      handleClose(false)
    }
  }

  function isValid(inputState: addModalStateType) {
    if(inputState.name_input.trim() === '' ||
      inputState.grams_input.trim() === '' ||
      inputState.cal_input.trim() === ''
    ) setValid(false)
    else setValid(true)
  }

  function handleClose(persistInputs?: boolean) {
    setModalVisible(false)
    if(!persistInputs) {
      setInputState(defaultInputState)
    } else setValid(false)
  }
  
  return (
    <Overlay isVisible={modalVisible} overlayStyle={styles.ovly_style}>
      <ScrollView>
        <View style={styles.titlebox}>
          <Text style={styles.title}>Adding meal</Text>
        </View>
        <View style={styles.inputsbox}>
          <Input 
            defaultValue={inputsState.name_input}
            inputContainerStyle={styles.input}
            rightIcon={<Ionicon name={'md-text-sharp'}></Ionicon>}
            placeholder="egg, carrot, chicken..." 
            label={<Text>Name</Text>}
            onChangeText={(value) => update('name_input', value)}
          ></Input>
          <Input 
            defaultValue={inputsState.grams_input}
            inputContainerStyle={styles.input}
            rightIcon={<Ionicon name='ios-barbell-sharp'></Ionicon>}
            placeholder="200, 500, 55.2"
            keyboardType="numeric"
            label={<Text>Grams</Text>}
            onChangeText={(value) => update('grams_input', value)}
          ></Input>
          <Input 
            defaultValue={inputsState.cal_input}
            inputContainerStyle={styles.input}
            rightIcon={<Ionicon name='md-flame-sharp'></Ionicon>}
            placeholder="10, 80, 150, 500"
            keyboardType="numeric"
            label={<Text>Calories</Text>}
            onChangeText={(value) => update('cal_input', value)}
            ></Input>
        </View>
        <View style={styles.buttonbox}>
          <Button 
            radius={5} color={'success'} 
            containerStyle={styles.button} disabled={!valid}
            onPress={() => addNewMeal()}
          >Add</Button>
          <Button radius={5} color={'secondary'} 
            containerStyle={styles.button} 
            onPress={() => handleClose(true)}
          >Cancel</Button>
        </View>
      </ScrollView>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  ovly_style: {
    backgroundColor: '#f5f5f5',
    height: 400,
    width: 275,
  },
  titlebox: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderStyle: 'dashed'
  },
  title: {
    fontFamily: 'Nunito-Sans-M',
    fontSize: 16
  },
  inputsbox: {
    flex: 1,
    paddingVertical: 5,
    paddingTop: 10
  },
  input: {
    height: 40
  },
  buttonbox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 2
  }

})