import { ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders";
import type {
  AutocompleteInteraction,
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  ClientEvents,
  Collection,
  ModalSubmitInteraction,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  modal?: (interaction: ModalSubmitInteraction<CacheType>) => Promise<void>;
  cooldown?: number;
}

export interface Button {
  baseCustomId: string;
  execute: (
    interaction: ButtonInteraction<CacheType>,
    userId?: string
  ) => Promise<void>;
}

export interface BotEvent {
  name: keyof ClientEvents;
  once?: boolean | false;
  execute: (...args) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
    buttons: Collection<string, Button>;
  }
}
