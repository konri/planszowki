import React, { Component } from 'react';
import { Platform, View, Text, Alert} from 'react-native';
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Actions } from 'react-native-router-flux';
import { routerKeys } from "../Router";

class LoginPage extends Component {
  constructor(props) {
    super (props);

    this.state = {
      blue: '',
      red: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login Page</Text>
        </View>
        <Text style={styles.description}>Please write your name/group</Text>

        <View style={styles.inputContainer}>
          <Input labelStyle={styles.blueInput}
                 onChangeText={(blue) => this.setState({ blue })}
          >
            Blue team
          </Input>
          <View style={{ height: 40 }}/>
          <Input labelStyle={styles.redInput}
                 onChangeText={(red) => this.setState({ red })}
          >
            Red team
          </Input>
          <Button style={styles.button}
                  onPress={this.confirmClicked.bind(this)}>
            Start game!
          </Button>
        </View>
      </View>
    );
  }

  confirmClicked() {
    if (this.state.blue && this.state.red) {
      Actions.push(routerKeys.page.chooser, { blue: this.state.blue, red: this.state.red });
    } else {
      Alert.alert(
        `Warning!`,
        `Please fill name of players!`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  }
}

const styles = {
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#211334',
    paddingTop: 3
  },
  description: {
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#211334',
    paddingBottom: 3
  },
  inputContainer: {
    paddingTop: 50,
    paddingBottom: 20
  },
  button: {
    marginTop: 40,
    alignSelf: 'center',
    width: '80%',
    height: 50
  },
  blueInput: {
    color: '#2360bd'
  },
  redInput: {
    color: '#c41f24'
  },
};

export default LoginPage;
