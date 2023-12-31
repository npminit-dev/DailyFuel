import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListProps } from "../../types/types";
import Meal from "../Meal";
import uuid from 'react-native-uuid';
import { useContext } from "react";
import { ConsumedContext } from "../contexts/ConsumedContext";

export default function List({ delMode, list, removeMeal, addMeal, setStatusProps }: ListProps) {

  const { addMeal: addConsumedMeal, meals } = useContext(ConsumedContext)

  return (
    <View>
      <ScrollView>
      { 
      list.map(elem => {
        return (
          <Meal {...elem} 
            delMode={delMode} 
            addMeal={delMode ? addMeal : addConsumedMeal} 
            removeMeal={delMode ? removeMeal : undefined}
            key={uuid.v4() + ''}  
            setStatusProps={setStatusProps}
          ></Meal>
        )
      })
      }
      </ScrollView>
    </View> 
  )
}

let styles = StyleSheet.create({

})