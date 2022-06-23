import NetInfo from '@react-native-community/netinfo';
import { Alert, BackHandler } from 'react-native'

const ExitApp = () => {
    NetInfo.fetch().then(state => {
        if(state.isConnected){
            return;
        } else {
            return Alert.alert(
                'No Internet Connection',
                'You require an internet connection to use this application',
                [{text: 'Okay', onPress: () => BackHandler.exitApp()}],
              )
        }
    })
}

export default ExitApp;