import React, { useState, useEffect } from 'react';
import { getProduct, deleteProduct } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export const Producto = () => {
  const [productInfo, setProductInfo] = useState({
    descripcion: '', 
    image_url: '', 
    name: '', 
    price: '',
    quantity: ''
  });
  const [error, setErrors] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not allowed');
        navigate('/auth/login');
        return;
      }
      try {
        const data = await getProduct(productId);
        setProductInfo(data);
      } catch (error) {
        setErrors(error.message);
      }
    };

    fetchData();
  }, [productId, navigate]);

  const handleEdit = () => {
    navigate(`/products/edit/${productId}`);
  };

  return (
    <article className="bg-gray-200 rounded-lg p-5 text-center shadow-md mb-5">
      <h1 className="title text-left">Producto</h1>
      <section className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <img src={productInfo.image_url} alt={productInfo.name} className="w-16 h-16 object-cover rounded-full" />
        </div>
        <ul className="list-none p-0 text-left m-0">
          <li id='productName'><b>Nombre:</b> {productInfo.name}</li>
          <li id='productDescription'><b>Descripción:</b> {productInfo.descripcion}</li>
          <li id='productPrice'><b>Precio:</b> ${productInfo.price}</li>
          <li id='productQuantity' className="mb-2"><b>Cantidad:</b> {productInfo.quantity}</li>
        </ul>
        <button className='mx-2 bg-blue-500 text-white py-1 px-3 rounded' type='button' onClick={handleEdit}>Editar producto</button>
      </section>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </article>
  );
};
