import { updateSetting } from '@/services/settings';
import { Command } from '@/types/discord';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType, MessageFlags, PermissionFlagsBits } from 'discord.js';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('set-announcement-channel')
    .setDescription('Sets the channel for event announcements to be sent.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to send announcements to.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ) as SlashCommandBuilder,
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel', true);

    if (!channel || channel.type !== ChannelType.GuildText) {
      await interaction.reply({
        content: '❌ Please provide a valid text channel.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const success = updateSetting('announcementChannelId', channel.id);

    if (!success) {
      await interaction.reply({
        content: '❌ There was an error updating the settings.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({
      content: `✅ Announcement channel set successfully to <#${channel.id}>.`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  },
};

export default command;
