import axios from "axios";
import { Alert } from "react-native";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { captureScreen } from 'react-native-view-shot'
import { useState } from "react";
import * as FileSystem from 'expo-file-system'

// const [screenshot, setScreenshot] = useState<string | null>(null)

// const handleScreenshot = () => {
//   captureScreen({ format: 'png', quality: 0.7 })
//     .then(uri => setScreenshot(uri))
//     .catch(err => console.error(err))
// }




const handleError = async (error: Error, isFatal: boolean) => {
  console.log(error, isFatal);

  var screenshot = ''
  // handleScreenshot()
  await captureScreen({ format: 'png', quality: 0.7 })
    .then(uri => screenshot = uri)
    .catch(err => console.error(err))
  const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

  await axios.post('http://localhost:3333/api/report', {
    "application": "CMP",
    "user_id": "1001",
    "user_cnpj": "00000000000",
    "is_connected_internet": true,
    "has_connection_internet": false,
    "error_message": error.name.concat(` ${error.message}`),
    "error_cause": error.cause,
    "error_stack": error.stack,
    "status_code": 404,
    "screenshot": `data:image/png;base64,${screenshotBase64}`,
    "comment": `IsFatal: ${isFatal}`
  }).then(
    () => console.log('FOI ENVIADO')
  )

  // Alert.alert(
  //   'Unexpected error occured',
  //   `Error: ${(isFatal) ? 'Fatal: ' : ''} ${error.name} ${error.message}
      
  //     We have reported this to our team! Please close the app and start again!
  //     `,
  // );

}

setJSExceptionHandler((error, isFatal) => {
  handleError(error, isFatal)
  // Fetch some api errors servers
}, true)

  // setNativeExceptionHandler(errorString => {
  //     // Do the things

  // })
