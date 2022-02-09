const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

// Création du client Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// Envoi des commandes à l'API Discord
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Ping command'),
].map(command => command.toJSON());

const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

// Lorsque le bot est prêt
client.once('ready', () => {
    console.log('Ready !');
});

// Lorsque le bot reçoit une intéraction
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong !');
    }
})

// Connexion du bot
client.login(token);