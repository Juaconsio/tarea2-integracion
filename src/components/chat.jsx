import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './card';

// Your component definition here...

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    Chat.propTypes = {
      lastJsonMessage: PropTypes.any, // or replace 'any' with the actual type you expect
      sendJsonMessage: PropTypes.any
    };
  }

  componentDidUpdate(prevProps) {
    let newMessageContent = null;
    if (prevProps.lastJsonMessage !== this.props.lastJsonMessage) {
      const { messages } = this.state;
      if (this.props.lastJsonMessage?.type === "message") {
        newMessageContent = this.props.lastJsonMessage;
      }
      if (newMessageContent) {
        this.setState({ messages: [...messages, newMessageContent] });
      }
    }
  }

  handleInputChange = (event) => {
    this.setState({ newMessage: event.target.value });
  }

  handleSendMessage = () => {
    const { newMessage } = this.state;
    if (newMessage.trim() !== '') {
      this.props.sendJsonMessage(
        {
          "type": "MESSAGE",
          "payload": {
            "content": `${newMessage}`,
          }
        }
      );
    }
  }

  render() {
    const { messages, newMessage } = this.state;
    return (
      <div className="chat-container" style={{ height: '80vh', width: '30vw', position: 'relative' }}>
        <div className="chat-messages" >
          {messages.slice(-3).map((message, index) => (
            <div key={index}>
              <ChatMessage message={message} />
            </div>
          ))}
        </div>
        <div className="chat-input" style={{ position: 'absolute', bottom: '0' }}>
          <input type="text" value={newMessage} onChange={this.handleInputChange} />
          <button onClick={this.handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
