import axios from "axios"


const baseURL = 'https://restcountries.com/v3.1/all'

const getAll = async () => {
  const request = await axios.get(baseURL)
  return request
}

export default {
  getAll
}