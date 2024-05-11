import PropTypes from 'prop-types';
import './card.css'; // Importa el archivo CSS

const ChatMessage = ({ message }) => {
  ChatMessage.propTypes = {
    message: PropTypes.object, // Cambia "object" por el tipo de dato apropiado
  };

  return (
    <div className="container_chat">
      <div className="message-header">
        <span className="name_chat">{message.data.name}</span>
        <div className='info_chat'>
          <span className="train">Train_id: {message.data.train_id}</span>
          <span className="level">Level: {message.data.level}</span>
        </div>
      </div>
      <div className='chat_content'>

        <div className="message-content">{message.data.content}</div>
        <div className="time-right">{message.timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage;