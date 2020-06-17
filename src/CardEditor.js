import React from 'react';
import './CardEditor.css';
import Row from './Row';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: '',
            back: '',
            currentFront: '',
            currentBack: ''
        }
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    addCard = () => {
        const front = this.state.front.trim();
        const back = this.state.back.trim();

        if (front === '' || back === '') {
            alert("Cannot enter blank/spaces for flash card. Pleas try again!");
            return;
        }

        this.props.addCard(this.state);
        this.setState({
            front: '',
            back: ''
        });
    }

    editCard = (index, front, back) => {
        this.props.editCard(index, front, back);
    }

    deleteCard = index =>
        this.props.deleteCard(index);

    render() {
        const cards = this.props.cards.map((card, index) => {
            return (
                <Row card={card} index={index} editCard={this.editCard} deleteCard={this.deleteCard} />
            )
        })

        return (
            <div>
                <h2>
                    Card Editor
                </h2>
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
                <br />
                <input
                    name='front'
                    onChange={this.handleChange}
                    placeholder='Front of card'
                    value={this.state.front}
                />
                <input
                    name='back'
                    onChange={this.handleChange}
                    placeholder='Back of card'
                    value={this.state.back}
                />
                <button onClick={this.addCard}>Add card</button>
                <hr />
                <button onClick={this.props.switchMode}>Go to card viewer</button>
            </div>
        )
    }
}

export default CardEditor;