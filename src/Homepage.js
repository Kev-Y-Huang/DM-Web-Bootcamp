import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Homepage extends Component {
    render() {
        if(!isLoaded(this.props.sets)){
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h1>This is Flashcard!</h1>
                <nav>
                    <ul>
                        <li><Link to={'/editor'}>Go to Editor</Link></li>
                    </ul>
                </nav>
                <br/>
                <h2>Decks</h2>
                <nav>
                    <ul>
                        {Object.entries(this.props.sets).map(set => (
                            <li key={set[1].name}>
                                <Link to={`/viewer/${set[0]}`}>{set[1].name}: {set[1].description}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const sets = state.firebase.data.homepage;
    return {sets};
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps)
)(Homepage);