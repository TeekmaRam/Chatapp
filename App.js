
//here we have provide navigation to different screen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from './src/Mapscreen'
import { Chatscreen } from './src/Chatscreen'
import { UserList } from './src/UserList'

const Stack = createNativeStackNavigator()
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen options={{ headerShown: false }} name="Chatscreen" component={Chatscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
