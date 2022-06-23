//import liraries
import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Button from '../components/button';
import Input from '../components/input';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import { addDoc, collection, } from "firebase/firestore";
import RadioButton from '../components/radito-button';

    const genders=["Male","Female"];
    const SignUp = ({navigation}) => {
    const [option,setOption]=useState();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[age,setAge]=useState();
    
    const Signup= async ()=>{
      try{
        const result= await createUserWithEmailAndPassword(auth, email, password)
        const id=result.user.uid;
        await addDoc(collection(db, "users",), {
            name:name,
            age: age,
            email: email,
            id:id,
            gender:option
          });
      }
      catch(error){
        console.log(error)
      }
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <Input placeholder='Email' onChangeText={(text)=>setEmail(text)}></Input>
        <Input placeholder='Password' onChangeText={(text)=>setPassword(text)} secureTextEntry></Input>
        <Input placeholder='Full Name' onChangeText={(text)=>setAge(text)}></Input>
        <Input placeholder='Age' onChangeText={(text)=>setName(text)}></Input>
        <View>
            <Text style={{marginHorizontal:20,marginTop:30,fontSize:20}}>Select Gender</Text>
        </View>
        {genders.map((gender)=>{
            const selected=gender===option;
            return (
                <RadioButton key={gender} selected={selected} onPress={()=>setOption(gender)} option={gender} customStyle={{flexDirection:'row',alignItems:'center',marginTop:20,marginLeft:20}}>
                </RadioButton>
            )
})}
        <Button onPress={Signup} customStyle={{alignSelf:'center',marginTop:100}} title={"Sign Up"}/>
        <View style={styles.signUp}>
        <Pressable onPress={()=>{navigation.navigate('SignIn')}}>
            <Text>Already have an account? <Text style={{color:'green'}}>Sign In</Text></Text>
        </Pressable>
        </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    text:{
        alignSelf:'center',
        fontSize:25,
        marginTop:15
    },
    signUp:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:25
    },
    outerCircle:{
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:1,
        borderColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        marginRight:8
    },
    innerCircle:{
        width:16,
        height:16,
        borderRadius:8,
        borderWidth:1,
        borderColor:'gray'
    },
    name:{
        fontSize:20
    },
    selectedInnerCircle:{
        backgroundColor:'green',
        borderColor:'green'
    }
});

//make this component available to the app
export default SignUp;
