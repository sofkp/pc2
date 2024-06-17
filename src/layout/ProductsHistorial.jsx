import React, { useState, useEffect } from 'react';
import { ProductoItem } from './ProductoItem';
import { getProductos } from '../services/api';

export const ProductsHistorial = () => {
  const [productos, setProductos] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [error, setErrors] = useState(null);
 
  const fetchProductos = async () => {
    try {
      const data = await getProductos(skip,limit);
      setProductos(data.content);
      setErrors(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrors('error fetching products')
    }
  }

  useEffect(() => {
    fetchProductos()
  },[skip, limit])

  const handleSkip = () => {
    setSkip(skip + 1)
  }
  const handleLimit = () => {
    setLimit(limit + 1)
  }

  return (
    <section className="flex flex-col items-center">
      <article className="bg-gray-200 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Productos</h1>
        <section className="flex flex-col space-y-4" id="ridesHistorial">
          {productos.map((productos) => (
            <ProductoItem
            id = {productos.product_id} 
            descripcion = {productos.descripcion}
            image_url = {productos.image_url} 
            name = {productos.name}
            price = {productos.price} 
            quantity = {productos.quantity}
            />
          ))}
        </section>
        <button className="bg-purple-700 text-white font-bold py-2 px-6 rounded-full cursor-pointer mt-8"
          onClick={handleSkip} type = "button" >
          Skip más...
        </button>
        <button className="bg-purple-700 text-white font-bold py-2 px-6 rounded-full cursor-pointer mt-8"
          onClick={handleLimit} type = "button" >
          Limit más...
        </button>
      </article>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </section>
  );
};