import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import React, { useContext } from 'react';
import { baseStyles } from '../utils/styles';
import Title from '../components/Title';
import { AuthenticationContext } from '../services/authentication/authentication-context';


const ProfileScreen = ({ navigation }) => {

    const authenticationContext = useContext(AuthenticationContext);
    const { user, updateUser } = authenticationContext;

    const webViewNavigationHandler = () => {
        const { email, id, name, token } = user;
        const updateUserWithoutPoints = { name, email, id, token, points: 0, questionsAnswered: []};
        navigation.navigate('RequestWithdrawal');
        updateUser(id, updateUserWithoutPoints);
    }

    const withdrawalRequestHandler = () => {
        if(user.points < 5000){
            return Alert.alert('Insufficient Points', 'Your points are not enough for withdrawal. You must reach 10000 points in order to withdraw cash!');
        }
        Alert.alert(
            'Caution',
            'You are about to make a withdrawal request. Once you accept your points will be reset. You can cancel if you want to continue gaining',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Proceed', onPress: webViewNavigationHandler}
            ],
            {cancelable: true}
        )
    }

  return (
    <View style={styles.rootContainer}>
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249__340.png'}}></Image>
                </View>
                <View style={styles.detailsContainer}>
                    <Title style={styles.detailsText}>{user.name}</Title>
                    <Title style={styles.detailsText}>{user.email}</Title>
                    <Pressable onPress={() => {navigation.navigate('EditProfile')}} android_ripple={{color: '#ccc'}} style={styles.button}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomEachView}>
                    <Title style={styles.detailsText}>Questions Answered</Title>
                    <Text style={styles.text}>{user.questionsAnswered?.length || 0}</Text>
                </View>
                <View style={styles.bottomEachView}>
                    <Title style={styles.detailsText}>Current Points</Title>
                    <Text style={styles.text}>{user.points}</Text>
                </View>
                <View style={styles.bottomEachView}>
                    <Title style={styles.detailsText}>Points Worth</Title>
                    <Text style={styles.text}>${(user.points * 0.001).toFixed(3)}</Text>
                </View>
            </View>
            <Pressable onPress={withdrawalRequestHandler} android_ripple={{color: '#ccc'}} style={styles.button}>
                <Text style={styles.buttonText}>Request Withdrawal</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    bottomContainer: {
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomEachView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginVertical: 8,
        paddingVertical: 6,
        paddingHorizontal: 16,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: '#B3CDD8',
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'prata'
    },
    container: {
        backgroundColor: baseStyles.colors.white,
        paddingHorizontal: 36,
        paddingVertical: 24,
    },
    detailsContainer: {
        marginHorizontal: 12,
        flex: 1,
        justifyContent: 'center'
    },
    detailsText: {
        marginVertical: 2,
    },
    image: {
        flex: 1,
    },
    imageContainer: {
        height: 120,
        width: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginRight: 12,
    },
    rootContainer: {
        backgroundColor: baseStyles.colors.backgroundGrey,
        flex: 1,
    },
    text: {
        fontFamily: 'prata',
        fontSize: 16,
        marginVertical: 6,
    },
    topContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    }
})