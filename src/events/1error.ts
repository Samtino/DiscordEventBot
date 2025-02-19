import { Client } from 'discord.js';
import { BotEvent } from '@/types/discord';

const event: BotEvent = {
  name: 'error',
  execute: (client: Client, error: Error) => {
    console.error(error);
  },
};

export default event;
