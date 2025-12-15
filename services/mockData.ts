import { Hospital } from '../types';

export const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

export const HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'AIIMS', city: 'Delhi', rating: 4.8 },
  { id: 'h2', name: 'Max Super Speciality Hospital', city: 'Delhi', rating: 4.6 },
  { id: 'h3', name: 'Fortis Hospital', city: 'Delhi', rating: 4.5 },
  { id: 'h4', name: 'Lilavati Hospital', city: 'Mumbai', rating: 4.7 },
  { id: 'h5', name: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', rating: 4.8 },
  { id: 'h6', name: 'Tata Memorial Hospital', city: 'Mumbai', rating: 4.9 },
  { id: 'h7', name: 'Apollo Hospital', city: 'Bangalore', rating: 4.6 },
  { id: 'h8', name: 'Manipal Hospital', city: 'Bangalore', rating: 4.7 },
  { id: 'h9', name: 'Narayana Health City', city: 'Bangalore', rating: 4.5 },
  { id: 'h10', name: 'Apollo Health City', city: 'Hyderabad', rating: 4.7 },
  { id: 'h11', name: 'Yashoda Hospitals', city: 'Hyderabad', rating: 4.6 },
  { id: 'h12', name: 'Apollo Hospitals Greams Road', city: 'Chennai', rating: 4.8 },
  { id: 'h13', name: 'CMC Vellore (Outstation)', city: 'Chennai', rating: 4.9 },
];

export const getHospitalsByCity = (city: string): Hospital[] => {
  return HOSPITALS.filter(h => h.city === city);
};