const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const config = require('./config.js');

const app = express();
const twilioClient = twilio(config.twillioAccountSid, config.twillioAuthToken);

app.use(cors());
app.use(express.json());

app.post('/sendEmergencyContact', async (req, res, next)=>{
    try {
        const user_id = req.params.user_uid;
        const data = req.body;
        let healthVitals = data.healthVitals;
        let emergencyContact = data.emergencyContact;
        sendEmergencyContact(user_id, healthVitals, emergencyContact)
        res.status(200).send('product updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


async function sendEmergencyContact(user_uid, healthVitals, emergencyContact){
    try {
        // Send the text message using Twilio
        const message = `
        Emergency alert for ${patientData.firstName} ${patientData.lastName}. 
        Vitals: ${JSON.stringify(healthVitals)}
        `;

        await twilioClient.messages.create({
            body: message,
            from: "+237673986209",
            to: emergencyContact,
        });

        return { success: true, message: "Emergency contact notified successfully" };
    } catch (error) {
        console.error("Error sending emergency contact message:", error);
        throw new Error("internal", "Unable to send message to emergency contact");
    }
}


app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);