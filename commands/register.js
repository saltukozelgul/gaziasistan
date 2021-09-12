
var db = require('quick.db')
var koddb = new db.table('koddb')
var userdb = new db.table('userdb')
const nodemailer = require('nodemailer');

module.exports = {
	name: 'kayitol',
  aliases: ['register', 'kayit'],
	description: 'Kayıt olmak için kullanılır.',
  usage: '!kayitol 191180068 saltukbugra.ozelgul@gazi.edu.tr Bilgisayar Mühendisliği',
	execute(message, args) {0

 /// Setup for the sender mail.   
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gazsistan.onay@gmail.com',
    pass: 'qwedsa159753@'
  }
});
    
    
let user = message.author
    let dogrulama = Math.floor(Math.random() * 999999) + 100000;
    koddb.set(`dogrulama_kodu_${user.id}`, `${dogrulama}`)
    let no = args[0]
    userdb.set(`numara_${user.id}`, `${no}`)
    let mail = args[1]
    userdb.set(`mail_${user.id}`, `${mail}`)
    let bolum = ""
    /// Burada birden fazla kelimeden oluşan bölümü tek bir değişkene atayan bir for loopu var.
    var i;
    for (i = 2; i < args.length; i++) {
    bolum += args[i] + " ";
    }
    userdb.set(`bolum_${user.id}`, `${bolum}`)
                          ///// OLASI YAPILACAK HATALARA UYARILAR YAPIYORUM
  	if (args.length < 3) {
		return message.channel.send(`Lütfen komutu doğru kullanalım, ${message.author}! \n !kayitol <öğrenci-no> <mail-adresi> <bölüm>`);
	}
    if (!args[1].endsWith("@gazi.edu.tr")) return message.channel.send("Sadece **@gazi.edu.tr** ile biten mailler kabul edilir!")
    if (no.length < 9) {
    return message.channel.send('Öğrenci numarası **9** haneden oluşmalıdır')
  }
    if (bolum.length < 5) {
    return message.channel.send('Lütfen bölüm adını kısaltma yapmadan giriniz.')
  }

/// Mail sent.
let mailinfo = {
          from: 'disgaz.onay@gmail.com',
          to: args[1],
          subject: 'Gazi Üniversitesi Discord Onayı',
          text: 'Doğrulama kodun: ' + `${dogrulama}`
        };

transporter.sendMail(mailinfo, function (error, info) {

  if (error) {
    throw error;
    return message.channel.send('Mail gönderilirken bir hata oluştu. Lütfen developer ile iletişime geçiniz.')
  } 

  console.log('Eposta gönderildi ' + info.response);
  message.react('✅')
  message.reply("Onay kodun e-posta adresine gönderildi! \nKodu kullanarak hesabını onaylamak için !onayla kod \n   Örnek: **!onayla 123456**")
});
                          
    
    console.log(dogrulama)
	},
};