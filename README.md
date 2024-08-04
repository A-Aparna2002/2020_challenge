# 2020_challenge

## Overview

The **2020 Challenge** is a mobile application designed to foster a competitive and friendly environment for individuals looking to enhance their reading and visual interpretation skills. Participants are encouraged to undertake a challenge that involves reading over twenty books and watching twenty movies from various genres within a year. The application serves as a welcoming platform for book and movie enthusiasts to track and share their progress in these challenges.

## Screenshots

Here are some screenshots of the app:

<p align="center">
  <img src="https://github.com/user-attachments/assets/ef7a4b61-b98f-4314-9d63-4530b715a821" alt="Home Screen" width="25%" style="margin: 0 40px;"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2b019505-9d76-4cad-a618-b22c9deeff46" alt="Challenge Details" width="25%" style="margin: 0 40px;"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d92a84aa-465e-435b-82c6-b03096ad67b4" alt="Challenge Details" width="25%" style="margin: 0 40px;"/>
</p>

## Features

- **Challenge Tracking**: Track your progress in reading books and watching movies.
- **Image Uploads**: Upload and manage images related to your progress and achievements.
- **User Profiles**: Create and manage user profiles with personalized data and progress.
- **Competitive Edge**: Engage in challenges and compare progress with other users.

## Technologies Used

- **React Native**: For building the mobile application.
- **npm**: For managing dependencies.
- **Node.js**: For the server-side application.
- **Firestore**: For real-time database functionalities and image storage.
- **MongoDB**: For managing and storing user and challenge data.

## Installation

### Prerequisites

- [React Native](https://reactnative.dev/docs/environment-setup) (setup)
- [Node.js](https://nodejs.org/) (which includes npm)
- [MongoDB](https://www.mongodb.com/products/platform/atlas-database) (account)
- [Firebase](https://firebase.google.com/) (account)

### Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/A-Aparna2002/2020_challenge.git

2. **Navigate to the Project Directory**

   ```sh
   cd 2020_challenge

3. **Install Dependencies**

    ```sh
   npm install

4. **Set Up Environment Variables**

    Create a .env file in the backend directory and add the following content:
   
    ```sh
    mongo_URL="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret"
    NodeMailer_password="your_nodemailer_password"
    NodeMailer_email="your_nodemailer_email"


5. **Firebase Configuration**

   Create a Config.js file in the frontend directory with the following content:

   ```sh
    apiKey: "your_firebase_api_key",
    authDomain: "your_firebase_auth_domain",
    projectId: "your_firebase_project_id",
    storageBucket: "your_firebase_storage_bucket",
    messagingSenderId: "your_firebase_messaging_sender_id",
    appId: "your_firebase_app_id"

### Start the application

**For Backend**

  ```sh
  cd Backend
  nodemon index
  ```

**For Frontend**

  ```sh
    cd frontend
    npm start
  ```

### Running on Mobile

To run the app on your mobile device, follow these steps:

1. **Download the Expo Go App**

   - For iOS: Download from the App Store
   - For Android: Download from Google Play

2. **Start the Development Server**

   Ensure you have run `npm start` in the `frontend` directory. This will start the Expo development server and display a QR code in your terminal or browser.

3. **Open the App on Your Device**

   Open the Expo Go app on your mobile device and scan the QR code displayed in the terminal or browser. This will load the development build of your app on your mobile device.

