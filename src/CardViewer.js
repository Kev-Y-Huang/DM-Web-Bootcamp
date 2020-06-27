import React from 'react';
import './CardViewer.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            front: true
        }
    };

    randomize = () => {
        const cards = Array.from(Array(this.props.cards.length),(x,i)=>i);
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        this.setState({ cards, index: 0 });
    };

    previousCard = () => {
        if (this.state.index === 0) {
            return;
        }
        this.setState({
            index: this.state.index - 1,
            front: true
        })
    };

    nextCard = () => {
        if (this.state.index === this.props.cards.length - 1) {
            return;
        }
        this.setState({
            index: this.state.index + 1,
            front: true
        })
    };

    flipCard = () => {
        this.setState({
            front: !this.state.front
        })
    };

    onKeyDown = (e) => {
        if (e.keyCode === 37) {
            this.previousCard();
        }
        else if (e.keyCode === 39) {
            this.nextCard();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    };

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div>Loading Data...</div>;
        }
        if (isEmpty(this.props.cards)) {
            return <div>Page Not Found</div>;
        }
        return (
            <div>
                <h2>{this.props.name}</h2>
                <h3>Description: {this.props.description}</h3>
                <button
                    onClick={this.previousCard}
                    disabled={this.state.index === 0}
                >
                    Previous Card
                </button>
                <button
                    onClick={this.nextCard}
                    disabled={this.state.index === this.props.cards.length - 1}
                >
                    Next Card
                </button>
                <p>You are on card {this.state.index + 1}/{this.props.cards.length}: {this.state.front ? "front" : "back"}</p>
                <div className={'card'} onClick={this.flipCard}>
                    <p>{this.state.front ? this.props.cards[this.state.index].front : this.props.cards[this.state.index].back}</p>
                </div>
                <button onClick={this.randomize}>Randomize</button>
                <hr />
                <Link to={"/editor"}>Go to Editor</Link>
            </div>
        )
    };
}

const mapStateToProps = state => {
    const deck = state.firebase.data.set;
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    const description = deck && deck.description;
    return {cards, name, description};
};

export default compose(
    withRouter,
    firebaseConnect(props => {
        return [
            {path: `/flashcards/${props.match.params.setId}`, storeAs: 'set'}
        ]
    }),
    connect(mapStateToProps)
)(CardViewer);