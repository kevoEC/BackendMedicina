import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();


// sendgrid.setApiKey(SG_API_KEY);

const sendEmail = ({ to, from, subject, text, html, templateId, code }) => {
  // console.log(SG_API_KEY);

  console.log('code', code)

  console.log('templateId', templateId)

  sendgrid.setApiKey(code)

  if(typeof(templateId)!=="undefined"){
    console.log('aca')
    const msg = { to, from, templateId }
    return sendgrid.send(msg).catch((e) => console.log('e', e));
  }
  console.log('o aca')
  const msg = { to, from, subject, text, html }
  return sendgrid.send(msg).catch((e) => console.log('e', e));

};

export default sendEmail;
