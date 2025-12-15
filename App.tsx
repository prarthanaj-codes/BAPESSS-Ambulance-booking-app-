import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BookingForm } from './components/BookingForm';
import { TrackingView } from './components/TrackingView';
import { ChatAssistant } from './components/ChatAssistant';
import { BookingDetails, BookingStatus, PastBooking } from './types';
import { Truck, MapPin, History, Clock, XCircle } from 'lucide-react';

const App: React.FC = () => {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(BookingStatus.IDLE);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  
  // Load history from local storage
  const [bookingHistory, setBookingHistory] = useState<PastBooking[]>(() => {
    try {
      const saved = localStorage.getItem('bookingHistory');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  const handleBookingSubmit = (details: BookingDetails) => {
    setBookingStatus(BookingStatus.SEARCHING);
    setBookingDetails(details);

    // Add to history immediately as a record
    const newRecord: PastBooking = {
      id: Date.now().toString(),
      patientName: details.patientName,
      date: new Date().toLocaleString('en-IN', { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      status: 'Booked',
      city: details.city,
      ambulanceType: details.ambulanceType
    };

    const updatedHistory = [newRecord, ...bookingHistory];
    setBookingHistory(updatedHistory);
    localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));

    // Simulate finding a driver
    setTimeout(() => {
      setBookingStatus(BookingStatus.CONFIRMED);
      // Calculate ETA (15 minutes from now)
      const eta = new Date(Date.now() + 15 * 60000);
      setEstimatedTime(eta.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }, 2500);
  };

  const handleDriverArrived = useCallback(() => {
    setBookingStatus(BookingStatus.ARRIVED);
  }, []);

  const handleCancelBooking = () => {
    if (window.confirm("Are you sure you want to cancel the ambulance? This action cannot be undone.")) {
      setBookingStatus(BookingStatus.IDLE);
      setBookingDetails(null);
      setEstimatedTime('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero / Header Section for IDLE state */}
        {bookingStatus === BookingStatus.IDLE && (
           <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Fastest Ambulance Service in <span className="text-red-600">India</span>
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Book ICU, Ventilator, or Basic ambulances instantly. 
              24/7 Support with live tracking.
            </p>
          </div>
        )}

        <div className="max-w-xl mx-auto">
          {bookingStatus === BookingStatus.IDLE && (
            <>
              <BookingForm onSubmit={handleBookingSubmit} />
              
              {/* Past Bookings Section */}
              {bookingHistory.length > 0 && (
                <div className="mt-12 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <History className="h-5 w-5 text-slate-500" />
                     Past Bookings
                  </h3>
                  <div className="space-y-3">
                     {bookingHistory.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:shadow-md transition-shadow">
                           <div>
                              <p className="font-semibold text-slate-900">{item.patientName}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                 <Clock className="h-3 w-3" /> {item.date}
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-1">
                                 {item.status}
                              </span>
                              <p className="text-xs text-slate-400">{item.city} • {item.ambulanceType}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                </div>
              )}
            </>
          )}

          {bookingStatus === BookingStatus.SEARCHING && (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-6 animate-pulse border border-slate-100">
              <div className="h-20 w-20 mx-auto border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Locating nearest ambulance...</h2>
                <p className="text-slate-500">Scanning fleet in {bookingDetails?.city}...</p>
              </div>
            </div>
          )}

          {(bookingStatus === BookingStatus.CONFIRMED || bookingStatus === BookingStatus.ARRIVED) && bookingDetails && (
            <div className="animate-fadeIn space-y-6">
              
              {/* Status Banner */}
              {bookingStatus === BookingStatus.CONFIRMED && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 text-lg">Ambulance En Route</h3>
                    <p className="text-blue-700 text-sm">Booking Confirmed. Driver is on the way.</p>
                    <p className="text-blue-900 font-bold mt-2 text-lg">
                      Estimated Arrival: <span className="text-xl">{estimatedTime}</span>
                    </p>
                  </div>
                  <div className="ml-auto self-start">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  </div>
                </div>
              )}

              {bookingStatus === BookingStatus.ARRIVED && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-4 shadow-sm animate-pulse">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 text-lg">Ambulance Arrived</h3>
                    <p className="text-green-700 text-sm">Driver is at the pickup location.</p>
                  </div>
                  <div className="ml-auto bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded">
                    NOW
                  </div>
                </div>
              )}
              
              <TrackingView 
                booking={bookingDetails} 
                onArrived={handleDriverArrived} 
              />

              <div className="pt-6">
                <button 
                  onClick={handleCancelBooking}
                  className="w-full py-3 px-4 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 hover:border-red-200 transition flex justify-center items-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  Cancel Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <ChatAssistant />
      
      <footer className="bg-white py-6 border-t mt-auto">
         <div className="text-center text-slate-400 text-sm">
           © 2024 AmbuIndia. Emergency? Call 108.
         </div>
      </footer>
    </div>
  );
};

export default App;