const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, CommandInteraction } = require("discord.js");

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
    async refresh(interaction) {
        await interaction.update({
            embeds: [this.getEmbed(interaction)],
            components: this.getActionRows()});
    },
    async list(interaction) {
        await interaction.reply({
            embeds: [this.getEmbed(interaction)],
            components: this.getActionRows()})
        const msg = await interaction.fetchReply();
        const menuCollector = msg.createMessageComponentCollector({componentType: 'SELECT_MENU'});
        const btnCollector = msg.createMessageComponentCollector({componentType: 'BUTTON'});
        menuCollector.on('collect', async menu => {
            const taskName = menu.values[0];
            if (!tasks[taskName])
                await menu.reply({content: `Task ${taskName} introuvable.`, ephemeral: true});
            else {
                delete tasks[taskName];
                await this.refresh(menu);
            }
        })
        btnCollector.on('collect', async button => {
            await this.refresh(button);
        })
    },
    getEmbed(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Todo')
            .setDescription(`Il y a ${Object.entries(tasks).length} tasks dans votre todolist.`)
            .setAuthor({name: interaction.member.nickname, iconURL: interaction.user.avatarURL()})
            .setFooter({text: interaction.client.user.username, iconURL: interaction.client.user.avatarURL()});
        
        Object.entries(tasks).forEach(task => {
            embed.addField(task[0], task[1], false);
        });

        return embed;
    },
    getActionRows() {
        let actionRows = []
        if (Object.entries(tasks).length !== 0) {
            actionRows.push(new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectTask')
                    .setPlaceholder('Sélectionnez la task à terminer')
                    .setOptions(Object.entries(tasks).map(task => ({
                        label: task[0],
                        description: task[1],
                        value: task[0],
                    })))
            ));
        }
        actionRows.push(new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('refreshButton')
                    .setLabel('Rafraîchir')
                    .setStyle('PRIMARY')
        ))
        return actionRows      
    },
}