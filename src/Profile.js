import React from 'react';
import {compose} from 'redux';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleChange = event => this.setState({[event.target.name]: event.target.value, error: ''});

    change = async() => {
        const uid = this.props.isLoggedIn;
        const updates = {};
        updates[`/users/${uid}`] = {
            username: this.state.username,
            email: this.props.email
        };
        const onComplete = () => this.setState({username: ''});
        this.props.firebase.update(`/`, updates, onComplete());
    }

    render() {
        if (!isLoaded(this.props.username)) {
            return <div>Loading...</div>;
        }
        if (!this.props.isLoggedIn) {
            return <Redirect to={'/register'}/>
        }
        return (
            <div>
                <h1>Profile Page</h1>
                <div>
                    Current Username: {this.props.username}
                    <br/>
                    <button onClick={this.change}>Change Username</button>
                    <input
                        name={'username'}
                        onChange={this.handleChange}
                        placeholder={'Username'}
                        value={this.state.username}
                    />
                </div>
                <hr/>
                <Link to={'/'}>Homepage</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.firebase.profile.username,
        email: state.firebase.auth.email,
        isLoggedIn: state.firebase.auth.uid
    };
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(Profile);