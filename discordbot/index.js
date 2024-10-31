// import
import { Client, Events, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import dotenv from 'dotenv';

import db from './libs/database/index.js';
import models from './libs/database/models/index.js';
import Video from './libs/database/models/Video.js';
import sequelize from './libs/database/index.js';

dotenv.config();

//associates other models with each other for Many to Many, Many to One relationships
// Object.values(models).forEach((model) => {
//     if (model.associate) {
//       model.associate(models);
//     }
//   });


// Create a new client instance for the discord bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent], partials: [Partials.Message]
});



// forces a db reset, can be changed in env file
await db.sync({force: false})


// once you're ready, do this
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async message => {

    const randomVid = await getRandomVideo();

    if (message.content === '!anakin') {
        message.reply({
            content: `Here is your video: <@${message.author.id}> \n ${randomVid.videoLink}`,
        })
        // interaction.message.delete()
    }
})




// messageCreate
// listener: message - user typed

// client.on('messageCreate', message => {

//     // if its a bot, do nothing
//     if (message.author.bot) {
//         return
//     }
//     //else
//     console.log(message.content)
//     switch (message.content) {
//         case "!options":

//             // creates new row
//             const row = new ActionRowBuilder()

//                 // add new component, in this case a button builder
//                 .addComponents(
//                     new ButtonBuilder()
//                         .setCustomId('video')
//                         .setLabel('Click me for cuteness!')
//                         .setStyle('Primary'),
//                 );

//             // returns contents of row
//             message.reply({components: [row]})
//             return
//     }

//     // if specific id is specific channel, do this
//     if (message.channel.id === "1079455700981395576") {
//         message.reply('Poke <@' + message.author.id + '>')
//     }

// })


client.on('messageCreate', async message => {
    if (message.content === '!fetchmedia') {
        const channel = message.channel;
        const messages = await channel.messages.fetch({ limit: 100 });
        // messages.forEach(msg => console.log(`${msg.author.tag}: ${msg.content}`));
        addVideos(messages);
    }
});


async function addVideos(messages) {
    messages.forEach(async msg => {
        try {
            console.log(msg.content);
            const newVideo = await Video.create({videoLink: msg.content});
            console.log("added Video: "+newVideo.videoLink);
        } catch (error) {
            console.error(`Error adding user ${msg.content}:`, error);
        }
    });
}

async function getRandomVideo() {
    try {
        const videos = await Video.findAll({
            order: [sequelize.fn("RANDOM")], // SORTS records randomly
            limit: 1,
        });
    
    return videos[0];
        
    } catch (error) {
        console.error("Error fetching random user:", error);
    }
}

client.login(process.env.TOKEN)