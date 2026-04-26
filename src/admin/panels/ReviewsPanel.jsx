import React, { useState, useEffect } from 'react';
import { fetchSectionData, saveSectionData } from '../../services/portfolioService';

const defaultReviews = [
    { id: 1, client: 'Sarah & David', category: 'WEDDING', quote: "CLICK & POSES didn't just take photos; they captured the soul of our wedding. Every frame feels like a piece of art.", image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
    { id: 2, client: 'Marcus Smith', category: 'PORTRAIT', quote: "The editorial session was transformative. I've never seen myself represented with such gravity and precision before.", image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80' },
    { id: 3, client: 'Elena Rodriguez', category: 'EVENT', quote: 'Professionalism at its peak. They documented our company gala with an eye for detail that was absolutely stunning.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80' },
    { id: 4, client: 'The Henderson Family', category: 'LIFESTYLE', quote: 'Timeless memories. The way they work with natural light is pure magic. We will cherish these portraits forever.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80' },
    { id: 5, client: 'James Chen', category: 'COMMERCIAL', quote: 'Precision and vision. They understood our brand immediately and delivered visuals that surpassed all expectations.', image: 'https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&w=1200&q=80' },
];

const ReviewsPanel = () => {
    const [reviews, setReviews] = useState(defaultReviews);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await fetchSectionData('reviews');
                if (data && Array.isArray(data)) setReviews(data);
            } catch (err) {
                console.error("Failed to load reviews:", err);
            } finally {
                setLoading(false);
            }
        };
        loadReviews();
    }, []);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newReview, setNewReview] = useState({ client: '', category: '', quote: '', image: '' });

    const handleChange = (id, field, value) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSectionData('reviews', reviews);
            setEditingId(null);
            alert('Reviews saved!');
        } catch (err) {
            console.error("Failed to save reviews:", err);
            alert('Failed to save. Check permissions.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this review?')) {
            setReviews(prev => prev.filter(r => r.id !== id));
        }
    };

    const handleAdd = () => {
        if (!newReview.client || !newReview.quote) return;
        const review = { ...newReview, id: Date.now() };
        setReviews(prev => [...prev, review]);
        setNewReview({ client: '', category: '', quote: '', image: '' });
        setShowAddForm(false);
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Manage client testimonials displayed on your website.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {loading && <span style={{ color: 'var(--gold)' }}>Loading...</span>}
                    <button className="admin-btn admin-btn-ghost" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancel' : '+ Add Review'}
                    </button>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || loading}>
                        {saving ? 'Saving...' : 'Save All'}
                    </button>
                </div>
            </div>

            {showAddForm && (
                <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>New Review</h3>
                    <div className="admin-grid-2">
                        <div className="admin-form-group">
                            <label className="admin-form-label">Client Name</label>
                            <input className="admin-input" type="text" value={newReview.client} onChange={(e) => setNewReview(p => ({ ...p, client: e.target.value }))} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Category</label>
                            <input className="admin-input" type="text" placeholder="WEDDING, PORTRAIT, etc." value={newReview.category} onChange={(e) => setNewReview(p => ({ ...p, category: e.target.value }))} />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Quote</label>
                        <textarea className="admin-textarea" rows="3" value={newReview.quote} onChange={(e) => setNewReview(p => ({ ...p, quote: e.target.value }))} />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Image URL</label>
                        <input className="admin-input" type="url" value={newReview.image} onChange={(e) => setNewReview(p => ({ ...p, image: e.target.value }))} />
                    </div>
                    <button className="admin-btn admin-btn-primary" onClick={handleAdd}>Add Review</button>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Client</th>
                            <th>Category</th>
                            <th>Quote</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>
                                    {review.image && <img src={`${review.image}&w=100`} alt={review.client} className="admin-table-img" />}
                                </td>
                                <td>
                                    {editingId === review.id ? (
                                        <input className="admin-input" value={review.client} onChange={(e) => handleChange(review.id, 'client', e.target.value)} style={{ width: '150px' }} />
                                    ) : review.client}
                                </td>
                                <td>
                                    {editingId === review.id ? (
                                        <input className="admin-input" value={review.category} onChange={(e) => handleChange(review.id, 'category', e.target.value)} style={{ width: '120px' }} />
                                    ) : <span className="badge badge-gold">{review.category}</span>}
                                </td>
                                <td style={{ maxWidth: '300px' }}>
                                    {editingId === review.id ? (
                                        <textarea className="admin-textarea" value={review.quote} onChange={(e) => handleChange(review.id, 'quote', e.target.value)} rows="2" style={{ width: '100%' }} />
                                    ) : <span style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>"{review.quote.substring(0, 80)}..."</span>}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="admin-btn admin-btn-ghost" onClick={() => setEditingId(editingId === review.id ? null : review.id)} style={{ padding: '0.5rem 1rem' }}>
                                            {editingId === review.id ? '✓' : '✎'}
                                        </button>
                                        <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(review.id)} style={{ padding: '0.5rem 1rem' }}>✕</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewsPanel;
