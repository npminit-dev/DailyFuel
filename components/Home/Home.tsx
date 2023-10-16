import { View, Text, StyleSheet, StatusBar } from 'react-native'
import Header from './Header'
import { Link } from 'expo-router'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useContext, useEffect, useState } from 'react'
import List from './List'
import { ConsumedContext } from '../contexts/ConsumedContext'
import { ScrollView } from 'react-native-gesture-handler'
import Progress from './Progress'
import { isToday } from 'date-fns'
import { MealType, StatusBarProps } from '../../types/types'
import Notifications from '../Notifications'

const staticData = {
  name: 'Jorge Dev',
  legend: 'Chasing a dream',
  target_cal: 2000
}

export default function Home(): JSX.Element {

  const [consumed, setConsumed] = useState<number>(0)
  const { meals, setMeals, removeMeal, addMeal } = useContext(ConsumedContext)
  const [statusprops, setStatusprops] = useState<StatusBarProps>({ statusType: 'none', message: '' })

  useEffect(() => {
    let newConsumed = 0
    if(Array.isArray(meals) && meals.length !== 0) {
      newConsumed = meals.reduce((acc, curr) => {
        acc += curr.cal
        return acc
      }, 0)
    }
    if(newConsumed > 2000) newConsumed = 2000
    setConsumed(newConsumed)
  }, [meals])

  useEffect(() => {
    setMeals(meals => filterTodayMeals(meals))
  }, [])

  const filterTodayMeals = (meals: MealType[]): MealType[] => {
    return meals.filter((meal, i) => {
      let dInfo: string[]|number[]|undefined = meal.date?.split('-').reverse()
      dInfo = dInfo?.map(data => parseInt(data as string))
      if(Array.isArray(dInfo) && isToday(new Date(dInfo[0], dInfo[1]-1, dInfo[2]))) return true
      else return false
    })
  }
  

  return (
    <View style={styles.homebox}>
      <StatusBar></StatusBar>
      <Header {...staticData}></Header>
      <View style={styles.addmealbox}>
        <Text style={styles.addmealtext}>ADD MEAL</Text>
        <Link href={"meallist"} asChild>
          <Ionicon
            size={35}
            name="add-circle-outline"
            reverse
            style={styles.addmealicon}
          />
        </Link>
      </View>
      <Notifications {...statusprops}></Notifications>
      <Progress cals={staticData.target_cal} consumed={consumed}></Progress>
      <View style={styles.consumedmealbox}>
        <ScrollView>
          {meals && Array.isArray(meals) ? (
            <List
              delMode={true}
              list={meals}
              setMeals={setMeals}
              removeMeal={removeMeal}
              addMeal={addMeal}
              setStatusProps={setStatusprops}
            ></List>
          ) : (
            <></>
          )}
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

