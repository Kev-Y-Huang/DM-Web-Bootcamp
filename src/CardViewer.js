import React from 'react';
import './CardViewer.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: props.cards,
            index: 0,
            front: true
        }
    };

    randomize = () => {
        const cards = this.state.cards.slice();
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({ cards: this.props.cards });
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
        if (isEmpty(this.state.cards)) {
            return <div>Page Not Found</div>;
        }
        return (
            <div>
                <h2>{this.props.name}</h2>
                <h3>Created by {this.props.user}</h3>
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
                    <p>{this.state.front ? this.state.cards[this.state.index].front : this.state.cards[this.state.index].back}</p>
                </div>
                <button onClick={this.randomize}>Randomize</button>
                <hr />
                <Link to={"/"}>Go to Homepage</Link>
                <br/>
                <Link to={"/editor"}>Go to Editor</Link>
            </div>
        )
    };
}

const populates = [
    {child: 'user', root: 'users'}
];


const mapStateToProps = (state, props) => {
    const deck = populate(state.firebase, props.match.params.setId, populates);
    console.log(deck);
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    const description = deck && deck.description;
    const user = deck && deck.user.username;
    return {
        cards,
        name,
        description,
        user
    };
};

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log(populates);
        return [
            {path: `/flashcards/${props.match.params.setId}`, storeAs: props.match.params.setId, populates}
        ]
    }),
    connect(mapStateToProps)
)(CardViewer);