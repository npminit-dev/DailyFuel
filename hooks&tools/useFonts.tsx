import { loadAsync } from "expo-font";
import { useState } from "react";

export default function useFonts() {
  const [loaded, setLoaded] = useState<boolean>(false)

  Promise.all([
    loadAsync('Nunito-Sans-EL', require('../assets/fonts/nunito/static/NunitoSans_7pt-ExtraLight.ttf')),
    loadAsync('Nunito-Sans-M', require('../assets/fonts/nunito/static/NunitoSans_7pt-Medium.ttf')),
    loadAsync('Nunito-Sans-SB', require('../assets/fonts/nunito/static/NunitoSans_7pt-SemiBold.ttf' ))
  ])
  .then(() => setLoaded(true))
  .catch(err => console.log('Error en la carga de fuentes: ' + err))

  return [loaded]
}