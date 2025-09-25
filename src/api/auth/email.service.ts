import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendRegistrationEmail(to: string, nome: string) {
  const msg = {
    to,
    from: "thebubushow5@gmail.com", // verificato su SendGrid
    subject: "Conferma Registrazione",
    html: `<p>Ciao ${nome},</p>
           <p>La tua registrazione è stata completata con successo!</p>
           <p>Benvenuto nel nostro servizio!</p>`
  };

  try {
    await sgMail.send(msg);
    console.log("Email inviata correttamente!");
  } catch (err) {
    console.error("Errore invio email:", err);
  }
}
