import React, {useState, useEffect, useRef, useContext} from 'react';
import moment from 'moment';
import Linkify from 'react-linkify';
import './Chat.css'
import {Context} from "../../index";
import Loader from "../Loader/Loader";
import {useCollectionData} from "react-firebase-hooks/firestore";

const Chat = ({ username }) => {
    const { firestore } = useContext(Context);
    const [currentMessage, setCurrentMessage] = useState('');
    const [collectionData, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [collectionData || []]);

    const sendMessage = (event) => {
        event.preventDefault();
        const doc = {
            uid: username.username.id,
            username: username.username.nickname,
            text: currentMessage,
            createdAt: Date.now(),
        };
        firestore.collection('messages').add(doc);
        setCurrentMessage('')
    };

    const formatDate = (date) => {
        return moment(date).format('D MMMM HH:mm');
    };

    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <div className="chat">
            <div className="chat-messages">
                {collectionData.map((message, index) => {
                    const isCurrentUser = message.username === username.username.nickname;
                    const messageClass = isCurrentUser
                        ? 'chat-message chat-message-current-user'
                        : 'chat-message';
                    const messageStyle = isCurrentUser ? { textAlign: 'right', background: '#272A35' } : {background: '#373E4E'};
                    return (
                        <div className={messageClass} key={index}>
                            <p className="chat-message-timestamp">{formatDate(message.createdAt)}</p>
                            <div className="chat-message-content" style={messageStyle}>
                                <Linkify>{message.text}</Linkify>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    className="chat-input"
                    type="text"
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                />
                <button className="chat-send-button left" type="submit">
                </button>
            </form>
        </div>
    );
};

export default Chat;
