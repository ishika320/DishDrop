import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../general/home.css';

const Saved = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // backend should expose GET /api/food/saved returning saved items for the user
        axios.get('http://localhost:3000/api/food/saved', { withCredentials: true })
            .then(res => {
                setItems(res.data.savedItems || []);
            })
            .catch(err => {
                setError('Could not load saved items. The backend route GET /api/food/saved may be missing.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleUnsave = async (foodId) => {
        try {
            await axios.post('http://localhost:3000/api/food/save', { foodId }, { withCredentials: true });
            setItems(prev => prev.filter(i => String(i._id) !== String(foodId)));
        } catch (err) {
            console.error('Unsave failed', err);
        }
    }

    if (loading) return <div style={{padding:20,color:'#fff'}}>Loading saved items...</div>;
    if (error) return <div style={{padding:20,color:'#fff'}}>{error}</div>;

    if (!items.length) return <div style={{padding:20,color:'#fff'}}>No saved items yet.</div>;

    return (
        <div className="saved-page">
            <h2 className="saved-title">Saved</h2>

            <div className="saved-list">
                {items.map(item => (
                    <div key={item._id} className="saved-item">
                        <div className="saved-media">
                            <video src={item.video} className="saved-video" controls />
                        </div>

                        <div className="saved-meta">
                            <p className="saved-desc">{item.description}</p>
                            <div className="saved-actions">
                                <Link to={'/food-partner/' + (item.foodPartner || '')} className="visit-btn">Visit store</Link>
                                <button onClick={() => handleUnsave(item._id)} className="visit-btn unsave-btn">Unsave</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Saved;
