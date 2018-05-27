import React, { Component } from 'react';
import { Platform, View, Text, Alert } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { Button } from "../common/Button";
import { routerKeys } from "../Router";
import { Actions } from 'react-native-router-flux';

const MAX_MOVES = 6;

let CURRENT_INDEX;

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}


class ChooserPage extends Component {
  constructor(props) {
    super(props);
    CURRENT_INDEX = Math.floor(Math.random() * 2);
    const startTeam = CURRENT_INDEX === 0 ? 'BLUE' : 'RED';
    const name = CURRENT_INDEX === 0 ? this.props.blue : this.props.red;
    Alert.alert(
      `Start team: ${startTeam}`,
      `Game start with: ${name}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
    this.state = {
      cards: this.generateCards()
    };
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Chooser Page</Text>
        </View>
        <Text style={styles.description}>Please write your name/group</Text>

        <SwipeCards
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards/>}

          handleYup={this.handleYup}
          handleNope={this.handleNope}
          showYup={false}
          showNope={false}
          showMaybe={false}
          cardRemoved={this.cardRemoved.bind(this)}
        />


        <Button style={styles.button}
                onPress={this.leaveGame.bind(this)}>
          End game
        </Button>
      </View>
    );
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);
    console.log(this.state.cards);
    if (this.state.cards.length - index === 1) {

      this.setState({
        cards: this.generateCards()
      })
    }
  }

  leaveGame() {
    Alert.alert(
      `Leave?`,
      `Are you sure to end game?`,
      [
        { text: 'YES', onPress: () => Actions.push(routerKeys.page.login) },
        { text: 'NO', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`)
  }

  generateCards() {
    const blueMoves = this.generateArray();
    const redMoves = this.generateArray();

    let first, second;
    if (CURRENT_INDEX === 0) {
      first = { color: 'blue', arr: blueMoves };
      second = { color: 'red', arr: redMoves };
    } else {
      first = { color: 'red', arr: redMoves };
      second = { color: 'blue', arr: blueMoves };
    }
    const cards = [];
    for (let i = 0; i < MAX_MOVES; i++) {
      cards.push({ backgroundColor: first.color, text: this.getRandomEl(first.arr) });
      cards.push({ backgroundColor: second.color, text: this.getRandomEl(second.arr) });
    }
    console.log(CURRENT_INDEX);
    console.log(cards);
    return cards;
  }

  getRandomEl(arr) {
    const randomIndex = Math.floor(Math.random() * (arr.length - 1));
    return arr.splice(randomIndex, 1);
  }

  generateArray() {
    const arr = [];
    for (let i = 1; i <= MAX_MOVES; i++) {
      arr.push(i);
    }
    return arr;
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
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: 'bold',
    color: '#211334',
    paddingBottom: 3
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  button: {
    backgroundColor: 'red',
    marginTop: 40,
    alignSelf: 'center',
    width: '80%',
    height: 50

  }
};

export default ChooserPage;
