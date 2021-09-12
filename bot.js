const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const nodemailer = require('nodemailer');
var db = require('quick.db')
var koddb = new db.table('koddb')
const Canvas = require('canvas');




client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



client.once('ready', () => {
	console.log('Disgaz başlatıldı ve göreve hazır!');
});

client.login(token);



client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	const canvas = Canvas.createCanvas(1000, 250);
	const ctx = canvas.getContext('2d');

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage('https://color-hex.org/colors/1f467c.png');
  const logo = await Canvas.loadImage('https://i.imgur.com/iUqH4dQ.png');
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(logo, 25, 25, 200, 200);
	// Use helpful Attachment class structure to process the file for you
  // Select the font size and type from one of the natively available fonts
	ctx.font = '40px sans-serif';
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#bcdcf5';
	// Actually fill the text with a solid color
	ctx.fillText(`Hoşgeldin, ${member.displayName}`, canvas.width / 2.5, 45);
  ctx.font = '25px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`⋆ Kayıt olmak için !kayitol yazabilirsin`, canvas.width / 4, 85);
  ctx.fillText(`⋆ Mailine gelen kodu !onayla yazarak onayla`, canvas.width / 4, 115);
  ctx.fillText(`⋆ Onayladıktan sonra gerekli yetki otomatik verilir.`, canvas.width / 4, 145);
  ctx.fillText(`⋆ Eğer yetkin gelmediyse yetkililerle iletişime geç.`, canvas.width / 4, 175);
  ctx.fillText(`⋆ Lütfen kuralları okuduğundan emin ol.`, canvas.width / 4, 205);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  

	member.send(`Gazi Üniversitesi Discord Topluluğuna hoşgeldin, ${member}!`, attachment);
});




client.on('message', message => {
const args = message.content.slice(prefix.length).trim().split(' ');
const commandName = args.shift().toLowerCase();  
  
	if (message.content === '!join') {
    console.log("çalıştı")
		client.emit('guildMemberAdd', message.member);
	}

if (message.channel.id === "760493483831066684"){
  console.log(commandName)
    if (commandName.startsWith("kayitol")) {
      console.log("!kayit ol komutu kullanıldı.")
    }
  else if (!commandName.startsWith("kayitol")) {
    if (!message.author.bot) {
      message.delete()
    }
  }

}     
  
if (!message.content.startsWith(prefix) || message.author.bot) return;
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;

if (command.guildOnly && message.channel.type === 'dm') {
	return message.reply('Bu komutu özel sohbetten çalıştıramıyorum lütfen sunucuda kullanın!');
}  

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('komut çalışırken bir hata oluştu developerla iletişime geçin!');
}

});