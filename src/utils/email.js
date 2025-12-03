import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  }
});

export async function enviarEmail(emailDestino, assunto, mensagem) {
  if (!emailDestino || emailDestino.trim() === '') {
    console.error("Nenhum destinatário definido.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"SansCar" <${process.env.EMAIL_ADDRESS}>`,
      to: emailDestino,
      subject: assunto,
      html: mensagem
    });

    console.log("Email enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
