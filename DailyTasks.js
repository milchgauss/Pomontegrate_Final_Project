import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, CheckBox, Alert} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*Export the DailyTasks page; to be shown on App.js.*/
/*Credits and concepts taken from:

https://www.youtube.com/watch?v=Imkw-xFFLeE
https://www.youtube.com/watch?v=2MjAAcF0L5s

I have reorganized the tutorials (understood concepts + integrated the code/docs)
 
*/

export default function DailyTasks() {

const [prioritySet,setThePriority]=useState('');
const [textInput, setTasksText] = React.useState('');
const [taskdaily, setTasks] = React.useState([]);

console.log(taskdaily)

const setTheClock = taskID =>{
 
 const priority= taskdaily.map((priority)=>{
  if (priority.id==taskID){  
 
    var submittedTime=priority.time;
    console.log("Submitted time "+submittedTime)

    //Current date
    var hoursNowTime=new Date().getHours();
    var hoursNowTimeint=parseInt(hoursNowTime)
    console.log("hours now "+hoursNowTime)

    var minutesNowHours=new Date().getMinutes();
    var minutesNowTimeInt=parseInt(minutesNowHours)
    console.log("minutes now "+minutesNowHours);

    // Original submitted time
    var hoursSubmittedTime= (submittedTime.substr(0,2))
    var hoursIntSubmittedTime= parseInt(hoursSubmittedTime)

    console.log("hours submitted time "+hoursSubmittedTime)

    var minutesSubmittedTime=(submittedTime.substr(2,3).substr(1,2))
    var minutesIntSubmittedTime= parseInt(minutesSubmittedTime)

    console.log("minutes submitted time "+minutesSubmittedTime)
  
    
    var minutesInBetween; 
   
    if(minutesNowTimeInt<minutesIntSubmittedTime){
      minutesInBetween=(((hoursNowTimeint-hoursSubmittedTime)-1)*60+(60-minutesIntSubmittedTime)+minutesNowTimeInt)
    }
    else if (minutesNowTimeInt>minutesIntSubmittedTime){
      minutesInBetween=((hoursNowTimeint-hoursIntSubmittedTime)*60+(minutesNowTimeInt-minutesIntSubmittedTime))
    }

    else if (minutesNowTimeInt==minutesIntSubmittedTime){
      minutesInBetween=(hoursNowTimeint-hoursIntSubmittedTime)*60
    }
 
    console.log("Minutes in between is "+minutesInBetween)
    
    //Calculate priority level
  
    if(minutesInBetween<=720&&minutesInBetween>360){
      setThePriority('HIGH')
    }
    else if(minutesInBetween<=360&&minutesInBetween>180){
      setThePriority("MEDIUM")
    }
    else if(minutesInBetween<=180 && minutesInBetween>0){
      setThePriority("LOW")
    }
    console.log("Priority is "+prioritySet)
    return{...priority,priority: prioritySet}
  }
  return priority;
 })
 
  setTasks(priority)
}

React.useEffect(() =>{
  retrieveTasks();
}, [])
React.useEffect(() => {
  persistTasks(taskdaily);
}, [taskdaily]);

const TaskItem = ({task}) => {
  return <View style={styles.taskItem}>
    <View style={{flex: 1}}>
      <Text style={{
        fontSize: 15,
        textDecorationLine: task?.completed ? 'line-through' : 'none'
        }}>
          {task?.task}  
        </Text>
        <Text style={styles.primaryInfoText}> Set on : {' '} 
          {task?.time}
          </Text>
          <Text style={styles.primaryInfoText}> Priority: {' '} 
          {task?.priority}
          </Text>
    </View>

    <TouchableOpacity style={[styles.modifyItemIcon]} onPress={()=>setTheClock(task?.id)}>
      <Icon name="schedule" size={30} color={'#FF2643'}></Icon>
      </TouchableOpacity>
        <TouchableOpacity style={[styles.modifyItemIcon]} onPress={()=>strikeoutTask(task?.id)}>
        <Icon name={task.completed?'check-box':'check-box-outline-blank'} size={30} color={'#FF2643'}></Icon>
        </TouchableOpacity>
      
        <TouchableOpacity style={[styles.modifyItemIcon]}onPress={()=>deleteTask(task?.id)}>
        <Icon name="delete" size={30} color={'#FF2643'}></Icon>
        </TouchableOpacity>
  </View>
};

const persistTasks = async taskdaily => {
  try {
    const stringifyTasks = JSON.stringify(taskdaily);
    await AsyncStorage.setItem('taskdaily', stringifyTasks);
  } catch (e) {
    console.log(e);
    console.log(taskdaily)
  }
};
const retrieveTasks = async () => {
  try {
    const taskdaily = await AsyncStorage.getItem('taskdaily');
    if(taskdaily != null){
      setTasks(JSON.parse(taskdaily));
    }
  } catch(error) {
    console.log(error);
  }
};
const addTask = () => {
 
  if(textInput == ""){
    Alert.alert("Error", "Please input task")
  } else{
    const newTodo ={
      id: Math.random(),
      completed: false,
      task: textInput,
      time: new Date()
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      .toLowerCase(),
      priority:'',
      date: '',
    };
    
    setTasks([...taskdaily, newTodo]);
    setTasksText('');
  }
};

const strikeoutTask = (todoId) => {
const newTasks = taskdaily.map((item)=>{
  if(item.id== todoId){
    return {...item, completed:true}
  }
  return item;
});
setTasks(newTasks);
};

const deleteTask = (taskId) =>{
  const newTasks = taskdaily.filter(item => item.id != taskId);
  setTasks(newTasks);
};
 

return <SafeAreaView style={styles.safearea}>
  <View style={styles.safearea}>

    <ImageBackground style={{flex:1, width:'100%'}}
      source={require('./assets/backgrounds/dailytasks.jpg')}>

     <Text style={styles.titles}>Daily Tasks</Text>
    <FlatList 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{padding:15, paddingBottom: 150}}
    data={taskdaily} 
    renderItem={({item}) => <TaskItem task={item} />}
    
    />
    <View style={styles.footer}>
    <View style={styles.input}>
      <TextInput placeholder="Add Task (Tap clock to update priority)"
       value={textInput} onChangeText={(text)=>setTasksText(text)}/>
    </View>
    <TouchableOpacity onPress={addTask}>
    <View style={styles.addButton}>
                <Icon name="add" size={30} color={'#fff'}></Icon>
            </View>
    </TouchableOpacity>
  </View>
  </ImageBackground>

  </View>
</SafeAreaView>
};
const styles = StyleSheet.create({
  modifyItemIcon: {
    height:30,
    width:30,
    backgroundColor:"#fff",
    marginLeft:5,
    marginRight:5
},

safearea: {
  flex: 1,
  backgroundColor: '#fff',
}, 
titles:{
  fontSize:42,
    color:'#FF2643',
    fontWeight:'bold',
    padding:20,
    alignItems:'flex-start',
    justifyContent: 'space-between'
},
taskItem:{
  padding: 20,
  backgroundColor: '#fff',
  flexDirection: 'row',
  elevation: 20,
  borderRadius: 7,
  marginVertical: 10,
},
footer:{
  position:'absolute',
  bottom:'2%',
  backgroundColor: '#fff',
  width:'100%',
  flexDirection: 'row',
  alignItems:'center',
  paddingHorizontal:'5%'
},
input:{
  backgroundColor: '#fff',
  elevation: 20,
  flex: 1,
  height: '100%',
  height: 50,
  marginRight: 15,
  borderRadius: 30,
  paddingHorizontal: 20,
  textAlign:'center',
  padding:10,
  margin:10
},
primaryInfoText:{
  color: '#FF2643'
},
addButton:{
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#FF2643',
  height:50,
  width:50,
  elevation: 40,
  borderRadius: 30,
},
 
})