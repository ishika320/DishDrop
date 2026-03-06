import React from "react";
import "./profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {

  const { id } = useParams();
  const [profile, setProfile] = React.useState(null);
  const [ videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, [id]);

  return (
    <main className="profile-page">
      <div className="profile-container">
        <aside className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar" aria-hidden>{profile?.name?.slice(0,1) || 'P'}</div>
            <div className="profile-info">
              <h2 className="profile-business">{profile?.name || 'Business name'}</h2>
              <p className="profile-address">{profile?.address || 'Address'}</p>
              {profile && (
                <div className="profile-contact">
                  <div>{profile.contactName && `Contact: ${profile.contactName}`}</div>
                  <div>{profile.phone && `Phone: ${profile.phone}`}</div>
                  <div>{profile.email && `Email: ${profile.email}`}</div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-number">{videos.length}</span>
              <span className="stat-label">Meals</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{profile?._id ? '—' : ''}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{profile?.phone ? 'Contact' : '-'}</span>
              <span className="stat-label">Contact</span>
            </div>
          </div>
        </aside>

        <section className="profile-card">
          <h3 style={{margin:'0 0 12px 0'}}>Listings</h3>
          <div className="profile-grid">
            {videos.map((video) => (
              <div key={video._id} className="profile-video">
                <video src={video.video} muted controls playsInline />
                <div className="video-meta">
                  <div className="video-name">{video.name}</div>
                  {video.description && <div className="video-desc">{video.description}</div>}
                </div>
              </div>
            ))}
            {videos.length === 0 && <div style={{padding:20,color:'#374151'}}>No listings yet.</div>}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;

