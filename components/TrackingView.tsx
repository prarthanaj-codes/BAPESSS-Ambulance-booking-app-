import React, { useEffect, useState } from 'react';
import { Phone, MessageSquare, ShieldCheck, MapPin, Navigation } from 'lucide-react';
import { BookingDetails } from '../types';

interface TrackingViewProps {
  booking: BookingDetails;
  onArrived?: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ booking, onArrived }) => {
  const [eta, setEta] = useState(15);
  const [driverLocation, setDriverLocation] = useState(0); // 0 to 100 progress

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onArrived) onArrived();
          return 100;
        }
        return prev + 0.5; // Move progress
      });
      setEta(prev => Math.max(0, Math.ceil(15 - (15 * driverLocation) / 100)));
    }, 200);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run once on mount (interval logic handles closure via functional update, onArrived ref is stable enough or we ignore strict deps for mock)

  const isArrived = driverLocation >= 100;

  return (
    <div className="space-y-6">
      {/* Map Simulation Area */}
      <div className="bg-slate-200 w-full h-64 rounded-2xl relative overflow-hidden shadow-inner border border-slate-300">
        {/* Background Grid to simulate map */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }}>
        </div>
        
        {/* Road Path */}
        <div className="absolute top-1/2 left-10 right-10 h-3 bg-white rounded-full -translate-y-1/2 shadow-sm"></div>
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-blue-100 rounded-full -translate-y-1/2 z-0"></div>

        {/* Start Point (Ambulance Base) */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <div className="bg-slate-800 p-1.5 rounded-full shadow-lg">
             <Navigation className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* End Point (User) */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 translate-x-1/2 flex flex-col items-center z-10">
           <div className="relative">
              <div className="absolute w-full h-full bg-red-500 rounded-full pulse-ring"></div>
              <div className="bg-red-600 p-2 rounded-full shadow-lg relative z-10 border-2 border-white">
                 <MapPin className="h-5 w-5 text-white" />
              </div>
           </div>
           <div className="bg-white px-2 py-0.5 rounded text-xs font-bold mt-1 shadow">You</div>
        </div>

        {/* Moving Ambulance */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ease-linear flex flex-col items-center"
          style={{ left: `calc(10% + ${driverLocation * 0.8}%)` }}
        >
          <div className={`p-2 rounded-full shadow-xl border-2 transition-colors ${isArrived ? 'bg-green-500 border-white' : 'bg-white border-blue-500'}`}>
            <span className="text-xl">🚑</span>
          </div>
          {!isArrived && (
            <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-sm whitespace-nowrap">
              {eta} mins
            </div>
          )}
        </div>
      </div>

      {/* Driver Info Card */}
      <div className={`bg-white rounded-xl p-5 shadow-lg border transition-colors ${isArrived ? 'border-green-200 bg-green-50/30' : 'border-slate-100'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isArrived ? 'Ambulance Arrived' : 'Ambulance En Route'}
            </h3>
            <p className="text-slate-500 text-sm">
              {isArrived ? 'Please meet the driver at pickup.' : `Arriving in ${eta} minutes`}
            </p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Verified Driver
          </span>
        </div>

        <div className="flex items-center gap-4 border-t border-b border-slate-100 py-4">
          <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
             <span className="text-2xl">👨🏽‍✈️</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800">Rajesh Kumar</h4>
            <p className="text-xs text-slate-500">MH 02 CP 4421 • ALS Ambulance</p>
            
            {/* Driver Contact Section */}
            <div className="mt-2 inline-flex flex-col bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                 <Phone className="h-3 w-3 text-slate-500" />
                 <span className="font-bold text-slate-800 text-sm tracking-wide">+91 98765 00001</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 ml-5">
                 For current trip communication only
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Destination</p>
          <div className="flex items-center gap-2 text-slate-800 font-medium">
             <div className="h-2 w-2 rounded-full bg-red-500"></div>
             To: {booking.city} General Hospital
          </div>
        </div>
      </div>
    </div>
  );
};