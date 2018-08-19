import axios from 'axios'

const api = process.env.REACT_APP_RECORDS_API_URL || 'http://localhost:5000'

export const getAll = () => 
  axios.get(`${api}/api/vi/records`)

export const create = (body) =>
  axios.post(`${api}/api/vi/records`, body)

export const update = (id, body) =>
  axios.put(`${api}/api/vi/records/${id}`, body)

export const remove = (id) => 
  axios.delete(`${api}/api/vi/records/${id}`)
