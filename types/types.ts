import { Dispatch, SetStateAction } from "react"

export type MealType = {
  id?: string,
  name: string,
  grams: number,
  cal: number,
  date?: string,
  delMode?: boolean,
  removeMeal?: (id: string) => void,
  addMeal?: (meal: MealType) => void
}

export type HeadProps = {
  name: string,
  legend: string
}

export type useMealListType = [
  meals: MealType[]|null|undefined,
  addMeal: (meal: MealType) => void,
  setMeal: Dispatch<SetStateAction<MealType[]>>,
  removeMeal: (id: string) => void
]

export type useMealListProps = {
  consumed?: boolean
}

export type addModalStateType = {
  name_input: string,
  grams_input: string,
  cal_input: string
}

export type addModalStateTypeNames = 'name_input' | 'grams_input' | 'cal_input'

export type AddModalProps = {
  modalVisible: boolean, 
  setModalVisible: Dispatch<SetStateAction<boolean>>
  addMeal: (meal: MealType) => void|'error'
}

export type ListProps = {
  delMode?: boolean,
  list: MealType[],
  addMeal: (meal: MealType) => void,
  setMeals: Dispatch<SetStateAction<MealType[]>>,
  removeMeal: (id: string) => void
}

export type ConsumedContextProps = {
  meals: MealType[]|null|undefined,
  addMeal: (meal: MealType) => void,
  setMeals: Dispatch<SetStateAction<MealType[]>>,
  removeMeal: (id: string) => void
}

