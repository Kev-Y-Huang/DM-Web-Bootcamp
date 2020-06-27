import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  }

  render() {
    return (
        <Switch>
          <Route exact path={"/"}>
            <Homepage/>
          </Route>
          <Route exact path={"/editor"}>
            <CardEditor/>
          </Route>
          <Route exact path={"/viewer/:setId"}>
            <CardViewer/>
          </Route>
          <Route>
            <div>Page Not Found</div>
          </Route>
        </Switch>
    )
  }
}

export default App;
