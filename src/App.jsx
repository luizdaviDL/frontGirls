import React from 'react';
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-200">
      {/* Navbar */}
      <nav 
        className="w-full shadow-md px-6 py-4 flex justify-between items-center" 
        style={{backgroundColor: "#7DAFC1", height:"2rem"}}> 
        <h2 style={{color:"#e0e0e0ff", marginTop:"-2rem", marginLeft:"2rem"}} className="font-bold text-xl">...</h2>        
      </nav>

      {/* Conteúdo centralizado */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="rounded-2xl p-8 max-w-md w-full text-center bg-gray-200" style={{display:"flex", justifyContent:"center", marginTop:"2rem"}}>                   
            <Outlet/>          
        </div>
      </main>
    </div>
  );
};
