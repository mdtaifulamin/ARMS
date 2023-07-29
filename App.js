
import { TextInput, View,Text, StyleSheet, ScrollView ,StatusBar, Modal, Pressable, FlatList, Dimensions, TouchableOpacity} from "react-native";
//import { GlobalStyles } from "./constants/styles";
import { useEffect, useState } from "react";
import PrimaryButton, { SeconderyButton } from "./PrimaryButtons"
import { useRef } from "react";
import * as Animateble from 'react-native-animatable';
import { StoreData } from "./data-storing";
import axios from "axios";

const screen_width = Dimensions.get('screen').width
const screen_height = Dimensions.get('screen').height

function Input({label,style,textInputConfig,invalid}) {

    const inputStyles=[styles.input];

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    };
    if (invalid) {
        inputStyles.push(styles.invalidinput)
    };
    
    return (    
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label,invalid && styles.invalidlabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
            )
}



export default function App() {

  const [qms_data, setQms_data] = useState([]);
  const getQmsData = async() => {
    const res = await axios.get("http://172.26.48.11:3000/api/getDatafromPostgres");
    setQms_data(eval(res.data));
  }

  useEffect(() => {
   getQmsData();
    
  }, [])

  
  const [modalisVisible,setModalisVisible]=useState(false)
  const [rmodalisVisible,setrModalisVisible]=useState(false)
  const data = [
    { id: 211, title: "Shade in Garment" },
    { id: 221, title: "Dirty Spot" },
    { id: 222, title: "Oil Spot" },
    { id: 224, title: "Pen Mark" },
    { id: 226, title: "Rust/Stain" },
    { id: 231, title: "Thick and Thin/Lycra Out" },
    { id: 232, title: "Slub" },
    { id: 233, title: "Yarn Contamination/PP/Fly" },
    { id: 234, title: "Fabric Hole" },
    { id: 237, title: "Needle Mark" },
    { id: 238, title: "Bowing" },
    { id: 311, title: "Missing Stitches" },
    { id: 312, title: "Broken Stitches" },
    { id: 313, title: "Wrong (SPI)" },
    { id: 314, title: "No Tack/No Backstitch" },
    { id: 315, title: "Slanted" },
    { id: 316, title: "Wrong Tension (Loose/Tight)" },
    { id: 317, title: "Skipped/Drop Stitch" },
    { id: 318, title: "Over Stitch" },
    { id: 319, title: "Contrast Thread Visible" },
    { id: 320, title: "Wrong Position" },
    { id: 321, title: "Roping" },
    { id: 326, title: "Needle Cut/Hole/Damage" },
    { id: 327, title: "Pleat" },
    { id: 328, title: "Raw Edge (Uneven)" },
    { id: 331, title: "Twisting" },
    { id: 332, title: "Puckering" },
    { id: 334, title: "Label Mistake" },
    { id: 335, title: "Unbalanced/Uneven Seams/Talpart" },
    { id: 336, title: "Open Seam" },
    { id: 337, title: "Cracking" },
    { id: 338, title: "Shining Mark" },
    { id: 339, title: "Seam Reverse" },
    { id: 343, title: "Uneven (Tape,Piping,Rib-Collar/Cuff)" },
    { id: 347, title: "Gathering (Bias/Uneven)" },
    { id: 355, title: "Poor Shape" },
    { id: 361, title: "Button/Snap/Zipper/Eyelet Not Functioning" },
    { id: 363, title: "Wrong Trims Position (Buttons, Snaps, Rivets, Eyelet)" },
    { id: 364, title: "Not Aligned (Buttons, Snaps, Rivets, Eyelet)" },
    { id: 365, title: "Wrong Placement/Spacing/Off Centered (Label, Buttons, Snaps)" },
    { id: 366, title: "Reverse Attach (All Label, Tape, Collar, Cuff, Button)" },
    { id: 367, title: "Button Half Stitch" },
    { id: 371, title: "Wrong Material" },
    { id: 381, title: "Trims Missing" },
    { id: 383, title: "Wrong Information in Trims (Care, Main, Size, Country, Security)" },
    { id: 384, title: "Poor Quality Trims (Care, Main, Size, Country, Security)" },
    { id: 392, title: "Stripes Not Matching" },
    { id: 401, title: "Uncut Thread" },
    { id: 405, title: "Sticker in the Garments" },
    { id: 408, title: "Wavy Stitch (Armhole + Neck Top Stitch + Sleeve + Bottom + Cuff)" },
    { id: 409, title: "Bias Grainline (Tape, Neck Binding, Side Slit)" }
  ];
  
  
 
  const DefectsItem = ({ item }) => {
    const  handleDefectPress = async() => {
      setModalisVisible(false);
      // setInputs((prevInputs) => ({
      //   ...prevInputs,
      //   [item.id]: 1,
      // }));
      const data= {...convertedInputs,[item.id]: 1,}
      await StoreData(data)      
    };
    
    return (
      <TouchableOpacity onPress={handleDefectPress}>
        <View style={styles.defectsInnerContainer}>
          <Text style={styles.defectsText}> {item.title} </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  const [inputs,setInputs]= useState({
    date: new Date(),
    lineNumber:0,
    buyerName:'',    
    styleName:'',
    SO:0,
    defectQuantity:0,                       
    rejectQuatity:0,
    production:0,      
  }); 

  function inputChangeHandler(inputIdentifier,enteredValue) {
    setInputs((curInputs)=>{
      return{
         ...curInputs,
         [inputIdentifier]: enteredValue}
        })
  };
  const convertedInputs ={
    date: inputs.date,
    lineNumber:+inputs.lineNumber,
    buyerName:inputs.buyerName,    
    styleName:inputs.styleName,
    SO:+inputs.SO,
    defectQuantity:+inputs.defectQuantity,                       
    rejectQuatity:+inputs.rejectQuatity,
    production:+inputs.production,
  }
  function defectsHandler(){
  //  const d=inputs.defectQuantity+1;
  //  inputChangeHandler("defectQuantity",d)
  setModalisVisible(true)
  }

  async function  rejectsHandler(){
    setrModalisVisible(true)
    //inputChangeHandler("rejectQuatity",r)
  }
  async function  rejectsSubmitHandler(){
    setrModalisVisible(false)
    //inputChangeHandler("rejectQuatity",r)
    await StoreData(convertedInputs)
    inputChangeHandler("rejectQuatity",0)
  }

  const today= new Date();
  return (
    <>       
      <View style={styles.container}>
          <View style={[styles.inputTitleBackgroundContainer , {opacity:rmodalisVisible?0.3:1}]}>
            <Text style={styles.inputTitleText}> QMS </Text>
          </View>
        <ScrollView style={{flex:10,opacity:rmodalisVisible?0.3:1}}>
          <View style={{flex:7}}>            
            <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'flex-end',padding:'1%',marginTop:2,flex:1,marginLeft:screen_width*0.7,borderTopLeftRadius:8,borderBottomLeftRadius:8}}>
              <Text style={{fontSize:10,fontWeight:'bold'}}> Date: {today.toLocaleDateString()} </Text>
            </View>
            <View style={{flex:6,margin:10}}>
              <Input label={'Line: '+qms_data[0]?.line} 
                textInputConfig={{
                  keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'lineNumber'),
                  value: inputs.lineNumber.toString(),
                }}/>
              <Input label={'Buyer Name'} 
                textInputConfig={{
                  //keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'buyerName'),
                  value: inputs.buyerName.toString(),
                }}/>
              <Input label={'Style Name'} 
                textInputConfig={{
                  //keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'styleName'),
                  value: inputs.styleName.toString(),
                }}/>
                <Input label={'SO'} 
                textInputConfig={{
                  keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'SO'),
                  value: inputs.SO.toString(),
                }}/>
              {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'4%',marginHorizontal:'4%',marginTop:10}}>
                <View style={{width:'40%',justifyContent:'center',alignItems:'center',backgroundColor:'white',padding:'4%',borderRadius:10,marginHorizontal:'4%'}}>
                  <Text>DEFECTS </Text>
                  <Text> {inputs.defectQuantity}</Text>
                </View>
                <View style={{width:'40%',justifyContent:'center',alignItems:'center',backgroundColor:'white',padding:'4%',borderRadius:10,marginHorizontal:'4%'}}>
                  <Text>Rejects : </Text>
                  <Text>{inputs.rejectQuatity}</Text>
                </View>
              </View> */}
            </View>
          </View> 
          
          <View style={styles.primaryButtonContainer}>      
            <PrimaryButton onPress={defectsHandler}>Defects</PrimaryButton>
            <PrimaryButton onPress={rejectsHandler}>Rejects</PrimaryButton>      
          </View>
        </ScrollView>
        
      </View>     
        <View style={{justifyContent:'center',alignItems:'center',}}>
          <Modal
            animationType="slide"
            //transparent={true}
            presentationStyle="modal"
            visible={modalisVisible}
            onRequestClose={()=>{
              setModalisVisible(!modalisVisible)
            }}>
            <View style={styles.modal1Container}> 
              <View style={styles.modal1TitleContainer}>
                <Text style={styles.modal1TitleText}> DEFECT TYPES </Text>
              </View>         
              <FlatList
                style={{}} 
                data={data}
                renderItem={DefectsItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
              
                />
            </View>
          </Modal>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',}}>
          <Modal
            animationType='slide'
            transparent={true}
            //presentationStyle="modal"
            visible={rmodalisVisible}
            onRequestClose={()=>{
              setModalisVisible(!rmodalisVisible)
            }}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',}}> 
              <View style={styles.modal2Container}>
                <View style={styles.modal2TitleContainer}>
                  <Text style={styles.modal2TitleText}> Rejection Quantity </Text>
                </View>
                  <View style={{maxWidth:screen_width,justifyContent:'center',alignItems:'center',}}>
                    <Input label={'Insert Reject Quantity'} 
                      textInputConfig={{
                        keyboardType:'decimal-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'rejectQuatity'),
                        value: inputs.rejectQuatity.toString(),
                      }}/>
                  </View>
                  <View style={styles.modal2ButtonContainer}>
                    <SeconderyButton onPress={rejectsSubmitHandler}>Submit</SeconderyButton>
                    <SeconderyButton onPress={()=>{setrModalisVisible(false)}}>Cancel</SeconderyButton>
                  </View>
              </View>         
            </View>
          </Modal>
        </View>
        <StatusBar style="auto" />
    </>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex:10,
    backgroundColor:GlobalStyles.colors.manageProductionInformationBackground
  },
  inputTitleBackgroundContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    justifyContent:'center',
    alignItems:'center',
    padding:screen_height*.02,
    //margin:10,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    elevation:10,
  },
  inputTitleText:{
    fontSize:30,
    fontWeight:'bold',
    color:GlobalStyles.colors.titleText,
  },
  defectsInnerContainer:{
    elevation:5,
    shadowColor:'#000',
    padding: 16 ,
    flex:1,
    margin:screen_width*.015,
    minWidth:screen_width*.40,
    maxWidth:screen_width*.40,
    minHeight:screen_height*.09,
    maxHeight:screen_height*.09,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyles.colors.defectsBackground,
  },
  primaryButtonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flex:3,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    backgroundColor:'white',
    elevation:10,
    paddingBottom:'60%',
    paddingTop:"10%",
    marginTop:screen_height*0.05
  },
  defectsText:{
      fontWeight:'bold',
      textAlign:'center',
      color:GlobalStyles.colors.textcolor,
      fontSize:11, 
  },
  inputContainer:{
      marginHorizontal:4,
      marginVertical:8,
  },
  label:{
      fontSize:12,
      color:GlobalStyles.colors.textcolor,
      marginBottom: 4
  },
  input:{
      backgroundColor:GlobalStyles.colors.inputBackgroundColor,
      padding:11,
      borderRadius:10,
      fontSize:18,
      color:GlobalStyles.colors.textcolor,
      elevation:2,
      borderWidth:.4,
      borderColor:'white',
  },
  inputMultiline:{
      minHeight:100,
      textAlignVertical:'top',
  },
  invalidlabel:{
     // color: 'red'
  },
  invalidinput:{
       borderWidth:1,
       borderColor:GlobalStyles.colors.error50
  },
  modal1Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyles.colors.manageProductionInformationBackground
  },
  modal1TitleContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    paddingHorizontal:screen_width*.28,
    paddingVertical:screen_width*.05,
    margin:10,
    elevation:10,
  },
  modal1TitleText:{
    fontSize:screen_width*.05,
    color:GlobalStyles.colors.titleText
  },
  modal2Container:{
    backgroundColor:'white',
    paddingHorizontal:screen_width*.04,
    paddingVertical:screen_height*.02,
    elevation:10,
    marginHorizontal:screen_width*0.02,
    borderRadius:20,elevation:30
  },
  modal2ButtonContainer:{
    flexDirection:'row',
    marginTop:screen_height*0.05,
    alignContent:'center',
    justifyContent:'center',
  },
  modal2TitleContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    elevation:2,
    borderRadius:10,
    marginBottom:screen_height*0.05,
    paddingVertical:8,
    width:screen_width*0.8,
    justifyContent:'center',
    alignItems:'center'},
  modal2TitleText:{
    fontSize:screen_width*.05,
    color:GlobalStyles.colors.titleText
  },
})


