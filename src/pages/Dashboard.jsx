import React from 'react';
import { ProductsHistorial } from '../layout/ProductsHistorial';
import { Producto } from '../layout/Producto';

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <section className='flex space-x-2'>
        <Producto />
      </section>
      <section>
        <ProductsHistorial />
      </section>
    </main>
  );
};

export default Dashboard;
