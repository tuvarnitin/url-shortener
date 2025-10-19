import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendContactEmail = async (name, email, message) => {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email where you want to receive messages
        subject: `URL Shortener Contact : Message from ${name}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    return await transporter.sendMail(mailOptions);
};