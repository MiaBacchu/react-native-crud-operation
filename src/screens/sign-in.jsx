//import liraries
import React ,{useState} from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Button from '../components/button';
import Input from '../components/input';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../App';

// create a component
const SignIn = ({navigation}) => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const Login=()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log(user)
        })
        .catch((error) => {
         console.log(error)
        });
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.image} source={require('../../image/computer-g7f9a7731f_1920.jpg')}
        />
        <Text style={styles.text}>Never Forget Yours Note</Text>
        <Input onChangeText={(text)=>setEmail(text)} placeholder='Enter Your Email'></Input>
        <Input onChangeText={(text)=>setPassword(text)} placeholder='Password' secureTextEntry></Input>
        <View style={{marginTop:150,alignSelf:'center',justifyContent:'flex-end'}}>
        <Button onPress={Login} title={"Login"}/>
        </View>
        <View style={styles.signUp}>
        <Pressable onPress={()=>{navigation.navigate('SignUp')}}>
            <Text>Don't have an account? <Text style={{color:'green'}}>Sign Up</Text></Text>
        </Pressable>
        </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    image: {
        width:'100%',
        height:200,
        alignSelf: 'center',
        marginTop:40
    },
    text:{
        alignSelf:'center',
        fontSize:25,
        marginTop:15
    },
    input:{
        marginTop:40,
        marginHorizontal:5,
        paddingVertical:7,
        paddingHorizontal:7,
        borderEndColor:'gray',
        borderWidth:1,
        borderRadius:5
    },
    signUp:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:25
    }
});

//make this component available to the app
export default SignIn;
