const transporter = require("../config/EmailConfig");
require("dotenv").config();

const feedbackMail = async (formData) => {

    try {
        await transporter.sendMail({
            from:formData.email,
            to: `${process.env.FEEDBACK_EMAIL}`,
            subject: 'Feedback Form',
            html: `
                <h3>Feedback Details</h3>
                <ul>
                    <li><strong>Name:</strong> ${formData.name}</li>
                    <li><strong>Email:</strong> ${formData.email}</li>
                    <li><strong>Phone:</strong> ${formData.phone}</li>
                </ul>
                <p><strong>Message:</strong> ${formData.message}</p>
            `
        });

        console.log("Feedback email sent successfully.");
    } catch (error) {
        console.log("There is an error in sending the feedback email:", error);
    }
};

module.exports = feedbackMail;
