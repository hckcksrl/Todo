import React from 'react';
import { StyleSheet, Text, View , StatusBar , TextInput, Dimensions,
Platform , ScrollView} from 'react-native';
import ToDo from './ToDo';
import {AppLoading} from "expo"
import uuidv1 from "uuid/v1"

const {height , width } = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newTodo: "",
    loadedTodos : false,
    toDos : {}
  }
  componentDidMount = () => {
      this._loadTodos();
  }
  render() {
    const { newToDo , loadedTodos, toDos} = this.state;
    console.log(toDos);
    if(!loadedTodos){
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Hong To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To do"}
            value={newToDo}
            onChangeText = {this._contorolNewToDo}
            placeholderTextColor = {"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            <ToDo text={"Hello Text"}/>
          </ScrollView>
        </View>
      </View>
    );
  }
  _contorolNewToDo = text => {
    this.setState({
      newTodo : text
    })
  }
  _loadTodos = () => {
    this.setState({
      loadedTodos : true
    })
  }
  _addTodo = () => {
    const {newTodo} = this.state;
    if(newTodo != ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newtodoObject = {
          [ID] : {
            id : ID ,
            isCompleted : false,
            text : newTodo,
            createAp : Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo : '',
          toDos : {
            ...prevState.toDos,
            ...newtodoObject
          }
        }
        return { ...newState };
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title:{
    color:'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight : "300",
    marginBottom : 30
  },
  card: {
    backgroundColor:'white',
    flex : 1,
    width : width - 25,
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8,
    ...Platform.select({
      ios:{
        shadowColor : "rgb(50,50,50)",
        shadowOpacity : 0.5,
        shadowRadius : 5,
        shadowOffset : {
          height : -1,
          width : 0
        }
      },
      android:{
        elevation : 3
      }
    })
  },
  input :{
    padding : 20,
    borderBottomColor : "#bbb",
    borderBottomWidth: 1.5,
    fontSize : 25
  },
  todos: {
    alignItems: 'center'
  }
});
