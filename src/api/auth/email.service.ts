import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,       // usa la porta sicura
    secure: true,    // TLS obbligatorio su 465
    auth: {
        user: "nicotonin05@gmail.com",
        pass: "hyhshbiywoatzvbj" // deve essere una App Password di Gmail
    }
});

export async function sendRegistrationEmail(to: string, nome: string) {
    const mailOptions = {
        from: `"Il Tuo Servizio" <nicotonin05@gmail.com>`,
        to,
        subject: "Conferma Registrazione",
        html: `<p>Ciao ${nome},</p>
               <p>La tua registrazione è stata completata con successo!</p>
               <p>Benvenuto nel nostro servizio!</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email inviata:", info.messageId);
    } catch (err) {
        console.error("Errore invio email:", err);
    }
}
