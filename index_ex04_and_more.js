const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const fs = require('fs');

// Création du client Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// Récupération des commandes dans leurs fichiers respectifs
let commands = []
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// Envoi des commandes à l'API Discord
const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

// Lorsque le bot est prêt
client.once('ready', () => {
    console.log('Ready !');
});

// Lorsque le bot reçoit un message
client.on('messageCreate', async message => {
    if (message.content.includes('quoi') && Math.random() * 5 <= 1) {
        if (Math.random() * 4 <= 3) {
            await message.reply('feur');
        } else {
            await message.reply({files: ['https://perrot.pt/img/feur.jpg']})
        }
    }
})

// Lorsque le bot reçoit une intéraction
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
})

// Connexion du bot
client.login(token);