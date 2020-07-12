import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {createStore, combineReducers} from 'redux';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase';
import {composeWithDevTools} from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyBCrttnhBIzqcCmM1MNijmHG4XUsr2LS8Q",
    authDomain: "bootcamp-93433.firebaseapp.com",
    databaseURL: "https://bootcamp-93433.firebaseio.com",
    projectId: "bootcamp-93433",
    storageBucket: "bootcamp-93433.appspot.com",
    messagingSenderId: "788327355199",
    appId: "1:788327355199:web:3d412eb56860c393d3b98a"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    preserveOnLogout: ['homepage'],
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);