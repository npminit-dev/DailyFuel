import { createContext } from "react";
import useMealList from "../../hooks&tools/useMealList";
import { ConsumedContextProps } from "../../types/types";

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

