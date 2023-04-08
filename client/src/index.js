import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./store/store";
import reportWebVitals from "./reportWebVitals";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


firebase.initializeApp({
    apiKey: "AIzaSyC8sJofrYO77g1OT4r1lSYf_imGQioFgn8",
    authDomain: "laba-chat.firebaseapp.com",
    projectId: "laba-chat",
    storageBucket: "laba-chat.appspot.com",
    messagingSenderId: "164401645564",
    appId: "1:164401645564:web:a414be0bfbb056a0279479",
    measurementId: "G-MS60747G6W"
});

const firestore = firebase.firestore()

export const store = new Store();

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        store,
        firestore
    }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
