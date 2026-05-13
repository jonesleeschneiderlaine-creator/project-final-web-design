import emailjs from '@emailjs/browser';



const SERVICE_ID = 'service_9t794vh';      // Ton Service ID
const TEMPLATE_ID = 'template_fjkd7v2';    // Ton Template ID
const PUBLIC_KEY = 'OJZkYUh6s19PO3F3k';      // Ta Public Key

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.nom,
      from_email: formData.email,
      subject: formData.sujet,
      message: formData.message,
      to_email: 'ton_email@exemple.com',  // ← REMPLACE PAR TON EMAIL PERSONNEL
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};