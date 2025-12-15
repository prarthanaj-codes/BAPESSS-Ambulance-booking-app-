export enum AmbulanceType {
  BLS = 'Basic Life Support (BLS)',
  ALS = 'Advanced Life Support (ALS)',
  ICU = 'ICU Ambulance',
  MORTUARY = 'Mortuary Van',
  PATIENT_TRANSFER = 'Patient Transfer'
}

export enum BookingStatus {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  CONFIRMED = 'CONFIRMED',
  ARRIVED = 'ARRIVED',
  COMPLETED = 'COMPLETED'
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  rating: number;
}

export interface BookingDetails {
  patientName: string;
  contactNumber: string;
  emergencyContactNumber: string;
  city: string;
  pickupLocation: string;
  hospitalId: string;
  ambulanceType: AmbulanceType;
}

export interface PastBooking {
  id: string;
  patientName: string;
  date: string;
  status: string;
  city: string;
  ambulanceType: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}