import React from 'react';

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: this.props.card.front,
            back: this.props.card.back,
            index: this.props.index,
            key: Date.now()
        }
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    editCard = index => {
        const front = this.state.front.trim();
        const back = this.state.back.trim();

        if (front === '' || back === '') {
            this.setState({
                front: this.props.card.front,
                back: this.props.card.back,
                key: Date.now()
            })
            alert("Cannot enter blank/spaces for flash card. Pleas try again!");
            return;
        }
        this.props.editCard(index, front, back);
        this.render();
    }

    deleteCard = index =>
        this.props.deleteCard(index);

    render() {
        return (
            <tr key={this.state.key}>
                <td>{this.state.index + 1}</td>
                <td>
                    <input
                        name='front'
                        onChange={this.handleChange}
                        defaultValue={this.state.front} />
                </td>
                <td>
                    <input
                        name='back'
                        onChange={this.handleChange}
                        defaultValue={this.state.back} />
                </td>
                <td><button onClick={() => this.editCard(this.state.index)}>Submit card</button></td>
                <td><button onClick={() => this.deleteCard(this.state.index)}>Delete card</button></td>
            </tr>
        )
    }
}

export default Row;