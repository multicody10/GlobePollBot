const { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const takenPoll = ["1", "2", "3"];

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const userName = "<@" + interaction.guild.members.cache.get(interaction.user.id) + ">";
        const channel = interaction.guild.channels.cache.get('749030319193063477');
        if (interaction.isModalSubmit()) {
            if (interaction.customId == "engagementPoll") {
                const satisfactionResult = interaction.fields.getTextInputValue('satisfactionInput');
                const improveResult = interaction.fields.getTextInputValue('improveInput');
                const experienceResult = interaction.fields.getTextInputValue('experienceInput');
                const issuesResult = interaction.fields.getTextInputValue('issuesInput');
                const rateResult = interaction.fields.getTextInputValue('rateInput');
                const pollResultEmbed = new EmbedBuilder()
                    .setColor('#274437')
                    .setTitle('Poll Result')
                    .setDescription("----------------------")
                    .addFields(
                        { name: 'How satisfied are you with your time here?', value: "*" + satisfactionResult + "*" },
                        { name: 'What would you like to see us do?', value: "*" + improveResult + "*" },
                        { name: 'Share a recent satisfying experience.', value: "*" + experienceResult + "*" },
                        { name: 'Recent issues affecting satisfaction?', value: "*" + issuesResult + "*" },
                        { name: 'How likely are you to recommend us?', value: "*" + rateResult + "*" },
                        { name: " ", value: "----------------------" },
                        { name: " ", value: "Submitted By: " + userName },
                    )
                    .setTimestamp()
                    .setFooter({ text: "Engagement Poll", iconURL: interaction.user.displayAvatarURL({ extension: 'jpg' }) });
                // End Modal
                // Send Messages
                channel.send({ content: " ", embeds: [pollResultEmbed] });
                await interaction.reply({ content: "Your submission was received! Thank you!", embeds: [pollResultEmbed], ephemeral: true });
                takenPoll.push(userName);
            }
        }
        if (interaction.isButton()) {
            if (interaction.customId === 'poll-start-button') {
                if (takenPoll.includes(userName)) {
                    await interaction.reply({ content: "You've already submitted a form!", ephemeral: true });
                    return;
                }
                // Create the modal
                const modal = new ModalBuilder()
                    .setCustomId('engagementPoll')
                    .setTitle('Engagement Poll');

                // Create the input components (up to 5)
                // Input 1
                const satisfactionInput = new TextInputBuilder()
                    .setCustomId('satisfactionInput')
                    // The label is the prompt the user sees for this input
                    .setLabel("1. How satisfied are you with your time here?")
                    // Set a placeholder string to help the user
                    .setPlaceholder("I'd rate it 6/10. I'm pretty satisfied. I love the Earth map.")
                    // Set the minimum number of characters required for submission
                    .setMinLength(4)
                    // Set the maximum number of characters to allow
                    .setMaxLength(100)
                    // Require a value in this input field
                    .setRequired(true)
                    // Short means only a single line of text
                    .setStyle(TextInputStyle.Short);

                // Input 2
                const improveInput = new TextInputBuilder()
                    .setCustomId('improveInput')
                    // The label is the prompt the user sees for this input
                    .setLabel("2. What would you like to see us do?")
                    // Set a placeholder string to help the user
                    .setPlaceholder("Continue improving the server, make a game, make discord bots, do something different...")
                    // Set the minimum number of characters required for submission
                    .setMinLength(5)
                    // Set the maximum number of characters to allow
                    .setMaxLength(300)
                    // Require a value in this input field
                    .setRequired(true)
                    // Short means only a single line of text
                    .setStyle(TextInputStyle.Paragraph);

                // Input 3
                const experienceInput = new TextInputBuilder()
                    .setCustomId('experienceInput')
                    // The label is the prompt the user sees for this input
                    .setLabel("3. Share a recent satisfying experience.")
                    // Set a placeholder string to help the user
                    .setPlaceholder("I love seeing my town grow on the map and getting money. I love...")
                    // Set the minimum number of characters required for submission
                    .setMinLength(5)
                    // Set the maximum number of characters to allow
                    .setMaxLength(300)
                    // Require a value in this input field
                    .setRequired(true)
                    // Short means only a single line of text
                    .setStyle(TextInputStyle.Paragraph);

                // Input 4
                const issuesInput = new TextInputBuilder()
                    .setCustomId('issuesInput')
                    // The label is the prompt the user sees for this input
                    .setLabel("4. Recent issues affecting satisfaction?")
                    // Set a placeholder string to help the user
                    .setPlaceholder("Low player activity. Hosting in-game events can boost engagement or...")
                    // Set the minimum number of characters required for submission
                    .setMinLength(5)
                    // Set the maximum number of characters to allow
                    .setMaxLength(300)
                    // Require a value in this input field
                    .setRequired(true)
                    // Short means only a single line of text
                    .setStyle(TextInputStyle.Paragraph);

                // Input 5
                const rateInput = new TextInputBuilder()
                    .setCustomId('rateInput')
                    // The label is the prompt the user sees for this input
                    .setLabel("5. How likely are you to recommend us?")
                    // Set a placeholder string to help the user
                    .setPlaceholder("Likely. I'd recommend this server to my friends.")
                    // Set the minimum number of characters required for submission
                    .setMinLength(5)
                    // Set the maximum number of characters to allow
                    .setMaxLength(100)
                    // Require a value in this input field
                    .setRequired(true)
                    // Short means only a single line of text
                    .setStyle(TextInputStyle.Short);

                // An action row only holds one text input,
                const firstActionRow = new ActionRowBuilder().addComponents(satisfactionInput);
                const secondActionRow = new ActionRowBuilder().addComponents(improveInput);
                const thirdActionRow = new ActionRowBuilder().addComponents(experienceInput);
                const fourthActionRow = new ActionRowBuilder().addComponents(issuesInput);
                const fifthActionRow = new ActionRowBuilder().addComponents(rateInput);

                // Add inputs to the modal
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                // Show the modal to the user
                await interaction.showModal(modal);
            }
        }
    },
};