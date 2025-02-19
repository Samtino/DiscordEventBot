import 'dotenv/config';
import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from 'discord.js';
import { Button, Command } from './types/discord';
import { join } from 'path';
import { readdirSync } from 'fs';

// Declare bot client
export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
  partials: [Partials.GuildMember, Partials.GuildScheduledEvent],
  presence: {
    activities: [{ name: 'to events', type: ActivityType.Listening }],
    status: 'online',
  },
});

// Load collections
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

// Load handlers
const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
  // if (!handler.endsWith('.js')) return;
  require(`${handlersDir}/${handler}`)(client);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
