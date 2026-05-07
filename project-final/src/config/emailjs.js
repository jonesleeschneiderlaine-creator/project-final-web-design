import emailjs from '@emailjs/browser';



const SERVICE_ID = 'service_9t794vh';
const TEMPLATE_ID = 'template_fjkd7v2';    
const PUBLIC_KEY = 'OJZkYUh6s19PO3F3k';      

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.nom,
      from_email: formData.email,
      subject: formData.sujet,
      message: formData.message,
      to_email: 'sammuelramclief.isaac@gmail.com',
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};