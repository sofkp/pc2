import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct, getProduct } from '../services/api';

export const EditProduct = ({productId}) => {
  const [formData, setFormData] = useState({
    descripcion: '',
    image_url: '',
    name: '',
    price: '',
    quantity: ''
  });
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not allowed');
        navigate('/auth/login');
        return;
      }
      try {
        const data = await getProduct();
        setProductId(data.id);
        setFormData({
          descripcion: data.descripcion,
          image_url: data.image_url,
          name: data.name,
          price: data.price,
          quantity: data.quantity
        });
      } catch (error) {
        setError('Error fetching product data');
      }
    };

    fetchProductData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not allowed');
      navigate('/auth/login');
      return;
    }
    try {
      const response = await updateProduct(productId, formData.descripcion, formData.image_url, formData.name, formData.price, formData.quantity);
      console.log('Product updated:', response);
      setError(null);
    } catch (error) {
      setError('Update failed');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(productId);
      console.log('Product deleted');
      navigate('/dashboard');
    } catch (error) {
      setError('Delete failed');
    }
  };

  return (
    <main className='w-full flex flex-col items-center'>
      <form className='bg-gray-200 p-8 shadow-lg rounded-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-4'>Editar Producto</h1>
        <div className="mb-5 w-full">
          <label className='block mb-2 text-sm text-black pl-4' htmlFor="name">Nombre</label>
          <input
            className='w-full p-2 text-lg rounded border border-gray-300'
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5 w-full">
          <label className='block mb-2 text-sm text-black pl-4' htmlFor="descripcion">Descripción</label>
          <input
            className='w-full p-2 text-lg rounded border border-gray-300'
            type="text"
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5 w-full">
          <label className='block mb-2 text-sm text-black pl-4' htmlFor="image_url">URL de Imagen</label>
          <input
            className='w-full p-2 text-lg rounded border border-gray-300'
            type="text"
            name="image_url"
            id="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5 w-full">
          <label className='block mb-2 text-sm text-black pl-4' htmlFor="price">Precio</label>
          <input
            className='w-full p-2 text-lg rounded border border-gray-300'
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5 w-full">
          <label className='block mb-2 text-sm text-black pl-4' htmlFor="quantity">Cantidad</label>
          <input
            className='w-full p-2 text-lg rounded border border-gray-300'
            type="text"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <button
          id='updateSubmit'
          className='w-full p-3 text-lg rounded-full border-none bg-purple-700 text-white cursor-pointer mb-5'
          type="submit"
          onClick={handleSubmit}
        >Actualizar
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <button
        className='bg-red-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer'
        id='deleteProduct'
        onClick={handleDelete}
      >Eliminar Producto
      </button>
    </main>
  );
};
