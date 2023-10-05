import { SearchBar } from '@rneui/base'
import { View } from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { MealType, SearchProps } from '../../types/types';

export default function Search({ meals, setMeals, setToAsyncStorage }: SearchProps) {

  const original = useRef<MealType[]>([]);
  
  useEffect(() => {
    if(meals && meals.length > original.current.length) original.current = meals
  }, [meals])

  const handleChange = (newValue: string) => {
    if(!newValue) setMeals(original.current || [])
    setMeals(original.current.filter((elem, i) => elem.name.startsWith(newValue)))
  }

  useEffect(() => {
    return () => {
      setToAsyncStorage(original.current)
    }
  }, [])

  return (
    <View>
      <SearchBar
        platform='android'
        keyboardType='ascii-capable'
        defaultValue=''
        onChangeText={(e) => handleChange(e)}
        onCancel={() => console.log('cancelled')}
      >
      </SearchBar>
    </View>
  )
}