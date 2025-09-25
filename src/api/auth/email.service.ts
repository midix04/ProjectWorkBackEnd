import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: "nicotonin05@gmail.com", // email mittente
    pass: "hyhshbiywoatzvbj",       // password o app password
  },
});

export async function sendRegistrationEmail(to: string, nome: string) {
  const mailOptions = {
    from: `"Il Tuo Servizio" <nicotonin05@gmail.com>`,
    to,
    subject: "Conferma Registrazione",
    html: `
      <p>Ciao ${nome},</p>
      <p>La tua registrazione è stata completata con successo!</p>
      <p>Benvenuto nel nostro servizio!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
