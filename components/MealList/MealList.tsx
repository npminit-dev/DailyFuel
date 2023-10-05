import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons'
import { Button } from '@rneui/themed'
import { Link } from 'expo-router'
import useMealList from '../../hooks&tools/useMealList'
import { useState } from 'react'
import AddModal from './AddModal'
import { ScrollView } from 'react-native-gesture-handler'
import List from '../Home/List'
import Search from './Search'

export default function MealList(): JSX.Element {
  const [meals, addSelectableMeal, setMeals, removeMeal, setToAsyncStorage] = useMealList({});
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  return (
    <>
      <StatusBar></StatusBar>
      <View style={styles.addmealbox}>
        <View style={styles.addmealhead}>
          <Link href="/" asChild style={styles.addmealback}>
            <Ionicon name="arrow-back" size={18}>
              <Text style={styles.addmealbacktext}>Back</Text>
            </Ionicon>
          </Link>
          <Button radius={10} color={"#86FC8A"} onPress={() => setModalVisible(true)}>
            <Text style={styles.addmeallegend}>ADD NEW</Text>
          </Button>
        </View>
        <Search meals={meals} setMeals={setMeals} setToAsyncStorage={setToAsyncStorage}></Search>
        <ScrollView>
          <View style={styles.mealsbox}>
            <List list={meals || []} setMeals={setMeals} removeMeal={removeMeal} addMeal={addSelectableMeal}></List>
          </View>
        </ScrollView>
        <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} addMeal={addSelectableMeal}></AddModal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  addmealbox: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  addmealhead: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 5
  },
  addmealback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addmealbacktext: {
    fontFamily: 'Nunito-Sans-M',
  },
  addmeallegend: {
    fontFamily: 'Nunito-Sans-M',
    fontSize: 16,
  },
  mealsbox: {
    flex: 1
  }
})
