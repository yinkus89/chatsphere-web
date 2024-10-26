import React, { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessages } from "../services/api";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/styles.css"; // Add a CSS file for styling

const Chat = () => {
  const { user } = useAuth(); // Get user info from AuthContext
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // State to hold chat history
  const chatEndRef = useRef(null); // Reference to scroll to the latest message

  // Fetch chat history when component mounts
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await fetchMessages(user.id); // Fetch messages for the current user
        setChatHistory(messages); // Update state with fetched messages
      } catch (err) {
        setStatus("Failed to load chat history");
      }
    };

    loadMessages();
  }, [user.id]); // Fetch messages whenever user ID changes

  // Scroll to the bottom of chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!to || !message) {
      setStatus("Recipient ID and message cannot be empty.");
      return;
    }

    setStatus(""); // Clear previous status
    setLoading(true); // Set loading state

    try {
      const response = await sendMessage(to, message);
      setStatus(response.message || "Message sent successfully!"); // Use response message if available

      // Optimistic UI update: add the message to chat history immediately
      const newMessage = { from: user.id, to, text: message };
      setChatHistory((prevMessages) => [...prevMessages, newMessage]);

      setMessage(""); // Clear message input
      setTo(""); // Clear recipient input
    } catch (err) {
      console.error(err); // Log the error for debugging
      setStatus("Failed to send message");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>

      {/* Recipient ID Input */}
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient ID"
        className="input-field"
      />

      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="input-field"
      />

      {/* Send Button */}
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>

      {/* Status Message */}
      {status && <p className="status-message">{status}</p>}

      {/* Chat History */}
      <div className="chat-history">
        <h3>Chat History:</h3>
        {chatHistory.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.from === user.id ? "sent" : "received"
              }`}
            >
              <strong>{msg.from === user.id ? "You" : msg.from}</strong>:{" "}
              {msg.text}
            </div>
          ))
        )}
        <div ref={chatEndRef} /> {/* Scroll reference */}
      </div>
    </div>
  );
};

export default Chat;
