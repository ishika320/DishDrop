import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CommentsPanel({ item, onAdd }) {
    const [text, setText] = useState('');

    return (
        <div className="comments">
            <div className="comments-list">
                {(item.comments || []).map(c => (
                    <div key={c.id} className="comment">{c.text}</div>
                ))}
            </div>
            <div className="comments-input">
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment" />
                <button onClick={() => { if (text.trim()) { onAdd(text.trim()); setText(''); } }}>Post</button>
            </div>
        </div>
    )
}

// Public video URLs (remote). If a remote URL fails to load, the video element will fall back to the local files under /videos/
const sampleVideos = [
    {
        id: 1,
        src: 'https://www.pexels.com/download/video/6252805/',
        fallback: '/videos/food1.mp4',
        description: 'Delicious handcrafted meals prepared by talented local chefs. Experience authentic flavors, premium ingredients, and limited-time offers made just for food lovers.',
        store: '/create-food'
    },
    {
        id: 2,
        src: 'https://www.pexels.com/download/video/3298481/',
        fallback: '/videos/food2.mp4',
        description: 'Delicious handcrafted meals prepared by talented local chefs. Experience authentic flavors, premium ingredients, and limited-time offers made just for food lovers.',
        store: '/create-food'
    },
    {
        id: 3,
        src: 'https://www.pexels.com/download/video/5726652/',
        fallback: '/videos/food3.mp4',
        description: 'Craving food late at night? Our partner stores are open till 2 AM with tasty snacks, quick bites, and fast delivery to satisfy your midnight hunger.',
        store: '/create-food'
    }
];

const Home = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [videos, setVideos] = useState(sampleVideos.map(v => ({
        id: v.id,
        src: v.src,
        fallback: v.fallback,
        description: v.description,
        store: v.store,
        likeCount: v.likeCount || 0,
        liked: false,
        saved: false
    })));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const videos = container.querySelectorAll('video');
        const options = { threshold: [0.6] };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const vid = entry.target;
                if (entry.intersectionRatio >= 0.6) {
                    vid.play().catch(() => {});
                } else {
                    vid.pause();
                }
            });
        }, options);

        videos.forEach(v => {
            v.pause();
            observer.observe(v);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // fetch real videos from backend (falls back to sampleVideos)
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {

        

                const items = (response.data.foodItems || []).map(fi => ({
                    id: fi._id,
                    src: fi.video || fi.src,
                    fallback: '/videos/food1.mp4',
                    description: fi.description || '',
                    store: '/create-food',
                    likeCount: fi.likeCount || 0,
                    liked: false,
                    saved: false
                }));

                if (items.length) setVideos(items);
            })
            .catch(() => {
                // ignore - keep sample videos
            });
    }, []);

    const handleLike = async (foodId) => {
        try {
            const res = await axios.post('http://localhost:3000/api/food/like', { foodId }, { withCredentials: true });

            setVideos(prev => prev.map(v => {
                if (String(v.id) !== String(foodId)) return v;

                if (res.status === 201) {
                    return { ...v, likeCount: (v.likeCount || 0) + 1, liked: true };
                }

                // status 200 means unliked
                return { ...v, likeCount: Math.max(0, (v.likeCount || 1) - 1), liked: false };
            }));
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert('Please log in to like items.');
                navigate('/user/login');
                return;
            }
            console.error('Like failed', err);
        }
    }

    const handleSave = async (foodId) => {
        try {
            const res = await axios.post('http://localhost:3000/api/food/save', { foodId }, { withCredentials: true });

            setVideos(prev => prev.map(v => {
                if (String(v.id) !== String(foodId)) return v;

                // 201 -> saved, 200 -> removed from saves
                if (res.status === 201) return { ...v, saved: true };
                return { ...v, saved: false };
            }));
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert('Please log in to save items.');
                navigate('/user/login');
                return;
            }
            console.error('Save failed', err);
        }
    }

    return (
        <div className="reels-container" ref={containerRef} aria-label="Video reels">
            {videos.map(item => (
                <section className="reel" key={item.id}>
                    <video
                        src={item.src}
                        muted
                        autoPlay
                        playsInline
                        loop
                        preload="metadata"
                        className="reel-video"
                        aria-label={`Video ${item.id}`}
                        onError={(e) => {
                            // fallback to local bundled video if remote fails
                            if (item.fallback && e.target.src !== item.fallback) {
                                e.target.src = item.fallback;
                                e.target.load();
                                e.target.play().catch(() => {});
                            }
                        }}
                    />

                    <div className="overlay">
                        <div className="overlay-right-controls" role="group" aria-label="actions">
                            <button
                                className={"icon-btn vertical like-btn" + (item.liked ? ' liked' : '')}
                                onClick={() => handleLike(item.id)}
                                aria-pressed={item.liked}
                                title={item.liked ? 'Unlike' : 'Like'}
                            >
                                <span className="icon">❤️</span>
                                <div className="label-box">Likes: {item.likeCount || 0}</div>
                            </button>

                            <button
                                className={"icon-btn vertical comment-btn"}
                                onClick={() => setVideos(prev => prev.map(v => v.id === item.id ? { ...v, showComments: !v.showComments } : v))}
                                title="Comments"
                            >
                                <span className="icon">💬</span>
                                <div className="label-box">Comments: {(item.comments || []).length || 0}</div>
                            </button>

                            <button
                                className={"icon-btn vertical save-btn" + (item.saved ? ' saved' : '')}
                                onClick={() => handleSave(item.id)}
                                aria-pressed={item.saved}
                                title={item.saved ? 'Unsave' : 'Save'}
                            >
                                <span className="icon">🔖</span>
                                <div className="label-box">{item.saved ? 'Saved' : 'Save'}</div>
                            </button>
                        </div>

                        <div className="overlay-bottom insta-caption">
                            <div className="caption-left">
                                <div className="creator">@{item.foodPartnerName || (item.store || 'creator')}</div>
                                <div className="caption-text">{item.description}</div>
                                <div className="caption-actions">
                                    <Link className="visit-btn" to={"/food-partner/" + (item.foodPartner || item.store)}>
                                        Visit store
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {item.showComments && (
                            <div className="comments-panel">
                                <CommentsPanel
                                    item={item}
                                    onAdd={(text) => {
                                        setVideos(prev => prev.map(v => {
                                            if (v.id !== item.id) return v;
                                            const comments = (v.comments || []).concat({ id: Date.now(), text });
                                            return { ...v, comments };
                                        }))
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            
        </div>
    );
};

export default Home;