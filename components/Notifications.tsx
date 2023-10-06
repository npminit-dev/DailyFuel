import { View, Text, StyleSheet } from "react-native";
import { StatusBarProps, StatusType } from '../types/types';
import Ionicon from '@expo/vector-icons/Ionicons';

export default function Notifications({ statusType, message }: StatusBarProps) {

  return <>
    <View style={{...st.statusbox, height: statusType === 'none' ? 0 : 25}}>
      <Ionicon 
        name={statusType === 'error' ? 'close-circle-outline' : statusType === 'notify' ? 'warning-sharp' : 'checkbox-sharp'}
        color={statusType === 'error' ? 'red' : statusType === 'notify' ? 'blue' : 'green'}
        size={20}
      ></Ionicon>
      <Text
        style={{color: statusType === 'error' ? 'red' : statusType === 'notify' ? 'blue' : 'green', ...st.text}}
      >{ message }</Text>
    </View>
  </>
}

const st = StyleSheet.create({
  statusbox: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5
  },
  icon: {

  },
  text: {
    fontFamily: 'Nunito-Sans-M',
    fontSize: 12
  }
})