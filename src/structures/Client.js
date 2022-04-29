const fs = require('fs')

const { Client } = require('discord.js');
const { join } = require('path')

module.exports = class extends Client {
  constructor (options) {
    super(options);
    this.commands = [];

    this.loadCommands();
    this.loadEvents();
  }

  registryCommands() {
    // Temp -> Apenas no servidor que eu passei o ID
    this.guilds.cache.get('969073855236808734').commands.set(this.commands)
    // this.application.commands.set(this.commands) -> Comando global, apenas quando mandar pra produção
    
  }

  loadCommands(path = 'src/commands') {
    const categories = fs.readdirSync(path);

    for (const category of categories) {
      const commands = fs.readdirSync(`${path}/${category}`);

      for (const command of commands) {
        const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`));
        const cmd = new (commandClass)(this);

        this.commands.push(cmd);
      }
    }
  }

  loadEvents(path = 'src/events') {
    const categories = fs.readdirSync(path);

    for (const category of categories) {
      const events = fs.readdirSync(`${path}/${category}`);

      for (const event of events) {
        const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`));
        const evt = new (eventClass)(this);

        this.on(evt.name, evt.run);
      }
    }
  }
}