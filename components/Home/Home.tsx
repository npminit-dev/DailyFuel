import { View, Text, StyleSheet, StatusBar } from 'react-native'
import Header from './Header'
import { Link } from 'expo-router'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useContext, useEffect, useState } from 'react'
import useMealList from '../../hooks&tools/useMealList'
import List from './List'
import { ConsumedContext } from '../contexts/ConsumedContext'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TODAY_MEALS_KEY } from '../../hooks&tools/useMealList';

const staticData = {
  name: 'Jorge Dev',
  legend: 'Chasing a dream',
  target_cal: 2000
}

export default function Home(): JSX.Element {

  const [consumed, setConsumed] = useState<number>(0)
  const { meals, setMeals, removeMeal, addMeal } = useContext(ConsumedContext)

  return (
    <View style={styles.homebox}>
      <StatusBar></StatusBar>
      <Header {...staticData}></Header>
      <View style={styles.addmealbox}>
        <Text style={styles.addmealtext}>ADD MEAL</Text>
        <Link href={'meallist'} asChild>
          <Ionicon 
            size={35}
            name="add-circle-outline" 
            reverse style={styles.addmealicon}/>
        </Link>
      </View>
      <View style={styles.consumedmealbox}>
        <ScrollView>
        { 
          Array.isArray(meals) 
          ? <List delMode={true} list={meals} setMeals={setMeals} removeMeal={removeMeal} addMeal={addMeal}></List> 
          : <></> 
        }
        </ScrollView>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  homebox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  addmealbox: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  addmealtext: {
    fontFamily: 'Nunito-Sans-M',
    fontSize: 16
  },
  addmealicon: {
    color: '#4CAF50',
  },
  consumedmealbox: {
    flex: 1
  }
})

