import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, Alert } from 'react-native';
import {Calendar} from 'react-native-calendars'
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*Export the DailyTasks page; to be shown on App.js.*/
/*Credits and concepts taken from:

https://www.youtube.com/watch?v=Imkw-xFFLeE
https://www.youtube.com/watch?v=2MjAAcF0L5s

I have reorganized the tutorials (understood concepts + integrated the code/docs)
*/


export default function CalendarPlanner() {

  /**/
  const [date, setCalendar] = useState(new Date());
  const [dialogue, setDialogueType] = useState('date');
  const [datevisible, showDate] = useState(false);
  const [calInput, setCalenderTime] = useState('');


const [inputTask, setTaskField] = React.useState('');
const [tasks, setTasks] = React.useState([]);

console.log(tasks)

 
const onChange = (selectedDate) => {
  const dateNow = selectedDate || date;
  showDate(Platform.OS === 'ios');
  setCalendar(dateNow);

  let tempDate=new Date(dateNow);
  let date= tempDate.getDate()+"/"+(tempDate.getMonth()+1)+"/"+tempDate.getFullYear();
  setCalenderTime(date);
  console.log(date);

};
const setTimeMode = (currentMode) => {
  showDate(true);
  setDialogueType(currentMode);
};

const showTimepicker = () => {
  setTimeMode('date');
};

const setCalTime = taskID =>{
  showTimepicker()
  const newTime=tasks.map((time)=>{
      if (time.id==taskID){
          return{...time,time:' '+calInput}
      }
      return time;
  }
  )
  setTasks(newTime)
}
React.useEffect(() =>{
  getPersistedTasks();
}, [])
React.useEffect(() => {
  persistTasks(tasks);
}, [tasks]);

const TaskCalendarItem = ({task}) => {
  return <View style={styles.taskCalendar}>
    <View style={{flex: 1}}>
      <Text style={{
        fontSize: 15,
        textDecorationLine: task?.completed ? 'line-through' : 'none'
        }}>
          {task?.task}  
        </Text>
        <Text style={styles.primaryInfoText}> Finish by : 
          {task?.time}
          </Text>
    </View>

    <TouchableOpacity style={[styles.modifyItemIcon]} onPress={()=>setCalTime(task?.id)}>
      <Icon name="event" size={30} color={'#FF2643'}></Icon>
      </TouchableOpacity>
    {datevisible && (
      <DateTimePicker
      value={date}
      mode={dialogue}
      is24Hour={true}
      display='default'
      onChange={onChange}
      >
      </DateTimePicker>)}
        <TouchableOpacity style={[styles.modifyItemIcon]} onPress={()=>crossTaskOff(task?.id)}>
        <Icon name={task.completed?'check-box':'check-box-outline-blank'} size={30} color={'#FF2643'}></Icon>
        </TouchableOpacity>
      
        <TouchableOpacity style={[styles.modifyItemIcon]}onPress={()=>deleteTask(task?.id)}>
        <Icon name="delete" size={30} color={'#FF2643'}></Icon>
        </TouchableOpacity>
  </View>
};

const persistTasks = async tasks => {
  try {
    const stringifyTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem('tasks', stringifyTasks);
  } catch (e) {
    console.log(e);
    console.log(tasks)
  }
};
const getPersistedTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem('tasks');
    if(tasks != null){
      setTasks(JSON.parse(tasks));
    }
  } catch(error) {
    console.log(error);
  }
};
const addTask = () => {
  if(inputTask == ""){
    Alert.alert("Error", "Please input task")
  } else{
    const newCalendarTask ={
      id: Math.random(),
      completed: false,
      task: inputTask,
      time:'',
   
    };
    setTasks([...tasks, newCalendarTask]);
    setTaskField('');
  }
};

const crossTaskOff = (tasksId) => {
const addedTasks = tasks.map((item)=>{
  if(item.id== tasksId){
    return {...item, completed:true}
  }
  return item;
});
setTasks(addedTasks);
};
const deleteTask = (tasksCalendarId) =>{
  const newTaskCalendar = tasks.filter(item => item.id != tasksCalendarId);
  setTasks(newTaskCalendar);
};

return <SafeAreaView style={styles.safearea}>
  <View style={styles.safearea}>

    <ImageBackground style={{flex:1, width:'100%'}}
      source={require('./assets/backgrounds/calendar.jpg')}>

     <Text style={styles.titles}>Daily Calendar</Text>
     <Calendar></Calendar>
    <FlatList 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{padding:15, paddingBottom: 150}}
    data={tasks} 
    renderItem={({item}) => <TaskCalendarItem task={item} />}
    
    />
    <View style={styles.footer}>
    <View style={styles.input}>
      <TextInput placeholder="Add Task (Click clock after setting time)"
       value={inputTask} onChangeText={(text)=>setTaskField(text)}/>
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
taskCalendar:{
  padding: 20,
  backgroundColor: '#fff',
  flexDirection: 'row',
  elevation: 20,
  borderRadius: 7,
  marginVertical: 10,
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