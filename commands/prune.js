
var db = require('quick.db')
var koddb = new db.table('koddb')
const nodemailer = require('nodemailer');

module.exports = {
	name: 'temizle',
  guildOnly: true,
	description: 'Toplu mesaj silmek icin kullanılır.',
  usage: '!onayla 1255212 \n Buradaki kod sizin mail adresinize gönderilmiş olan koddur.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
    if (message.member.roles.cache.has('763812723548094506')) {
          if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
          } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
          }

          message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('Mesajlar silinirken bir hata oluştu');
          });
  }
    
    else {
      message.delete()
      message.reply("üzgünüm ama bunu yapacak yetkin yok.")
    }
}
};