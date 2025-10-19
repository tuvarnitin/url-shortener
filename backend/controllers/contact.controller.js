import { sendContactEmail } from '../services/email.service.js';

export const handleContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await sendContactEmail(name, email, message);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};