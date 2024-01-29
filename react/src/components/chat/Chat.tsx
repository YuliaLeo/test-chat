import React, { useState } from 'react';
import './Chat.scss';

const Chat: React.FC = () => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            author: 'Julius Caesar',
            timestamp: '12:44 pm',
            text: 'Thank you for contacting our online support center. How may I assist you today?'
        }
    ]);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                author: 'Current User',
                timestamp: new Date().toLocaleTimeString(),
                text: newMessage
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat">
            <h1 className="chat__header">React Test Chat</h1>
            <div className="chat__messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <div className="message__header">
                            <span className="message__author">{message.author}</span>
                            <span className="message__timestamp">{message.timestamp}</span>
                        </div>
                        <div className="message__text">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="chat__new-message new-message">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="new-message__input"
                />
                <button onClick={sendMessage} className="new-message__btn">Send</button>
            </div>
        </div>
    );
};

export default Chat;