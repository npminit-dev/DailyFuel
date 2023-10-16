import { createContext, useEffect } from "react";
import useMealList, { TODAY_MEALS_KEY } from "../../hooks&tools/useMealList";
import { ConsumedContextProps } from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* RECORDAR QUE EXPO-ROUTER ELIMINA EL CONTEXTO EN EL ARCHIVO node_modules/expo-router/app.tsx!!! 
  ESO NO DEBERIA PASAR EN PRODUCCION
*/

export const ConsumedContext = createContext<ConsumedContextProps>({
  meals: [],
  addMeal: () => {},
  setMeals: () => {},
  removeMeal: () => {}
})

export default function ConsumedContextProvider({ children }: {children: JSX.Element}) {
  const [meals, addMeal, setMeals, removeMeal] = useMealList({ consumed : true})

  return <ConsumedContext.Provider
    value={{
      meals,
      addMeal,
      setMeals,
      removeMeal
    }}
  >
    { children}
  </ConsumedContext.Provider>
}

