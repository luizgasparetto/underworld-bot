const Command = require('../../structures/Command');

const { MessageEmbed, Message } = require('discord.js');

class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      description: 'Faz com que o bot diga alguma mensagem.',
      options: [
        {
          name: 'channel',
          type: 'CHANNEL',
          description: 'Canal onde a mensagem será enviada.',
          required: true,
        },
        {
          name: 'message',
          type: 'STRING',
          description: 'A mensagem que será enviada no canal.',
          required: true,
        }
      ]
    })
  }

  run = (interaction) => {
      const channel = interaction.options.getChannel('channel');

      if (!['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(channel.type)) {
        return interaction.reply({ content: 'ERRO | Informe um canal de texto ou de anúncios', ephemeral: true});
      }

      const text = interaction.options.getString('message');

      const embed = new MessageEmbed()
      .setTitle(`Announcement 📣`)
      .setDescription(text)
      .setColor("#000000")
      .setTimestamp()

      channel.send({ embeds: [embed] }).then(() => interaction.reply({ content: `Mensagem enviada com sucesso no canal \`${channel.name}\`.`, ephemeral: true}));
  }
}

module.exports = SayCommand;