import { Image } from "@rneui/base";
import { View, Text, StyleSheet } from "react-native";
import { HeadProps } from "../../types/types";

export default function Header({ name, legend }: HeadProps): JSX.Element {
  return (
    <View style={styles.userdatabox}>
      <View style={styles.usertxtbox}>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.userlegend}>{legend}</Text>
      </View>
      <View style={styles.avatarbox}>
        <Image
          source={require("../../assets/images/userphoto.png")}
          style={styles.avatarimg}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userdatabox: {
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1
  },
  usertxtbox: {
    height: '100%',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  username: {
    fontFamily: 'Nunito-Sans-SB',
    fontSize: 18
  },
  userlegend: {
    fontFamily: 'Nunito-Sans-M',
    color: 'grey'
  },
  avatarbox: {
    height: 50,
    width: 50,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333'
  },
  avatarimg: {
    height: '100%',
    width: '100%'
  },
})