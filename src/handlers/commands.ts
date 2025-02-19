import type { Client } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Command } from '@/types/discord';

module.exports = (client: Client) => {
  const commands: SlashCommandBuilder[] = [];

  // const path = join(__dirname, '../commands');
  // console.log('Path:', path);
  // return;

  const foldersPath = join(__dirname, '../commands');
  const commandFolders = readdirSync(foldersPath);

  commandFolders.forEach((folder) => {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(
      (file) => file.endsWith('.js') || file.endsWith('.ts')
    );

    commandFiles.forEach((file) => {
      const filePath = join(commandsPath, file);
      const command: Command = require(filePath).default;

      if (!command) {
        console.log(
          `[WARNING] The command at ${filePath} is missing a default export.`
        );
        return;
      }

      if ('data' in command && 'execute' in command) {
        commands.push(command.data);
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    });
  });

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  rest
    .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string), {
      body: commands.map((command) => command.toJSON()),
    })
    .then(() =>
      console.log(`Successfully registered ${commands.length} commands.`)
    )
    .catch(console.error);
};
