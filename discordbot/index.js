// import
import { Client, Events, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent], partials: [Partials.Message]
});


// once you're ready, do this
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'cat') {
            interaction.reply({
                content: `Here is your cat <@${interaction.user.id}>!`,
                files: [{attachment: 'https://cataas.com/cat', name: 'cat.jpg'}]
            })
        }
        interaction.message.delete()
    }
})

// messageCreate
// listener: message - user typed
client.on('messageCreate', message => {

    // if its a bot, do nothing
    if (message.author.bot) {
        return
    }
    //else
    console.log(message.content)
    switch (message.content) {
        case "!options":

            // creates new row
            const row = new ActionRowBuilder()

                // add new component, in this case a button builder
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('cat')
                        .setLabel('Click me for cuteness!')
                        .setStyle('Primary'),
                );

            // returns contents of row
            message.reply({components: [row]})
            return
    }

    // if specific id is specific channel, do this
    if (message.channel.id === "1079455700981395576") {
        message.reply('Poke <@' + message.author.id + '>')
    }

})

client.login(process.env.TOKEN)