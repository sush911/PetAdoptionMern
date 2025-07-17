import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const ContactList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-5 display-5">
        <i className="bi bi-envelope-paper me-2"></i>Contact Messages
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Fetching messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="alert alert-secondary text-center fs-5">No contact messages found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light text-center">
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
                  <td className="text-wrap" style={{ maxWidth: '300px' }}>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(msg._id)}
                    >
                      <i className="bi bi-trash-fill me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
