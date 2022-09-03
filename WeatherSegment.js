import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import React, {useEffect, useState} from 'react';

export default function Weather() {

    const [errorText, setErrorText]= useState(null);
    const [latitude, setLatitude]=useState('');
    const [longitude, setLongitude]=useState('');
    const [url,setURL]=useState('');
    const [posts, setPosts] = useState([]);
    const [temperature,setTemperature]=useState('');
    const [feelslike, setFeelsLike]=useState('');
    const [humidity,setHumidity]=useState('');
    const [precipitation,setPrecipitation]=useState('');

    const [quote, setQuotes]=useState('');

    React.useEffect(() => {
       setMotivationalQuotes();
    }, [])

    

    const setMotivationalQuotes=()=>{
     
      const quotes=[
        '"Step by step and the thing is done." - Charles Atlas',
        '"It always seems impossible until it’s done." - Nelson Mandela',
        '"Motivation will almost always beat mere talent." - Norman Ralph Augustine',
        '"Either I will find a way, or I will make one." - Philip Sidney'
      ]
      var randomizedNumber=Math.floor(Math.random()*quotes.length);
      setQuotes(quotes[randomizedNumber])
    }

    var message="Loading app...";
    if(errorText!==null){
        message=errorText;
    }
 
    useEffect(()=>{
    (async()=>{
        let {status}=await Location.requestForegroundPermissionsAsync();
        if(status!=="granted"){
            setErrorText("Please grant permission to access your geo-coordinates")
            return;
        }
        let location=await Location.getCurrentPositionAsync({});

        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
        
 
        setURL(`http://api.weatherapi.com/v1/forecast.json?key=c5970a2d5fba4ad58a2151956222502&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`)
       
        try{
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        setFeelsLike(JSON.stringify(data.current.feelslike_c));
        setTemperature(JSON.stringify(data.current.temp_c))
        setHumidity(JSON.stringify(data.current.humidity));
        setPrecipitation(JSON.stringify(data.current.precip_mm));

        }
        catch(error){
        console.log(err)
        }
        
    })();
    },[]);

   
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.titles}>Weather</Text>
      <Text style={styles.subtitles}>Plan your days by knowing the weather</Text>
      <View style={styles.maintemp}>
        <Text style={styles.maintemptexttwo}>Current Temp</Text>
        <Text style={styles.maintemptext}>{temperature}°C</Text>
      </View>
      <View style={styles.secondarytemp}>
          <View style={styles.secondarytemptext}>  
            <Text style={styles.secondaryblock}> Feels like: </Text>
            <Text style={styles.secondaryblocktwo}>{feelslike}°C </Text>
        </View>
        <View style={styles.secondarytemptext}>  
            <Text style={styles.secondaryblock}> Rain: </Text>
            <Text style={styles.secondaryblocktwo}>{precipitation} mm</Text>
        </View>
        <View style={styles.secondarytemptext}>  
            <Text style={styles.secondaryblock}> Humidity: </Text>
            <Text style={styles.secondaryblocktwo}>{humidity}</Text>
        </View>
      </View>
      <View style={styles.quotecontainer}>
      <Text style={styles.quotesheader}>A little motivation for the day:</Text>
        <Text style={styles.quotes}>{quote}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  quotes:{
    fontSize:14,
    color:'#FF2643',
    fontWeight:'bold',
    padding:14,
    alignItems:'center',
  },
  quotesheader:{
    fontSize:18,
    color:'#FF2643',
    fontWeight:'bold',
    padding:14,
    alignItems:'center',
  },
  titles: {
    fontSize:42,
    color:'#FF2643',
    fontWeight:'bold',
    padding:20,
    alignItems:'center',
    justifyContent: 'space-between'
  
    },
  subtitles: {
    fontSize:24,
    color:'#FF2643',
    fontWeight:'bold',
    paddingLeft:20,
    alignItems:'center',
    justifyContent: 'space-between'
    },
  maintemp:{
    backgroundColor:'#fff',
    elevation: 20,
    height: '30%',
    marginVertical: 1,
    borderRadius:25,
    paddingHorizontal:25,
    textAlign:'center',
    padding:10,
    marginTop:10
  },
  quotecontainer:{
    backgroundColor:'#fff',
    elevation: 20,
    marginVertical: 1,
    borderRadius:10,
    textAlign:'center',
  },
  secondarytemp:{
    backgroundColor:'#fff',
    height: '20%',
    borderRadius:25,
    padding:10,
    marginTop:10,
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
    
  },
  maintemptext:{
    fontSize:65,
    color:'#FF2643',
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'space-between',
    textAlign:'center',
    paddingTop:'2%'
  },
  secondarytemptext:{
    backgroundColor:'#fff',
    elevation: 20,
    height: '50%',
    marginVertical: 1,
    borderRadius:15,
    paddingHorizontal:25,
    textAlign:'center',
    padding:8,
    margin:10,
    marginTop:5,
    fontSize: 20
  },
  secondaryblock:{
    fontSize: 12,
    color:'#FF2643',
    textAlign:'center',
  },
 secondaryblocktwo:
 {
    color:'#FF2643',
    textAlign:'center',
    fontSize: 24,
    marginTop:30
 },
 maintemptexttwo:{
    fontSize:30,
    color:'#FF2643',
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'space-between',
    textAlign:'center',
    paddingTop:'10%'
 }
 

});
