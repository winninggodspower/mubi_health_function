const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const config = require('../config.js');

const app = express();
const twilioClient = twilio(config.twillioAccountSid, config.twillioAuthToken);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/sendEmergencyContact', async (req, res, next) => {
    try {
        const { userData, healthVitals, emergencyContact } = req.body;

        // Validate the request payload
        if (!userData || !healthVitals || !emergencyContact) {
            return res.status(400).json({ error: 'Missing required fields: user_id, healthVitals, or emergencyContact' });
        }

        // Send emergency contact message
        await sendEmergencyContact(userData, healthVitals, emergencyContact);

        res.status(200).json({ message: 'Emergency contact sent successfully' });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function sendEmergencyContact(userData, healthVitals, emergencyContact) {
    try {

        // Send the text message using Twilio
        const message = `
        Emergency alert for ${userData.firstName} ${userData.lastName}. 
        Vitals: ${JSON.stringify(healthVitals)}
        `;

        await twilioClient.messages.create({
            body: message,
            from: config.twilioPhoneNumber,
            to: emergencyContact,
        });

        return { success: true, message: "Emergency contact notified successfully" };
    } catch (error) {
        console.error("Error sending emergency contact message:", error);
        throw new Error("Unable to send message to emergency contact");
    }
}

app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`)
);

module.exports = app;

