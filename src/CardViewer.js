import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            card: this.props.cards[0],
            index: 0,
            front: true
        }
    }

    randomize = () => {
        const cards = this.state.cards.slice();
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        console.log(cards);
        this.setState({ cards, card: cards[0], index: 0 });
    }

    previousCard = () => {
        if (this.state.index === 0) {
            return;
        }
        this.setState({
            card: this.state.cards[this.state.index - 1],
            index: this.state.index - 1,
            front: true
        })
    }

    nextCard = () => {
        if (this.state.index === this.state.cards.length - 1) {
            return;
        }
        this.setState({
            card: this.state.cards[this.state.index + 1],
            index: this.state.index + 1,
            front: true
        })
    }

    flipCard = () => {
        this.setState({
            front: !this.state.front
        })
    }

    onKeyDown = (e) => {
        if (e.keyCode === 37) {
            this.previousCard();
        }
        else if (e.keyCode === 39) {
            this.nextCard();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    render() {
        return (
            <div>
                <h2>Card Viewer</h2>
                <button
                    onClick={this.previousCard}
                    disabled={this.state.index === 0}
                >
                    Previous Card
                </button>
                <button
                    onClick={this.nextCard}
                    disabled={this.state.index === this.state.cards.length - 1}
                >
                    Next Card
                </button>
                <p>You are on card {this.state.index + 1}/{this.state.cards.length}: {this.state.front ? "front" : "back"}</p>
                <div className={'card'} onClick={this.flipCard}>
                    <p>{this.state.front ? this.state.card.front : this.state.card.back}</p>
                </div>
                <button onClick={this.randomize}>Randomize</button>
                <hr />
                <button onClick={this.props.switchMode}>Go to card editor</button>
            </div>
        )
    }
}

export default CardViewer;