const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whoami')
        .setDescription('Qui suis-je?'),
    async execute(interaction) {
        const author = interaction.user;
        await interaction.reply(`Tu es ${author.username}#${author.discriminator}, et ton ID est ${author.id} !`)
    }
}