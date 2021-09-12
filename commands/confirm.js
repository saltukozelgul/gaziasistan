
var db = require('quick.db')
var koddb = new db.table('koddb')
const nodemailer = require('nodemailer');
var userdb = new db.table('userdb')

module.exports = {
	name: 'onayla',
  guildOnly: true,
	description: 'Kayıt olmak için kullanılır.',
  usage: '!onayla 1255212 \n Buradaki kod sizin mail adresinize gönderilmiş olan koddur.',
	execute(message, args) {
    let user = message.author
    let bolum = userdb.get(`bolum_${user.id}`)
    let fakultesiz = message.guild.roles.cache.get('764122963267420191')
    let kod = koddb.get(`dogrulama_kodu_${user.id}`)
    if (args[0] === kod) {
      message.reply("Kodun doğru bölümüne göre yetki aldın, eğer yetkiniz görünmüyorsa lütfen develeporler ile iletişime geçin.")
      if( bolum.includes("Bilgisayar")) {
        message.member.roles.add('766667546203914240').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      }
      else if( bolum.includes("Makina")) {
        message.member.roles.add('766667646732206132').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      }
      else if( bolum.includes("Kimya")) {
        message.member.roles.add('766667601476452392').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      }
      else if( bolum.includes("Endüstri")) {
        message.member.roles.add('766667816546861076').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      }
      else if( bolum.includes("İnşaat")) {
        message.member.roles.add('766667696980230165').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      }
      else if( bolum.includes("Elektrik")) {
        message.member.roles.add('766667752214757427').catch(console.error);
        message.member.roles.add('760522778746028123').catch(console.error);
      } 
      
    }
    else{
      message.channel.send("Girilen kod yanlış")
    } 
	},
};