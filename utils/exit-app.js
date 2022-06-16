import { useNetInfo } from '@react-native-community/netinfo';
import { Alert, BackHandler } from 'react-native'

const ExitApp = () => {
    const NetInfo = useNetInfo();
    if (NetInfo.isConnected){
        return Alert.alert(
          'No Internet Connection',
          'You require an internet connection to use this application',
          [{text: 'Okay', onPress: () => BackHandler.exitApp()}],
        )
    }
    console.log(NetInfo.isConnected);
    return;
}

export default ExitApp;