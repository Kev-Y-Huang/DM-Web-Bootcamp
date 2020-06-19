import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>This is Flashcard!</h1>
                <nav>
                    <ul>
                        <li><Link to={'/editor'}>Go to Editor</Link></li>
                        <li><Link to={'/viewer'}>Go to Viewer</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Homepage;