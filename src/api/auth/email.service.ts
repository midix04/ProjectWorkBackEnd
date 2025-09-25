import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey", // questo rimane fisso, non cambiare
    pass: "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"
  }
});

export async function sendRegistrationEmail(to: string, nome: string) {
  const mailOptions = {
    from: `"Il Tuo Servizio" <no-reply@iltuosito.com>`, // puoi usare un mittente verificato
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
