import CircularProgress from "react-native-circular-progress-indicator";
import { ProgressProps } from "../../types/types";
import { View, Text, StyleSheet } from "react-native";

const strokeColorConfig = [
  { color: '#666', value: 15 },
  { color: '#9A54B0', value: 40 },
  { color: '#4CAF50', value: 75 },
  { color: '#367D38', value: 100 },
]

export default function Progress({ cals, consumed }: ProgressProps) {

  return <>
    <View style={st.progressbox}>
      <View style={st.graphbox}>
        <CircularProgress
          title="Completed"
          initialValue={0}
          value={(consumed / cals) * 100 || 0}
          valueSuffix="%"
          titleStyle={st.graphtitle}
          progressValueColor="#333"
          activeStrokeWidth={6}
          strokeColorConfig={strokeColorConfig}
          inActiveStrokeColor="#ccc"
          inActiveStrokeWidth={10}
          radius={65}
        ></CircularProgress>
      </View>
      <View style={st.databox}>
        <Text style={st.datatarget}>Target: { cals } Cals.</Text>
        <Text style={st.dataconsumed}>Eaten: { consumed } Cals.</Text>
      </View>
    </View>
  </>
}

const st = StyleSheet.create({
  progressbox: {
    height: 150,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  graphbox: {
    padding: 5,
  },
  graphtitle: {
    fontFamily: 'Nunito-Sans-EL',
    letterSpacing: .1,
    color: '#333'
  },
  databox: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#aaa'
  },
  datatarget: {
    fontFamily: 'Nunito-Sans-EL',
    letterSpacing: .1,
    fontSize: 16
  },
  dataconsumed: {
    fontFamily: 'Nunito-Sans-EL',
    letterSpacing: .1,
    fontSize: 16,
  }
  
})