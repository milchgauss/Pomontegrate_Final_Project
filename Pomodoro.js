import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView, ImageBackground, Image,TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
 
/*
https://www.appsloveworld.com/solved-how-to-add-minutes-in-date-object-using-javascript/#:~:text=How%20to%20add%2020%20minutes%20to%20a%20current,%28%29%3B%20currentdate.setMinutes%20%28currentdate.getMinutes%20%28%29%20%2B%205%29%3B%20alert%20%28currentdate%29%3B?msclkid=db028d16b68b11ec99407b6fdc5af476
https://www.youtube.com/watch?v=RwlFyS1Rhew
https://www.youtube.com/watch?v=rcWx0eJb1gY

*/

export default function Pomodoro() {
   
    const[mainTimeSeconds,setMainTimeSeconds]=useState(1500);
    const[mainTimeMinutes,setMainTimeMinutes]=useState(25);
    const[displayedSeconds,setDisplayedTimeSeconds]=useState(0);
  
    const [isActive, setIsActive] = useState(false);
  
    const[breakVar,setBreakVar]=useState(0);
    const[breakMinutes,setBreakMinutes]=useState(5);
    const[longBreakMinutes,setLongBreak]=useState(25);
  
    const [breakTimerSeconds,setBreakTimeSeconds]=useState(5);
    const [breakTimeMinutes,setBreakTimeMinutes]=useState(5);
    const [displayedBreakSeconds,setBreakSeconds]=useState(0);
  
    const [breakTimerActive,setIsBreakTimerActive]=useState(false);

  
  
    const id=React.useRef(null)
  
    const resetTimer=()=>{
   
      console.log('Timer reset');
       setIsActive(false)
       setMainTimeMinutes(25)
       setDisplayedTimeSeconds(0) 
       setMainTimeSeconds(1500)
       setBreakVar(0)
       setBreakMinutes(5)
      
    }
  
    const restartTimer=()=>{
      setMainTimeSeconds(1500)
    }
  
   useEffect(()=>{
      let interval=null;
  
     if (isActive) {
       
        interval = setInterval(() => {
          setMainTimeSeconds(mainTimeSeconds => mainTimeSeconds - 1 );
        }, 1000);
        console.log(mainTimeSeconds)
        console.log(isActive)
      } 
      
      if (mainTimeSeconds <= 0) {
        clearInterval(interval);
        setMainTimeMinutes(0)
        setDisplayedTimeSeconds(0) 
        setBreakVar(breakVar+1)
  
        /**/
        if(breakVar%3===0 && breakVar>0){
          Alert.alert(`Take a break for ${longBreakMinutes} minutes!`)
        }
        else{
          Alert.alert(`Take a break for ${breakMinutes} minutes!`)}
       
      }
      
      return () => clearInterval(interval);
    }, [isActive, mainTimeSeconds]);
  
    const startTimer=()=>{  
      setIsActive(!isActive)
      /*
      setMainTimeMinutes(25)
      setDisplayedTimeSeconds(0)
      */ 
      setMainTimeSeconds(1500)
    
    }
  
    return (
   
      <SafeAreaView style={styles.container}>
        <View style={styles.headerstyle}>
        <Text style={styles.titles}>Pomodoro</Text>
        <View style={styles.infoicon}>   
            <Icon name="info" color="#FF2643" size={20}/>
            <Text style={styles.explanationtext}> "Start timer" starts a cycle for 25 minutes of focus.  
            {'\n'}
            {'\n'}
            Take a break for 5 minutes.
            {'\n'}
            {'\n'}
            Every 3 breaks, a rest of 25 minutes is suggested.
            {'\n'}
            {'\n'}
            Then, the cycle starts over.
            </Text>
        </View>
      
        </View>

        <View>
        <Text style={styles.maintimer}>
         
          { isActive ?`${Math.floor(mainTimeSeconds/60)} min ${Math.floor(mainTimeSeconds%60)} seconds`: '25 min 0 seconds'}
          </Text>
        </View>   
  
        <View>
        <Button title="Start Timer"
          onPress={() => startTimer()}
          color="#FF2643"
          >
          </Button> 
  
        <View>
        <Text style={styles.breakdescriptivetext}>{breakVar} break(s) taken</Text>
        </View>
  
          <Button title="Reset Timer"
          onPress={() => resetTimer()}
          color="#FF2643"
          >
          </Button>
          <View>
        <Text style={styles.explanationtext}>Reset your cycle by setting the time back to 25 mins and 0 secs. Breaks are also set to 0.</Text>
        </View> 
          </View>
          <StatusBar style="auto" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:'5%'
    },

    headerstyle: {
    flexDirection:'column',
    backgroundColor: '#fff',
    justifyContent:'flex-start'
    },
    infoicon: {

    flexDirection:'row',
    backgroundColor: '#fff',
    justifyContent:'flex-start'
    },

  titles: {
    fontSize:42,
    color:'#FF2643',
    fontWeight:'bold',
    padding:20,
    alignItems:'center',
    justifyContent: 'space-between'
    },

    maintimer:{
    color:'#FF2643',
    fontSize:34,
    margin:'10%'
    },
    
    breakdescriptivetext:{
    color:'#FF2643',
    fontSize:18,
    textAlign:'center',
    margin:'5%'
    },

    breaksuggestion:{
    color:'#FF2643',
    fontSize:24,
    textAlign:'center',
    marginBottom:'10%'
    },

    explanationtext:{
    color:'#FF2643',
    fontSize:14,
 
    },

    maintimer:{
    color:'#FF2643',
    fontSize:34,
    margin:'10%'
    },

    breakdescriptivetext:{
    color:'#FF2643',
    fontSize:18,
    textAlign:'center',
    margin:'5%'
    },

    breaksuggestion:{
    color:'#FF2643',
    fontSize:24,
    textAlign:'center',
     marginBottom:'10%'
    },

    explanationtext:{
    color:'#FF2643',
    fontSize:14,

    }
    });
