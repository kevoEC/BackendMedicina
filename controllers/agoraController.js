import { RtcTokenBuilder } from "agora-token";


// Configuración de tu App ID y App Certificate de Agora
const agoraAppId = 'bca03b41035d4ca78a76ba456cc67ed9';
const agoraAppCertificate = '6a3fcfb7a56b4bee892044902039d987';


const join = async (req, res) => {
    const { channelName, userId, role } = req.body;

    const expirationTimeInSeconds = 3600; // Tiempo de expiración del token (1 hora)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  
    const token = RtcTokenBuilder.buildTokenWithUid(
      agoraAppId,
      agoraAppCertificate,
      channelName,
      0,
      role,
      privilegeExpiredTs
    );
  
    res.json({ token });
}

export {
    join
}