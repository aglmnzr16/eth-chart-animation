import {StyleSheet, View} from 'react-native';
import Graph from './src/components/Graph';
import Footer from './src/components/Footer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <Graph />
          <Footer />
        </View>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});
