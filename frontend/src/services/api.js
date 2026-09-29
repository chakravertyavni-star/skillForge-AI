import axios from 'axios'

/**
 * HTTP client for the Node/Express backend only.
 * The React app must never call the Python AI service or LLM APIs directly.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

export function getLearner() {
  return api.get('/api/learner')
}

export default api
