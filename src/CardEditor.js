import React from 'react';
import './CardEditor.css';
import Row from './Row';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {front: 'front1', back: 'back1'},
                {front: 'front2', back: 'back2'},
                {front: 'front3', back: 'back3'},
                {front: 'front4', back: 'back4'},
                {front: 'front5', back: 'back5'},
                {front: 'front6', back: 'back6'},
                {front: 'front7', back: 'back7'},
                {front: 'front8', back: 'back8'},
                {front: 'front9', back: 'back9'}
            ],
            front: '',
            back: '',
            currentFront: '',
            currentBack: '',
            name: '',
            description: ''
        }
    }

    handleChange = event => this.setState({[event.target.name]: event.target.value});

    addCard = () => {
        const front = this.state.front.trim();
        const back = this.state.back.trim();

        if (front === '' || back === '') {
            alert("Cannot enter blank/spaces for flash card. Pleas try again!");
            return;
        }
        const card = {front: this.state.front, back: this.state.back}
        const cards = this.state.cards.slice().concat(card);
        this.setState({cards});
        this.setState({
            front: '',
            back: ''
        });
    };

    editCard = (index, front, back) => {
        const cards = this.state.cards.slice();
        cards[index] = {front, back};
        this.setState({cards});
    };

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
    };

    createDeck = () => {
        const setId = this.props.firebase.push('/flashcards').key;
        const set = {
            cards: this.state.cards,
            name: this.state.name,
            description: this.state.description
        };
        const updates = {};
        updates[`/flashcards/${setId}`] = set;
        updates[`/homepage/${setId}`] = {name: this.state.name, description: this.state.description};
        const onComplete = () => this.props.history.push(`/viewer/${setId}`);
        this.props.firebase.update(`/`, updates, onComplete())
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <Row card={card} index={index} editCard={this.editCard} deleteCard={this.deleteCard}/>
            )
        });

        return (
            <div>
                <h2>
                    Card Editor
                </h2>
                <div>
                    <label>Deck Name:</label>
                    <input
                        name={"name"}
                        onChange={this.handleChange}
                        placeholder={"Name of deck"}
                        value={this.state.name}
                    />
                </div>
                <br/>
                <div>
                    <label>Description:</label>
                    <input
                        name={"description"}
                        onChange={this.handleChange}
                        placeholder={"Description"}
                        value={this.state.description}
                    />
                </div>
                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br/>
                <input
                    name={'front'}
                    onChange={this.handleChange}
                    placeholder={'Front of card'}
                    value={this.state.front}
                />
                <input
                    name={'back'}
                    onChange={this.handleChange}
                    placeholder={'Back of card'}
                    value={this.state.back}
                />
                <button onClick={this.addCard}>Add card</button>
                <hr/>
                <div>
                    <button
                        disabled={this.state.name.trim() === '' || this.state.cards.length === 0 || this.state.description.trim() === ''}
                        onClick={this.createDeck}
                    >
                        Create Deck
                    </button>
                </div>
                <br/>
                <Link to={"/"}>Go to Home</Link>
            </div>
        )
    }
}

export default compose(
    firebaseConnect(),
    withRouter
)(CardEditor);