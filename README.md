# Personal Styler

A full-stack web application that helps users determine their body type based on measurements. Built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure login and registration system using JWT
- **Measurement Input**: Form for users to input their body measurements
- **Body Type Calculation**: Algorithm to determine body type based on measurements
- **Secure Data Storage**: User data and measurements stored securely in MongoDB

## Tech Stack

### Frontend
- React with TypeScript (Typescript ver 5.7.3) (React ver 18.3.1)
- Tailwind CSS for styling (postcss ver 4.0.3)
- React Router for navigation
- Form validation and error handling

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js: Make sure you have Node.js installed. You can check it by running node -v.
- MongoDB: Make sure MongoDB is installed and running locally or use a MongoDB cloud service like MongoDB Atlas. I personally used MongoDB Atlas for this project.
- npm or yarn: Use npm (recommended) or yarn for package management.

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/HabibaAbdelaziz/personal-styler.git
```

**2. Install backend dependencies**
In the project folder, navigate to the backend directory:
```bash
cd backend
npm install
```

**3. Install frontend dependencies**
Navigate to the frontend directory:
```bash
cd frontend
npm install
```

**4. Setup environment variables**
Create a .env file in the backend directory and configure the following variables:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**5. Start the backend server**
In the backend directory, run:
```bash
npm run dev
```

**6. Start the frontend application**
In the frontend directory, run:
```bash
npm start
```

### Frontend Setup with Tailwind CSS Ver 4

**1. Install TailwindCSS and CLI Run the following command in the frontend terminal:**
``` bash
npm install tailwindcss @tailwindcss/cli
```
**2. Generate Tailwind output Run this command to build your Tailwind CSS file:**
```bash
npx @tailwindcss/cli -i ./src/App.css -o ./src/output.css --watch
```

**3. Run the frontend Now, start the frontend:**
```bash
npm start
```

## API Endpoints

* **POST /api/users/register:** Register new user.
* **POST /api/users/login:** User login.
* **POST /api/measurements:** Save user measurements.
* **GET /api/measurements:** Get user measurements.

## Future Enhancements
* Style recommendations based on body type.
* Wardrobe management system.
* Personal style quiz.
* Virtual try-on feature.

## Contributing
Feel free to submit issues and enhancement requests.

## Screenshots
Below are some screenshots of the application:

### Homepage
![homepage screenshot](https://github.com/HabibaAbdelaziz/personal-styler/blob/75ca6354d7d6a32e45a217094ce0f084be3f2a88/home_page_example.png "Homepage")

### Registration Page
![Registration Page screenshot](https://github.com/HabibaAbdelaziz/personal-styler/blob/d0de774a953e443af2d6a83b659e9560da5e15ac/register_example_1.png "Registration Page")

### Login Page
![Login Page screenshot](https://github.com/HabibaAbdelaziz/personal-styler/blob/e01d02b1506c4d8ba8b1e6ed6de4610e521d8f49/login_example_1.png "Login Page")

### Measurement Form Page
![Body Measurement Form](https://github.com/HabibaAbdelaziz/personal-styler/blob/e01d02b1506c4d8ba8b1e6ed6de4610e521d8f49/measurement_form_example_1.png "Body Measurement Form")

### ER Diagram
![ER Diagram](https://github.com/HabibaAbdelaziz/personal-styler/blob/a22b7c5148c4c100ce9a60a289962832d8a3f373/er_diagram_photo.png "ER Diagram")
Link to ER Diagram:
![ER Diagram](https://github.com/HabibaAbdelaziz/personal-styler/blob/8a4f7fc11d1b28263c7a67da069f4b9450efe3f5/erDiagram-asOf-2025-01-17.mmd "ER Diagram")


