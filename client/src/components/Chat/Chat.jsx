import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import Linkify from 'react-linkify';
import './Chat.css';
import { Context } from '../../index';
import Loader from '../Loader/Loader';
import { useCollection } from 'react-firebase-hooks/firestore';

const Chat = ({ user }) => {
    const { firestore } = useContext(Context);
    const [currentMessage, setCurrentMessage] = useState('');
    const [editMessageId, setEditMessageId] = useState(null);
    const [collectionData, loading] = useCollection(
        firestore.collection('messages').orderBy('createdAt')
    );
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [collectionData || []]);

    const deleteMessage = (id) => {
        firestore.collection('messages').doc(id).delete();
    };

    const editOnClickHandler = (id, message) => {
        setEditMessageId(id);
        setCurrentMessage(message.trim());
    }

    const updateMessage = (id, updatedMessage) => {
        firestore.collection('messages').doc(id).update({ text: updatedMessage });
        setEditMessageId(null);
        setCurrentMessage('');
    };

    const sendMessage = (event) => {
        event.preventDefault();
        if (currentMessage.trim() === '') {
            return;
        }
        const doc = {
            uid: user.user.id,
            username: user.user.nickname,
            text: currentMessage,
            createdAt: Date.now(),
        };
        firestore.collection('messages').add(doc);
        setCurrentMessage('');
    };

    const formatDate = (date) => {
        return moment(date).format('D MMMM HH:mm');
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="chat">
            <div className="chat-messages">
                {collectionData.docs.map((doc, index) => {
                    const message = doc.data();
                    const isCurrentUser = message.username === user.user.nickname;
                    const messageClass = isCurrentUser ? 'chat-message chat-message-current-user' : 'chat-message';
                    const messageStyle = isCurrentUser ? { textAlign: 'right', background: '#272A35' } : { background: '#373E4E' };
                    return (
                        <div className={messageClass} key={index}>
                            <p className="chat-message-timestamp">{formatDate(message.createdAt)}</p>
                            <div className="chat-message-content" style={messageStyle}>
                                {editMessageId === doc.id ? (
                                    <form onSubmit={(event) => updateMessage(doc.id, currentMessage)}>
                                        <input
                                            className="chat-input edit"
                                            type="text"
                                            value={currentMessage}
                                            onChange={(event) => setCurrentMessage(event.target.value.trim())}
                                        />
                                        <button type="submit">Save</button>
                                    </form>
                                ) : (
                                    <>
                                        <Linkify>{message.text}</Linkify>
                                        {isCurrentUser && (
                                            <div>
                                                <button onClick={() => editOnClickHandler(doc.id, message.text)}>Edit</button>
                                                <button onClick={() => deleteMessage(doc.id)}>Delete</button>
                                            </div>
                                        )}
                                    </>
                                )}
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
                    onChange={(event) => setCurrentMessage(event.target.value.trim())}
                />
                <button className="chat-send-button" type="submit"></button>
            </form>
        </div>
    );
};

export default Chat;
