import React,{ useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import * as firebase from "firebase";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {LogInUser} from "../../store/actions/AuthAction";

try {
    if(firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyAccUzXFqsg9pzNQNzxxJaop_0q37WjggU",
        authDomain: "mi-store-app-clone-dev.firebaseapp.com",
        databaseURL: "https://mi-store-app-clone-dev-default-rtdb.firebaseio.com",
        projectId: "mi-store-app-clone-dev",
        storageBucket: "mi-store-app-clone-dev.appspot.com",
        messagingSenderId: "166699803706",
        appId: "1:166699803706:web:3219274105505093580103",
      });
    } else {
      console.log('App Already Exist in Firebase');
    }
  } catch (err) {
    console.log('initialise', err);
  }

const OtpScreen = ({ navigation, route }) => {
  const verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber;
  const [otp, setOtp] = useState('');
  const textInput = useRef(null);
  const displayPhoneNumber = '+91 ' + phoneNumber;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      textInput.current.focus();
    }, 1000);
  },[]);

  const confirmCode = async () => {
    setIsLoading(true);
    const credential = await firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    console.log(' Doing authentication OTP...');
    const beforeAuthOTP = new Date();
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here
        const afterAuthOTP = new Date();
        console.log('Time for OTP Auth Res =>', Math.floor((afterAuthOTP - beforeAuthOTP) / 1000), 's');
        console.log('res =>', result);
        setIsLoading(false);
        dispatch(LogInUser(phoneNumber)).then((res) => {
          const afterLogin = new Date();
          console.log('Time for Login Res => ', Math.floor((afterAuthOTP - afterLogin) / 1000), 's');
          savePhone(phoneNumber);
          navigation.replace('Home');
        }).catch((e) => {
          console.log('error =>', e);
          const afterLogin = new Date();
          console.log('Time for Taking to Signup Res => ', Math.floor((afterAuthOTP - afterLogin) / 1000), 's');
          if(e === 404) {
            navigation.replace('Signup', {
              phoneNumber: phoneNumber
            });
          } else {
            Alert.alert('Unable To Login , Please Try again');
            navigation.replace('Phone');
          }
        });
      }).catch((e) => {
        console.log('error =>', e);
        Alert.alert('Unable to Verify OTP');
        setIsLoading(false);
      });
  }

  const savePhone = async (phone) => {
    await AsyncStorage.setItem('phoneNumber', phone);
  }

  const getButton = () => {
    if(isLoading) {
      return (
        <View style={styles.disabledLoginButton}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      );
    } else if(otp.length === 6) {
      return (
        <TouchableOpacity onPress={confirmCode}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>VERIFY</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.disabledLoginButton}>
        <Text style={styles.loginButtonText}>ENTER OTP</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>VERIFY OTP</Text>
      </View>
      <View style={[styles.loginTextContainer, { marginTop: hp(0.5) }]}>
        <Text style={styles.enterPhoneText}>
          Enter OTP sent to {displayPhoneNumber}
        </Text>
      </View>
      <View style={styles.otpContainer}>
        <TextInput
          ref={textInput}
          onChangeText={setOtp}
          style={{
            width: wp(50),
            fontSize: normalize(16),
          }}
          value={otp}
          maxLength={6}
          keyboardType="numeric"
        />
      </View>
      {getButton()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: isANDROID ? 30 : 0,
    },
    loginTextContainer: {
      marginTop: hp(2),
      paddingHorizontal: wp(5)
    },
    loginText: {
      fontFamily: 'Proxima-Bold',
      fontSize: 20,
    },
    enterPhoneText: {
      fontFamily: 'Proxima-Regular',
      fontSize: 14,
    },
    containerInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp(2),
    },
    cellView: {
      paddingVertical: hp(1),
      width: wp(9),
      margin: hp(1),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1.5,
      borderBottomColor: color.black,
    },
    cellText: {
      textAlign: 'center',
      fontFamily: 'Proxima-Regular',
      fontSize: 18,
    },
    loginButton: {
      width: wp(90),
      height: 50,
      backgroundColor: color.swiggy,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: hp(4),
    },
    loginButtonText: {
      fontFamily: 'Proxima-Bold',
      fontSize: 16,
      color: color.white
    },
    disabledLoginButton: {
      width: wp(90),
      height: 50,
      backgroundColor: '#fed9bc',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: hp(4),
    },
    otpContainer: { 
      marginTop: hp(2), 
      marginHorizontal: wp(10),
      borderBottomColor: color.swiggy, 
      borderBottomWidth: hp(0.1), 
      paddingVertical: hp(1) 
    },
})

export default OtpScreen;