const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../config/genix-auctions-firebase-adminsdk.json'); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Function to send notification to a single device
const sendNotificationToDevice = async (deviceToken, payload) => {
  try {
    const message = {
      notification: payload, 
      token: deviceToken,    
    };

    // Send the notification using Firebase Admin SDK
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Failed to send notification');
  }
};

module.exports = {
  sendNotificationToDevice,
};
