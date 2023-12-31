import Home from "../components/Home/Home";
import MealList from "../components/MealList/MealList";
import ConsumedContextProvider from "../components/contexts/ConsumedContext";
import useFonts from "../hooks&tools/useFonts";

export default function Page(): JSX.Element {
  const [loaded] = useFonts()

  return (
    loaded ? 
      <Home></Home>
    : <></>
  );
}

