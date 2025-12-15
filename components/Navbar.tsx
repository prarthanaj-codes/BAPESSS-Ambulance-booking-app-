import React from 'react';
import { Ambulance, Phone, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="bg-red-600 p-2 rounded-full mr-3">
              <Ambulance className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Ambu<span className="text-red-600">India</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="tel:108" 
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition animate-pulse"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency 108</span>
              <span className="sm:hidden">108</span>
            </a>
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};