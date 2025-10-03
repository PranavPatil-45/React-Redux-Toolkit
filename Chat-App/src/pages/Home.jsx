import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUsers } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export default function Home() {
  const { currentUser, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUser) return;

    const newMessage = {
      id: Date.now().toString(), 
      text: messageText.trim(),
      senderId: currentUser.id,
      senderName: currentUser.name || currentUser.email,
      timestamp: new Date(),
      isLocal: true 
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    setMessageText('');

   
    console.log('Message sent:', newMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="whatsapp-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0)}
            </div>
            <span className="user-name">{currentUser?.name || currentUser?.email}</span>
          </div>
          <div className="header-actions">
            <button className="icon-btn" title="Status">
              <span className="material-icons">circle</span>
            </button>
            <button className="icon-btn" title="New chat">
              <span className="material-icons">chat</span>
            </button>
            <button className="icon-btn" title="Menu">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
        </div>

        <div className="search-container">
          <div className="search-box">
            <span className="material-icons search-icon">search</span>
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="users-list">
          {filteredUsers
            .filter(user => user.id !== currentUser?.id)
            .map((user) => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedUser(user);
                  setMessages([]); 
                }}
              >
                <div className="user-avatar">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.name || user.email}</div>
                  <div className="last-message">Tap to start conversation</div>
                </div>
                <div className="message-info">
                  <div className="time">12:00</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="user-avatar">
                  {selectedUser.name?.charAt(0) || selectedUser.email?.charAt(0)}
                </div>
                <div className="user-details">
                  <div className="user-name">{selectedUser.name || selectedUser.email}</div>
                  <div className="user-status">online</div>
                </div>
              </div>
              <div className="chat-actions">
                <button className="icon-btn" title="Video call">
                  <span className="material-icons">videocam</span>
                </button>
                <button className="icon-btn" title="Voice call">
                  <span className="material-icons">call</span>
                </button>
                <button className="icon-btn" title="Menu">
                  <span className="material-icons">more_vert</span>
                </button>
              </div>
            </div>

            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="welcome-message">
                  <div className="welcome-avatar">
                    {selectedUser.name?.charAt(0) || selectedUser.email?.charAt(0)}
                  </div>
                  <div className="welcome-text">
                    <h3>{selectedUser.name || selectedUser.email}</h3>
                    <p>Say hello to start chatting!</p>
                  </div>
                </div>
              ) : (
                <div className="message-list">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.senderId === currentUser.id ? 'sent' : 'received'
                      }`}
                    >
                      <div className="message-content">
                        <div className="message-text">{message.text}</div>
                        <div className="message-time">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="message-input-container">
              <div className="input-actions">
                <button className="icon-btn" title="Emoji">
                  <span className="material-icons">emoji_emotions</span>
                </button>
                <button className="icon-btn" title="Attach file">
                  <span className="material-icons">attach_file</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="message-input"
              />
              <button 
                className="send-btn" 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                title="Send message"
              >
                <span className="material-icons">send</span>
              </button>
            </div>
          </>
        ) : (
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="whatsapp-icon">
                <span className="material-icons">chat</span>
              </div>
              <h1>WhatsApp Web</h1>
              <p>Send and receive messages without keeping your phone online.</p>
              <p>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
              <div className="security-notice">
                <span className="material-icons">lock</span>
                <span>Your personal messages are end-to-end encrypted</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout} title="Logout">
        <span className="material-icons">logout</span>
      </button>
    </div>
  );
}