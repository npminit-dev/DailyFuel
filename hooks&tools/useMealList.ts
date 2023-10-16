import { useEffect, useState } from 'react';
import { MealType, useMealListProps, useMealListType } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const MEALS_KEY = 'meals:key';
export const TODAY_MEALS_KEY = 'todaymeals:key'

export default function useMealList({ consumed }: useMealListProps): useMealListType {
  const [meals, setMeals] = useState<MealType[]>([])

  useEffect(() => {
    async function load() {
      try { 
        let meals = await AsyncStorage.getItem(consumed ? TODAY_MEALS_KEY : MEALS_KEY)
        if(!meals) {
          await AsyncStorage.setItem(consumed ? TODAY_MEALS_KEY : MEALS_KEY, '[]')
          setMeals([])     
        } else setMeals(await JSON.parse(meals))
      } catch(err) {
        setMeals([])
      }
    }

    load()
  }, [])

  useEffect(() => {
    (async () => {
      meals && await AsyncStorage.setItem(consumed ? TODAY_MEALS_KEY : MEALS_KEY, JSON.stringify(meals) || '[]')
    })();
  }, [meals])

  function addMeal(meal: MealType) {
    try {
      setMeals(meals => {
        let newmeals = [...meals]
        newmeals.push(meal) 
        return newmeals
      })  
    } catch(err) {
      return 'err: ' + err
    }
  }

  async function removeMeal(id: string) {
    if(consumed) {      
      try {
        let newMeals = meals?.filter(meal => meal.id !== id)
        await AsyncStorage.setItem(TODAY_MEALS_KEY, JSON.stringify(newMeals || meals))
        setMeals(() => newMeals || meals)
      } catch(err) {
        throw new Error(`Error removing meal: ${err}`)
      }  
    } else throw Error('removeMeal only available in "consumed" mode')
  }

  async function setToAsyncStorage(newMeal: MealType[]): Promise<boolean> {
    return new Promise(async (res, rej) => {
      AsyncStorage.setItem(consumed ? TODAY_MEALS_KEY : MEALS_KEY, JSON.stringify(newMeal) || '[]')
        .then(() => res(true))
        .catch(() => rej(false))
    })
  }

  return [meals, addMeal, setMeals, removeMeal, setToAsyncStorage]
}