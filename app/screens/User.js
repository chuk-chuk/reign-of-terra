import * as constants from '../Constants'
import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions, StyleSheet, Button, TextInput, Picker, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'
import ColorPicker from '../components/ColorPicker.js'

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;

export default class User extends Component {
  static navigationOptions = {
    title: 'User',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: "",
      color: "red",
      backgroundColor: "#9e1f5a",
      pickerStyle: {
         fontSize: 25,
         alignSelf: 'center',
         color: "#9e1f5a"
      }
    }
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  signup(){
    if (this.state.username === "") alert("Please enter a username")
    var self = this;
    var dbRef = constants.firebaseApp.auth()
    dbRef.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user) {
      constants.firebaseApp.database().ref('users').push({
        email: user.email, color: self.state.color, username: self.state.username
      });
      self.props.navigation.navigate("Map")
    })
    .catch(function(error) {
      alert(error.code + error.message)
    });
  }

  signin(){
    var self = this;
    constants.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user) {
      self.props.navigation.navigate("Map")
    }).catch(function(error) {
      alert(error.code + error.message)
    });
  }

  updateColor = (color) => {
     this.setState({ backgroundColor: color, color: color })
     var newStyle = {
        fontSize: 30,
        alignSelf: 'center',
        color: color
     }
     this.setState({ pickerStyle: newStyle })
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={{
        flex: 1,
        backgroundColor:this.state.backgroundColor,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <TextInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({email: text})}
        value={this.state.email}
        placeholder={"Email Address"}
      />
      <TextInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({password: text})}
        value={this.state.password}
        secureTextEntry={true}
        placeholder={"Password"}
      />
      <TextInput
        style={styles.textinput}
        onChangeText={(text) => this.setState({username: text})}
        value={this.state.username}
        placeholder={"Username"}
      />
      <Text style={styles.heading}>Choose a color for your territory</Text>
     <Picker selectedValue = {this.state.color} onValueChange = {this.updateColor}>
       <Picker.Item label = "Purple" value = "#9e1f5a" />
       <Picker.Item label = "Blue" value = "#355ef2" />
       <Picker.Item label = "Green" value = "#6df9a0" />
       <Picker.Item label = "Yellow" value = "#f9f06d" />
       <Picker.Item label = "Pink" value = "#f274eb" />
       <Picker.Item label = "Orange" value = "#fc9207" />
     </Picker>

       <View style={styles.signupbutton}>
         <TouchableOpacity onPress={this.signup}>
           <Text style={{fontSize: 25, color: "white"}}> Sign Up </Text>
         </TouchableOpacity>
       </View>

       <View style={styles.signinbutton}>
         <TouchableOpacity onPress={this.signin}>
           <Text style={{fontSize: 25, color: "white"}}> Sign In </Text>
         </TouchableOpacity>
       </View>

     </View>
   );
 }
}

const styles = StyleSheet.create({
 signinbutton: {
   flex: 0.2,
   width: SCREEN_WIDTH,
   backgroundColor: '#4f8ef2',
   alignItems: "center",
   justifyContent: 'center',
   borderWidth: 1,
   borderColor: "#4f8ef2",
 },
 signupbutton: {
   flex: 0.2,
   width: SCREEN_WIDTH,
   backgroundColor: '#4f8ef2',
   alignItems: "center",
   justifyContent: 'center',
   borderWidth: 1,
   borderColor: "#4f8ef2",

 },
 heading: {
   flex: 0.2,
   color: "white",
   top: 30,
   fontSize: 25,
   textAlign: "center",
 },
 textinput: {
  backgroundColor: "white",
  flex: 0.2,
  borderWidth: 1,
  borderColor: "white",
  fontSize: 20,
},
});
