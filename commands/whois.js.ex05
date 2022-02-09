const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Qui est-ce?')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à inspecter')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        
        interaction.reply(`Ah, c'est ${user.username}#${user.discriminator} ! Son ID c'est le ${user.id}`);
    }
}