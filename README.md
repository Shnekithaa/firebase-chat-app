## Real-Time Chat Application with Firebase

Overview

This is a real-time chat application built using Firebase, providing secure user authentication and data storage. Users can send text messages and upload images within the chat. The application leverages Firebase Authentication, Firestore, and Firebase Storage to ensure seamless and secure communication.

Features

User Authentication: Secure sign-up and login using Firebase Authentication.

Real-time Messaging: Instant messaging with Firestore's real-time database capabilities.

Image Upload: Users can share images using Firebase Storage.

Secure Data Storage: Messages and user data are securely stored in Firestore.

Responsive UI: Works smoothly on desktop and mobile devices.

Technologies Used

Firebase Authentication - For user sign-in and authentication.

Firestore - NoSQL cloud database for storing chat messages in real time.

Firebase Storage - For uploading and retrieving images.

JavaScript - For building the client-side functionality.

Installation & Setup

## Clone the repository:

git clone https://github.com/Shnekithaa/firebase-chat-app.git

cd chat

## Set up Firebase:
 - Create a Firebase project at https://console.firebase.google.com/
 - Enable Firestore Database and Firebase Authentication (Email/Password or other preferred methods)
 - Enable Firebase Storage for image uploads.
 - Get your Firebase config object from Firebase Console and replace it in your project.

## Install dependencies:
npm install  

## Run the application:
npm start  

## Usage

- Sign up or log in with your credentials.
- Start a new chat and send text messages.
- Upload and share images in the chat.
- View messages in real-time.
