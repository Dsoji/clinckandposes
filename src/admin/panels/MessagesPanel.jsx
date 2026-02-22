import React, { useState } from 'react';

const sampleMessages = [
    { id: 1, name: 'Jessica Thompson', email: 'jessica@example.com', message: 'Hi, I am interested in booking a wedding photography session for March 2027. Could you provide pricing and availability?', timestamp: '2026-02-22T14:30:00', read: false },
    { id: 2, name: 'David Okonkwo', email: 'david.ok@example.com', message: 'We had an amazing experience with Click & Poses at our corporate event last week. Would love to discuss a retainer arrangement for future events.', timestamp: '2026-02-21T10:15:00', read: false },
    { id: 3, name: 'Maria Santos', email: 'maria.santos@example.com', message: 'I would like to inquire about your photobooth rental for a birthday party on April 5th. How many hours are included?', timestamp: '2026-02-20T16:45:00', read: true },
];

const MessagesPanel = () => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('cp_messages_data');
        return saved ? JSON.parse(saved) : sampleMessages;
    });
    const [selectedMessage, setSelectedMessage] = useState(null);

    const toggleRead = (id) => {
        const updated = messages.map(m => m.id === id ? { ...m, read: !m.read } : m);
        setMessages(updated);
        localStorage.setItem('cp_messages_data', JSON.stringify(updated));
    };

    const deleteMessage = (id) => {
        if (confirm('Delete this message?')) {
            const updated = messages.filter(m => m.id !== id);
            setMessages(updated);
            localStorage.setItem('cp_messages_data', JSON.stringify(updated));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    };

    const formatDate = (ts) => {
        const d = new Date(ts);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Contact form submissions from your website. {unreadCount > 0 && <span style={{ color: 'var(--color-gold)' }}>{unreadCount} unread</span>}
                </p>
            </div>

            <div className="admin-grid-2">
                {/* Message List */}
                <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                    {messages.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                            No messages yet
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message-item ${!msg.read ? 'unread' : ''}`}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.read) toggleRead(msg.id);
                                }}
                                style={{ background: selectedMessage?.id === msg.id ? 'rgba(212,175,55,0.03)' : '' }}
                            >
                                <div className="message-header">
                                    <span className="message-sender">{msg.name}</span>
                                    <span className="message-time">{formatDate(msg.timestamp)}</span>
                                </div>
                                <div className="message-email">{msg.email}</div>
                                <div className="message-preview">{msg.message.substring(0, 100)}...</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Detail */}
                <div className="admin-card">
                    {selectedMessage ? (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h3 className="admin-card-title">{selectedMessage.name}</h3>
                                    <p className="message-email" style={{ marginTop: '0.5rem' }}>{selectedMessage.email}</p>
                                    <span className="message-time">{formatDate(selectedMessage.timestamp)}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="admin-btn admin-btn-ghost" onClick={() => toggleRead(selectedMessage.id)} style={{ padding: '0.5rem 1rem', fontSize: '0.6rem' }}>
                                        {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                                    </button>
                                    <button className="admin-btn admin-btn-danger" onClick={() => deleteMessage(selectedMessage.id)} style={{ padding: '0.5rem 1rem', fontSize: '0.6rem' }}>Delete</button>
                                </div>
                            </div>
                            <div style={{ lineHeight: 2, color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                {selectedMessage.message}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'rgba(255,255,255,0.2)' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Select a message to read</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPanel;
