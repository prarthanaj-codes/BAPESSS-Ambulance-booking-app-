# AmbuIndia - Emergency Ambulance Booking App

AmbuIndia is a rapid ambulance booking and emergency response application designed for the Indian context. It connects users with ICU, Ventilator, and Basic Life Support ambulances instantly and provides AI-powered first aid triage assistance while help is on the way.

## Features

- **Instant Booking**: Book ambulances (BLS, ALS, ICU) with a few clicks.
- **Live Tracking**: Real-time simulation of driver location and ETA.
- **AI Triage Assistant**: Built with Google Gemini API (`gemini-2.5-flash`) to provide immediate first-aid advice.
- **Emergency Mode**: Quick access to "108" emergency dialing.
- **Driver Verification**: View driver details and contact information for confirmed trips.

## Technologies Used

- **Frontend**: React 19, Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React
- **Build/Runtime**: ES Modules via `esm.sh` (No bundler required for basic preview)
## Click on this to view the app
https://bapesss-ambulance-booking-app.vercel.app/

## API Configuration

The application requires a valid Google Gemini API Key to function fully (specifically the Chat Assistant).
The code expects the API key to be available via `process.env.API_KEY`.

## License

This project is for educational and demonstration purposes. In a real medical emergency, always call national emergency services (108 in India).
