import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,       // usa 465 se vuoi TLS sicuro
  secure: false,   // true se port 465
  auth: {
    user: "apikey", 
    pass: "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"
  }
});

export async function sendRegistrationEmail(to: string, nome: string) {
  const mailOptions = {
    from: `"Il Tuo Servizio" <thebubushow5@gmail.com>`, // deve essere un mittente verificato su SendGrid
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
