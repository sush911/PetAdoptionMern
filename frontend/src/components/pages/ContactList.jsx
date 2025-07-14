import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contact', {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(res => setMessages(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this message?')) return;
    axios.delete(`http://localhost:5000/api/contact/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    }).then(() => setMessages(messages.filter(m => m._id !== id)))
      .catch(console.error);
  };

  if (messages.length === 0) {
    return <p className="text-center text-muted">No messages found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Sent At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(msg._id)}
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
