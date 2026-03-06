import React from 'react'
import './createfood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [videoFile, setVideoFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const navigate = useNavigate();
  
    React.useEffect(() => {
      let cancelled = false
      axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
        .then(res => {
          if (cancelled) return
          const user = res.data.user
          // only allow food-partner to access create page
          if (!user || user.role !== 'partner') {
            navigate('/user/food-partner/login')
          }
        })
        .catch(() => {
          if (!cancelled) navigate('/user/food-partner/login')
        })
  
      return () => { cancelled = true }
    }, [navigate])

  React.useEffect(() => {
    if (!videoFile) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(videoFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [videoFile])

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) setVideoFile(file)
  }

  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    if (!videoFile) return alert('Please select a video file')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', videoFile)

    try {
      setLoading(true)
        const res = await axios.post('http://localhost:3000/api/food/', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(res.data)
        navigate('/home');
      alert('Food saved successfully')
      // reset form
      setName('')
      setDescription('')
      setVideoFile(null)
    } catch (err) {
      console.error('Upload failed', err)
      alert(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-food-page">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <div className="card-head" style={{marginBottom:12, textAlign:'center'}}>
          <div className="visual-icon animate" aria-hidden style={{margin:'0 auto 6px'}}>
            <svg className="icon-chef" viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ef476f" />
                </linearGradient>
                <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffd166" />
                  <stop offset="100%" stopColor="#06d6a0" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="12" fill="url(#g1)" opacity="0.06" />
              <g transform="translate(8,8)">
                <path d="M24 2c-6 0-10 4-10 8 0 2 .5 3.5 1.5 4.8C14 18 12 20 12 24v6h24v-6c0-4-2-6-3.5-9.2C35.5 13.5 36 12 36 10c0-4-4-8-12-8z" fill="url(#g2)" />
                <rect x="8" y="26" width="24" height="6" rx="3" fill="#fff" opacity="0.9" />
              </g>
            </svg>
          </div>
          <h2>Create Food</h2>
        </div>
        <p className="subtitle">Upload a short video, give it a name, and add a description.</p>

        <label className="form-group file-group">
          <span className="label">Food video</span>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          <div className="helper">MP4, WEBM, or MKV · Max 100MB recommended</div>
          {videoFile && <div className="file-info">Selected: {videoFile.name}</div>}
        </label>

        <label className="form-group">
          <span className="label">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Spicy Pepper Wrap"
            required
          />
        </label>

        <label className="form-group">
          <span className="label">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description: ingredients, taste, spice level, etc."
            rows={4}
          />
        </label>

        {preview && (
          <div className="preview">
            <video src={preview} controls className="preview-video" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn primary">Save Food</button>
          <button
            type="button"
            className="btn muted"
            onClick={() => {
              setName('')
              setDescription('')
              setVideoFile(null)
            }}
          >
            Reset
          </button>
        </div>

        
      </form>
    </div>
  )
}

export default CreateFood;
