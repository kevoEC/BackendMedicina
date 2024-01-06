import sendEmail from "../utils/sendEmail.js";


export const testEmail = async (datos) => {

  const { code } = datos;

  try {
    await sendEmail({
      //the client email
      to: 'pablotrujilloelo@gmail.com',
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      templateId: 'd-c7e16fef22d04cb2aa628d4acec3b990',
      code
    });
  } catch (error) {
    console.log(error);
  }
}

export const emailForgetPassword = async (datos) => {
  const { firstname, email, token, code } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `<p>Hola: ${firstname} has solicitado reestablecer tu contraseña</p>
      <p>Para poder crear una nueva contraseña solo debes hacer clic en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reestablecer Password</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailCredentials = async (datos) => {
  const { firstname, email, code } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de bienvenida",
      html: `<p>Hola: ${firstname} te han asignado al sistema medico </p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailCredentialsSpecialists = async (datos) => {
  const { firstname, email, password, code } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: `${email}`,
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de bienvenida",
      html: `<p>Hola: ${firstname} te han asignado al sistema medico </p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p>Email: ${email}</p> 
      <p>Contraseña: ${password}</p> 
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailDate = async (datos) => {
  const { firstname, email, especialistemail, code, date } = datos;
  console.log(email);

  try {
    if (date.tipoAgenda === 'Cirugía') {
      await sendEmail({
        //the client email
        to: [`${email}`, `${especialistemail}`],
        //sendGrid sender id
        from: "drbariatrico250@gmail.com",
        subject: "¡Te han asignado una fecha para cirugía!",
        text: "Notificación de cita",
        html: `<p> Te han asignado una fecha para cirugía el ${date.start} </p>
      <p> Recuerda asistir puntualmente y lee detenidamente las siguientes: instrucciones</p>
      <p>${date.operationDescrip}</p>
      <p> Ademas de tomar en cuenta estas observaciones:</p>
      <p>${date.operationObs}</p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
        code
      });
    } else {
      await sendEmail({
        //the client email
        to: [`${email}`, `${especialistemail}`],
        //sendGrid sender id
        from: "drbariatrico250@gmail.com",
        subject: "¡Tienes una cita nueva!",
        text: "Notificación de cita",
        html: `<p> Te han asignado una cita con un especialista </p>
      <p> Recuerda asistir a tu cita puntualmente</p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
        code
      });
    }
  } catch (error) {
    console.log(error);
  }
};


export const emailUpdateDate = async (datos) => {
  const { firstname, email, especialistemail, code } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: [`${email}`, `${especialistemail}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "¡Tu cita ha sido reagendada!",
      text: "Notificación de cita",
      html: `<p> Te han reasignado una cita con un especialista </p>
      <p> Recuerda asistir a tu cita puntualmente</p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciale de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};


export const emailCancelDate = async (datos) => {
  const { email, especialistemail, code, date } = datos;
  console.log(email);

  try {
    const parsedDate = new Date(date.start)
    const humanDate = parsedDate.toDateString()

    await sendEmail({
      //the client email
      to: [`${email}`, `${especialistemail}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Tu cita ha sido cancelada",
      text: "Notificación de cita",
      html: `<p>Tu cita del ${humanDate} ha sido cancelada</p>
      <p>Para poder ingresar al sistema debes hacerlo mediante tus credenciales de seguridad </p>
      <p> Puedes ingresar al sistema mediante el siguiente enlace </p>
      <a href="${process.env.FRONTEND_URL}">MEDICAL APP</a>
      <p>Si tu no solicitaste este servicio, puedes ignorar este email</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};

export const emailInfo = async (datos) => {
  const { email, firstname, phone, code } = datos;
  console.log(email);

  try {
    await sendEmail({
      //the client email
      to: "solicitudesdrbariatrico55@gmail.com",
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Nicecode - Credenciales de seguridad",
      text: "Correo de solicitud de informacion",
      html: `<p> Un Paciente ha solicitado informacion acerca 
      del procedimiento medico</p>
      <p> puedes comunicarte con el mediante la siguiente informacion </p>
      <p>Email: ${email}</p> 
      <p>Email: ${firstname}</p> 
      <p>Email: ${phone}</p> 
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};


export const emailWarning = async (datos) => {
  const { email, code } = datos;

  try {
    await sendEmail({
      //the client email
      to: [`${email}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "¡Información muy importante para tu salud!",
      text: "Correo de advertencia",
      html: `<p> Hola, hemos detectado un problema en tu proceso de pérdida de peso</p>
      <p> Por favor agenda una cita con el nutricionista lo más pronto posible!</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};


export const emailNutriWarning = async (patientData, nutriEmail, code) => {
  const { firstname, lastname } = patientData

  try {
    await sendEmail({
      //the client email
      to: [`${nutriEmail}`],
      //sendGrid sender id
      from: "drbariatrico250@gmail.com",
      subject: "Un paciente ha registrado obesidad mórbida",
      text: "Correo de advertencia",
      html: `<p> Hola, hemos detectado un problema en el proceso de pérdida de peso de: ${firstname} ${lastname} </p>
      <p> Por favor agenda una cita con el paciente lo más pronto posible!</p>
      `,
      code
    });
  } catch (error) {
    console.log(error);
  }
};
