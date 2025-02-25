import { getSettings } from '@/services/settings';
import { BotEvent } from '@/types/discord';
import {
  EmbedBuilder,
  GuildScheduledEvent,
  GuildScheduledEventStatus,
  TextChannel,
} from 'discord.js';

const event: BotEvent = {
  name: 'guildScheduledEventUpdate',
  execute: async (
    oldEvent: GuildScheduledEvent | null,
    newEvent: GuildScheduledEvent
  ) => {
    // const testEvent = await newEvent.fetch();
    // console.log(testEvent);

    // Check that event has started
    if (
      oldEvent?.status !== newEvent.status &&
      newEvent.status === GuildScheduledEventStatus.Active
    ) {
      try {
        // Fetch the interested users
        const subscribers = await newEvent.fetchSubscribers({ limit: 100 });

        // Map the users to mentions
        const mentions = subscribers
          .map((user) => `<@${user.user.id}>`)
          .join(' ');

        // Get the announcement channel
        const announcementChannelId = getSettings().announcementChannelId;
        if (!announcementChannelId)
          return console.error('Announcement channel not set.');

        const channel = newEvent.guild?.channels.cache.get(
          announcementChannelId
        ) as TextChannel;
        if (!channel) return console.error('Announcement channel not found.');

        // Create announcement embed
        const formattedStartTime = `<t:${Math.floor(
          newEvent.scheduledStartTimestamp! / 1000
        )}:F>`;

        const eventLocation = newEvent.channelId
          ? `<#${newEvent.channelId}>`
          : newEvent.entityMetadata?.location || 'Discord';

        const embed = new EmbedBuilder()
          .setTitle(`🎉 **${newEvent.name}** has started!`)
          .setDescription(
            newEvent.description ||
              'No description provided.' +
                `\n\n[📌 Click here to join the event!](${newEvent.url})`
          )
          .addFields(
            { name: '📅 Start Time', value: formattedStartTime },
            {
              name: '📍 Location',
              value: eventLocation,
            },
            {
              name: '👥 Interested Users',
              value: `${subscribers.size ?? 0} people marked as interested!`,
            }
          )
          .setURL(newEvent.url ?? '')
          .setFooter({
            text: `Hosted by ${newEvent.creator?.tag || 'Unknown'}`,
          });

        const guildIcon = newEvent.guild?.iconURL();
        if (guildIcon) embed.setThumbnail(guildIcon);

        const eventImage = newEvent.coverImageURL();
        if (eventImage) embed.setImage(eventImage);

        // Send announcement message
        await channel.send({
          content: mentions,
          embeds: [embed],
          allowedMentions: { users: subscribers.map((user) => user.user.id) },
        });
      } catch (error) {
        console.error('Error sending announcement:', error);
      }
    }
  },
};

export default event;
