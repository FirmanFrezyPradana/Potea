// import * as React from 'react';
// import {Home} from './src/Screen';
// import {Discover} from './src/Screen';
// import {Profile} from './src/Screen';
// import {MyCart} from './src/Screen';
// import {FlowerDetail} from './src/Screen';

// export default function App() {
//   return <FlowerDetail />;
// }
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}
