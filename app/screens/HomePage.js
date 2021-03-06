import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

class HomePage extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text style={styles.name}>reign_of_terra</Text>
        <Image style={styles.imagePosition} source={{uri: "https://i.stack.imgur.com/3kVAu.png"}} />

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => navigate('User')}>
            <Text style={styles.buttonText}> click_to_start </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#2f63b7',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: "white",
    fontFamily: "Noteworthy",
    textAlign: 'center',

  },
  buttonView:{
    flex: 0.08,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor:'#a1b1cc',
    minHeight: 20,
    borderRadius: 40,
  },
  name: {
    fontFamily: "Noteworthy",
    fontSize: 60,
    textAlign: 'center',
    color: '#011a42',
    top: 80,
    flex: 0.3
  },
  imagePosition: {
    flex: 0.3,
  },
});
export default HomePage;
