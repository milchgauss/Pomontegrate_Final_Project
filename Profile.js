import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

 

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.titles}>Profile</Text>
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
  titles: {
    fontSize:42,
    color:'#FF2643',
    fontWeight:'bold',
    padding:20,
    alignItems:'center',
    justifyContent: 'space-between'
  
    }
});
