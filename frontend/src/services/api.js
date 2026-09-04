import axios from 'axios'

/**
 * Placeholder HTTP client.
 *
 * NOTHING IN THE APPLICATION USES THIS YET. In the current phase every screen
 * reads from `src/data/*` mock files. This instance exists so that the API
 * layer is already in the right place when the backend is built.
 *
 * When the backend arrives, page-level mock imports will be replaced by
 * service functions built on this client, for example:
 *
 *   export const getSkillGaps = () => api.get('/api/skills/gaps')
 *
 * The React app must only ever talk to the Node/Express backend. It must never
 * call the Python AI service or any LLM provider directly, and no API key
 * belongs in this file.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

export default api
