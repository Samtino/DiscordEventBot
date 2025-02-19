import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '@/types/discord';
import { MessageFlags } from 'discord.js';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setAuthor({ name: '🏓 Pong!' })
      .setDescription(
        `🤖 Client: ${ping}ms\n📡 Websocket: ${interaction.client.ws.ping}ms`
      );

    await interaction.editReply({ embeds: [embed] });
  },
};

export default command;
