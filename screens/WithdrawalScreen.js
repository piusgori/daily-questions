import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Bar } from 'react-native-progress';
import WebView from 'react-native-webview';



const WithdrawalScreen = () => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View style={styles.rootContainer}>
        {!isLoaded && <Bar borderWidth={0} borderRadius={0} color='purple' progress={progress} width={null}></Bar>}
        <WebView 
            style={styles.view}
            onLoadEnd={() => {setIsLoaded(true)}}
            onLoadProgress={(event) => {setProgress(event.nativeEvent.progress)}}
            source={{uri: 'https://www.paypal.com/myaccount/transfer/homepage/request'}}
        ></WebView>
    </View>
  )
}

export default WithdrawalScreen;

const styles =  StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    view: {
        flex: 1,
    }
})