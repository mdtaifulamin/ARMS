import { View,Text, Pressable, StyleSheet,TouchableOpacity } from "react-native";
import { useRef } from "react";
import * as Animateble from 'react-native-animatable';
import { GlobalStyles } from "./constants/styles";

export default function PrimaryButton({children,onPress}){
    const flashAnimRef= useRef();
    
    
    return(
       
       <Animateble.View ref={flashAnimRef}>

                <TouchableOpacity 
                    style={[styles.buttonInnerContainer,{backgroundColor:GlobalStyles.colors.primaryButtonColor}]}
                    onPress={()=>{flashAnimRef.current.pulse(800);onPress()}} 
                 >
                    <Text style={styles.buttonText}> {children}</Text>
                </TouchableOpacity>
        </Animateble.View>
                
        

    )
}

export  function SeconderyButton({children,onPress}){
    const flashAnimRef= useRef();
    
    
    return(
       
       <Animateble.View ref={flashAnimRef}>

                <TouchableOpacity 
                    style={[styles.SeconderyButtonbuttonInnerContainer,{backgroundColor:GlobalStyles.colors.primaryButtonColor}]}
                    onPress={()=>{flashAnimRef.current.pulse(800);onPress()}} 
                 >
                    <Text style={styles.buttonText}> {children}</Text>
                </TouchableOpacity>
        </Animateble.View>
                
        

    )
}


const styles= StyleSheet.create({
    
    buttonInnerContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:4,
        elevation:5,
        shadowColor:'#000',
        marginHorizontal:5,
        width:150,
        height:150,
        borderRadius:75,
        justifyContent:'center'


    },
    SeconderyButtonbuttonInnerContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:4,
        elevation:5,
        shadowColor:'#000',
        marginHorizontal:15,
        borderRadius:5,
        justifyContent:'center'


    },
    buttonText:{
        fontWeight:'900',
        textAlign:'center',
        color:'white',
        fontSize:20,
    }
})

