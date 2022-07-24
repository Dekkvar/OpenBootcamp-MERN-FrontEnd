import axios from '../utils/config/axios.config';

/**
 * Login Method
 * @param {string} email Email to login a user
 * @param {string} password Password to login a user
 * @returns 
 */
export const login = (email: string, password: string) => {
  
  // Declare Body to POST
  const body = {
    email,
    password
  }

  // Send POST request to login endpoint
  // http://localhost:8000/api/auth/login
  return axios.post('/auth/login', body)
}

/**
 * Register Method
 * @param {string} name Name to register a user
 * @param {string} email Email to register a user
 * @param {string} password Password to register a user
 * @param {number} age Age to register a user
 * @returns 
 */
export const register = (name: string, email: string, password: string, age: number) => {
  
  // Declare Body to POST
  const body = {
    name,
    email,
    password,
    age
  }

  // Send POST request to login endpoint
  // http://localhost:8000/api/auth/register
  return axios.post('/auth/register', body)
}