const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

let tasks = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo')
        .setDescription('Une todolist très simple')
        .addSubcommand(subcommand =>
            subcommand.setName('add')
                .setDescription('Ajouter une task')
                .addStringOption(option =>
                    option.setName('nom')
                        .setDescription('Nom de la task')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('Description de la task')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('get')
                .setDescription('Récupérer la description d\'une task')
                .addStringOption(option =>
                    option.setName('nom')
                        .setDescription('Nom de la task')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('remove')
                .setDescription('Supprimer une task')
                .addStringOption(option =>
                    option.setName('nom')
                        .setDescription('Nom de la task')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('list')
                .setDescription('Afficher la liste des task')),
    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
        case 'add':
            this.add(interaction);
            break;
        case 'get':
            this.get(interaction);
            break;
        case 'remove':
            this.remove(interaction);
            break;
        case 'list':
            this.list(interaction);
            break;
        default:
            await interaction.reply('Commande introuvable.');
        }
    },
    async add(interaction) {
        const taskName = interaction.options.getString('nom');
        const taskDesc = interaction.options.getString('description');
        tasks[taskName] = taskDesc;
        await interaction.reply("Task ajoutée !");
    },
    async get(interaction) {
        const taskName = interaction.options.getString('nom');
        const taskDesc = tasks[taskName];
        if (!taskDesc)
            await interaction.reply("Task introuvable.");
        else
            await interaction.reply(`Task "${taskName}": ${taskDesc}`);
    },
    async remove(interaction) {
        const taskName = interaction.options.getString('nom');
        if (!tasks[taskName])
            await interaction.reply("Task introuvable.");
        else {
            delete tasks[taskName];
            await interaction.reply(`Task ${taskName} supprimée !`)
        }
    },
    async list(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Todo')
            .setDescription(`Il y a ${Object.entries(tasks).length} tasks dans votre todolist.`)
            .setAuthor({name: interaction.member.nickname, iconURL: interaction.user.avatarURL()})
            .setFooter({text: interaction.client.user.username, iconURL: interaction.client.user.avatarURL()});
        
        Object.entries(tasks).forEach(task => {
            embed.addField(task[0], task[1], false);
        });

        await interaction.reply({embeds: [embed]})
    },
}