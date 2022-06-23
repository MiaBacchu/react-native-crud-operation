import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../../App';
import Button from '../components/button';
import Input from '../components/input';
import RadioButton from '../components/radito-button';

const colors=['red','blue','yellow']

const Create = ({navigation,user}) => {
    const [option,setOption]=useState();
    const [title,setTitle]=useState();
    const [description,setDescription]=useState();

    const AddToDb= async ()=>{
        try{
        await addDoc(collection(db, "notes",), {
            title:title,
            description: description,
            color:option,
            uid:user.uid
              });
        }
        catch(error){
            console.log(error)
        }
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Your Note</Text>
            <Input onChangeText={(text)=>setTitle(text)} placeholder={'Title'}/>
            <Input onChangeText={(text)=>setDescription(text)} customStyle={styles.description} multiline={true} placeholder={'Description'}/>
            {colors.map((color)=>{
                const selected=color===option;
                return(
                    <RadioButton key={color} selected={selected} onPress={()=>setOption(color)} option={color} customStyle={{flexDirection:'row',alignItems:'center',marginTop:20,marginLeft:20}}>
                </RadioButton>
                )
            })}
            <Button onPress={AddToDb} customStyle={styles.button} title={'Submit'}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
    },
    text:{
        fontSize:18,
        marginTop:30,
        alignSelf:'center'
    },
    button:{
        alignSelf:'center',
        marginTop:50
    },
    description:{
        height:200
    }
});

export default Create;
