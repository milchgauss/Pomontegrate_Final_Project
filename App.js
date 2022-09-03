import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
 
import DailyTasks from './DailyTasks';
import CalendarPlanner from './CalendarPlanner';
import Weather from './WeatherSegment';
import Pomodoro from './Pomodoro';

const dailyTaskScreen=' ';
const calendarScreen= '  ';
const weatherScreen= '    ';
const pomodoroScreen= '        ';

const Tabs=createBottomTabNavigator();

export default function App() {
  return (
 
<NavigationContainer>
    <Tabs.Navigator 
    initialRouteName={dailyTaskScreen}
    screenOptions={{
      "tabBarActiveTintColor": "#FB0A2A",
      "tabBarInactiveTintColor": "grey",
      "tabBarLabelStyle": {
        "paddingBottom": 10,
        "fontSize": 14
      },
      "tabBarStyle": [
        {
          "padding": 10,
          "height": 70
        },
        null
      ]
    }}
    >
      
    <Tabs.Screen name={dailyTaskScreen}
     component={DailyTasks}
     options={{
      tabBarLabel: 'Daily Tasks',
      tabBarIcon: ({ color, size }) => (
        <Icon name="list" color={color} size={30} />
      ),
    }}/> 
    <Tabs.Screen name={calendarScreen} 
    component={CalendarPlanner}
    options={{
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ color, size }) => (
        <Icon name="today" color={color} size={30} />
      ),
    }}/>
    <Tabs.Screen name={pomodoroScreen} 
    component={Pomodoro}
    options={{
      tabBarLabel: 'Pomodoro',
      tabBarIcon: ({ color, size }) => (
        <Icon name="timer" color={color} size={30} />
      ),
    }}/>
    <Tabs.Screen name={weatherScreen} 
    component={Weather}
    options={{
      tabBarLabel: 'Weather',
      tabBarIcon: ({ color, size }) => (
        <Icon name="filter-drama" color={color} size={30} />
      ),
    }}/>
 

    </Tabs.Navigator>
</NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  titles: {
  fontSize:42,
  color:'#FF2643',
  fontWeight:'bold'
  }
});
