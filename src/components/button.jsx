//import liraries
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// create a component
const Button = ({title,onPress,customStyle}) => {
    return (
        <Pressable style={[styles.button,customStyle]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    button: {
       borderRadius:30,
       width:165,
       height:45,
       backgroundColor:'#FFE600',
       justifyContent:'center',
       alignItems:'center'
    },
    title:{
        fontSize:16
    },
    color:{
        backgroundColor:'red'
    }
});

//make this component available to the app
export default Button;
