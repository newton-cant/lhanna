
//criador Newton//

const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require('@adiwajshing/baileys');
const {color, bgcolor} = require('./lib/color');
const {bahasa} = require('./src/bahasa');
const {negara} = require('./src/kodenegara');
const {fetchJson} = require('./lib/fetcher');
const { trava2 } = require('./apis/trava2.js');
const {recognize} = require('./lib/ocr');
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions');
const fs = require('fs');
const moment = require('moment-timezone');
const {exec} = require('child_process');
const kagApi = require('@kagchi/kag-api');
const fetc = require('node-fetch');
const tiktod = require('tiktok-scraper');
const ffmpeg = require('fluent-ffmpeg');
const {removeBackgroundFromImageFile} = require('remove.bg');
const imgbb = require('imgbb-uploader');
const lolis = require('lolis.life');
const loli = new lolis();
const speed = require('performance-now');
const cd = 4.32e+7 ;
const crypto = require('crypto');
const qrcode = require("qrcode-terminal");
const axios = require('axios');

// LOAD FILE //

const welkom = JSON.parse(fs.readFileSync('./data/welkom.json'));
const _limit = JSON.parse(fs.readFileSync('./data/limit.json'));
const antilink = JSON.parse(fs.readFileSync('./data/antilink.json'));
const up = JSON.parse(fs.readFileSync('./data/settings.json'));
const ban = JSON.parse(fs.readFileSync('./data/bot/banned.json'));
const samih = JSON.parse(fs.readFileSync('./data/bot/simi.json'));
const user = JSON.parse(fs.readFileSync('./data/user.json'))

//--File json temp

const setiker = JSON.parse(fs.readFileSync('./temp/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./temp/vid.json'))
const audionye = JSON.parse(fs.readFileSync('./temp/vn.json'))
const imagenye = JSON.parse(fs.readFileSync('./temp/image.json'))
const _registeredUser = JSON.parse(fs.readFileSync('./data/user.json'));

//--File json data

const trut = JSON.parse(fs.readFileSync('./data/truth.json'));
const fak = JSON.parse(fs.readFileSync('./data/dare.json'));
const dare = JSON.parse(fs.readFileSync('./data/fakta.json'));


//--Setting

prefix = up.prefix

//const limitawal = up.limit;

const memberlimit = up.memberlimit;

const cr = up.cr;

//const hargalimit = up.hargalimit;

const NamaBot = up.NamaBot;

const Ig = up.Ig;

const Wa1 = up.Wa1;

const Wa2 = up.Wa2;

const Ovo = up.Ovo;

const Pulsa = up.Pulsa;

const Dana = up.Dana;

const blocked = [];

const ownerNumber = up.ownerNumber;

//--Apikey

BarBarKey = up.BarBarKey;

vKey = up.Vhtearkey;

viKey = up.Vinzapi

meKey = up.Itsmeikyapi

lolKey = up.LolHumanKey


//--Kontak

const vcard = 'BEGIN:VCARD\n'

+ 'VERSION:3.0\n'

+ 'FN: NEWTON MODS \n' // Nama

+ 'ORG:NEWTON MODS;\n' // Nama bot

+ 'TEL;type=CELL;type=VOICE;waid=5593991919748:+55 93 99191-9748\n' // Nomor bot

+ 'END:VCARD' 



//--Datauser

const getLimitRandomId = () => {

  return _limit[Math.floor(Math.random() * _limit.length)].id

}

const addLimitUser = (userid, sender, age, time, serials) => {

  const obj = {

id: userid,

name: sender,

age: age,

time: time,

serial: serials

  }

  _limit.push(obj)

  fs.writeFileSync('./data/limit.json', JSON.stringify(_limit))

}

const createSerial = (size) => {

  return crypto.randomBytes(size).toString('hex').slice(0, size)

}

const checkRegisteredUser = (sender) => {

  let status = false

  Object.keys(_registeredUser).forEach((i) => {

if (_registeredUser[i].id === sender) {

  status = true

}

  })

  return status

}


function kyun(seconds){

  function pad(s){

    return (s < 10 ? '0' : '') + s;

  }

  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var second = Math.floor(seconds % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(second)}`;
}

//--Whatsapp start connect

async function starts() {

	const Pin = new WAConnection()

	Pin.logger.level = 'warn'

	console.log(banner.string)

	Pin.on('qr', () => {

		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))

	})



	fs.existsSync('./alpin.json') && Pin.loadAuthInfo('./alpin.json')

	Pin.on('connecting', () => {

		start('2', 'Connecting...')

	})

	Pin.on('open', () => {

		success('2', 'Connected')

	})

	await Pin.connect({timeoutMs: 30*1000})

        fs.writeFileSync('./alpin.json', JSON.stringify(Pin.base64EncodedAuthInfo(), null, '\t'))





	Pin.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await Pin.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await Pin.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Olá @${num.split('@')[0]}\nBem vindo ao grupo *${mdata.subject}\nNão se esqueça de ler as regras\n\n\nSinta-se avontade no grupo:)*`
				let buff = await getBuffer(ppimg)
				Pin.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, context: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await Pin.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Thauzinhoo otário @${num.split('@')[0]}, Não volte por favor`
				let buff = await getBuffer(ppimg)
				Pin.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {

			console.log('Error : %s', color(e, 'red'))

		}

	})



	Pin.on('CB:Blocklist', json => {

            if (blocked.length > 2) return

	    for (let i of json[1].blocklist) {

	    	blocked.push(i.replace('c.us','s.whatsapp.net'))

	    }

	})



	Pin.on('chat-update', async (mek) => {

		try {

            if (!mek.hasNewMessage) return

            mek = mek.messages.all()[0]

			if (!mek.message) return

			if (mek.key && mek.key.remoteJid == 'status@broadcast') return

			if (mek.key.fromMe) return

			global.prefix

			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]	
			const insom = from.endsWith('@g.us')			
			const nameReq = insom ? mek.participant : mek.key.remoteJid			
			pushname2 = Pin.contacts[nameReq] != undefined ? Pin.contacts[nameReq].vname || Pin.contacts[nameReq].notify : undefined
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
            const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''	
			var Link = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesLink = Link.slice(0).trim().split(/ +/).shift().toLowerCase()	
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
      const is = budy.slice(0).trim().split(/ +/).shift().toLowerCase()
			mess = {
			
  wait: '🍒Aguarde um pouco🍒',
  success: '*☉* Berhasil',
  Public: '🍒recursos em modo privado agora apenas o proprietário pode usar o bot🍒',
  ferr: '🍒Parece que o recurso está errado🍒',
  limitend: '🍒Desculpe, seu limite acabou, por favor, faça uma compra repetida.🍒',
  error: {
  stick: 'NÃO TÔ FAZENDO PORRA😡',
  Iv: '🍒Link Error🍒'
  },
  only: {
    group: '🍒Este recurso é para grupos🍒',
    ownerG: '🍒Este recurso é para *OWNER GRUPO* 🍒',
    ownerB: '🍒Este recurso é para *NEWTON* 🍒',
    admin: '🍒Este recurso é para *ADMIN GRUPO* 🍒',
    Badmin: '🍒 Torne-o alpino *ADMIN* 🍒',
    userB: `🍒*${pushname2}*, 𝚅𝙾𝙲𝙴 𝙽𝙰𝙾 𝙴𝚂𝚃𝙰 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾 𝙽𝙾 𝙱𝙰𝙽𝙲𝙾 𝙳𝙴 𝙳𝙰𝙳𝙾𝚂, 𝙳𝙸𝙶𝙸𝚃𝙴 \n*${prefix}daftar*🍒`,
  }

}

      const totalchat = await Pin.chats.all()
			const botNumber = Pin.user.jid
		    const ownerNumber = ["+5593991919748@s.whatsapp.net"] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await Pin.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''			
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false               
			const isOwner = ownerNumber.includes(sender)			
			const isBanned = ban.includes(sender)			
			const isAntiLink = isGroup ? antilink.includes(from) : false	    
			const isSimi = isGroup ? samih.includes(from): false 
            const isUser = user.includes(sender)         
            const isRegister = checkRegisteredUser(sender)
            const q = args.join(' ')
            const tescuk = ["0@s.whatsapp.net"]
			let pushname = Pin.contacts[sender] != undefined ? Pin.contacts[sender].vname || Pin.contacts[sender].notify: undefined
			
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				Pin.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				Pin.sendMessage(hehe, teks, text)
	        }
				const sendPtt = (teks) => {
		    Pin.sendMessage(from, audio, mp3, {quoted:mek})
			}
			const costum = (pesan, tipe, target, target2) => {
			Pin.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? Pin.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : Pin.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

//--MessageType


  colors = ['red','white','black','blue','yellow','green', 'aqua']
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
  const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
  const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
  const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
  const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
  if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
  if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
  if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
  if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
  
  //---Metadata stiker

			function addMetadata(packname, author) {	

				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	

				author = author.replace(/[^a-zA-Z0-9]/g, '');	

				let name = `${author}_${packname}`

				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`

				const json = {	

					"sticker-pack-name": packname,

					"sticker-pack-publisher": author,

				}

				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	

				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	



				let len = JSON.stringify(json).length	

				let last	



				if (len > 256) {	

					len = len - 256	

					bytes.unshift(0x01)	

				} else {	

					bytes.unshift(0x00)	

				}	



				if (len < 16) {	

					last = len.toString(16)	

					last = "0" + len	

				} else {	

					last = len.toString(16)	

				}	



				const buf2 = Buffer.from(last, "hex")	

				const buf3 = Buffer.from(bytes)	

				const buf4 = Buffer.from(JSON.stringify(json))	



				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	



				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	

					return `./src/stickers/${name}.exif`	

				})	



			}

if (budy.includes(`alpin`)) {
                const alpin = fs.readFileSync('./alpinstiker/alpin');
                client.sendMessage(from, alpin, MessageType.sticker, {quoted: mek})
                  }

		if (budy.includes(`alpin`)) {
                const alpin = fs.readFileSync('./alpinstiker/Dappa');
                client.sendMessage(from, alpin, MessageType.sticker, {quoted: mek})
                  }



//--Member limit

if (isGroup) {

  try {

const getmemex = groupMembers.length

if (getmemex <= memberlimit) {

  Pin.sendMessage(from, `Desculpe, os requisitos de membro devem estar acima ${memberlimit}, Adeus 👋🏻`, text)



  setTimeout(() => {

Pin.groupLeave(from) // ur cods

  }, 5000) // 1000 = 1s,

}

  } catch {

console.error(err)

  }

}





//--Other Function

const apakah = ['Ya',

  'Tidak',

  'Mungkin']

const bisakah = ['Bisa',

  'Tidak Bisa',

  'Mungkin']

const kapankah = ['Hari Lagi',

  'Minggu Lagi',

  'Bulan Lagi',

  'Tahun Lagi']


//--Auto respon 2

switch(is) { 
           
  case 'fds': 

buf = fs.readFileSync(`./temp/audio/tmnc.mp3`)

Pin.sendMessage(from, buf, audio, {

  mimetype: 'audio/mp4', quoted: mek, ptt: true

})

break 


  case 'geme': 

buf = fs.readFileSync(`./temp/audio/fodaze.mp3`)

Pin.sendMessage(from, buf, audio, {

  mimetype: 'audio/mp4', quoted: mek, ptt: true

})

break 

 case 'canta': 

buf = fs.readFileSync(`./temp/audio/lala.mp3`)

Pin.sendMessage(from, buf, audio, {

  mimetype: 'audio/mp4', quoted: mek, ptt: true

})

break 

 case 'yamete': 

buf = fs.readFileSync(`./temp/audio/yamete.mp3`)

Pin.sendMessage(from, buf, audio, {

  mimetype: 'audio/mp4', quoted: mek, ptt: true

})

break  
 

case 'hentai':   

buf = fs.readFileSync(`./temp/audio/somhentai.mp3`)

Pin.sendMessage(from, buf, audio, {

  mimetype: 'audio/mp4', quoted: mek, ptt: true

})

break



}

			switch(command) {


case 'help':
 case 'menu':
  case '?':
  if (!isUser) return reply(mess.only.userB)
  uptime = process.uptime()
  const Menu = {
text: ` 🍒── ✪ NEWTON ✪──🍒
           ☆┌─┐  ─┐☆
　│▒│ /▒/
　│▒│/▒/
　│▒ /▒/─┬─┐◯
　│▒│▒|▒│▒│
┌┴─┴─┐-┘─┘
│▒┌──┘▒▒▒│◯
└┐▒▒▒▒▒▒┌┘
◯└┐▒▒▒▒┌

        ────────────────

Salve🐦❤️ *${pushname}* 

        ────────────────͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

        ────────────────

〘 *BOT* 〙

‣ Prefix:  *「 ${prefix} 」*

‣ Nome: *LHANNA-BOT*

‣ WA Conectado: *Baileys*

‣ Status online: *${kyun(uptime)}*

‣ Modelo: *ON*

‣ Grupo:  *${groupName}*

‣ Numero de usuários : *${user.length} User*

‣ Numero de chats : *${totalchat.length} Chat*

      ────────────────

┏━━━━━━━━━━━━━━━━━━━━

┃─────〘 *LHANNA-BOT* 〙────

┃━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}imgmenu*

┠⊷️ *${prefix}bannermen

┠⊷️ *${prefix}simi (Texto)*

┠⊷️ *${prefix}Info*

┠⊷️ *${prefix}antisticker*

┠⊷️ *${prefix}criador*

┠⊷️ *${prefix}dono*

┠⊷️ *${prefix}Donasi*

┠⊷️ *${prefix}Ping*

┗━━━━━━━━━━━━━━━━━━━━

┏━━━━━━━━━━━━━━━━━━━━

┃─────〘  *Lista menu* 〙─────

┗━━━━━━━━━━━━━━━━━━━━

*〘 GRUPO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}listadmin*

┠⊷️ *${prefix}listonline*

┠⊷️ *${prefix}fechargp*

┠⊷️ *${prefix}abrirgp*

┠⊷️ *${prefix}Promote*

┠⊷️ *${prefix}Demote*

┠⊷️ *${prefix}Setname*

┠⊷️ *${prefix}Setdesk*

┠⊷️ *${prefix}Add*

┠⊷️ *${prefix}Kick*

┠⊷️ *${prefix}Tagall*

┠⊷️ *${prefix}Linkgc*

┠⊷️ *${prefix}sair*

┠⊷️ *${prefix}Notif*

┠⊷️ *${prefix}Welcome*

┠⊷️ *${prefix}Delete (Reply pesan)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 DIVERSÃO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Alay (Texto)*

┠⊷️ *${prefix}Alay2 (Texto)*

┠⊷️ *${prefix}Reverse (Texto)*

┠⊷️ *${prefix}Hilih (Texto)*

┠⊷️ *${prefix}Namae (Texto)*

┠⊷️ *${prefix}Pantun*

┠⊷️ *${prefix}Bucin*

┠⊷️ *${prefix}Bijak*

┠⊷️ *${prefix}Chatprank (Texto1/Texto2)*

┠⊷️ *${prefix}meuperfil*

┠⊷️ *${prefix}Fml*

┠⊷️ *${prefix}Asupan*

┠⊷️ *${prefix}Tagme*

┠⊷️ *${prefix}Fitnah (Tag target|teks1|teks2)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 MIDIA 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}listvn*

┠⊷️ *${prefix}listimg*

┠⊷️ *${prefix}liststik*

┠⊷️ *${prefix}listvid*

┠⊷️ *${prefix}esquilo (Reply audio)*

┠⊷️ *${prefix}Slow (Reply audio)*

┠⊷️ *${prefix}raposa (Reply audio)*

┠⊷️ *${prefix}Bass (Reply audio)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 EDITANDO BANNER 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Gtav (Foto)*

┠⊷️ *${prefix}Wanted (Foto)*

┠⊷️ *${prefix}lapis (Foto)*

┠⊷ *${prefix}linkimg (foto)*
 
┠⊷ *${prefix}gplaybutton (nome)*

┠⊷ *${prefix}attp (Texto)*

┠⊷ *${prefix}qrcode (Texto)*
┗━━━━━━━━━━━━━━━━━━━━

*〘 ANIME 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Kusonime (Query)*

┠⊷️ *${prefix}Neonime (Query)*

┠⊷️ *${prefix}Charnime (Query)*

┠⊷️ *${prefix}Wait*

┠⊷️ *${prefix}Anime*

┠⊷️ *${prefix}Loli*

┠⊷️ *${prefix}Neko*

┗━━━━━━━━━━━━━━━━━━━━

*〘 GAME 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Tebakgambar*

┠⊷️ *${prefix}Caklontong*

┠⊷️ *${prefix}Seberapagay (Texto)*

┠⊷️ *${prefix}Seberapabucin (Texto)*

┠⊷️ *${prefix}gay (Texto)*

┠⊷️ *${prefix}gado (Texto)*

┠⊷️ *${prefix}lgbt (Texto)*

┠⊷️ *${prefix}corno (Texto)*

┠⊷️ *${prefix}gostosa (Texto)*

┠⊷️ *${prefix}gostoso (Texto)*
┗━━━━━━━━━━━━━━━━━━━━

*〘 TOD 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷ *${prefix}Truth*

┠⊷ *${prefix}Dare*

┗━━━━━━━━━━━━━━━━━━━━

*〘 Cartuchos MARAVILHOSO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷ *${prefix}Apakah (Texto)*

┠⊷ *${prefix}Bisakah (Texto)*

┠⊷ *${prefix}Kapankah (Texto)*

┠⊷ *${prefix}Rate (Texto)*

┠⊷ *${prefix}Gantengcek (Texto)*

┠⊷ *${prefix}Cantikcek (Texto)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 TOOLS 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Stiker*

┠⊷️ *${prefix}Triggered*

┠⊷️ *${prefix}Wasted*

┠⊷️ *${prefix}Ttp (Teks)*

┠⊷️ *${prefix}Toimg*

┠⊷️ *${prefix}Tomp3*

┠⊷️ *${prefix}Play (Texto)*

┠⊷️ *${prefix}Tts (Texto)*

┠⊷️ *${prefix}Igstalk (username)*

┠⊷️ *${prefix}Timer (Waktu)*

┠⊷️ *${prefix}Wame*

┠⊷️ *${prefix}Nulis eror bro (Teks)*

┠⊷️ *${prefix}texto*

┠⊷️ *${prefix}Wait*

┗━━━━━━━━━━━━━━━━━━━━

*〘 TEXTO〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Tahta (Texto)*

┃ _Ex : ${prefix} Madeira alpina_

┗━━━━━━━━━━━━━━━━━━━━

*〘 TEXT2 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Ephoto list*

┠⊷️ *${prefix}Ephoto (código + Texto)*

┠⊷️ *${prefix}Textpro list*

┠⊷️ *${prefix}Textpro (Kode + Teks)*

┃ _Ex : ${prefix}Textpro 55 alpin_

┗━━━━━━━━━━━━━━━━━━━━

*〘 FOTO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Cogan*

┠⊷️ *${prefix}Cecan*

┠⊷️ *${prefix}Meme*

┠⊷️ *${prefix}Twit*

┠⊷️ *${prefix}Quotes*

┠⊷️ *${prefix}Wp*

┠⊷️ *${prefix}Cyberpunk*

┠⊷️ *${prefix}Img (Consulta)*

┠⊷️ *${prefix}Google (Consulta)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 EDUCAÇÃO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Brainly (Pertanyaan)*

┃ _Procurando por respostas Brainly_

┠⊷️ *${prefix}Wiki (Consulta )*

┃ _Procurar wiki_

┠⊷️ *${prefix}Kbbi (Consulta)*

┃ _Ótimo dicionário de línguas Indonesia_

┠⊷️ *${prefix}Tl (Teks/kode bahasa)*

┃ _Traduza todos os idiomas_

┠⊷️ *${prefix}Fakta*

┃ _Ramdom fakta_

┠⊷️ *${prefix}basecode*

┃ _Mostra o código do idioma_

┠⊷️ *${prefix}Kodenegara*

┃ _Mostra o código do país_

┗━━━━━━━━━━━━━━━━━━━━

*〘 OUTRO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}letra (título da música)*

┠⊷️ *${prefix}Chord (título da música*)

┠⊷️ *${prefix}Jadwaltvnow*

┠⊷️ *${prefix}Map (Área)*

┠⊷️ *${prefix}Trendtwit*

┠⊷️ *${prefix}Beritahoax*

┠⊷️ *${prefix}Gplaystore*

┗━━━━━━━━━━━━━━━━━━━━

*〘 PRIMBON 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Arti (Nama)*

┠⊷️ *${prefix}Couple (Nama & Nama)*

┠⊷️ *${prefix}Jadian (Tgl-bln-thn)*

┠⊷️ *${prefix}Weton (Tgl-bln-thn)*

┠⊷️ *${prefix}Zodiak (Texto)*

┠⊷️ *${prefix}Artimimpi (Texto)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 ISLAMISMO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Alquran (Número da surata)*

┠⊷️ *${prefix}Ngaji*

┠⊷️ *${prefix}Tafsir (Query)*

┠⊷️ *${prefix}Sholat (Daerah)*

┗━━━━━━━━━━━━━━━━━━━━

*〘 CLIMA 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Cuaca (Daerah)*

┠⊷️ *${prefix}Infogempa*

┃━━━━━━━━━━━━━━━━━━━━

┗━━━━━━━━━━━━━━━━━━━━

*〘 download 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Ytmp3 (Link)*

┃ _Download audio youtube_

┠⊷️ *${prefix}Ytmp4 (Link)*

┃ _Download video youtube_

┠⊷️ *${prefix}Fb (Link)*

┃ _Download video Facebook_

┠⊷️ *${prefix}Ig (Link)*

┃ _Download video Instagram_

┠⊷️ *${prefix}Scdl (Link)*

┃ _Download lagu SoundCloud_

┠⊷️ *${prefix}Tik (Link)*

┃ _Baixe o vídeo Tiktok_

┠⊷️ *${prefix}Pin (Link)*

┃ _baixar vídeos do Pinterest_

┠⊷️ *${prefix}Joox (Judul lagu*)

┃ _Download música ligada joox_

┗━━━━━━━━━━━━━━━━━━━━

*〘 PROPRIETÁRIO 〙*

┏━━━━━━━━━━━━━━━━━━━━

┠⊷️ *${prefix}Clone*

┠⊷️ *${prefix}Block*

┠⊷️ *${prefix}Unblock*

┠⊷️ *${prefix}Bc*

┠⊷️ *${prefix}Blocklist*
┗━━━━━━━━━━━━━━━━━━━━`,

contextInfo: {
 mentionedJid: [sender]
}
 }
  Pin.sendMessage(from , Menu, text, {
 quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "📄 NEWTON MODS", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIADoAUQMBIgACEQEDEQH/xAAsAAEAAwEBAQAAAAAAAAAAAAAAAgMFBAYBAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAADwYAAAAAEo2EoeggYctbsPMX7XIZPycABZWNvLoHTfnjTo4x0c4AAAAAAAf//EAC0QAAMAAgEDAwIDCQAAAAAAAAECAwQRAAUSMRMhImGSFCCRJEBBQlBRUmOx/9oACAEBAAE/AP3dFLsqjW2IA2QB+p5PHvUoJxdy7FU7VJ7iPcgcM6AMxRtKwVjrwT4B4Y2Hdub/ABRXb28K2tE/Q74+Nead7yZV+BHcNbDglSPodcKsp0wIOgf14mLeisyKCFAJII/ipf8A4vCrKFJBAYbH1Hj8kXWdFdpJUD+RywB+0g8z8N4dXtiQgHxlo5STuyy2qbbmXTHxhjt2SZ6I4yISuzy/17IZudWImmKoT0bvH9pkHc+DpAQxbma/bTqUE2hwEAlUO/eQjiXMARsnTUvAX/EZxgS7vtUQIAF03OjXcdSxJnbLS0kPzddbPbsFCOUFQQKBge1dBv8AEjY/JJ1m4ZpJQDfwbYB+0g8yOvXybpZ8eHm21AfTesgRuXrOpUpjzj9ELnf3luWyTe+Tek0L2ZmPkBSx3teX6lW4uTKS0v7Wou9v7huY/VDj+l24sG9K5vLff8GOv7NzEy/wl43WEneWivd3a7g2w3sRzKyGybeqyKnwRAq70AihB5/on//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AR//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AR//Z", "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==" } } } })
  break

  case 'slow':
   low = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
   slo = await Pin.downloadAndSaveMediaMessage(low)
   ran = getRandom('.mp3')
   exec(`ffmpeg -i ${slo} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
   fs.unlinkSync(slo)
   if (err) return reply('Error!')
   hah = fs.readFileSync(ran)
   Pin.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
   fs.unlinkSync(ran)
   })
   break
				
  case 'esquilo':
   pai = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
   tup = await Pin.downloadAndSaveMediaMessage(pai)
   ran = getRandom('.mp3')
   exec(`ffmpeg -i ${tup} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
   fs.unlinkSync(tup)
   if (err) return reply('Error!')
   hah = fs.readFileSync(ran)
   Pin.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
   fs.unlinkSync(ran)
    })
   break
		
  case 'raposa':
   muk = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
   gem = await Pin.downloadAndSaveMediaMessage(muk)
   ran = getRandom('.mp3')
   exec(`ffmpeg -i ${gem} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
   fs.unlinkSync(gem)
   if (err) return reply('Error!')
   hah = fs.readFileSync(ran)
   Pin.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
   fs.unlinkSync(ran)
    })
   break


  case 'bass':                 
   ass = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
   bas = await Pin.downloadAndSaveMediaMessage(ass)
   ran = getRandom('.mp3')
   exec(`ffmpeg -i ${bas} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
   fs.unlinkSync(bas)
   if (err) return reply('Error!')
   hah = fs.readFileSync(ran)
   Pin.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
   fs.unlinkSync(ran)
    })
   break


//---Kecepatan respon

case 'ping':

  case 'speed':

if (!isUser) return reply(mess.only.userB)

const timestamp = speed();

const latensi = speed() - timestamp

Pin.updatePresence(from, Presence.composing)

uptime = process.uptime()

Pin.sendMessage(from, `*Velocidade de resposta do bot*\n‣ *Velocidade* : ${latensi.toFixed(4)} _Segundo_\n\n*Info do bot*\n‣ *Total chat* : ${totalchat.length}\n‣ *Total de usuários* : ${user.length}\n‣ *Block* : ${blocked.length}\n‣ *Online* : ${kyun(uptime)}`, text, {

  quoted: mek

})

break



//---donasi

case 'donasi':

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)

hasil = `Bantu donasi agar bot bisa terus berjalan.



Cuidado com o fogo, mesmo que você tenha um pedaço de tâmaras. Aquele que não encontra uma boa palavra

_“jauhilah api neraka, walau hanya dengan bersedekah sebiji kurma (sedikit). Jika kamu tidak punya, maka bisa dengan kalimah thayyibah” [HR. Bukhari 6539, Muslim 1016]_



*Pulsa :* _${Pulsa}_

*Dana :* _${Dana}_

*OVO :* _${Ovo}_`,

Pin.sendMessage(from, hasil, text, {

  quoted: mek

})

break


         case 'info1':
					me = Pin.user
					uptime = process.uptime()
					teks = `*Nome do bot* : ${me.name}\n*Número do bot* : @${me.jid.split('@')[0]}\n*Prefixo* : ${prefix}\n*Contatos bloqueados* : ${blocked.length}\n*O bot está ativo em* : ${kyun(uptime)}\n\n*Digite .dono para ver a info do dono*`
					buffer = await getBuffer(me.imgUrl)
					Pin.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break


//--arti nama

case 'arti':

if (args.length < 1) return reply('*☒* Digite o texto')

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)

teks = body.slice(6)

try {

data = await fetchJson(`https://scrap.terhambar.com/nama?n=${teks}`)

hasil = `Nome : *${teks}*\n${data.result.arti}`

reply(hasil)



} catch {

  reply(mess.ferr)

}

break


//---couple pasangan

case 'couple':

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)

if (!q.includes(' & ')) return  reply('O formato do texto está errado')

const aku = q.substring(0, q.indexOf(' &') - 0)

const kamu = q.substring(q.lastIndexOf('& ') + 1)

try {

data = await fetchJson(`https://arugaz.herokuapp.com/api/jodohku?nama=${aku}&pasangan=${kamu}`, {

  method: 'get'

})

yoi = `‣ *Nome* : ${aku}

‣ *Casal* : ${kamu}

‣ *Positivo* : ${data.positif}

‣ *Negativo* : ${data.negatif}`

Pin.sendMessage(from, yoi, text, {

  quoted: mek

})



} catch {

  reply(mess.ferr)

}

break



//---Zodiak harian

case 'zodiak':

if (args.length < 1) return reply('*☒* Digite o nome do seu zodíaco')

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)

teks = body.slice(8)

try {

data = await fetchJson(`https://api.vhtear.com/zodiak?query=${teks}&apikey=${vKey}`)

hasil = `Zodiak : *${data.result.zodiak}*\nRamalan hari ini : *${data.result.ramalan}*\n${data.result.inspirasi}`

reply(hasil)



} catch {

  reply(mess.ferr)

}

break



//--pencarian pinterest

  case 'img':

if (!isUser) return reply(mess.only.userB)



if (args.length < 1) return reply('*☒* Insira uma consulta')

tels = body.slice(5)

Pin.updatePresence(from, Presence.composing)

reply(mess.wait)

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${tels}`, {

  method: 'get'

})

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Consegue tirar fotos : *${tels}*`

})



} catch {

  reply(mess.ferr)

}

break



//--Pencarian pinterest

case 'pinterest':

tels = body.slice(11)

if (!isUser) return reply(mess.only.userB)



if (args.length < 1) return reply('*☒* Insira uma consulta')

Pin.updatePresence(from, Presence.composing)

try {

data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Consegue tirar fotos : *${tels}*`

})



} catch {

  reply(mess.ferr)

}

break



case 'listonline':

                let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from

                let online = [...Object.keys(Pin.chats.get(ido).presences), Pin.user.jid]

	            Pin.sendMessage(from, 'Lista Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,

             contextInfo: { mentionedJid: online }

                 })

                 break


				case 'simih':
				if (isBanned) return reply(mess.only.benned)    
								
				if (!isGroup) return reply(mess.only.group)
				if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isSimi) return reply('O modo SIM está ativo')
						samih.push(from)
						fs.writeFileSync('./data/bot/simi.json', JSON.stringify(samih))
						reply(`\`\`\`Ativar com sucesso o modo simi no grupo\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						samih.splice(from, 1)
						fs.writeFileSync('./data/bot/simi.json', JSON.stringify(samih))
						reply(`\`\`\`🥺“Desativando o modo simi com sucesso no grupo\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On ativar, Off para desativar')
					}
					break

				case 'walpaperhd':
				
					if (args.length < 1) return reply('Cadê o texto tio')
					teksj = body.slice(7)
					reply(mess.wait)
					anwu = await fetchJson(`https://api.vhtear.com/walpaper?query=${teksj}&apikey={BELI APIKEY BIAR WORK DI 0816546638}`, {method: 'get'})
					bufferx = await getBuffer(anwu.result.LinkImg)
					Pin.sendMessage(from, bufferx, image, {quoted: mek})
					break
   

//--pinterest anime neko

case 'neko':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["anime neko"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break



//--Pinteres anime loli

  case 'loli':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["anime loli"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break

case 'tenten':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["anime tenten"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break

case 'tsunade':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["anime tsunade"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break

case 'freefire':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["freefire"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break



  case 'belle':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

uk = ["belle delphine"]

nk = uk[Math.floor(Math.random() * uk.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `Ini ?`

})



} catch {

  reply(mess.ferr)

}

break


	case 'desenho':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(6)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/pencil/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break





//--Pinterest Twitter

  case 'twit':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

tw = ["Twitter lucu Indonesia",

  "Twitter harian",

  "Recehkan Twitter",

  "twit lucu"]

nk = tw[Math.floor(Math.random() * tw.length)]

try {

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek

})



} catch {

  reply(mess.ferr)

}

break

  case 'anime':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

am = ["anime tumblr",

  "wallpaper anime hd",

  "anime aestethic",

  "anime hd"]

nk = am[Math.floor(Math.random() * am.length)]

data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

  method: 'get'

})

reply(mess.wait)

n = JSON.parse(JSON.stringify(data));

nimek = n[Math.floor(Math.random() * n.length)];

pok = await getBuffer(nimek)

Pin.sendMessage(from, pok, image, {

  quoted: mek, caption: `wah wibu lu !`

})



break


//--Pinterest wallpaper

  case 'wp':

case 'wallpaper':

 if (!isUser) return reply(mess.only.userB)

  

  Pin.updatePresence(from, Presence.composing)

  pw = ["wallpaper aestethic",

"wallpaper tumblr",

"wallpaper lucu",

"wallpaper"]

  nk = pw[Math.floor(Math.random() * pw.length)]

  try {

  data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

method: 'get'

  })

  reply(mess.wait)

  n = JSON.parse(JSON.stringify(data));

  nimek = n[Math.floor(Math.random() * n.length)];

  pok = await getBuffer(nimek)

  Pin.sendMessage(from, pok, image, {

quoted: mek, caption: `keren gak ?`

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--Pinterest cecan

case 'cecan':

 if (!isUser) return reply(mess.only.userB)

  

  tels = body.slice(5)

  Pin.updatePresence(from, Presence.composing)

  ty = ["ulzhang girl",

"cewek cantik",

"cewe hijab",

"cewe rusia cantik",

"cewe jepang cantik",

"cecan indo"]

  nk = ty[Math.floor(Math.random() * ty.length)]

  try {

  data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

method: 'get'

  })

  reply(mess.wait)

  n = JSON.parse(JSON.stringify(data));

  nimek = n[Math.floor(Math.random() * n.length)];

  pok = await getBuffer(nimek)

  Pin.sendMessage(from, pok, image, {

quoted: mek, caption: `Gimana ?`

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--Pinterest quotes

case 'quotes':

 if (!isUser) return reply(mess.only.userB)

  

  tels = body.slice(5)

  Pin.updatePresence(from, Presence.composing)

  qt = ["quotes galau",

"quotes aestethic Indonesia"]

  nk = qt[Math.floor(Math.random() * qt.length)]

  try {

  data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

method: 'get'

  })

  reply(mess.wait)

  n = JSON.parse(JSON.stringify(data));

  nimek = n[Math.floor(Math.random() * n.length)];

  pok = await getBuffer(nimek)

  Pin.sendMessage(from, pok, image, {

quoted: mek, caption: `Kasian jomblo`

  })

  

  } catch {

    reply(mess.ferr)

  }

  break







//--Pinterest cogan

case 'cogan':

 if (!isUser) return reply(mess.only.userB)

  

  Pin.updatePresence(from, Presence.composing)

  uk = ["ulzhang boy","cowok keren","cowo ganteng","cogan","cogan jawa"]

  nk = uk[Math.floor(Math.random() * uk.length)]

  try {

  data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

method: 'get'

  })

  reply(mess.wait)

  n = JSON.parse(JSON.stringify(data));

  nimek = n[Math.floor(Math.random() * n.length)];

  pok = await getBuffer(nimek)

  Pin.sendMessage(from, pok, image, {

quoted: mek, caption: `Wah ganteng kek gua`

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--Pinterest cyberpunk

case 'cyberpunk':

 if (!isUser) return reply(mess.only.userB)

  

  Pin.updatePresence(from, Presence.composing)

  co = ["anime cyberpunk","fotografi cyberpunk","tokyo cyberpunk"]

  nk = co[Math.floor(Math.random() * co.length)]

  try {

  data = await fetchJson(`https://api.fdci.se/sosmed/rep.php?gambar=${nk}`, {

method: 'get'

  })

  reply(mess.wait)

  n = JSON.parse(JSON.stringify(data));

  nimek = n[Math.floor(Math.random() * n.length)];

  pok = await getBuffer(nimek)

  Pin.sendMessage(from, pok, image, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'jadian':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return Pin.sendMessage(from, `Masukan tanggal-bulan-tahun`, text, {

quoted: mek

  })

  if (!q.includes('-')) return  reply('Masukan tanggal-bulan-tahun dengan benar\n*Contoh : 09-09-2009*')

  pc = body.slice(9)

  teks1 = pc.split("-")[0];

  teks2 = pc.split("-")[1];

  teks3 = pc.split("-")[2];

  reply(mess.wait)

  try {

  iya = await fetchJson(`http://lolhuman.herokuapp.com/api/jadian/${teks1}/${teks2}/${teks3}?apikey=${lolKey}`, {

method: 'get'

  })

  hasil = `‣ *Karakteristik* : ${iya.result.karakteristik}\n‣ *Deskripsi* : ${iya.result.deskripsi}`

  Pin.sendMessage(from, hasil, text, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break
  
  
  		 case 'casal':
					if (isBanned) return reply(mess.only.benned)   
					if (!isUser) return reply(mess.only.userB)
					jds = []
					const jdii = groupMembers
					const koss = groupMembers
					const akuu = jdii[Math.floor(Math.random() * jdii.length)]
					const diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `Futuro casal do grupo:\n@${akuu.jid.split('@')[0]} ❤️\n @${diaa.jid.split('@')[0]} ❤️ `
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break
					
					case 'bonito':
					if (isBanned) return reply(mess.only.benned)   
					if (!isUser) return reply(mess.only.userB)
					membr = []
					const nge = groupMembers
					const tod = groupMembers
					const beb = nge[Math.floor(Math.random() * nge.length)]
					const an = pushname2[Math.floor(Math.random() * tod.length)]
					teks = `*Membro mas bonito do gp:\n @${beb.jid.split('@')[0]}🙂`
					membr.push(beb.jid)
					mentions(teks, membr, true)
					break
					
					case 'ship':
					 if (args.length < 1) return reply('Insira uma consulta')
				await sendTextWithMentions(from, '❤️ ' + arqs[1] + ' tem um chance de ' + lvpc + '% de namorar ' + arqs[2] + '. 👩‍❤️‍👨')
				await reply(from, '❤️ você tem um chance de ' + lvpc + '% de namorar ${+ arqs[1] +}. 👩‍❤️‍👨')
				await reply(from, 'Marque o casal de pombinhos ou insira o nome da sua crush!', id)
			break		




case 'asupan':

  

if (!isUser) return reply(mess.only.userB)

try {

data = await fetchJson(`https://api.itsmeikyxsec404.xyz/asupan?apikey=${meKey}`)

reply(mess.wait)

hasil = await getBuffer(data.result)

Pin.sendMessage(from, hasil, video, {

  caption: 'Nih gan', quoted: mek

})



} catch {

  reply(mess.ferr)

}

break



case 'weton':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return Pin.sendMessage(from, `Masukan tanggal-bulan-tahun`, text, {

quoted: mek

  })

  if (!q.includes('-')) return  reply('Masukan tanggal-bulan-tahun dengan benar\n*Contoh : 09-09-2009*')

  pc = body.slice(7)

  teks1 = pc.split("-")[0];

  teks2 = pc.split("-")[1];

  teks3 = pc.split("-")[2];

  reply(mess.wait)

  try {

  iya = await fetchJson(`http://lolhuman.herokuapp.com/api/weton/${teks1}/${teks2}/${teks3}?apikey=${lolKey}`, {

method: 'get'

  })

  hasil = `${iya.result.weton}\n\nKarakteristik: ${iya.result.karakter}\n Pekerjaan : ${iya.result.pekerjaan}\n Rejeki : ${iya.result.rejeki}\nJodoh : ${iya.result.jodoh}`

reply(hasil)

break

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'seberapagay':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return Pin.sendMessage(from, '*☒* Masukan pertanyaan', text, {

quoted: mek

  })

  teks = body.slice(13)
  
  try {

  Pin.updatePresence(from, Presence.composing)

  data = await fetchJson(`https://arugaz.herokuapp.com/api/howgay`)

  hasil = `*Gay Detected*\n‣ Target : *${args[0]}*\n‣ Persentase : *${data.persen}%*\n*${data.desc}*`

  reply(hasil)

  
 } catch {

    reply(mess.ferr)

  }

  break


 



case 'seberapabucin':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return Pin.sendMessage(from, '*☒* Masukan nama target', text, {

quoted: mek

  })

  teks = body.slice(15)

  try {

  Pin.updatePresence(from, Presence.composing)

  data = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`)

  hasil = `*Bucin Detected*\n‣ Target : *${args[0]}*\n‣ Persentase : *${data.persen}%*\n*${data.desc}*`

  reply(hasil)

  

  } catch {

    reply(mess.ferr)

  }

  break



//--searching lirik

case 'letra':

  if (args.length < 1) return reply('Insira uma consulta')

 if (!isUser) return reply(mess.only.userB)

  

  Pin.updatePresence(from, Presence.composing)

  tels = body.slice(7)

  try {

  anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${tels}`, {

method: 'get'

  })

  reply(anu.result.lirik)

  

  } catch {

    reply(mess.ferr)

  }

  break
  
 case 'igstalk':
 yolo = body.slice(9)
if (!isUser) return reply(mess.only.userB)
 if (args.length < 1) return reply('Insira uma consulta')
 try {
 hmm = await fetchJson(`https://api.zeks.xyz/api/igstalk?username=${body.slice(9)}&apikey=apivinz`)
 buffer = await getBuffer(hmm.profile_pic)
 hasil = `Nome : ${hmm.fullname}\nSeguidores : ${hmm.follower}\nSeguindo : ${hmm.following}\nPrivate : ${hmm.is_private}\nVerified : ${hmm.is_verified}\nBio : ${hmm.bio}`
 Pin.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
 
} catch {

 reply(mess.ferr)
 
}
 
break

case 'plaquinha':
  if (args.length < 1) return reply(mess.blank)
	teks = body.slice(10)
	if (teks.length > 10) return reply('O texto é longo, até 10 caracteres')
	reply('*Estou fazendo*')
	 buffer = await getBuffer(`https://restioas.sirv.com/Spins/artworks-000056121029-geglen-t500x500.jpg?text.0.text=${teks}&text.0.position.gravity=west&text.0.position.x=16%25&text.0.size=34&text.0.color=140f15&text.0.opacity=64&text.0.font.family=Yellowtai&text.0.font.weight=700&text.0.background.opacity=94&text.0.outline.color=0a0a0a&text.0.outline.opacity=42%22%20width=%22500%22%20height=%22500%22%20alt=`)
	 Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '*Se usou deve uma mamada no supra*'})
	 break
	 
 
 
 case 'qrcode':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 const tex = encodeURIComponent(body.slice(8))
 try {
 if (!tex) return Pin.sendMessage(from, 'MASUKAN URL/TEKS UNTUK DI JADIKAN QR', text, {quoted: mek})
 const buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
 Pin.sendMessage(from, buff, image, {quoted: mek})
 } catch {
 replay (mess.ferr)
 }
 break

 
 case 'gplaybutton':
 case 'splaybutton':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://api.zeks.xyz/api/${command}?text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
} catch {
replay (mess.ferr)
}
 break
 

 case 'ant':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://terhambar.com/aw/qts/proses.php?kata=${txt}&author=NEWTON&tipe=sad&font=./font/font3.otf&size=60`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
} catch {
replay (mess.ferr)
}
 break

 
 case 'romance':
if (isBanned) return reply(mess.only.benned)    
if (!isUser) return reply(mess.only.userB)
if (args.length < 1) return reply(`Contoh: ${prefix}romance dns`)
roce = body.slice(9)
reply(mess.wait)
roma = await getBuffer(`https://videfikri.com/api/textmaker/romancetext/?text=${roce}`)
Pin.sendMessage(from, roma, image, {quoted: mek})
break

case 'viga':
if (isBanned) return reply(mess.only.benned)    
if (!isUser) return reply(mess.only.userB)
if (args.length < 1) return reply(`Contoh: ${prefix}romance dns`)
roce = body.slice(5)
reply(mess.wait)
roma = await getBuffer(`https://api.zeks.xyz/api/logoaveng?text1=TES&text2=${roce}&apikey=apivinz`)
Pin.sendMessage(from, roma, image, {caption: '*PRONTINHO ✅*\n\n*DONO CASX:*NEWTON', quoted: mek})
break
  
    
 case 'tri':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://api.zeks.xyz/api/text3dbox?apikey=apivinz&text=${txt}`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
} catch {
replay (mess.ferr)
}
 break
         
 case 'txt':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://api.zeks.xyz/api/text3d?text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
} catch {
replay (mess.ferr)
}
 break
          
 case 'tac':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://api.zeks.xyz/api/wolflogo?apikey=apivinz&text1=ZEKS&text2=${txt}`)
 Pin.sendMessage(from, buffer, image, {caption: '*PRONTINHO ✅*\n\n*DONO CASX:*NEWTON', quoted: mek})
} catch {
replay (mess.ferr)
}
 break
 
 case 'kho':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 try {
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://api.zeks.xyz/api/tfire?text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '*PRONTINHO ✅*\n\n*DONO CASX:*NEWTON', quoted: mek})
} catch {
replay (mess.ferr)
}
 break

 

 
 
 case 'love':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://videfikri.com/api/textmaker/lovemsg/?text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
 break
 
   case 'attp':	
 if (isBanned) return reply('Maaf kamu sudah terbenned!')
 if (args.length < 1) return reply(`uhm teksnya mana?\n*Contoh ${prefix}attp stardustlrlr gans*`)
 attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
 Pin.sendMessage(from, attp2, sticker, {quoted: mek})
 break
 
 case 'attp1':
 if (isBanned) return reply('Maaf kamu sudah terbenned!')	
 if (args.length < 1) return reply(`uhm teksnya mana?\n*Contoh ${prefix}attp stardustlrlr gans*`)
 attp2 = await getBuffer(`https://lolhuman.herokuapp.com/api/attp?apikey=73cea893c3a573384e52e0a6&text=${body.slice(6)}`)
 Pin.sendMessage(from, attp2, sticker, {quoted: mek})
 break
 
 
 case 'gplay':
 case 'splay':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/textprome/neon?apikey=69bd42a244e197ad54548345&text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
 break
 
 
 case 'haram':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ")
 reply('🍒Criando🍒')
 buffer = await getBuffer(`http://rzky.net/docs/api/AnakHaramSerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'gayz':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒 Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/GaySerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'surga':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/SurgaSerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'editod':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒 Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/EditorBerkelasSerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'hekerserti':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒 Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/HekerSerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'ffserti':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/FFSerti/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'ffserti2':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/FFSerti4/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'mlserti':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/MLTourSerti2/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'pubgserti':
 if (isBanned) return reply('Maaf kamu sudah terbenned astagfirullah!')
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Kamu`)
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`http://rzky.net/docs/api/PubgTourSerti3/img.php?nama=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break
         
 case 'lollogo':
 if (isBanned) return reply('Maaf Kamu Sudah Terbanned astagfirullah') 
 if (args.length == 0) return reply(`Usage: ${prefix} + command} text\nExample: ${prefix + command} Ojan`) 
 teks = args.join(" ") 
 reply('🍒Criando🍒') 
 buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/photooxy3/bannerlol?apikey=RamlanID&text=${teks}`) 
 Pin.sendMessage(from, buffer, image, {caption: 'Nih', quoted: mek})
 break

  case 'copi':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/textprome/toxic?apikey=69bd42a244e197ad54548345&text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
 break
 
  
  case 'barii':
 if (args.length < 1) return reply('Insira uma consulta')
if (!isUser) return reply(mess.only.userB)
 if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} stardustlrlr`)
 txt = args.join(" ")
 reply('🍒Criando🍒')
 buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/textprome/toxic?apikey=69bd42a244e197ad54548345&text=${txt}&apikey=apivinz`)
 Pin.sendMessage(from, buffer, image, {caption: '🍒Não apenas siga: https://www.instagram.com/nilton_cant/🍒', quoted: mek})
 break
 
 
 case 'attp':
 if (args.length < 1) return reply(`uhm teksnya mana?\n*Contoh ${prefix}attp stardustlrlr gans*`)
 attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
 Pin.sendMessage(from, attp2, sticker, {quoted: mek})
 break
 
 case 'ttp2':
  if (args.length < 1) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} LoL Human`)
  txt = args.join(" ")
  buffer = await getBuffer(`http://api.lolhuman.xyz/api/ttp?apikey=RiuApikey&text=${txt}`)
  Pin.sendMessage(from, buffer, sticker, { quoted: mek })
  break



case 'namae':

  if (args.length < 1) return reply('*☒* Insira o nome')

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)



teks = body.slice(7) 

try {

data = await fetchJson(`https://api.terhambar.com/ninja?nama=${teks}`)

hasil = `*Nama ninja kamu*\n*${data.result.ninja}*`

reply(hasil)



} catch {

  reply(mess.ferr)

}

break



case 'alay':

  if (args.length < 1) return reply('*☒* Digite o texto')

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)



teks = body.slice(6)

try {

data = await fetchJson(`https://api.terhambar.com/bpk?kata=${teks}`)

reply(data.text)



} catch {

  reply(mess.ferr)

}

break


case 'info':
  me = Pin.user

  uptime = process.uptime()

  teks = `*‣ Nome * : ${me.name}

  ‣ *Numero * : @${me.jid.split('@')[0]}

  ‣ *Proprietário* : NEWTON MODS

  ‣ *Prefix* : ${prefix}

  ‣ *Contatos bloqueados* : ${blocked.length}

  ‣ *O bot está ativo em* : ${kyun(uptime)}

  ‣ *Usuário Total* : ${user.length} User

  ‣ *Total Chat* : ${totalchat.length}`

  buffer = await getBuffer(me.imgUrl)

  Pin.sendMessage(from, buffer, image, {

caption: teks, contextInfo: {

  mentionedJid: [me.jid]}})

  break


case 'gplaystore':

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)



goo = body.slice(12)

try {

data = await fetchJson(`https://api.zeks.xyz/api/sgplay?apikey=${viKey}&q=${goo}`, {

method: 'get'

  })



teks = '*Google Play Store*\n\n'

				for (let i of data.result) {

					teks += `        ────────────────\n\n‣ *Nome* : ${i.title}\n‣ *Desenvolvedor* : ${i.developer}\n‣ *Avaliação* : ${i.rating}\n‣ *Link* : ${i.url}\n\n`

				}

				teks += `        ────────────────`

reply(teks.trim())



} catch {

  reply(mess.ferr)

}



break

case 'bijak':

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)



try {

data = await fetchJson(`http://lolhuman.herokuapp.com/api/random/katabijak?apikey=${lolKey}`)

reply(data.result)



} catch {

  reply(mess.ferr)

}

break



case 'pantun':

 

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)



try {

data = await fetchJson(`http://lolhuman.herokuapp.com/api/random/pantun?apikey=${lolKey}`)

reply(data.result)



} catch {

  reply(mess.ferr)

}

break



case 'bucin':

case 'gombal':



  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  

  try {

  data = await fetchJson(`http://lolhuman.herokuapp.com/api/random/bucin?apikey=${lolKey}`)

  reply(data.result)

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'charnime':

  teks = body.slice(10)

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('*☒* Digite o nome do personagem de anime')

  try {

  data = await fetchJson(`http://lolhuman.herokuapp.com/api/character?apikey=${lolKey}&query=${teks}`)

  buf = await getBuffer(data.result.image.large)

  hasil = `‣ *Nome* : ${data.result.name.full} *(${data.result.name.native})*\n‣ *Descrição* : ${data.result.description}`

  Pin.sendMessage(from, buf, image, {

caption: hasil, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'textgen':

  teks = body.slice(9)

  if (args.length < 1) return reply('*☒* Digite o texto')

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  

  try {

  data = await fetchJson(`https://api.arugaz.my.id/api/random/text/fancytext?text=${teks}`)

  reply(data.result)

  

  } catch {

    reply(mess.ferr)

  }

  break





case 'kusonime':

  teks = body.slice(6)

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('*☒* Digite o nome do anime')

  try {

  data = await fetchJson(`https://st4rz.herokuapp.com/api/kuso?q=${teks}`)

  hasil = `‣ *Título* : ${data.title}\n‣ *Info* : ${data.info}\n‣ *Sinopse* : ${data.sinopsis}\n‣ *Link download* :\n${data.link_dl}`

  buf = await getBuffer(data.thumb)

  Pin.sendMessage(from, buf, image, {

quoted: mek, caption: hasil

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'apakah':

  if (args.length < 1) return reply('*☒* Masukan pertanyaan')

  Pin.updatePresence(from, Presence.composing)

  random = apakah[Math.floor(Math.random() * (apakah.length))]

  hasil = `Apakah : *${body.slice(8)}*\n\nJawaban : *${random}*`

  reply(hasil)

  break



//bisakah

case 'bisakah':

  if (args.length < 1) return reply('*☒* Masukan pertanyaan')

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  random = bisakah[Math.floor(Math.random() * (bisakah.length))]

  hasil = `Bisakah : *${body.slice(9)}*\n\nJawaban : *${random}*`

  reply(hasil)

  break



case 'rate':

  if (args.length < 1) return reply('*Introduzir uma pergunta')

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  random = `${Math.floor(Math.random() * 100)}`

  hasil = `Rating : *${body.slice(6)}*\n\nJawaban : *${random}%*`

  reply(hasil)

  break



case 'kapankah':

  if (args.length < 1) return reply('*☒* Introduzir uma pergunta')

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  random = kapankah[Math.floor(Math.random() * (kapankah.length))]

  random2 = `${Math.floor(Math.random() * 8)}`

  hasil = `Kapankah : *${body.slice(10)}*\n\nJawaban : *${random2} ${random}*`

  reply(hasil)

  break



case 'kapan':

  if (args.length < 1) return reply('*☒* Masukan pertanyaan')

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  random = kapankah[Math.floor(Math.random() * (kapankah.length))]

  random2 = `${Math.floor(Math.random() * 8)}`

  hasil = `Kapankah : *${body.slice(7)}*\n\nJawaban : *${random2} ${random}*`

  reply(hasil)

  break



case 'setppgc':



if (!isGroup) return reply(mess.only.group)

if (!isUser) return reply(mess.only.userB)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek

reply(mess.wait)

const media = await Pin.downloadAndSaveMediaMessage(encmedia)

await Pin.updateProfilePicture (from, media)

reply('*☉* Mengganti foto profil grup')

break



case 'kimg':

 if (!isUser) return reply(mess.only.userB)
 var imgbb = require('imgbb-uploader')

 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

    ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

    reply(mess.wait)

    owgi = await Pin.downloadAndSaveMediaMessage(ger)

     anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)

     teks = `${anu.display_url}`

reply(teks)

}

break



//---stiker wasted

 case 'wanted':
if (!isUser) return reply(mess.only.userB)
 if (isBanned) return reply('Maaf kamu sudah terbenned!')
 var imgbb = require('imgbb-uploader')
 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
  reply(ind.wait())
  owgi = await Pin.downloadAndSaveMediaMessage(ted)
  tels = body.slice(7)
  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
  hehe = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${anu.display_url}&text1=Dicari&text2=${tels}`)
  Pin.sendMessage(from, hehe, image, {quoted:mek})
  } else {
   reply('Jangan tambah kan apapun pada command')
  }
  break
  
  
  case 'gtav':
   if (!isUser) return reply(mess.only.userB)
    if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/gtavposter/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'facebookpage':
   if (!isUser) return reply(mess.only.userB)
    if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(14)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/facebookprof/?urlgbr=${anu.display_url}&text=${tels}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'costumwp':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(14)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/customwp/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'pantaimalam':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')	
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(14)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/nightbeach/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'lapis':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(mess.wait)
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(6)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/pencil/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'bakar':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/burneffect/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break
	
	
	case 'crossgun':
   if (!isUser) return reply(mess.only.userB)
	if (isBanned) return reply('Maaf kamu sudah terbenned!')
	var imgbb = require('imgbb-uploader')
	if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
	  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
	  reply(ind.wait())
	  owgi = await Pin.downloadAndSaveMediaMessage(ted)
	  tels = body.slice(7)
	  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
	  hehe = await getBuffer(`https://videfikri.com/api/textmaker/crossgun/?urlgbr=${anu.display_url}`)
	 Pin.sendMessage(from, hehe, image, {quoted:mek})
	} else {
	  reply('Jangan tambah kan apapun pada command')
	}
	break


//--list kodebahasa

case 'kodebahasa':

Pin.sendMessage(from, bahasa(prefix, sender), text, {

  quoted: mek

})

break



//--list kode negara

case 'basecode':

Pin.sendMessage(from, negara(prefix, sender), text, {

  quoted: mek

})

break



//--link wame

case 'wa.me':

case 'wame':

  Pin.updatePresence(from, Presence.composing)

  options = {

text: `Link WhatsApp-Mu : *wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,

contextInfo: {

  mentionedJid: [sender]

}

  }

  Pin.sendMessage(from, options, text, {

quoted: mek

  })

  break



//---quoted fuck my life

case 'fml':

 if (!isUser) return reply(mess.only.userB)

  

  try {

data = await fetchJson(`https://api.zeks.xyz/api/fml`)

if (!isUser) return reply(mess.only.userB)

hasil = data.result

reply(hasil)



} catch {

  reply(mess.ferr)

}

break



//--translate semua bahasa

  case 'tl':

   if (!isUser) return reply(mess.only.userB)

  

if (args.length < 1) return Pin.sendMessage(from, '*☒* Masukan teks/kode bahasa', text, {

  quoted: mek

})

var pc = body.slice(4)

nomor = pc.split("/")[0];

pesan = pc.split("/")[1];

try {

data = await fetchJson(`https://api-translate.azharimm.tk/translate?engine=google&text=${nomor}&to=${pesan}`)

if (!isUser) return reply(mess.only.userB)

hasil = `*Traduzir* :\n${data.data.result}`

reply(hasil)



} catch {

  reply(mess.ferr)

}

break



//---membalikan kalimat

  case 'reverse':

   if (!isUser) return reply(mess.only.userB)

  

if (args.length < 1) return Pin.sendMessage(from, '*☒* Entrada de texto', text, {

  quoted: mek

})

var pc = body.slice(9)

try {

data = await fetchJson(`https://videfikri.com/api/hurufterbalik/?query=${pc}`)

if (!isUser) return reply(mess.only.userB)

hasil = data.result.kata

reply(hasil)



} catch {

  reply(mess.ferr)

}

break







//--fake reply

case 'fitnah':

if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)

var gh = body.slice(7)

mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid

var replace = gh.split("|")[0];

var target = gh.split("|")[1];

var bot = gh.split("|")[2];

Pin.sendMessage(from, `${bot}`, text, {

  quoted: {

key: {

  fromMe: false, participant: `${mentioned}`, ...(from ? {

remoteJid: from

  }: {})

}, message: {

  conversation: `${target}`

}}})

break


case 'quotemaker':
if (!isUser) return reply(mess.only.userB)
if (args.length < 1) return Pin.sendMessage(from, '*☒* Masukan teks/kode bahasa')
var gh = body.slice(12)
var quote = gh.split("|")[0];
var wm = gh.split("|")[1];
hehe = await getBuffer(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, {method: 'get'})
buffer = await getBuffer(hehe.result)
Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
break



//--Kejujuran

case 'truth':

const ttrth = trut[Math.floor(Math.random() * trut.length)]

Pin.sendMessage(from, `‣ *TRUTH*\n${ttrth}`, text, {

  quoted: mek

})

break



//---Tantangan

  case 'dare':

const der = dare[Math.floor(Math.random() * dare.length)]

Pin.sendMessage(from, `‣ *DARE*\n${der}`, text, {

  quoted: mek

})

break





//--notifikasi grup

  case 'notif':



if (!isGroupAdmins) return reply(mess.only.admin)

Pin.updatePresence(from, Presence.composing)

if (!isUser) return reply(mess.only.userB)

if (!isGroup) return reply(mess.only.group)

teks = `Notif dari @${sender.split("@")[0]}\n*Pesan : ${body.slice(7)}*`

group = await Pin.groupMetadata(from);

member = group['participants']

jids = [];

member.map(async adm => {

  jids.push(adm.id.replace('c.us', 's.whatsapp.net'));

})

options = {

  text: teks,

  contextInfo: {

mentionedJid: jids

  },

  quoted: mek

}

await Pin.sendMessage(from, options, text)

break



//--jawaban BRANLy

  case 'brainly':

if (!isUser) return reply(mess.only.userB)

  

if (args.length < 1) return Pin.sendMessage(from, '*☒* Masukan pertanyaan', text, {

  quoted: mek

})

teks = body.slice(9)

try {

Pin.updatePresence(from, Presence.composing)

data = await fetchJson(`https://api.vhtear.com/branly?query=${teks}&apikey=${vKey}`)

hasil = data.result.data

reply(hasil)

await limitAdd(mess.ferr)

} catch {

  reply(mess.ferr)

}

break
              case'verify':
              case 'daftar':
					Pin.updatePresence(from, Presence.composing)
					if (isUser) return reply('*VOCE ESTÁ  REGISTRADO!*')
					if (isBanned) return reply(mess.only.benned)
				    user.push(sender)
					fs.writeFileSync('./data/user.json', JSON.stringify(user))
					try {
					ppimg = await Pin.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					captionnya = `╭─「 *_CADASTRO_* 」\`\`\`\n│ REGISTRO COM SUCESSO NS: \n│TM08GK8PPHBSJDH10J\`\`\`\n│\n│\`\`\`SOBRE ${date} ${time}\`\`\`\n│\`\`\`「 NOME 」: ${pushname2}\`\`\`\n│\`\`\`「 NUMERO 」: wa.me/${sender.split("@")[0]}\`\`\`\n│\`\`\`USAR O BOT\`\`\`\n│\`\`\`POR FAVOR\`\`\`\n│\`\`\`ENVIE ${prefix}menu\`\`\`\n│\`\`\`\n│TOTAL USADO: ${user.length} PESSOAS\`\`\`\n╰────────────────`               
                    daftarimg = await getBuffer(ppimg)
					Pin.sendMessage(from, daftarimg, image, {quoted: mek, caption: captionnya})
			     	break 
          
                            
  //pencarian wiki

  case 'wiki':

   if (!isUser) return reply(mess.only.userB)



if (args.length < 1) return reply('Masukan query')

tels = body.slice(6)

try {

anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${tels}&apikey=BotWeA`, {

  method: 'get'

})

reply(anu.result)



} catch {

  reply(mess.ferr)

}

break





//--Goolge Image



case 'google':

 if (!isUser) return reply(mess.only.userB)



  if (args.length < 1) return reply('*☒* Masukan teks')

  goo = body.slice(7)

  try {

  pint = await getBuffer(`http://lolhuman.herokuapp.com/api/gimage?apikey=${lolKey}&query=${goo}`, {

method: 'get'

  })

  Pin.updatePresence(from, Presence.composing)

  reply(mess.wait)

  Pin.sendMessage(from, pint, image, {

caption: '*Google Image*\n\n*Hasil Pencarian : '+goo+'*', quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'alay2':

  if (!isUser) return reply(mess.only.userB)
  if (args.length < 1) return reply('*☒* Digite o texto')

  goo = body.slice(7)

  try { 

  pint = await fetchJson(`http://lolhuman.herokuapp.com/api/upperlower?apikey=${lolKey}&text=${goo}`, {

method: 'get'

  })

  Pin.updatePresence(from, Presence.composing)

  hasil = pint.result

  Pin.sendMessage(from, hasil, text, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//---Neonime search

case 'neonime':

if (!isUser) return reply(mess.only.userB)



Pin.updatePresence(from, Presence.composing)

reply(mess.wait)

if (args.length < 1) return reply(`*☒* Masukan judul anime`)

teks = body.slice(9)

try {

data = await fetchJson(`https://api.zeks.xyz/api/neonimesearch?q=${teks}&apikey=${viKey}`, {

  method: 'get'

})

teks = '••••••••••••••••••••••\n'

for (let i of data.result) {

  teks += `‣ *Title* : ${i.title}\n‣ *link* : ${i.link}\n••••••••••••••••••••••\n`

}

reply(teks.trim())

if (data.message) return reply(`Maaf Info anime *${teks} tidak ditemukan`)



} catch {

  reply(mess.ferr)

}

break



//---Ganti nama grup

  case 'setname':

if (!isGroup) return reply(mess.only.group)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

let idgrup = `${from.split("@s.whatsapp.net")[0]}`;

Pin.groupUpdateSubject(idgrup, `${body.slice(9)}`)

Pin.sendMessage(from, '*☉* Mengganti Nama Grup', text, {

  quoted: mek

})

break



//--ganti desk

  case 'setdesk':

if (!isGroup) return reply(mess.only.group)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

Pin.groupUpdateDescription(from, `${body.slice(9)}`)

Pin.sendMessage(from, '*☉* Mengganti Deskripsi Grup', text, {

  quoted: mek

})

break







//--random meme

case 'meme':

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)



try {

  beh = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${viKey}`)

  pint = await getBuffer(beh.result)

  reply(mess.wait)

  Pin.sendMessage(from, pint, image, {

quoted: mek

  })

  

} catch {

  reply(mess.ferr)

}

  break
  
  
case 'memeindo':
    memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
	break
case 'jinmiran':
      data = fs.readFileSync('./apis/jinmiran.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
	  Pin.sendMessage(from, buffer, image, {caption: 'amo jinmiran❤🥺', quoted: mek})
      break
      
case 'mia':
      data = fs.readFileSync('./apis/mia.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
	  Pin.sendMessage(from, buffer, image, {caption: 'amo mia❤🥺', quoted: mek})
      break
      
case 'mcpoze':
      data = fs.readFileSync('./apis/mcpoze.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
	  Pin.sendMessage(from, buffer, image, {caption: 'iiih', quoted: mek})
      break
      
case 'saycat':
      data = fs.readFileSync('./apis/saycat.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
	  Pin.sendMessage(from, buffer, image, {caption: 'amo saycat❤🥺', quoted: mek})
      break 
      
case 'porno':
      if (!isGroupAdmins) return reply(mess.only.admin)
      data = fs.readFileSync('./apis/porno.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
	  Pin.sendMessage(from, buffer, image, {caption: 'Tapa na gostosa', quoted: mek})
      break
      
case 'saycat2':
      data = fs.readFileSync('./apis/saycat2.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
      Pin.sendMessage(from, buffer, video, {mimetype: 'video/mp4',quoted: mek})
      break
   
case 'xvideos':
     if (!isGroupAdmins) return reply(mess.only.admin)
      data = fs.readFileSync('./apis/xvideos.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
      Pin.sendMessage(from, buffer, video, {mimetype: 'video/mp4',quoted: mek})
      break
      
case 'porno2':
      data = fs.readFileSync('./apis/porno2.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
      Pin.sendMessage(from, buffer, video, {mimetype: 'video/mp4',quoted: mek})
      break
      
case 'vidtik':
      data = fs.readFileSync('./apis/asupan.js');
      jsonData = JSON.parse(data);
      randIndex = Math.floor(Math.random() * jsonData.length);
      randKey = jsonData[randIndex];
      buffer = await getBuffer(randKey.result)
      Pin.sendMessage(from, buffer, video, {mimetype: 'video/mp4',quoted: mek})
      break
     
 case 'shirt':
    buffer = await getBuffer(`https://api.xteam.xyz/shitpost?APIKEY=63b3e16b23026b82`)
    Pin.sendMessage(from, buffer, video, {mimetype: 'video/mp4',quoted: mek})
     break

case 'dono':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3fE9pd__dG4EPjKO3qJSlT1RbKScfZUsjHbGjcIyL61LSk21D4TjJHOxwVcCh52F7nP3PBjxsDGEzu0JKy9ha4RbctQbk4Jw9RFJq--_1mwjKVcSKJwjjBuPzypAAkrbMZpWNmBHDp8OT1RBbwBZWb2=s720-no?authuser=`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '*CRIADOR:* NEWTON\n*YOUTUBE:* Sem\n*WPP:* Só digitar ".criador"\n*INSTA:* @nilton_cant\n\n\nEspero que tenham gostado do meu bot❤️🐦 ️'})
	break
	
case 'blackpink':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/random/blackpink?apikey=f71a26d3b2cdb3dd772c43bf`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: 'Amo blackpink ❤🥺 ️'})
	break

case 'wallpaper1':
     memein = await kagApi.memeindo()
	 buffer = await getBuffer(`https://api.xteam.xyz/randomimage/wallpaper?APIKEY=63b3e16b23026b82`)
	 Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '*wallpaper*'})
	 break
	 
case 'hentai': 
    memein = await kagApi.memeindo()
	anu = await fetchJson(`https://api-gdr.herokuapp.com/api/nekohentai`)
	buffer = await getBuffer(anu.result)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: 'hmm ️'})
	break
	 
	 	
case 'bts':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/random/bts?apikey=69bd42a244e197ad54548345`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: 'bts️'})
	break
	
     case 'blackfig':
        if (args.length == 0) return reply(`url`)
           if (isBanned) return reply(mess.only.benned)
               teks = body.slice(9)                 
                buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/convert/towebp?apikey=1235bf8d15eda9105ce76f50&img=${teks}`)
                Pin.sendMessage(from, buffer, sticker, { quoted: mek })
                break
         
           case 'figb':
         if (isBanned) return reply(mess.only.benned)
               teks = body.slice(9)                 
                anu = await getBuffer(`https://api.xteam.xyz/sticker/stickpack?q=spongebob&APIKEY=63b3e16b23026b82`)
                buffer = await getBuffer(anu.result)
                Pin.sendMessage(from, buffer, image, { quoted: mek })
                break
                
         case 'btsfig':
        if (args.length == 0) return reply(`i`)
           if (isBanned) return reply(mess.only.benned)
               teks = body.slice(7)                 
                buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/convert/towebp?apikey=6b25e69d0ba3dc9447010464&img=https://lolhuman.herokuapp.com/api/random/bts?apikey=69bd42a244e197ad54548345`)
                Pin.sendMessage(from, buffer, sticker, { quoted: mek })
                break
	 

	
case 'imgmenu':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3dP4vCXZIFBV4zS4k9nqdUkOyJxcz4TBc79lzLsw2367fLe2Zpy7bmRYHqZPkzXGz1TMAEm09AdIJRHFWQBraPLxxuuw7WT9OkMheMTNDhAZwqWwkZObof3RdJB4aOjbKwpffsZDnfLEyyRFPSMhVPL=w480-h478-no?authuser=0`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '      🍒*MENU DE IMG*🍒\n\n ‣.saycat\n\n ‣.mia\n\n ‣.porno\n\n  ‣.bts\n\n ‣.tenten\n\n ‣.freefire\n\n ‣.belle\n\n ‣.mcpoze\n\n ‣.hentai\n\n ‣.blackpink\n\n ‣.anime\n\n ‣.loli\n\n ‣.jinmiran\n\n      🍒..........................🍒️'})
	break
	
	case 'esticker':
     case 'semoji':
           if (isBanned) return reply(mess.only.benned)    
                if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} 😭`)
                emoji = args[0]
                try {
                    emoji = encodeURI(emoji[0])
                } catch {
                    emoji = encodeURI(emoji)
                }
                buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=6b25e69d0ba3dc9447010464`)
                Pin.sendMessage(from, buffer, sticker, { quoted: mek })
                break
                  
    case 'belle2':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://i.pinimg.com/originals/24/5f/91/245f91208f9030724dbc8d1bede2e9ff.gif`)
	Pin.sendMessage(from, buffer, sticker, {quoted: mek, caption: 'slc'})
	break

	
case 'outromenu':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3dP4vCXZIFBV4zS4k9nqdUkOyJxcz4TBc79lzLsw2367fLe2Zpy7bmRYHqZPkzXGz1TMAEm09AdIJRHFWQBraPLxxuuw7WT9OkMheMTNDhAZwqWwkZObof3RdJB4aOjbKwpffsZDnfLEyyRFPSMhVPL=w480-h478-no?authuser=0`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '      🍒*OUTRO MENU*🍒\n\n ‣.nickff\n\n ‣.geradorcpf\n\n ‣.cep\n\n      🍒..........................🍒️'})
	break  


case 'bannermenu':
	memein = await kagApi.memeindo()
	buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3dP4vCXZIFBV4zS4k9nqdUkOyJxcz4TBc79lzLsw2367fLe2Zpy7bmRYHqZPkzXGz1TMAEm09AdIJRHFWQBraPLxxuuw7WT9OkMheMTNDhAZwqWwkZObof3RdJB4aOjbKwpffsZDnfLEyyRFPSMhVPL=w480-h478-no?authuser=0`)
	Pin.sendMessage(from, buffer, image, {quoted: mek, caption: '   🍒MENU DE BANNER🍒\n\n ‣.haram\n\n ‣.ant\n\n ‣.txt\n\n ‣.gayz\n\n ‣.tac\n\n ‣.tri\n\n ‣.kho\n\n ‣.surga\n\n ‣.mlserti\n\n ‣.pubgsert\n\n ‣.lollogo\n\n ‣.gplaybutton\n\n ‣.copi\n\n ‣.gplay\n\n ‣.editod\n\n ‣.ffserti\n\n ‣.hekerserti\n\n ‣.ffserti2\n\n      🍒..........................🍒️'})
	break 

case 'baianor':		
   if (args.length < 1) return reply('marque seus amigos!')
   rate = body.slice(1)
   const ti =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
   const kl = ti[Math.floor(Math.random() * ti.length)]
   Pin.sendMessage(from, 'Seu Level baianor: *'+rate+'*\n\nSua porcentagem baianor : '+ kl+'%', text, { quoted: mek })
   break
   
case 'gado':
    Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `Nivel de gadisse🐂\n\nVocê é: *${random}%* GADO(A)😛🐂`
     reply(hasil)
     break
     
case 'gostosa':
    Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `Nivel de gostosa🔥\n\nVocê é: *${random}%* GOSTOSA😏`
     reply(hasil)
     break   
     
case 'corno':
    Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `Nivel de corno(a)🙂\n\nVocê é: *${random}%* CORNO(A)🤐`
     reply(hasil)
     break        
     
case 'gostoso':
    Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `Nivel de gostoso🔥\n\nVocê é: *${random}%* GOSTOSO🙂`
     reply(hasil)
     break       
     
case 'lgbt':
     Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `O quanto você é lgbt?🌈\n\nVocê é: *${random}%* lgbt🌈`
     reply(hasil)
     break
            
case 'gay':
     Pin.updatePresence(from, Presence.composing) 
     random = `${Math.floor(Math.random() * 100)}`
     hasil = `O quanto você é gay?\n\nVocê é: *${random}%* gay🏳️‍🌈`
     reply(hasil)
      break

//--tagme

case 'tagme':
if (!isUser) return reply(mess.only.userB)
const tagme = {
  text: `@${sender.split("@")[0]} Hai kak`,
  contextInfo: {
mentionedJid: [sender]
  }
}
Pin.sendMessage(from, tagme, text)
break

case 'nickff': 
if (!isUser) return reply(mess.only.userB)
if (isBanned) return reply('Maaf kamu sudah terbenned!') 	
Pin.updatePresence(from, Presence.composing) 
data = await fetchJson(`https://api.zeks.xyz/api/nickepep?apikey=apivinz`, {method: 'get'})
teks = '=================\n'
for (let i of data.result) {
teks += `*Nick* : ${i}\n=================\n`
 }
reply(teks.trim())
break



case 'kbbi':
 Pin.updatePresence(from, Presence.composing)
 if (args.length < 1) return reply(`*☒* Masukan teks\nContoh : ${prefix}kbbi manusia`)
 if (!isUser) return reply(mess.only.userB)
  tels = body.slice(6)
  try {
  data = await fetchJson(`https://tobz-api.herokuapp.com/api/kbbi?kata=${tels}&apikey=BotWeA`)
  if (data.error) return reply(data.error)
  hasil = `KAMUS BESAR BAHASA INDONESIA\n\n${data.result}`
  reply(hasil)
  } catch {
    reply(mess.ferr)
  }
  break

  case 'chatprank':
 Pin.updatePresence(from, Presence.composing)
 if (!isUser) return reply(mess.only.userB)
 if (args.length < 1) return reply(`*☒* Masukan teks\nContoh : ${prefix}chatprank p/unten`)
 tels = body.slice(11)
 var teks1 = tels.split("/")[0];
 var teks2 = tels.split("/")[1];
 hasil = `${teks1}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${teks2}`
 Pin.sendMessage(from, hasil, text, {
 quoted: mek
 })
 break



//--searching chord

 case 'chord':
 if (args.length < 1) return reply('Masukan query')
 if (!isUser) return reply(mess.only.userB)
 Pin.updatePresence(from, Presence.composing)
 tels = body.slice(7)
 try {
 anu = await fetchJson(`https://videfikri.com/api/chord/?query=${tels}&apikey=${tKey}`, {
 method: 'get'            
 })
 reply(anu.result)
 } catch {
 reply(mess.ferr)
 }
 break

case 'jadwaltvnow':
 if (!isUser) return reply(mess.only.userB)
 Pin.updatePresence(from, Presence.composing)
 reply(mess.wait)
 try {
 anu = await fetchJson(`http://api-melodicxt-2.herokuapp.com/api/jadwaltvnow?&apiKey=administrator`, {
 method: 'get'
 })
 reply(anu.result.jadwalTV)
 } catch {
 reply(mess.ferr)
 }
 break

case 'jadwaltv':
 if (!isUser) return reply(mess.only.userB)
 ch = body.slice(10)
 if (args.length < 1) return reply('*☒* Masukan nama channel')
 Pin.updatePresence(from, Presence.composing)
 reply(mess.wait)
 try {
 anu = await fetchJson(`https://mhankbarbar.tech/api/jdtv?ch=${ch}&apiKey=${BarBarKey}`, {method: 'get'})
 n = JSON.parse(JSON.stringify(anu.result));
 hasil = `*Jadwal Tv* : ${ch} hari ini\n${n}`
 reply(hasil)
 } catch {
 reply(mess.ferr)
 }
 break

case 'map':
 if (!isUser) return reply(mess.only.userB)
 if (args.length < 1) return reply('*☒* Masukan nama daerah')
 daerah = body.slice(5)
 try {
 data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${daerah}`)
 reply(mess.wait)
 hasil = await getBuffer(data.gambar)
 Pin.sendMessage(from, hasil, image, {
 quoted: mek, caption: `Hasil Dari *${daerah}*`
 })
 } catch {

    reply(mess.ferr)

  }

  break



//--pencarian surah Al-Qur'an

case 'alquran':

  Pin.updatePresence(from, Presence.composing)

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('*☒* Masukan nomor surah 1-114')

  if (isNaN(args.length < 1)) return await reply('Gunakan nomor surah')

  tels = body.slice(9)

  try {

  data = await fetchJson(`https://api.zeks.xyz/api/quran?no=${tels}&apikey=${viKey}`, {

method: 'get'

  })

  teks = `

  〘  *${data.surah}*  〙

  Adalah surah ke ${data.no} dalam Al-Qur'an dengan jumlah ayat (${data.jumlah_ayat} ayat)

  ──────────────────────



  `

  for (let i of data.ayat) {

teks += `*(${i.number})* ${i.text}\n*(${i.number})* ${i.translation_id}\n••••••••••••••••••••••••••••••••••••••••••••••\n`

  }

  reply(teks.trim())

  

  } catch {

    reply(mess.ferr)

  }

  break



//--Cerpen

case 'cerpen':

if (!isUser) return reply(mess.only.userB)

Pin.updatePresence(from, Presence.composing)



try {

data = await fetchJson(`https://docs-jojo.herokuapp.com/api/cerpen`)

hasil = `*CERPEN*\n‣ Judul : *${data.result.title}*\n‣ Pengarang : *${data.result.pengarang}}*\n${data.result.cerpen}`

reply(hasil)



} catch {

  reply(mess.ferr)

}

break



//---kontak pemilik bot

case 'owner':

  case 'criador':

Pin.sendMessage(from, {

  displayname: "Jeff", vcard: vcard

}, MessageType.contact, {

  quoted: mek

})

break





//---Random ayat Alquran

case 'ngaji':

 if (!isUser) return reply(mess.only.userB)

  

  try {

  anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {

method: 'get'

  })

  quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`

  Pin.sendMessage(from, quran, text, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--tafsir Alquran

case 'tafsir':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('Masukan query')

  teks = body.slice(8)

  try {

  Pin.updatePresence(from, Presence.composing)

  data = await fetchJson(`http://api-melodicxt-2.herokuapp.com/api/tafsir-quran?query=${teks}&apiKey=${Mkey}`)

  hasil = `*${data.result.query}*\n\n${data.result.ayat}\n\n*Terjemahan* :\n${data.result.terjemahan_ayat}\n\n*Tafsir* : ${data.result.tafsir_jalalayn}`

  reply(hasil)

  

  } catch {

    reply(mess.ferr)

  }

  break



//---Jadwal solat

case 'sholat':

  loc = body.slice(7)

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('Masukan nama daerah')

  try {

  anu = await fetchJson(`https://mhankbarbar.tech/api/jadwalshalat?daerah=${loc}&apiKey=${BarBarKey}`, {

method: 'get'

  })

  mbteks = `*SHALAT*\nDaerah : ${loc}\n‣ *Ashar* : ${anu.Ashar}\n‣ *Dhuha* : ${anu.Dhuha}\n‣ *Dzuhur* : ${anu.Dzuhur}\n‣ *Imsyak* : ${anu.Imsyak}\n‣ *Isya* : ${anu.Isya}\n‣ *Maghrib* : ${anu.Maghrib}\n‣ *Subuh* : ${anu.Subuh}`

  Pin.sendMessage(from, mbteks, text, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--info cuaca

case 'cuaca':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('Masukan nama daerah')

  tels = body.slice(7)

  try {

  anu = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/cuaca?p=${tels}`, {

method: 'get'

  })

  hasil = `‣ *Tempat* : ${anu.hasil.Nama}\n‣ *Cuaca* : ${anu.hasil.Cuaca}\n‣ *Angin* : ${anu.hasil.Angin}\n‣ *Suhu* : ${anu.hasil.Suhu}\n‣ *Kelembapan* : ${anu.hasil.Kelembaban}\n‣ *Keterangan* : ${anu.hasil.Keterangan}`

  Pin.sendMessage(from, hasil, text, {

quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//--info gempa

//informasi gempa terkini

case 'infogempa':

 if (!isUser) return reply(mess.only.userB)

  

  Pin.updatePresence(from, Presence.composing)

  try {

  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infogempa`, {

method: 'get'

  })

  hasil = `‣ *Profundidade* : ${anu.kedalaman}\n‣ *Koordinat* : ${anu.koordinat}\n‣ *Lokasi* : ${anu.lokasi}\n‣ *Magnitude* : ${anu.magnitude}\n‣ *Potensi* : ${anu.potensi}\n‣ *Waktu* : ${anu.waktu}`

  buffer = await getBuffer(anu.map)

  Pin.sendMessage(from, buffer, image, {

caption: hasil, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



//---Buy limit

/*case 'buylimit':

  if (args.length < 1) return reply(`Berapa limit yang mau di beli? Pastikan saldo ATM cukup juga! \n\nCara cek saldo : ${prefix}Ceksaldo`)

 if (!isUser) return reply(mess.only.userB)

  payout = body.slice(10)

  const koinPerlimit = hargalimit

  const total = koinPerlimit * payout

  if (checkATMuser(sender) <= total) return reply(`Maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)

  if (checkATMuser(sender) >= total) {

confirmATM(sender, total)

bayarLimit(sender, payout)

await reply(`〘  *NOTA PEMBAYARAN*  〙\n\n‣ *Pengirim* : Admin\n‣ *Penerima* : ${pushname}\n‣ *Nominal pembelian* : ${body.slice(10)} \n‣ *Harga limit* : ${koinPerlimit}/limit\n‣ *Sisa saldo* : ${checkATMuser(sender)}\n\nProses berhasil dengan nomer pembayaran \n${createSerial(15)}`)

  }

  break



//--transfer

case 'transfer':

  if (!isGroup) return reply(mess.only.group)

 if (!isUser) return reply(mess.only.userB)

  if (args.length < 1) return reply(`Silahkan ulangi dengan

*${prefix}Transfer Tag target|Jumlah transfer*`)

  if (!q.includes('|')) return  reply('Maaf format teks salah')

  const tujuan = q.substring(0, q.indexOf('|') - 1)

  const jumlah = q.substring(q.lastIndexOf('|') + 1)

  if (isNaN(jumlah)) return await reply('Jangan tambahan tanda apapun !')

  if (jumlah < 5000) return reply(`minimal transfer Rp.5000`)



  if (checkATMuser(sender) <= jumlah) return reply(`Maaf uang kamu belum mencukupi. silahkan kumpulkan dan transfer lagi nanti`)

  if (checkATMuser(sender) >= jumlah) {

const tujuantf = `${tujuan.replace("", '')}@s.whatsapp.net`

fee = 0.005 *  jumlah

hasiltf = jumlah - fee

addKoinUser(tujuantf, hasiltf)

confirmATM(sender, jumlah)

addKoinUser('6289690719275@s.whatsapp.net', fee)

await reply(`〘  *TRANSFER*  〙

  Pengiriman saldo telah sukses

  ‣ *Dari* : ${sender.split("@")[0]}

  ‣ *Ke* : ${tujuan}

  ‣ *Jumlah transfer* : Rp.${jumlah},-

  ‣ *Biaya admin* : Rp.${fee},-`)

  }

  

  break

*/

case 'meuperfil':

 if (!isUser) return reply(mess.only.userB)

  try {

ppimg = await Pin.getProfilePicture(`${sender.split('@')[0]}@c.us`)

  } catch {

ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'

  }

  teks = `‣ *Nome* : ${pushname}

  ‣ *Numero* : ${sender.split("@")[0]}

  ‣ *Link* : wa.me/${sender.split("@")[0]}`

  its = await getBuffer (ppimg)

  Pin.sendMessage(from, its, image, {

quoted: mek, caption: teks

  })
  break 
  
 
  case 'infogp':
		Pin.updatePresence(from, Presence.composing)
		if (!isGroup) return reply(mess.only.group)
		try {
			ppimg = await Pin.getProfilePicture(from)
		} catch {
			ppimg = 'https://i.ibb.co/NthF8ds/IMG-20201223-WA0740.jpg'
				}
		let buf = await getBuffer(ppimg)
		teks = (args.length > 1) ? body.slice(8).trim() : ''
		teks += `*Nome do grupo :* ${groupName}\n*Descrição :* ${groupDesc}\n*Número de Administradores :* ${groupAdmins.length}\n*Número de membros :* ${groupMembers.length}`
		no = 0
		for (let admon of groupAdmins) {
		no += 1
		teks += `[${no.toString()}]`
		}
		Pin.sendMessage(from, buf, image, {quoted: mek, caption: teks})
		break 

 
 
 case 'geradorcpf':
   buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3dP4vCXZIFBV4zS4k9nqdUkOyJxcz4TBc79lzLsw2367fLe2Zpy7bmRYHqZPkzXGz1TMAEm09AdIJRHFWQBraPLxxuuw7WT9OkMheMTNDhAZwqWwkZObof3RdJB4aOjbKwpffsZDnfLEyyRFPSMhVPL=w480-h478-no?authuser=0`)
    anu = await fetchJson(`http://geradorapp.com/api/v1/cpf/generate?token=38525eb21c0bf3298e8afe7cb5b941ce`)
    letcpf = `*🍒CPF GERADO🍒* \n\n ➸ *CPF:* ${anu.data.number}  \n ➸ *CPFD:* ${anu.data.number_formatted} \n ➸ *SOBRE:* ${anu.data.message} \n\n *🍒BY:Lhanna Bot🍒*`;
    Pin.sendMessage(from, buffer, image, {quoted: mek, caption: letcpf})
    break
    
 case 'cep':
   play = body.slice(5)
   buffer = await getBuffer(`https://lh3.googleusercontent.com/pw/ACtC-3dP4vCXZIFBV4zS4k9nqdUkOyJxcz4TBc79lzLsw2367fLe2Zpy7bmRYHqZPkzXGz1TMAEm09AdIJRHFWQBraPLxxuuw7WT9OkMheMTNDhAZwqWwkZObof3RdJB4aOjbKwpffsZDnfLEyyRFPSMhVPL=w480-h478-no?authuser=0`)
    anu = await fetchJson(`http://geradorapp.com/api/v1/cep/search/${play}?token=38525eb21c0bf3298e8afe7cb5b941ce`)
    letcpf = `🍒CONSULTA REALIZADA🍒 \n\n ➸ *ESTADO:* ${anu.data.state}  \n ➸ *CIDADE:* ${anu.data.city} \n ➸ *BAIRRO:* ${anu.data.district} \n ➸ *RUA:* ${anu.data.address} \n ➸ *CÓDIGO CITY:* ${anu.data.city_code} \n ➸ *NÚMERO:* ${anu.data.number_formatted} \n\n *🍒BY:Lhanna Bot🍒*`;
    Pin.sendMessage(from, buffer, image, {quoted: mek, caption: letcpf})
    break
    

  
case 'conselho':
 if (!isUser) return reply(mess.only.userB)
  try {
    data = fs.readFileSync('./apis/frase.js');
   jsonData = JSON.parse(data);
   randIndex = Math.floor(Math.random() * jsonData.length);
   randKey = jsonData[randIndex];
     ppimg = await Pin.getProfilePicture(`${sender.split('@')[0]}@c.us`)
     } catch {
     ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
     }
     its = await getBuffer (ppimg)
     randTeks = randKey.teks
     Pin.sendMessage(from, its, image, {quoted: mek, caption: randTeks})
     break
       
     case 'biblia':
 if (!isUser) return reply(mess.only.userB)
  try {
    data = fs.readFileSync('./apis/biblia.js');
   jsonData = JSON.parse(data);
   randIndex = Math.floor(Math.random() * jsonData.length);
   randKey = jsonData[randIndex];
     ppimg = await Pin.getProfilePicture(`${sender.split('@')[0]}@c.us`)
     } catch {
     ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
     }
     its = await getBuffer (ppimg)
     randTeks = randKey.teks
     Pin.sendMessage(from, its, image, {quoted: mek, caption: randTeks})
     break
     
  
    case 'play':   
   play = body.slice(6)
   anu = await fetchJson(`https://api.xteam.xyz/dl/play?lagu=${play}&APIKEY=63b3e16b23026b82`)  
   buffer = await getBuffer(anu.thumbnail) 
   lagu = await getBuffer(anu.url)
   Pin.sendMessage(from, buffer, image, {quoted: mek, caption:'SUA MÚSICA ESTÁ SENDO BAIXADA🎶🎶'})   
   Pin.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
   break
   
   
   
 case 'gtvd':   
   play = body.slice(5)
   anu = await fetchJson(`https://videfikri.com/api/igtv/?url=${play}`)  
   lagu = await getBuffer(anu.result.video_url)  
   Pin.sendMessage(from, lagu, video, {mimetype: 'video/mp4', quoted: mek})
   break  
   
 case 'las':   
   play = body.slice(5)
   lagu = await getBuffer(`https://www.myinstants.com/media/sounds/${play}.mp3`)
   Pin.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4',quoted: mek})
   break
   
case 'vid':
   play = body.slice(5)
   anu = await fetchJson(`https://videfikri.com/api/playmp4v2/?query=${play}`)   
   buffer = await getBuffer(anu.result.imgUrl)
   lagu = await getBuffer(anu.result.urlVideo)
   Pin.sendMessage(from, buffer, image, {quoted: mek, caption:'SEU VÍDEO ESTÁ SENDO BAIXADO 🎬'})
   Pin.sendMessage(from, lagu, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
   break
   
 case 'vid1':
   play = body.slice(5)
   anu = await fetchJson(`https://api-gdr.herokuapp.com/api/ytplaymp4?q=${play}`)   
   buffer = await getBuffer(anu.thumb)
   lagu = await getBuffer(anu.url_video)
   Pin.sendMessage(from, buffer, image, {quoted: mek, caption:'SEU VÍDEO ESTÁ SENDO BAIXADO 🎬'})
   Pin.sendMessage(from, lagu, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
   break
   
 case 'instvid':
   reply(mess.wait)
   play = body.slice(8)
   anu = await fetchJson(`https://api.xteam.xyz/dl/ig?url=${play}&APIKEY=63b3e16b23026b82`)
   if (anu.error) return reply(anu.error) 
   lagu = await getBuffer(anu.type.data)
   Pin.sendMessage(from, lagu, video, {mimetype: 'video/mp4', quoted: mek})
   break

      
                
    
case 'ytmp3':
 if (!isUser) return reply(mess.only.userB)
  reply(mess.wait)
  play = body.slice(7)
  if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Format link salah, gunakan link youtube')
  try {                    
  anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?url=${play}&apikey=${viKey}`)
  infomp3 = `*Audio Ditemukan!!!*\n‣ Judul : ${anu.result.title}\n‣ Source : ${anu.result.source}\n‣ Ukuran : ${anu.result.size}\n\n_Mengirim file silakan tunggu_\n\n_Jika video tidak muncul download sendiri menggunakan link dibawah_\n‣ *link* : ${anu.result.link}`
  buffer = await getBuffer(anu.result.thumb)
  lagu = await getBuffer(anu.result.link)
  Pin.sendMessage(from, buffer, image, {
quoted: mek, caption: infomp3
  })
  Pin.sendMessage(from, lagu, video, {
mimetype: 'video/mp4', filename: `${anu.result.title}.mp3`, quoted: mek
  })
  } catch {
  reply(mess.ferr)
  }
  break

case 'ytmp4':
  reply(mess.wait)

  play = body.slice(7)

  try {         

  anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4?url=${play}watch?v=tOMFR0nQt48&apikey=apivinz`)

  if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Format link salah, gunakan link youtube')

  if (anu.error) return reply(anu.error)

  infomp3 = `*VIDEO ENCONTRADO*\n‣ *Título* : ${anu.result.title}\n‣ *Tamanho* : ${anu.result.size}\n‣ AGUARDE UM POUCO`

  buffer = await getBuffer(anu.result.thumbnail)

  lagu = await getBuffer(anu.result.url_video)

  Pin.sendMessage(from, buffer, image, {

quoted: mek, caption: infomp3

  })

  Pin.sendMessage(from, lagu, video, {

mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break







//---Youtube search

				case 'ytsearch':

					if (args.length < 1) return reply('Masukan query')

					try {

					anu = await fetchJson(`https://mhankbarbar.tech/api/ytsearch?q=${body.slice(10)}&apiKey=${BarBarKey}`, {method: 'get'})

					if (anu.error) return reply(anu.error)

					teks = '=================\n'

					for (let i of anu.result) {

						teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`

					}

					reply(teks.trim())

					

					} catch {

					  reply(mess.ferr)

					}

					break



//--download pinterest

case 'pin':

 if (!isUser) return reply(mess.only.userB)

  

    if(!isUrl(args[0]) && !args[0].includes('pin')) return reply('Format link salah, gunakan link pinterest')

  reply(mess.wait)

  play = body.slice(5)

  try {

  anu = await fetchJson(`https://scrap.terhambar.com/pin?url=${play}`)

  if (anu.error) return reply(anu.error)

  n = JSON.parse(JSON.stringify(anu.result.data));

  lagu = await getBuffer(anu.result)

  Pin.sendMessage(from, lagu, video, {

mimetype: 'video/mp4', filename: `${anu.result}.mp4`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'fb':

 if (!isUser) return reply(mess.only.userB)

  

  reply(mess.wait)

  if(!isUrl(args[0]) && !args[0].includes('facebook')) return reply('Format link salah, gunakan link facebook')

  play = body.slice(4)

  try {

  anu = await fetchJson(`https://mhankbarbar.tech/api/epbe?url=${play}&apiKey=${BarbarKey}`)

  if (anu.error) return reply(anu.error)

  infomp3 = `*Video Ditemukan*\n‣ *Judul* : ${anu.title}\n‣ *Publikasi* : ${anu.published}\n‣ *Ukuran* : ${anu.filesize}\n\n_Mengirim file silakan tunggu_\n\n_Jika video tidak muncul download sendiri menggunakan link dibawah_\n‣ *link* : ${anu.result}`

  lagu = await getBuffer(anu.result)

  Pin.sendMessage(from, lagu, video, {

mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'ig':

 

  reply(mess.wait)

    if(!isUrl(args[0]) && !args[0].includes('instagram')) return reply('Format link salah, gunakan link instagram')

  play = body.slice(4)

  try {         
                          
  anu = await fetchJson(`https://api.zeks.xyz/api/ig?url=${play}&apikey=apivinz`)

  lagu = await getBuffer(anu.result[0])

  Pin.sendMessage(from, lagu, video, {

mimetype: 'video/mp4', filename: `Imalpin.mp4`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break





//joox download

case 'joox':

 if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('Masukan judul lagu')

  tels = body.slice(6)

  try {

  data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${tels}&apikey=BotWeA`, {

method: 'get'

  })

  infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`

  buffer = await getBuffer(data.result.thumb)

  lagu = await getBuffer(data.result.mp3)

  Pin.sendMessage(from, buffer, image, {

quoted: mek, caption: infomp3

  })

  Pin.sendMessage(from, lagu, audio, {

mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'scdl':

   if (!isUser) return reply(mess.only.userB)

  

  if (args.length < 1) return reply('Masukan link soundcloud')

  tels = body.slice(6)

  try {

  data = await fetchJson(`http://lolhuman.herokuapp.com/api/soundcloud?apikey=${lolKey}&url=${tels}`, {

method: 'get'

  })

  lagu = await getBuffer(data.result)

  Pin.sendMessage(from, lagu, audio, {

mimetype: 'audio/mp4', filename: `${data.title}.mp3`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



case 'tik':

  if (args.length < 1) return reply('*☒* Masukan link')

 if (!isUser) return reply(mess.only.userB)

  

  if (!isUrl(args[0]) && !args[0].includes('vt.tiktok')) return reply(mess.error.Iv)

  try {

  anu = await fetchJson(`https://api.arugaz.my.id/api/media/tiktok?url=${args[0]}`, {

method: 'get'

  })

  if (anu.error) return reply(anu.error)

  teks = `*Nama* : ${anu.result.nameInfo}\n*Caption* : ${anu.result.textInfo}\n\n_Mengirim file, silakan tunggu_`

  thumb = await getBuffer(anu.result.image)

  Pin.sendMessage(from, thumb, image, {

quoted: mek, caption: teks

  })

  buffer = await getBuffer(anu.result.mp4direct)

  Pin.sendMessage(from, buffer, video, {

mimetype: 'video/mp4', filename: `${anu.nameInfo}.mp4`, quoted: mek

  })

  

  } catch {

    reply(mess.ferr)

  }

  break



/*



				case 'tiktok':

				  case 'tik':

					if (args.length < 1) return reply('Urlnya mana um?')

					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)

					reply(mess.wait)

					anu = await fetchJson(`https://mhankbarbar.tech/api/tiktok?url=${args[0]}&apiKey=${BarBarKey}`, {method: 'get'})

					if (anu.error) return reply(anu.error)

					buffer = await getBuffer(anu.result)

					Pin.sendMessage(from, buffer, video, {quoted: mek})

					break

*/



//--block user

				case 'blocklist':

					teks = 'This is list of blocked number :\n'

					for (let block of blocked) {

						teks += `~> @${block.split('@')[0]}\n`

					}

					teks += `Total : ${blocked.length}`

					Pin.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})

					break



//--read text on image

				case 'texto':

					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						const media = await Pin.downloadAndSaveMediaMessage(encmedia)

						reply(mess.wait)

						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})

							.then(teks => {

								reply(teks.trim())

								fs.unlinkSync(media)

							})

							.catch(err => {

								reply(err.message)

								fs.unlinkSync(media)

							})

					} else {

						reply('Foto aja mas')

					}

					break



//---textpro

				case 'textpro':

					if (args.length < 1) {

						return reply('Pilih themenya om, 1 - 162')

					} else if (args[0].toLowerCase() === 'list') {

						teks = await fetchText('https://mhankbarbar.tech/api/textpro/listtheme')

						teks = teks.replace(/<br>/g, '\n')

						return reply(teks)

					} else if (args.length < 2) {

						return reply('Teksnya juga dong om')

					}

					reply(mess.wait)

					anu = `https://mhankbarbar.tech/api/textpro?pack=${args[0]}&text=${body.slice(1+args[0].length+1)}&apiKey=${BarBarKey}`

					voss = await fetc(anu)	

					ftype = require('file-type')	

					vuss = await ftype.fromStream(voss.body)

					if (vuss !== undefined) {

						Pin.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })

					} else {

						reply('Terjadi kesalahan, silahkan pilih theme lain')

					}

					break



//ephoto

				case 'ephoto':

					if (args.length < 1) {

						return reply('Pilih themenya om, 1 - 216')

					} else if (args[0].toLowerCase() === 'list') {

						teks = await fetchText('https://mhankbarbar.tech/api/ephoto/listtheme')

						teks = teks.replace(/<br>/g, '\n')

						return reply(teks)

					} else if (args.length < 2) {

						return reply('Teksnya juga dong om')

					}

					reply(mess.wait)

					anu = `https://mhankbarbar.tech/api/ephoto?pack=${args[0]}&text=${body.slice(2+args[0].length+1)}&apiKey=${BarBarKey}`

					voss = await fetc(anu)

					ftype = require('file-type')

					vuss = await ftype.fromStream(voss.body)

					//console.log(vuss)

					if (vuss !== undefined) {

						Pin.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })

					} else {

						reply('Terjadi kesalahan, silahkan pilih theme lain')

					}

					break



//--harta tahta

				case 'tahta':

					if (args.length < 1) return reply('Teksnya om')

					anu = `https://mhankbarbar.tech/api/htahta?text=${args.join(' ')}&apiKey=${BarBarKey}`

					voss = await fetc(anu)

					teks = body.slice(7)

					ftype = require('file-type')

					vuss = await ftype.fromStream(voss.body)

					if (vuss !== undefined) {

						Pin.sendMessage(from, await getBuffer(anu), image, { quoted: mek, caption: `*Harta Tahta ${teks}*` })

					} else {

						reply('Terjadi kesalahan')

					}

					break



//--stiker maker
              case 'stiker':

				case 'sticker':

				  case 's':

					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						const media = await Pin.downloadAndSaveMediaMessage(encmedia)

						ran = getRandom('.webp')

						await ffmpeg(`./${media}`)

							.input(media)

							.on('start', function (cmd) {

								console.log(`Started : ${cmd}`)

							})

							.on('error', function (err) {

								console.log(`Error : ${err}`)

								fs.unlinkSync(media)

								reply(mess.error.stick)

							})

							.on('end', function () {

								console.log('Finish')

								exec(`webpmux -set exif ${addMetadata('NEWTON', 'CURA LÉSBICA KKKK')} ${ran} -o ${ran}`, async (error) => {

									if (error) return reply(mess.error.stick)

									Pin.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})

									fs.unlinkSync(media)	

									fs.unlinkSync(ran)	

								})

								/*Pin.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})

								fs.unlinkSync(media)

								fs.unlinkSync(ran)*/

							})

							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])

							.toFormat('webp')

							.save(ran)

					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {

						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						const media = await Pin.downloadAndSaveMediaMessage(encmedia)

						ran = getRandom('.webp')

						reply(mess.wait)

						await ffmpeg(`./${media}`)

							.inputFormat(media.split('.')[1])

							.on('start', function (cmd) {

								console.log(`Started : ${cmd}`)

							})

							.on('error', function (err) {

								console.log(`Error : ${err}`)

								fs.unlinkSync(media)

								tipe = media.endsWith('.mp4') ? 'video' : 'gif'

								reply(`❌ Falha, no momento da conversão ${tipe} de stiker`)

							})

							.on('end', function () {

								console.log('Finish')

								exec(`webpmux -set exif ${addMetadata('NEWTON', 'CURA LÉSBICA KKK')} ${ran} -o ${ran}`, async (error) => {

									if (error) return reply(mess.error.stick)

									Pin.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})

									fs.unlinkSync(media)

									fs.unlinkSync(ran)

								})

								/*Pin.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})

								fs.unlinkSync(media)

								fs.unlinkSync(ran)*/

							})

							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])

							.toFormat('webp')

							.save(ran)

					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						const media = await Pin.downloadAndSaveMediaMessage(encmedia)

						ranw = getRandom('.webp')

						ranp = getRandom('.png')

						reply(mess.wait)

						keyrmbg = 'Your-ApiKey'

						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {

							fs.unlinkSync(media)

							let buffer = Buffer.from(res.base64img, 'base64')

							fs.writeFileSync(ranp, buffer, (err) => {

								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')

							})

							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {

								fs.unlinkSync(ranp)

								if (err) return reply(mess.error.stick)

								exec(`webpmux -set exif ${addMetadata('alpin', 'pinbot')} ${ranw} -o ${ranw}`, async (error) => {

									if (error) return reply(mess.error.stick)

									Pin.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})

									fs.unlinkSync(ranw)

								})

								//Pin.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})

							})

						})

					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						const media = await Pin.downloadAndSaveMediaMessage(encmedia)

						ran = getRandom('.webp')

						await ffmpeg(`./${media}`)

							.on('start', function (cmd) {

								console.log('Started :', cmd)

							})

							.on('error', function (err) {

								fs.unlinkSync(media)

								console.log('Error :', err)

							})

							.on('end', function () {

								console.log('Finish')

								fs.unlinkSync(media)

								Pin.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})

								fs.unlinkSync(ran)

							})

							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])

							.toFormat('webp')

							.save(ran)*/

					} else {

						reply(`Envie fotos com legendas ${prefix}adesivo ou tag de imagem que foi enviado`)

					}

					break


//-- temp

			case 'gets':

			  

				var itsme = `0@s.whatsapp.net`

				var split = `${cr}`

				var selepbot = {

					contextInfo: {

						participant: itsme,

						quotedMessage: {

							extendedTextMessage: {

								text: split,

							}

						}

					}

				}

				namastc = body.slice(6)

				try {

				result = fs.readFileSync(`./temp/stick/${namastc}.webp`)

				Pin.sendMessage(from, result, sticker, selepbot)

				} catch {

				  reply('Pacote não está registrado')

				}

				break

			

			

			  case 'getstik':

				var itsme = `0@s.whatsapp.net`

				var split = `${cr}`

				var selepbot = {

					contextInfo: {

						participant: itsme,

						quotedMessage: {

							extendedTextMessage: {

								text: split,

							}

						}

					}

				}

				namastc = body.slice(9)

				try {

				result = fs.readFileSync(`./temp/stick/${namastc}.webp`)

				Pin.sendMessage(from, result, sticker, selepbot)

				} catch {

				  reply('Pacote não está registrado')

				}

				break
				
				
			case 'liststicker':

				teks = '*Sticker list :*\n\n'

				for (let awokwkwk of setiker) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${setiker.length}*\nUse comando\n*${prefix}getstik (nome)*\npara pegar o adesivo`

				Pin.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })

				break

			

			case 'totaluser':

				teks = '*Total De utilizador :*\n\n'

				for (let i of _registered) {

					teks += `[${id.toString()}]\`\`\` @${i.split('@')[0]}`

				}

				teks += `\n*Total : ${_registered.length}`

				Pin.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": _registered} })

				break



			case 'addcker':

				if (!isQuotedSticker) return reply('Responder o adesivo')


				svst = body.slice(9)

				if (!svst) return reply('Qual é o nome do adesivo?')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await Pin.downloadMediaMessage(boij)

				setiker.push(`${svst}`)

				fs.writeFileSync(`./temp/stick/${svst}.webp`, delb)

				fs.writeFileSync('./temp/stik.json', JSON.stringify(setiker))

				Pin.sendMessage(from, `Adicionado adesivo com sucesso\nVerifique por ${prefix}liststicker`, MessageType.text, { quoted: mek })

				break

          if (budy.includes(`Alpin`)) {

                const Alpin = fs.readFileSync('./alpinstiker/alpin');

                client.sendMessage(from, Dappa, MessageType.sticker, {quoted: mek})

                  }



		if (budy.includes(`alpin`)) {

                const Alpin = fs.readFileSync('./alpinstiker/Alpin');

                client.sendMessage(from, Dappa, MessageType.sticker, {quoted: mek})

                  }

			case 'addaud':

				if (!isQuotedAudio) return reply('Reply vnnya')


				svst = body.slice(7)

				if (!svst) return reply('Qual é o nome do áudio')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await Pin.downloadMediaMessage(boij)

				audionye.push(`${svst}`)

				fs.writeFileSync(`./temp/audio/${svst}.mp3`, delb)

				fs.writeFileSync('./temp/vn.json', JSON.stringify(audionye))

				Pin.sendMessage(from, `Audio adicionado\ndigite ${prefix}listaudio`, MessageType.text, { quoted: mek })

				break



			case 'mandaud':

				namastc = body.slice(7)

				try {

				buffer = fs.readFileSync(`./temp/audio/${namastc}.mp3`)

				Pin.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break



			case 'listaudio':

			case 'vnlist':

				teks = '*List Vn:*\n\n'

				for (let awokwkwk of audionye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${audionye.length}*\nUse comandos\n*${prefix}getvn (nama pack)*\nuntuk pegar vn`

				Pin.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })

				break



			case 'addimg':

				if (!isQuotedImage) return reply('Reply imagenya')


				svst = body.slice(8)

				if (!svst) return reply('Nama imagenya apa')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await Pin.downloadMediaMessage(boij)

				imagenye.push(`${svst}`)

				fs.writeFileSync(`./temp/foto/${svst}.jpeg`, delb)

				fs.writeFileSync('./temp/image.json', JSON.stringify(imagenye))

				Pin.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listimg`, MessageType.text, { quoted: mek })

				break



			case 'mandimg':

				namastc = body.slice(8)

				try {

				buffer = fs.readFileSync(`./temp/foto/${namastc}.jpeg`)

				Pin.sendMessage(from, buffer, image, { quoted: mek, caption: `Result From Database : ${namastc}.jpeg` })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break

				

			case 'listimg':

				teks = '*Lista Imagem :*\n\n'

				for (let awokwkwk of imagenye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${imagenye.length}*\nGunakan perintah\n*${prefix}getimg (nama pack)*\nuntuk mengambil gambar`

				Pin.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })

				break



			case 'addvid':

				if (!isQuotedVideo) return reply('Reply videonya')

				svst = body.slice(8)

				if (!svst) return reply('O nome do video')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await Pin.downloadMediaMessage(boij)

				videonye.push(`${svst}`)

				fs.writeFileSync(`./temp/video/${svst}.mp4`, delb)

				fs.writeFileSync('./temp/vid.json', JSON.stringify(videonye))

				Pin.sendMessage(from, `Sucesso Adicionais Video\nCek dengan cara ${prefix}listvid`, MessageType.text, { quoted: mek })

				break



			case 'mandvid':

				namastc = body.slice(8)

				try {

				buffer = fs.readFileSync(`./temp/video/${namastc}.mp4`)

				Pin.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break



			case 'listvid':

				teks = '*List Video :*\n\n'

				for (let awokwkwk of videonye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${videonye.length}*\nGunakan perintah\n*${prefix}mandvid (nama pack)*\nuntuk mengambil video`

				Pin.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })

				break





//----caklontong

  case 'caklontong':



anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${vKey}`,

  {

method: 'get'

  })

if (!isUser) return reply(mess.only.userB)

yup = anu.result.soal

jawab = anu.result.jawaban

alasam = anu.result.desk

setTimeout(() => {

  Pin.sendMessage(from, `‣ *Jawaban* : ${jawab}\n‣ *Keterangn* : ${alasam}`, text, {

quoted: mek

  }) // ur cods

}, 30000) // 1000 = 1s,

setTimeout(() => {

  Pin.sendMessage(from, '_10 detik lagi_', text) // ur cods

}, 20000) // 1000 = 1s,

setTimeout(() => {

  Pin.sendMessage(from, '_20 Detik lagi_…', text) // ur cods

}, 10000) // 1000 = 1s,

setTimeout(() => {

  Pin.sendMessage(from, text) // ur cods

}, 1000) // 1000 = 1s,

setTimeout(() => {



  Pin.sendMessage(from, yup, text, {

quoted: mek

  }) // ur cods

}, 0) // 1000 = 1s,

break



//--stiker to video

  case 'tovid':

Pin.updatePresence(from,

  Presence.composing)

if (!isUser) return reply(mess.only.userB)

if (!isQuotedSticker) return reply('*☒* Responder o adesivo')

reply(mess.wait)

anumedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

anum = await Pin.downloadAndSaveMediaMessage(anumedia)

ran = getRandom('.webp')

exec(`ffmpeg -i ${anum} ${ran}`, (err) => {

  fs.unlinkSync(anum)

  if (err) return reply('Falha ao converter o adesivo em vídeo')

  buffer = fs.readFileSync(ran)

  Pin.sendMessage(from, buffer, video, {

quoted: mek, caption: 'Buat apa sii..'

  })

  fs.unlinkSync(ran)

})

break


//--mp4 to mp3

  case 'tomp3':

Pin.updatePresence(from,

  Presence.composing)

if (!isUser) return reply(mess.only.userB)

if (!isQuotedVideo) return reply('*☒* Reply video')

reply(mess.wait)

mitri = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

duh = await Pin.downloadAndSaveMediaMessage(mitri)

ran = getRandom('.mp4')

exec(`ffmpeg -i ${duh} ${ran}`, (err) => {

  fs.unlinkSync(duh)

  if (err) return reply('*☒* Falha ao converter vídeo para mp3')

  buffer = fs.readFileSync(ran)

  Pin.sendMessage(from, buffer, audio, {

mimetype: 'audio/mp4', quoted: mek

  })

  fs.unlinkSync(ran)

})

break



//--google voice

				case 'tts':

					if (args.length < 1) return Pin.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})

					const gtts = require('./lib/gtts')(args[0])

					if (args.length < 2) return Pin.sendMessage(from, 'Textnya mana om', text, {quoted: mek})

					dtt = body.slice(8)

					ranm = getRandom('.mp3')

					dtt.length > 600

					? reply('A maior parte do texto é tio')

					: gtts.save(ranm, dtt, function() {

						Pin.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

						fs.unlinkSync(ranm)

					})

					break



//-- Setting prefix

				case 'setprefix':

					if (args.length < 1) return

					if (!isOwner) return reply(mess.only.ownerB)

				  prefix = args[0]

					up.prefix = prefix

					fs.writeFileSync('./data/settings.json', JSON.stringify(up, null, '\t'))

					reply(`O prefixo foi alterado com sucesso para : ${prefix}`)

					break





case 'block':

  Pin.updatePresence(from, Presence.composing)

  if (!isGroup) return reply(mess.only.group)

  if (!isOwner) return reply(mess.only.ownerB)

  Pin.blockUser (`${body.slice(8)}@c.us`, "add")

  Pin.sendMessage(from, `Números de bloco, Pedido Recebido`, text, {

quoted: mek

  })

  break



//membuka blokir

case 'unblock':

  if (!isGroup) return reply(mess.only.group)

  if (!isOwner) return reply(mess.only.ownerB)

  Pin.blockUser (`${body.slice(9)}@c.us`, "remove")

  Pin.sendMessage(from, `Desbloquear, Pedido Recebido`, text)

  break





//--Hilih maker

				case 'hilih':

					if (args.length < 1) return reply('Digite o texto')

					try {

					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})

					reply(anu.result)

					} catch {

					  reply(mess.ferr)

					}

					break


				case 'nulis':

				case 'tulis':

					if (args.length < 1) return reply('O que você quer escrever??')

					teks = body.slice(7)

					reply(mess.wait)

					anu = await fetchJson(`https://mhankbarbar.tech/nulis?text=${teks}&apiKey=${BarBarKey}`, {method: 'get'})

					if (anu.error) return reply(anu.error)

					buff = await getBuffer(anu.result)

					Pin.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})

					break

				case 'url2img':

					tipelist = ['desktop','tablet','mobile']

					if (args.length < 1) return reply('Tipenya apa um?')

					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')

					if (args.length < 2) return reply('Urlnya mana um?')

					if (!isUrl(args[1])) return reply(mess.error.Iv)

					reply(mess.wait)

					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${BarBarKey}`, {method: 'get'})

					if (anu.error) return reply(anu.error)

					buff = await getBuffer(anu.result)

					Pin.sendMessage(from, buff, image, {quoted: mek})

					break







				case 'ttp':

				if (!isUser) return reply(mess.only.userB)

					if (args.length < 1) return reply('CADE O TEXTO MANO?')

					ranp = getRandom('.png')

					rano = getRandom('.webp')

					teks = body.slice(5).trim()

					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${BarBarKey}`, {method: 'get'})

					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {

						fs.unlinkSync(ranp)

						if (err) return reply(mess.error.stick)

						exec(`webpmux -set exif ${addMetadata('NEWTON', 'CURA LÉSBICA kkkk')} ${rano} -o ${rano}`, async (error) => {

							if (error) return reply(mess.error.stick)

							Pin.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})

							fs.unlinkSync(rano)

						})

					})

					

					break



//---Tagall member

				case 'tagall':

Pin.updatePresence(from, Presence.composing)

if (!isGroup) return reply(mess.only.group)

if (!isUser) return reply(mess.only.userB)

if (!isGroupAdmins) return reply(mess.only.admin)

members_id = []

teks = (args.length > 1) ? body.slice(8).trim(): ''

teks += `  Total : ${groupMembers.length}\n`

for (let mem of groupMembers) {

  teks += `┃ @${mem.jid.split('@')[0]}\n`

  members_id.push(mem.jid)

}

mentions('〘  *TEGAL* 〙\n┏━━━━━━━━━━━━━━━━━━━━\n┠⊷'+teks+'┃━━━━━━━━━━━━━━━━━━━━\n┃────✪ NEWTON MODS ✪────\n┗━━━━━━━━━━━━━━━━━━━━', members_id, true)

break





//clear all chat

				case 'clearall':

					if (!isOwner) return reply('Quem e vc?')

					anu = await Pin.chats.all()

					Pin.setMaxListeners(25)

					for (let _ of anu) {

						Pin.deleteChat(_.jid)

					}

					reply('Sucesso em deletar todo o chat :)')

					break

				case 'fari':

					if (args.length < 1) return reply('.......')

					anu = await Pin.chats.all()

					if (isMedia && !mek.message.videoMessage || isQuotedImage) {

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						buff = await Pin.downloadMediaMessage(encmedia)

						for (let _ of anu) {

							Pin.sendMessage(_.jid, buff, image, {caption: `*${body.slice(4)}*`})

						}

						reply('Transmissão de sucesso')

					} else {

						for (let _ of anu) {

							sendMess(_.jid, `*${body.slice(4)}*`)

						}

						reply('Transmissão de sucesso')

					}

					break



//--menaikan jabatan

      case 'promote':

					if (!isGroup) return reply(mess.only.group)

					if (!isGroupAdmins) return reply(mess.only.admin)

					if (!isBotGroupAdmins) return reply(mess.only.Badmin)

					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return

					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid

					if (mentioned.length > 1) {

						teks = 'Sucesso Promote\n'

						for (let _ of mentioned) {

							teks += `@${_.split('@')[0]}\n`

						}

						mentions(from, mentioned, true)

						Pin.groupRemove(from, mentioned)

					} else {

						mentions(`Promovido com sucesso @${mentioned[0].split('@')[0]} como administrador do grupo!`, mentioned, true)

						Pin.groupMakeAdmin(from, mentioned)

					}

					break



  //ganti nama grup

  case 'setname':

if (!isGroup) return reply(mess.only.group)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

idgrup = `${from.split("@s.whatsapp.net")[0]}`;

Pin.groupUpdateSubject(idgrup, `${body.slice(9)}`)

Pin.sendMessage(from, '*☉* Renomeando o Grupo', text, {

  quoted: mek

})

break



  //ganti desk

  case 'setdesk':

if (!isGroup) return reply(mess.only.group)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

Pin.groupUpdateDescription(from, `${body.slice(9)}`)

Pin.sendMessage(from, '*☉* Alterar a descrição do grupo', text, {

  quoted: mek

})

break



//--menurunkan jabatan

				case 'demote':

					if (!isGroup) return reply(mess.only.group)

					if (!isGroupAdmins) return reply(mess.only.admin)

					if (!isBotGroupAdmins) return reply(mess.only.Badmin)

					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return

					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid

					if (mentioned.length > 1) {

						teks = 'Sucesso Demote\n'

						for (let _ of mentioned) {

							teks += `@${_.split('@')[0]}\n`

						}

						mentions(teks, mentioned, true)

						Pin.groupRemove(from, mentioned)

					} else {

						mentions(`Rebaixado com sucesso @${mentioned[0].split('@')[0]} Torne-se um membro do grupo!`, mentioned, true)

						Pin.groupDemoteAdmin(from, mentioned)

					}

					break



//--menambah member

				case 'add':

					if (!isGroup) return reply(mess.only.group)

					if (!isGroupAdmins) return reply(mess.only.admin)

					if (!isBotGroupAdmins) return reply(mess.only.Badmin)

					if (args.length < 1) return reply('Insira o número alvo')

					if (args[0].startsWith('08')) return reply('Use o código do país mas')

					try {

						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`

						Pin.groupAdd(from, [num])

					} catch (e) {

						console.log('Error :', e)

						reply('Falha ao adicionar destino, talvez porque é privado')

					}

					break
					


//--mengeluarkan member

				case 'kick':

					if (!isGroup) return reply(mess.only.group)

					if (!isGroupAdmins) return reply(mess.only.admin)

					if (!isBotGroupAdmins) return reply(mess.only.Badmin)

					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target')

					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid

					if (mentioned.length > 1) {

						teks = 'Pedidos recebidos, emitidos :\n'

						for (let _ of mentioned) {

							teks += `@${_.split('@')[0]}\n`

						}

						mentions(teks, mentioned, true)

						Pin.groupRemove(from, mentioned)

					} else {

						mentions(`Pedidos recebidos, emitidos : @${mentioned[0].split('@')[0]}`, mentioned, true)

						Pin.groupRemove(from, mentioned)

					}

					break



//--list admin grup

				case 'listadmins':

				  case 'listadmin':

				    case 'adminlist':

					if (!isGroup) return reply(mess.only.group)

					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`

					no = 0

					for (let admon of groupAdmins) {

						no += 1

						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`

					}

					mentions(teks, groupAdmins, true)

					break



//--ganti pp bot

case 'setppbot':

  Pin.updatePresence(from, Presence.composing)

  if (!isOwner) return reply(mess.only.ownerB)

  const botpp = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contxtInfo: mek

  const cuk = await Pin.downloadAndSaveMediaMessage(botpp)

  await Pin.updateProfilePicture(botNumber, cuk)

  reply('Obrigado pelo novo perfil😗')

  break



//--Mengambil link grup

    case 'linkgroup':

    case 'linkgc':

        if (!isGroup) return reply(mess.only.group)

        if (!isGroupAdmins) return reply(mess.only.admin)

        if (!isBotGroupAdmins) return reply(mess.only.Badmin)

        linkgc = await Pin.groupInviteCode(from)

        reply('https://chat.whatsapp.com/'+linkgc)

                    break



//--Mengeluarkan bot

      case 'sair':

      if (!isGroup) return reply(mess.only.group)

      if (isGroupAdmins || isOwner) {

      Pin.groupLeave(from)

                    } else {

      reply(mess.only.admin)

                    }

                    break



//--Convert stiker to image

				case 'toimg':

					if (!isQuotedSticker) return reply('Responder o adesivo')

					if (!isUser) return reply(mess.only.userB)

					reply(mess.wait)

					imgmed = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					medimg = await Pin.downloadAndSaveMediaMessage(imgmed)

					ran = getRandom('.png')

					exec(`ffmpeg -i ${medimg} ${ran}`, (err) => {

						fs.unlinkSync(medimg)

						if (err) return reply('Gagal')

						buffer = fs.readFileSync(ran)

						Pin.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ini ?'})

						fs.unlinkSync(ran)

					})

					break





//--arti mimpi

  case 'artimimpi':

aruga = body.slice(11)

if (!isUser) return reply(mess.only.userB)

if (args.length < 1) return reply(`Mimpi apa ?\nContoh: ${prefix}artimimpi ular`)

try {

anu = await fetchJson(`https://videfikri.com/api/primbon/artimimpi/?mimpi=${aruga}`, {

  method: 'get'

})

reply(anu.result.artimimpi)



} catch {

  reply('Parece que o recurso está apresentando um erro')

}

break



//--Simsimi talk

case 'simi':
	        if (args.length < 1) return reply('Onde está o texto, Acha que sou vidente?😤')
	        teks = body.slice(5)
         	anu = await simih(teks) //fetchJson(`http://simsumi.herokuapp.com/api?text=${teks}`, {method: 'get'})
	         //if (anu.error) return reply('*Simi não sabe*')
     	     reply(anu)
		      break



case 'bot':

					if (args.length < 1) return reply(`Salve ${pushname}`)

					teks = body.slice(5)

					try { 

					anu = await fetchJson(`https://simsumi.herokuapp.com/api?text=${teks}`, {method: 'get'})

					if (anu.error) return reply('Simi ga tau kak')

					reply(anu.jawaban)

					} catch {

					  reply(mess.ferr)

					}

					break



//--Verifkasi




//--grup semua peserta

case 'fechargp':

  Pin.updatePresence(from, Presence.composing)

  if (!isGroup) return reply(mess.only.group)

  if (!isGroupAdmins) return reply(mess.only.admin)

  if (!isBotGroupAdmins) return reply(mess.only.Badmin)

  var nomor = mek.participant

  const close = {

text: `Grupo fechado pelo administrador @${nomor.split("@s.whatsapp.net")[0]}\nagora *apenas administradores* podem enviar mensagens`,

contextInfo: {

  mentionedJid: [nomor]

}

  }

  Pin.groupSettingChange (from, GroupSettingChange.messageSend, true);

  reply(close)

  break



//--grup hanya admin

case 'abrirgp':

  case 'bukagc':

Pin.updatePresence(from, Presence.composing)

if (!isGroup) return reply(mess.only.group)

if (!isGroupAdmins) return reply(mess.only.admin)

if (!isBotGroupAdmins) return reply(mess.only.Badmin)

open = {

  text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,

  contextInfo: {

mentionedJid: [sender]

  }

}

Pin.groupSettingChange (from, GroupSettingChange.messageSend, false)

Pin.sendMessage(from, open, text, {

  quoted: mek

})

break



//---mengahapus pesan bot

case 'delete':

  case 'del':

if (!isGroup)return reply(mess.only.group)

if (!isUser) return reply(mess.only.userB)

if (!isGroupAdmins)return reply(mess.only.admin)

try {

Pin.deleteMessage(from, {

  id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true

})

} catch {

  reply('Só pode deletar mensagens minhas')

}

break



//--ganteng cekkkk

  case 'gantengcek':

if (args.length < 1) return reply('Masukan nama target')

ganteng = body.slice(12)

const gan = ['10',

  '30',

  '20',

  '40',

  '50',

  '60',

  '70',

  '62',

  '74',

  '83',

  '97',

  '100',

  '29',

  '94',

  '75',

  '82',

  '41',

  '39']

const teng = gan[Math.floor(Math.random() * gan.length)]

Pin.sendMessage(from, 'Gantengcek : *'+ganteng+'*\n\nJawaban : '+ teng+'%', text, {

  quoted: mek

})

break



//--Cantik cekk

  case 'cantikcek':

if (args.length < 1) return reply('Insira o nome do alvo')

cantik = body.slice(12)

const can = ['10',

  '30',

  '20',

  '40',

  '50',

  '60',

  '70',

  '62',

  '74',

  '83',

  '97',

  '100',

  '29',

  '94',

  '75',

  '82',

  '41',

  '39']

const tik = can[Math.floor(Math.random() * can.length)]

Pin.sendMessage(from, 'Cheque bonito *'+cantik+'*\n\nResposta : '+ tik+'%', text, {

  quoted: mek

})

break


case 'antisticker':
            case 'antistiker':
                    if (!isGroup) return reply(mess.only.group)
				        	if (!isGroupAdmins) return reply(mess.only.admin)
                   
                    if (args[0] == 'on') {
                        var cek = antisticker.includes(chatId);
                        if(cek){
                            return aruga.reply(from, '*Detector de adesivos anti-spam * já está ativo neste grupo', id) //if number already exists on database
                        } else {
                            antisticker.push(chatId)
                            fs.writeFileSync('./lib/Helper/antisticker.json', JSON.stringify(antisticker))
                            aruga.reply(from, '*[Anti Sticker SPAM]* foi ativado\nCada membro do grupo cujo adesivo de spam for maior que 7 serão chutados pelo bot!', id)
                        }
                    } else if (args[0] == 'off') {
                        var cek = antilink.includes(chatId);
                        if(cek){
                            return aruga.reply(from, '*O detector de adesivos anti-spam * não está mais ativo neste grupo', id) //if number already exists on database
                        } else {
                            let nixx = antisticker.indexOf(chatId)
                            antisticker.splice(nixx, 1)
                            fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(antisticker))
                            aruga.reply(from, '*[Anti Sticker SPAM]* foi desabilitado\n', id)
                        }
                    } else {
                        aruga.reply(from, `escolher on / off\n\n*[Anti Sticker SPAM]*\nCada membro do grupo que for um adesivo de spam será chutado por bot!`, id)
                    }
                    break
                    
            case 'antilink':
                    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('digite 1 para ativar ')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('o anti-link está ativo')
						antilink.push(from)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(antilink))
						reply('Grupo anti-link ativado com sucesso neste grupo ✔️')
						Pin.sendMessage(from,`Atencao a todos os membros ativos deste grupo anti-link. ee você enviar um link de grupo, voce sera expulso daqui  grupo`, text)
					} else if (Number(args[0]) === 0) {
						if (!isantilink) return reply('O modo de grupo anti-link foi desabilitado ')
						var ini = anti.PinOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(antilink))
						reply('Desativar grupo anti-link com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar ')
					}
					break 
	


				case 'welcome':

					if (!isGroup) return reply(mess.only.group)

					if (!isGroupAdmins) return reply(mess.only.admin)

					if (args.length < 1) return reply('Hmmmm')

					if (Number(args[0]) === 1) {

						if (isWelkom) return reply('Já ativo um')

						welkom.push(from)

						fs.writeFileSync('./data/welkom.json', JSON.stringify(welkom))

						reply('Ativou com sucesso o recurso de boas-vindas neste grupo')

					} else if (Number(args[0]) === 0) {

						welkom.splice(from, 1)

						fs.writeFileSync('./data/welkom.json', JSON.stringify(welkom))

						reply('Desativando com sucesso o recurso de boas-vindas neste grupo')

					} else {

						reply('1 para ativar, 0 para desativar')

					}

                                      break

				case 'clone':

					if (!isGroup) return reply(mess.only.group)

					if (!isOwner) return reply(mess.only.ownerB)

					if (args.length < 1) return reply('Tag target')

					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')

					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]

					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)

					try {

						pp = await Pin.getProfilePicture(id)

						buffer = await getBuffer(pp)

						Pin.updateProfilePicture(botNumber, buffer)

						mentions(`Foto do perfil atualizada com sucesso usando a foto do perfil @${id.split('@')[0]}`, [jid], true)

					} catch (e) {

						reply('Gagal om')

					}

					break

				case 'wait':

					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

						reply(mess.wait)

						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

						media = await Pin.downloadMediaMessage(encmedia)

						await wait(media).then(res => {

							Pin.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})

						}).catch(err => {

							reply(err)

						})

					} else {

						reply('Gunakan foto')

					}

					break

	

				default:
	    if (messagesC.includes("https://")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('vc é admin, então n irei te dar ban por usar links, rlx 🙂')
		Pin.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`					
			setTimeout( () => {
			Pin.groupRemove(from, [kic])
						}, 00)
		setTimeout( () => {
		reply(`*HMMM*`)
		}, 0)
		}
		 if (messagesC.includes("wa.me/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('vc é admin, então n irei te dar ban por usar links, rlx 🙂')
		Pin.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`					
			setTimeout( () => {
			Pin.groupRemove(from, [kic])
						}, 00)
		setTimeout( () => {
		reply(`*HMMM*`)
		}, 0)
		}	
		if (budy.includes("Oi")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/oih.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Menyukaiku")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/menyukaiku.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj kukira dia menyukaiku", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Hallo")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Magic")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/magic.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : magic rude", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Halo")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Hai")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Garox")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/garox.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : mamang garox remix", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Away")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/away.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj take away", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Tapi")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/tapi.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj tapi boong", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Boong")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/boong.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj tapi boong", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Pagi")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/pagi.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Your")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/your.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj into your arms", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Iri")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/iri.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj iri bilang boss", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Bilang")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/iri.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj iri bilang boss", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Boma")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/boma.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj boma boma ye", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("boma")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/boma.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj boma boma ye", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("rules")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/rules.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj new rules", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Rules")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/rules.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj new rules", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Numa")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/numa.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj numa numa yei", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("numa")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/numa.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj numa numa yei", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("away")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/away.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj take away", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("menyukaiku")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/menyukaiku.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj kukira dia menyukaiku", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("hallo")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("magic")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/magic.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : magic rude", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("brando")){
        brando = await getBuffer(`https://pencarikode.xyz/api/cita-cita?apikey=pais`, {method: 'get'})
        Pin.sendMessage(from, brando, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Brando")){
        brando = await getBuffer(`https://pencarikode.xyz/api/cita-cita?apikey=pais`, {method: 'get'})
        Pin.sendMessage(from, brando, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("Windah")){
        brando = await getBuffer(`https://pencarikode.xyz/api/cita-cita?apikey=pais`, {method: 'get'})
        Pin.sendMessage(from, brando, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("windah")){
        brando = await getBuffer(`https://pencarikode.xyz/api/cita-cita?apikey=pais`, {method: 'get'})
        Pin.sendMessage(from, brando, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("garox")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/garox.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : mamang garox remix", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("your")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/your.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj into your arms", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("pagi")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/pagi.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("halo")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("hai")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
        if (budy.includes("tapi")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/tapi.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj tapi boong", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("boong")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/boong.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj tapi boong", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("iri")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/iri.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj iri bilang boss", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("bilang")){
		Pin.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/iri.mp3')
        Pin.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        const d = fs.readFileSync('./sticker/jget.webp');
        Pin.sendMessage(from, d, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "song : dj iri bilang boss", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("5593991919748")){  // respon tag ubah aja
        reply(`ᴍᴀᴀғ *${pushname2}*, ᴏᴡɴᴇʀ ᴅɴꜱ ʙᴏᴛ ᴛɪᴅᴀᴋ ᴍᴇɴᴇʀɪᴍᴀ ᴛᴀɢ!`)
        const d = fs.readFileSync('./sticker/kanna.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("Lhanni")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        
        if (budy.includes("Osh")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/tenor.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
         if (budy.includes("frio")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/frio.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("fria")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/frio.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("Fria")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/frio.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("Frio")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/frio.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
          if (budy.includes("loli")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/loli.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
          if (budy.includes("Loli")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/loli.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
         if (budy.includes("feia")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/porno.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("chata")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/porno.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("lhanna")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/lhanna.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("Lhanna")){  // respon tag ubah aja
        const d = fs.readFileSync('./sticker/lhanna.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek})
        }
        if (budy.includes("cofd")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("jjkkbbcc")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("dsdfg")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("cfds")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        if (budy.includes("cihjh")){  // respon tag ubah aja
        reply(`*${pushname2}*, ɴɢᴀᴘᴀɪɴ ᴍᴀɴɢɢɪʟ² ᴏᴡɴᴇʀ ɢᴡ?`)
        const d = fs.readFileSync('./sticker/anjim.webp');
        Pin.sendMessage(from, d, sticker, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": "anak anjg", 'jpegThumbnail': fs.readFileSync('./sticker/dnsnew.webp')}}}})
        }
        	if (messagesC.includes("fdp")){
			Pin.updatePresence(from, Presence.composing)
			reply("teu pai")
				}
	
	if (messagesC.includes("bosta")){
			Pin.updatePresence(from, Presence.composing)
			reply("quer chamar atenção?")
			
	}
	if (messagesC.includes("kkkkkkkkkkkkkkkkkkkkkkkk")){
			Pin.updatePresence(from, Presence.composing)
			reply("Engracado né")
			
	}
	if (messagesC.includes("ksksk")){
			Pin.updatePresence(from, Presence.composing)
			reply("palhaço")
			
	}
	
		if (messagesC.includes("corno")){
			Pin.updatePresence(from, Presence.composing)
			reply("é mesmo é?")
	}
	
		if (messagesC.includes("tmnc")){
			Pin.updatePresence(from, Presence.composing)
			reply("vai vc, tu ja me disse q é mo bom")
	}
	
		if (messagesC.includes("vsfd")){
			Pin.updatePresence(from, Presence.composing)
			reply("bora juntos?")
	}
		
	
		if (messagesC.includes("lhanna")){
			Pin.updatePresence(from, Presence.composing)
			reply("Oiiih")
	}
	
		if (messagesC.includes("cadebot")){
			Pin.updatePresence(from, Presence.composing)
			reply("olha eu aqui carai")
	}
	
		if (messagesC.includes("bot")){
			Pin.updatePresence(from, Presence.composing)
			reply("roi, falando de mim?🥺❤️")
	}
			if (messagesC.includes("newton")){
			Pin.updatePresence(from, Presence.composing)
			reply("O que estão falando do meu dono,hein?️👀")
	}
		if (messagesC.includes("supra")){
			Pin.updatePresence(from, Presence.composing)
			reply("O que estão falando do meu dono,hein?️👀")
	}
				if (messagesC.includes("nilton")){
			Pin.updatePresence(from, Presence.composing)
			reply("O que estão falando do meu dono,hein?️👀")
	}
	

		if (budy.includes(`Thanks`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, ᴅɴꜱ ᴍɪꜱꜱ ʏᴏᴜ >-<`)
                  }
                  if (budy.includes(`Makasih`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, ᴅɴꜱ ᴍɪꜱꜱ ʏᴏᴜ >-<`)
                  }
                  if (budy.includes(`Tq`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, ᴅɴꜱ ᴍɪꜱꜱ ʏᴏᴜ >-<`)
                  }
                  if (budy.includes(`Thx`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, ᴅɴꜱ ᴍɪꜱꜱ ʏᴏᴜ >-<`)
                  }
                  if (budy.includes(`Assalamualaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`Asalamualaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`Assalamu'alaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`assalamualaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`assalamu'alaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`asalamualaikum`)) {
                  reply(`ᴡᴀᴀʟᴀɪᴋᴜᴍꜱᴀʟᴀᴍ ᴋᴀᴋ *${pushname2}*`)
                  }
                  if (budy.includes(`thanks`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, sᴄʀᴇᴀᴍᴏ sᴀᴜᴅᴀᴅᴇs >-<`)
                  }
                  if (budy.includes(`makasih`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, sᴄʀᴇᴀᴍᴏ sᴀᴜᴅᴀᴅᴇs >-<`)
                  }
                  if (budy.includes(`tq`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, sᴄʀᴇᴀᴍᴏ sᴀᴜᴅᴀᴅᴇs>-<`)
                  }
                  if (budy.includes(`thq`)) {
                  reply(`ꜱᴀᴍᴀ-ꜱᴀᴍᴀ ᴋᴀᴋ *${pushname2}*, sᴄʀᴇᴀᴍᴏ sᴀᴜᴅᴀᴅᴇs >-<`)
                  }
                  if (budy.includes(`DNS`)) {
                  reply(`ᴏʟᴀ ᴊᴏᴠᴇᴍ *${pushname2}*, sᴄʀᴇᴀᴍᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴊᴜᴅᴀᴅᴏ? ᴅɪɢɪᴛᴇ *${prefix}menu* ʏᴀ ᴋᴀᴋ`)
                  }
			      if (budy.includes(`Dns`)) {
                  reply(`ᴏʟᴀ ᴊᴏᴠᴇᴍ*${pushname2}*, sᴄʀᴇᴀᴍᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴊᴜᴅᴀᴅᴏ? ᴅɪɢɪᴛᴇ *${prefix}menu* ʏᴀ ᴋᴀᴋ`)
                  }
                  if (budy.includes(`dns`)) {
                  reply(`ᴏʟᴀ ᴊᴏᴠᴇᴍ *${pushname2}*, sᴄʀᴇᴀᴍᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴊᴜᴅᴀᴅᴏ? ᴅɪɢɪᴛᴇ *${prefix}menu* ʏᴀ ᴋᴀᴋ`)
                  }

				if (body.startsWith(`${prefix}${command}`)) {

  reply(`        ────────────────\nSalve *${pushname}* !!!\nComando nn encontrado/Comando : *${prefix}${command}*\nNada dentro do menu! pfvr chame o bot nvmt *${prefix}Menu*\n        ────────────────`)

				}

					if (isGroup && isSimi && budy != undefined) {

						console.log(budy)

						muehe = await simih(budy)

						console.log(muehe)

						reply(muehe)

						} else {
						//console.log(color('[db]','aqua'), 'Comando não registrado', color(sender.split('@')[0]))
					}

                           }

		} catch (e) {

			console.log('Error : %s', color(e, 'white'))
		}

	})

}

starts()		