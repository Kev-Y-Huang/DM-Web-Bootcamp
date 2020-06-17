import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
        { front: 'front3', back: 'back3' },
        { front: 'front4', back: 'back4' },
        { front: 'front5', back: 'back5' },
        { front: 'front6', back: 'back6' },
        { front: 'front7', back: 'back7' },
        { front: 'front8', back: 'back8' },
        { front: 'front9', back: 'back9' }
      ],
      editor: false
    }
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  }

  editCard = (index, front, back) => {
    const cards = this.state.cards.slice();
    cards[index] = { front, back };
    this.setState({ cards });
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  }

  switch = () =>
    this.setState({ editor: !this.state.editor })

  render() {
    if (this.state.editor) {
      return (
        <CardEditor
          addCard={this.addCard}
          editCard={this.editCard}
          deleteCard={this.deleteCard}
          cards={this.state.cards}
          switchMode={this.switch}
        />
      )
    } else {
      return (
        <CardViewer
          switchMode={this.switch}
          cards={this.state.cards}
        />
      )
    }
  }
}

export default App;
