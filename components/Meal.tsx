import { View, Text, StyleSheet } from "react-native";
import { MealType } from "../types/types";
import Ionicon from '@expo/vector-icons/Ionicons';
import { Card } from "@rneui/base";
import { format } from "date-fns";
import uuid from 'react-native-uuid';

export default function Meal({ name, grams, cal, delMode, id, removeMeal, addMeal, setStatusProps }: MealType): JSX.Element {

  return (
    <Card containerStyle={styles.cardcontainer} wrapperStyle={styles.cardwrapper}>
      <Card.Title style={styles.cardtitlebox}>
        <Text style={styles.cardtitle}>{ name }</Text>
      </Card.Title>
      <View style={styles.carddatabox}>
        <View style={styles.cardtextbox}>
          <Text style={styles.cardgr}>{ grams } Grams</Text>
          <Text style={styles.cardcal}>{ cal } Calories</Text>
        </View>
        {
        delMode ? 
        <Ionicon name='remove-circle-outline'
          style={styles.cardicon}
          color={'red'}
          size={35}
          onPress={() => {
            removeMeal && removeMeal(id as string)
            setStatusProps && setStatusProps({ message: `Meal "${name}" removed successfully`, statusType: 'notify' })
          }}
        ></Ionicon> : 
        <Ionicon name='add-circle-outline'
          style={styles.cardicon}
          color={'green'}
          size={35}
          onPress={() => {
            if(addMeal) addMeal({ name, grams, cal, id: uuid.v4() + '', date: format(new Date(Date.now()), 'dd-MM-uuuu')})
            setStatusProps && setStatusProps({ message: `Meal "${name}" added successfully`, statusType: 'ok' })
          }}
        ></Ionicon>
        }
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardcontainer: {
    flex: 1,
    padding: 2,
    margin: 2,
    marginVertical: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#216323',
    backgroundColor: '#4CAF50',
    borderRadius: 4
  },
  cardwrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    height: '100%'
  },
  cardtitlebox: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginBottom: 0
  },
  carddatabox: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  cardtextbox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardtitle: {
    fontFamily: 'Nunito-Sans-SB'
  },
  cardgr: {
    fontFamily: 'Nunito-Sans-M'
  },
  cardcal: {
    fontFamily: 'Nunito-Sans-M'
  },
  cardicon: {
    height: 35,
    width: 35
  }
})