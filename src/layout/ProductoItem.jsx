import React from 'react'


export const ProductoItem = ({ product_id ,descripcion, image_url, name, price, quantity}) => {
  return (
    <article id={id} className="bg-black text-white p-4 rounded-lg mb-4 flex justify-between">
      <section className="flex flex-col">
        <div className="flex items-center mb-2">
          <b className="ml-2">Producto id:</b>
          <span className="ml-2">{product_id}</span>
        </div>
        <div className="flex items-center">
          <b className="ml-2">descripcion:</b>
          <span className="ml-2">{descripcion}</span>
        </div>
      </section>
      <section className="flex flex-col text-right">
        <div className="flex items-center mb-2">
          <b className="ml-2">Imagen url:</b>
          <span className="ml-2">{image_url}</span>
        </div>
        <div className="flex items-center">
          <b className="ml-2">Name:</b>
          <span className="ml-2">{name}</span>
        </div>
      </section>
      <section className="flex flex-col text-right">
        <div className="flex items-center">
          <b className="ml-2">Precio:</b>
          <span className="ml-2">S/. {price.toFixed(2)}</span>
        </div>
        <div className="flex items-center mb-2">
          <b className="ml-2">Cantidad:</b>
          <span className="ml-2">{quantity}</span>
        </div>
      </section>
    </article>
  )
}
