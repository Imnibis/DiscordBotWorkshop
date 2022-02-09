const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

// Création du client Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// Lorsque le bot est prêt
client.once('ready', () => {
    console.log('Ready !');
});

// Connexion du bot
client.login(token);