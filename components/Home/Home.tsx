import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { useFonts, loadAsync } from 'expo-font'
import { useEffect } from 'react'
import { Button, Icon } from '@rneui/themed'
import Header from './Header'
import { Link } from 'expo-router'
import Ionicon from '@expo/vector-icons/Ionicons'

const staticData = {
  name: 'Jorge Dev',
  legend: 'Chasing a dream',
}

Promise.all([
  loadAsync('Nunito-Sans-EL', '../../assets/fonts/nunito/static/NunitoSans_7pt-ExtraLight.ttf'),
  loadAsync('Nunito-Sans-M', '../../assets/fonts/nunito/static/NunitoSans_7pt-Medium.ttf'),
  loadAsync('Nunito-Sans-SB', '../../assets/fonts/nunito/static/NunitoSans_7pt-SemiBold.ttf' )
])
  .then(null)
  .catch(err => console.log(err))

export default function Home(): JSX.Element {

  return (
    <View style={styles.homebox}>
      <StatusBar></StatusBar>
      <Header {...staticData}></Header>
      <View style={styles.addmealbox}>
        <Text style={styles.addmealtext}>ADD MEAL</Text>
        <Link href="/addmeal" asChild>
          <Ionicon 
            size={35}
            name="add-circle-outline" 
            reverse style={styles.addmealicon}/>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homebox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  addmealbox: {
    height: 60,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  addmealtext: {
    fontFamily: 'Nunito-Sans-M'
  },
  addmealicon: {
    color: '#4CAF50'
  }
})