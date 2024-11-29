const handler = async (m, {isPrems, conn}) => {
  if (!global.db.data.users[m.sender]) {
    throw `⚠️ Usuario no encontrado.`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    throw `🎁 Ya reclamaste tu cofre\n⏰️ Regresa en: *${msToTime(tiempoRestante)}* para volver a reclamar.`;
  }

  const img = 'https://qu.ax/rZZfy.jpg';
  const dia = Math.floor(Math.random() * 30);
  const tok = Math.floor(Math.random() * 10);
  const ai = Math.floor(Math.random() * 4000);
  const expp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].yenes += dia;
  global.db.data.users[m.sender].money += ai;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].exp += expp;
  global.db.data.users[m.sender].lastcofre = Date.now();

  const texto = `
╭━〔 ${global.botname} 〕⬣
┃🧰 *Obtienes Un Cofre*
┃ ¡Felicidades!
╰━━━━━━━━━━━━⬣

╭━〔 ${global.botname} 〕⬣
┃ *${dia} Yenes* 💴
┃ *${tok} Tokens* ⚜️
┃ *${ai} Coins* 🪙
┃ *${expp} Exp* ✨
╰━━━━━━━━━━━━⬣`;

  const fkontak = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo',
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    'participant': '0@s.whatsapp.net',
  };

  try {
    await conn.sendFile(m.chat, img, 'yuki.jpg', texto, fkontak);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw `⚠️ Ocurrió un error al enviar el cofre.`;
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} Horas ${minutes} Minutos`;
}
