import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Homepage extends Component {
    render() {
        if (!isLoaded(this.props.sets)) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h1>This is Flashcard!</h1>
                {
                    this.props.isLoggedIn ?
                        <nav>
                            <ul>
                                <li><Link to={'/editor'}>Go to Editor</Link></li>
                            </ul>
                        </nav> :
                        null
                }
                <h2>Decks</h2>
                <nav>
                    <ul>
                        {Object.entries(this.props.sets).map(set => (
                            set[1].private && set[1].user === this.props.isLoggedIn ?
                                <li key={set[1].name}>
                                    <Link to={`/viewer/${set[0]}`}>{set[1].name}: {set[1].description}</Link>
                                </li> :
                                <li key={set[1].name}>
                                    <Link to={`/viewer/${set[0]}`}>{set[1].name}: {set[1].description}</Link>
                                </li>
                        ))}
                    </ul>
                </nav>
                <h2>Account</h2>
                {
                    this.props.isLoggedIn ?
                        <div>
                            <div>{this.props.username}</div>
                            <button onClick={() => this.props.firebase.logout()}>Logout</button>
                        </div> :
                        <div>
                            <Link to={'/register'}>Register</Link>
                            <br/>
                            <Link to={'/login'}>Login</Link>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sets: state.firebase.data.homepage,
        username: state.firebase.profile.username,
        isLoggedIn: state.firebase.auth.uid
    };
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps)
)(Homepage);