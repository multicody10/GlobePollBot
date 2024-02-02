const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createpoll')
        .setDescription('makes a poll')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('the type of poll to create')
                .setRequired(true)
                .addChoices(
                    { name: 'modal', value: "modal" },
                )),
    async execute(interaction) {
        // Get the command issuer
        const cmdIssuer = interaction.guild.members.cache.get(interaction.user.id);
        // If the command issuer is an admin
        if (cmdIssuer.permissions.has(PermissionsBitField.Flags.Administrator)) {
            if (interaction.options.getString('type') == "modal") {
                // Build the button for user to start poll
                const pollButton = new ButtonBuilder()
                    .setCustomId('poll-start-button')
                    .setLabel('Start')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji({ name: "🗒️" });

                // Build rows
                const row = new ActionRowBuilder()
                    .addComponents(pollButton);

                // Build the actual message, embed in this case
                const pollEmbed = new EmbedBuilder()
                    .setColor('#663399')
                    .setTitle('Poll Opportunity: Help Guide Us')
                    .setDescription("We've noticed things might not be as fun lately, and we're eager to know what's on your mind. Your thoughts will play a crucial role in shaping our next steps.")
                    .setFooter({ text: "Testing GlobePoll" });

                // Send message with embed and buttons
                await interaction.reply({ content: 'Creating poll...', fetchReply: true })
                    .then(replyMessage => setTimeout(() => replyMessage.delete(), 250))
                    .catch(error => {
                        // handle error
                    });
                await interaction.channel.send({ content: ' ', components: [row], embeds: [pollEmbed] });

            }
        }
    },
};