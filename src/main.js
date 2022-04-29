require('dotenv').config();

const Client = require("./structures/Client");

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES'
  ],
  partials: [ "MESSAGE", "CHANNEL", "REACTION" ]
});

client.on('ready', () => {
  console.log('👺 Under Running... 👺')
})

client.login(process.env.BOT_TOKEN);