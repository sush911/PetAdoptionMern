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

  if (loading) return <p className="text-center mt-5">Loading contact messages...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary fw-bold display-6">
        <i className="bi bi-envelope-paper me-2" /> Contact Messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-center text-muted fs-5">No contact messages found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
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
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(msg._id)}
                    >
                      <i className="bi bi-trash-fill" /> Delete
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
