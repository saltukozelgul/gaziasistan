module.exports = {
	name: 'yardim',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands', 'yardim', 'help'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { prefix } = require('../config.json');
    const data = [];
    const { commands } = message.client;

      if (!args.length) {
        data.push('Bütün komutlarım şu şekildedir: ');
        data.push(commands.map(command => command.name).join('**\n● !**'));
        data.push(`\n\`${prefix}yardim [komut ismi]\` yazarak daha spesifik yardım alabilirsiniz. \nÖrnek: !yardim kayitol`);

        return message.author.send(data, { split: true })
          .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply('Kullanılabilir bütüm komutlarımı sana dm yoluyla ilettim :)');
          })
          .catch(error => {
            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
          });
      }
    
      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.reply('Üzgünüm ama böyle bir komutum yok!');
      }

      data.push(`**Komut İsmi:** ${command.name}`);

      if (command.aliases) data.push(`**Benzerleri:** ${command.aliases.join(', ')}`);
      if (command.description) data.push(`**Açıklama:** ${command.description}`);
      if (command.usage) data.push(`**Kullanımı:** ${prefix}${command.name} ${command.usage}`);

      message.channel.send(data, { split: true });
    
	},
};