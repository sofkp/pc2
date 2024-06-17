import axios from "axios";
export const url = ' http://18.117.176.220';

export const fetchLogin = async (password, username) => {
    try {
      const response = await axios.post(`${url}/api/auth/login`, {password, username});
      if (response.status === 200){
       localStorage.setItem('token', response.data.access_token);
        return response.data;
      }else{
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
  
  export const fetchRegister = async (email, full_name, password, username) => {
    try {
      const response = await axios.post(`${url}/api/auth/register`, {email, full_name, password, username});
      console.log(response.status)
      if (response.status === 200){
        console.log(response)
        localStorage.setItem('token', response.data.access_token);
         return response.data;
       }else{
         throw new Error(`Error: ${response.status} - ${response.statusText}`);
       }
     } catch (error) {
       console.error('Error:', error.message);
       throw error;
    }
  };

  export const createProduct = async (descripcion, image_url, name, price, quantity) => {
    try {
      const response = await axios.post(`${url}/api/products`, {descripcion, image_url, name, price, quantity});
      console.log(response.status)
      if (response.status === 200){
        console.log(response)
        localStorage.setItem('token', response.data.access_token);
         return response.data;
       }else{
         throw new Error(`Error: ${response.status} - ${response.statusText}`);
       }
     } catch (error) {
       console.error('Error:', error.message);
       throw error;
    }
  };

  export const getProduct = async (product_id ) => {
    try {
      const response = await axios.get(`${url}/api/products/${product_id}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(response.status === 200){
        return response.data;
      }else{
        throw new Error(`${response.status}-${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en getRidesByUser:', error);
      throw error;
    }
  };
  
  export const getProductos = async (skip, limit) => {
    try {
      const response = await axios.get(`${url}/ride/user?skip=${skip}&limit=${limit}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(response.status === 200){
        return response.data;
      }else{
        throw new Error(`${response.status}-${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en getRidesByUser:', error);
      throw error;
    }
  };

  export const updateProduct = async (product_id ,descripcion, image_url, name, price, quantity) => {
    try {
      const response = await axios.put(`${url}/api/products/${product_id }`, {descripcion, image_url, name, price, quantity});
      console.log(response.status)
      if (response.status === 200){
        console.log(response)
        localStorage.setItem('token', response.data.access_token);
         return response.data;
       }else{
         throw new Error(`Error: ${response.status} - ${response.statusText}`);
       }
     } catch (error) {
       console.error('Error:', error.message);
       throw error;
    }
  };

  export const deleteProduct = async (product_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${url}/api/products/${product_id}`,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error en deleteDriver:', error);
      throw error;
    }
  };