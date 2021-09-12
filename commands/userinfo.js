
var db = require('quick.db')
var koddb = new db.table('koddb')
var userdb = new db.table('userdb')
const nodemailer = require('nodemailer');
const Discord = require('discord.js');

module.exports = {
	name: 'bilgi',
	description: 'Kullanıcı hakkında bilgi almak için kullanılır.',
  usage: `!bilgi @Saltuş \nBirini etiketlemezseniz sizin kendi bilgileriniz görünür.`,
	execute(message, args) {

    let user = message.mentions.users.first() || message.author
    let fak = userdb.get(`fakulte_${user.id}`) || "Bilgi yok"
    let no = userdb.get(`numara_${user.id}`) || "Bilgi yok"
    let mail = userdb.get(`mail_${user.id}`) || "Bilgi yok"
    let bolum = userdb.get(`bolum_${user.id}`) || "Bilgi yok"
  const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Gazi Üniversitesi Discord Bilgi Sistemi (DBS)')
	.setDescription('Daha görsel profil için !profil yazabilirsiniz.')
	.setThumbnail('https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png')
	.addFields(
		{ name: 'Kullanıcı Adı', value: `${user.username}`},
		{ name: 'Numara', value: `${no}`},
		{ name: 'Mail Adresi', value: `${mail}`},
		{ name: 'Bölüm Bilgisi:', value: `${bolum}`, inline: true },
    { name: 'Fakülte:', value: `${fak}`, inline: true },
	)
	.setTimestamp()     
  
  message.channel.send(exampleEmbed);
	},
};