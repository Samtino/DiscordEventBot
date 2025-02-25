import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BotEvent } from '../types/discord';

module.exports = (client: Client) => {
  let eventsDir = join(__dirname, '../events');

  readdirSync(eventsDir).forEach((file) => {
    // if (!file.endsWith('.js')) return;
    let event: BotEvent = require(`${eventsDir}/${file}`).default;

    if (!event) {
      console.log(
        `[WARNING] The event file: ${file} is missing a default export.`
      );
      return;
    }

    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args));

    console.log(`Successfully loaded event ${event.name}`);
  });
};
