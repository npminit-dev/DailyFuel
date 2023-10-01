import Meals from "../components/MealList/MealList";
import ConsumedContextProvider from "../components/contexts/ConsumedContext";
import useFonts from "../hooks&tools/useFonts";

export default function Page(): JSX.Element {
  const [loaded] = useFonts()

  return (
    loaded ? 
      <Meals></Meals> 
    : <></>
  )
}