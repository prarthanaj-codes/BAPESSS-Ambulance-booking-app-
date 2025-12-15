import React, { useState, useEffect } from 'react';
import { MapPin, User, Phone, Building2, Truck, Navigation } from 'lucide-react';
import { AmbulanceType, BookingDetails, Hospital } from '../types';
import { INDIAN_CITIES, getHospitalsByCity } from '../services/mockData';

interface BookingFormProps {
  onSubmit: (details: BookingDetails) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingDetails>({
    patientName: '',
    contactNumber: '',
    emergencyContactNumber: '',
    city: 'Delhi',
    pickupLocation: '',
    hospitalId: '',
    ambulanceType: AmbulanceType.BLS
  });

  const [availableHospitals, setAvailableHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    setAvailableHospitals(getHospitalsByCity(formData.city));
    // Reset hospital selection if city changes
    setFormData(prev => ({ ...prev, hospitalId: '' }));
  }, [formData.city]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        // Mocking reverse geocoding
        setFormData(prev => ({ ...prev, pickupLocation: 'Current Location (Detected)' }));
      }, (error) => {
        alert("Location access denied. Please enter manually.");
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto border border-slate-100">
      <div className="bg-slate-900 p-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          Book an Ambulance
          <span className="text-xs font-normal bg-red-600 px-2 py-0.5 rounded text-white ml-auto">
            Step {step}/3
          </span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                >
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter pickup address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    required
                  />
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="bg-blue-50 text-blue-600 p-3 rounded-lg hover:bg-blue-100 transition"
                  title="Use Current Location"
                >
                  <Navigation className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Destination Hospital</label>
              <div className="relative">
                <select
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select a hospital</option>
                  {availableHospitals.map(h => (
                    <option key={h.id} value={h.id}>{h.name} ({h.rating}★)</option>
                  ))}
                </select>
                <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-md font-medium text-slate-900">Patient Details</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Who is the patient?"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  required
                />
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  placeholder="Relative or secondary contact"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-md font-medium text-slate-900">Select Ambulance Type</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(AmbulanceType).map((type) => (
                <label
                  key={type}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.ambulanceType === type
                      ? 'border-red-500 bg-red-50 ring-1 ring-red-500'
                      : 'border-slate-200 hover:border-red-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="ambulanceType"
                    value={type}
                    checked={formData.ambulanceType === type}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <div className="ml-3 flex-1">
                    <span className="block text-sm font-medium text-slate-900">{type}</span>
                    <span className="block text-xs text-slate-500">
                      {type.includes('BLS') ? 'Standard equipment for non-critical.' :
                       type.includes('ALS') ? 'Ventilator & ECG for critical care.' :
                       type.includes('ICU') ? 'Full ICU setup on wheels.' : 'Standard transport.'}
                    </span>
                  </div>
                  <Truck className={`h-6 w-6 ${formData.ambulanceType === type ? 'text-red-600' : 'text-slate-400'}`} />
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 px-4 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-red-600 rounded-lg text-white font-bold hover:bg-red-700 transition shadow-lg shadow-red-200"
          >
            {step === 3 ? 'Confirm Booking' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};