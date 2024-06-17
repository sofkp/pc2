import React, {useState} from 'react'
import { fetchLogin } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const [error, setErrors] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    
      const handleLogin = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          const response = await fetchLogin(formData.password, formData.username);
          setErrors(null);
          console.log(localStorage.getItem('token'))
          navigate('/dashboard')
        } catch (error) {
          setErrors(error.message);
        }
      };

      const handleGoLogin = async () =>{
        navigate('/auth/login')
      }
      const handleGoRegister = async () =>{
        navigate('/auth/register')
      }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <section className='flex space-x-2'>
        <button className='mx-2' type='button' onClick={handleGoLogin}>Iniciar Sesión</button>
        <button className='mx-2' type='button' onClick={handleGoRegister}>Registrarse</button>
      </section>
      
    <section className="lg:w-1/2 p-8"> 
      <form>
        <h1>Login</h1>
        <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input type="username" name="username" id="username" 
            onChange={handleChange}
            value={formData.username}
            required/>
        </div>
        <div className="mb-4">
        <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" 
            onChange={handleChange}
            value={formData.password}
            required/>
        </div>
        <button id="loginSubmit" type="submit" onClick={handleLogin}>Iniciar Sesión </button>
          </form>
    </section>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </main>
  )
}
