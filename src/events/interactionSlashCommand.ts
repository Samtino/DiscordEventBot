import { Interaction } from 'discord.js';
import { BotEvent } from '@/types/discord';

const event: BotEvent = {
  name: 'interactionCreate',
  execute: (interaction: Interaction) => {
    // Slash Command Handler
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      const cooldown = interaction.client.cooldowns.get(
        `${interaction.commandName}-${interaction.user.id}`
      );
      if (!command) return;

      if (command.cooldown && cooldown) {
        if (Date.now() < cooldown) {
          return interaction.reply({
            content: `You need to wait ${Math.floor(
              Math.abs(Date.now() - cooldown) / 1000
            )} second(s) to use this command again.`,
            ephemeral: true,
          });
        }

        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.id}`,
          Date.now() + command.cooldown * 1000
        );
        setTimeout(() => {
          interaction.client.cooldowns.delete(
            `${interaction.commandName}-${interaction.user.id}`
          );
        });
      } else if (command.cooldown && !cooldown) {
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.id}`,
          Date.now() + command.cooldown * 1000
        );
      }
      command.execute(interaction);
    } else if (interaction.isAutocomplete()) {
      // Autocomplete Handler
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
      if (!command.autocomplete) return;

      command.autocomplete(interaction);
    }
  },
};

export default event;
