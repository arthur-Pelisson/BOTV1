const Discord = require('discord.js');
const bot = new Discord.Client({ autoReconnect: true });
// console.log(bot);
const YoutubeStream = require('ytdl-core');
const fs = require('fs');
const queue = new Map();
const search = require('yt-search');
const ascii = require('ascii-art');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(
    '********************'
);
const FeatureAllTimeout = { FinalTabTimeOutFlashTop: [], FinalTabTimeOutTpTop: [] };
// const FinalTabTimeOutFlashTop = [];
const lol = require('lol-js');
// const lolClient = lol.client({
//   apiKey: '***********************',
//   cache: lol.redisCache({ host: '127.0.0.1', port: 6379 })
// });
bot.on('error', console.error);

bot.on('disconnect', () => console.log("i juste disconnected, makjing sure youknow, i will reconect now"));

bot.on('reconnecting', () => console.log("i am reconnecting now !"));

bot.on('ready', function() {
    console.log("Je suis connecté !");
})

bot.login('***********************************');


bot.on('message', async message => {
    TrimMessageForArgs = removeExtraSpace(message.content);
    // console.log(message.member.roles.some(r=>["Administrator"].includes(r.name)))
    // if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Tu na pas les droit n\'essesaire pour cette action')
    const args = TrimMessageForArgs.split(' ');
    const commande = args.shift().toLowerCase();
    const regex = RegExp('^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+');
    prefix = commande.substr(0, 1);
    if (prefix != "!") return;
    if (message.author.bot) return;
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.roles.some(r => ['THE EXILE', 'the master of balec', 'The kulbutoké', 'the strength of yggdrasil', 'The Miro', 'Dj', "Princesse"].includes(r.name))) return message.reply('Tu n\'a pas les droit pour cette action')
        // console.log(args)


    if (commande === '!leis') {
        message.reply('ouha ouha ouha', {
            tts: true
        })
        message.channel.send("salut", {
            tts: true
        })
    } else if (commande === "!youri") {
        if (!message.member.roles.some(r => ['THE EXILE', 'The kulbutoké'].includes(r.name))) return message.reply('Il n\y a que maitre arthur ou youri qui peut me demander de faire ca ;).');
        message.channel.send('kuuuuuuuuuuuuulbutokééééé', {
            tts: true
        })
    } else if (commande === "!marine") {
        if (!message.member.roles.some(r => ['THE EXILE', 'The kulbutoké'].includes(r.name))) return message.reply('Il n\y a que maitre arthur ou youri qui peut me demander de faire ca ;).');
        message.channel.send('marine ta gueule', {
            tts: true
        })
    } else if (commande === '!bot') {
        message.channel.send('commande pour le bot music :)\n!play linkyoutube: Joue ta music youtube ou la mais a la suite dans la file d\'attente\n!pause: Mais en pause ta music\n' +
            '!resume: Reprend ta music la ou tu la mise en pause\n!leave: Renvoie le bot chez lui\n!stop: Deconnecte le bot\n' +
            '!queue: Te montre la file d\'attente pour les music\n!skip: Passe la music actuel ci il y a une file d\'attente pour les music\n' +
            '!playliste \'nom de la playliste sans espace\' le link youtube de toutes les music que tu veut mettre dans ta playliste avec un espace entre touts les link\n' +
            '!playliste \'nom de ta playliste\' !play: Joue ta playliste preferé\n' +
            '!playliste \'nom de ta playliste\' !info: Toute les info de ta playliste preferé\n' +
            '!playliste !info: Nom des playliste existente\n' +
            '!playliste \'nom de ta playliste\' !add + link youtube: ajoute ta chanson a ta playliste\n' +
            '!playliste \'nom de ta playliste\' !delete: Suprim la playliste que tu n\'aime pas\n')
    } else if (commande === '!ping') {
        message.channel.send({
            embed: {
                color: 0x2ed32e,
                fields: [{
                    name: "Pong",
                    value: "My Ping: " + Math.round(bot.ping) + ' ms'
                }],
            }
        })
    } else if (commande === '!-8000' || commande === '!nul' || commande === "!c'honteu") {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour cette action !');
        var replique = { "!-8000": "https://www.youtube.com/watch?v=785jEnuAwgw", "!nul": "https://www.youtube.com/watch?v=xnrqZUt9E8s", "!c'honteu": "https://www.youtube.com/watch?v=owtl9rk_UL0" };
        url_replique = replique[commande];
        const songInfo = await YoutubeStream.getInfo(url_replique);
        const song = {
            title: songInfo.player_response.videoDetails.title,
            url: songInfo.video_url
        };

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I was unable to join the voice channel ${voiceChannel}, the error is : ${error}`);
                return;
            }
        } else {
            serverQueue.songs.push(song);
            // console.log(serverQueue)
            return;
        }

        return;
    } else if (commande === "!add") {

    } else if (commande === '!botname') {
        bot.user.setUsername(args[0])
    } else if (commande === '!test') {
        // console.log( embed = new Discord.MessageEmbed())
        let embed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setFooter('Reagir au vote')
            .setDescription(args.join(' '))
            .setTitle(`Vote crée par ${message.author.username}`);

        let msg = await message.channel.send(embed)

        await msg.react('🤘')
        await msg.react('👌')

        message.delete({ timeout: 1000 })
    } else if (commande === '!jeux') {
        console.log(message.member)
    } else if (commande === '!kick') {
        if (!message.member.roles.some(r => ["Administrator", "Moderator"].includes(r.name)))
            return message.reply("Tu na pas les droit n\'essesaire pour cetteaction !");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    } else if (commande === '!la boite a quoi ?') {
        message.reply('a connerie du con')
    } else if (commande === "!purge") {
        // if (!message.member.roles.some(r => ["Administrator", "THE EXILE"].includes(r.name)))
        //   return message.reply("Dsl tu na pas la permission de faire cette action !");
        let args = message.content.split(' ')
        const deleteCount = parseInt(args[1], 10);
        // console.log(args[0])
        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Veuiller renseigner le nombre de messages a suprimer entre 2 et 100");
        message.channel.fetchMessages({ limit: deleteCount }).then(messages => {
            message.channel.bulkDelete(messages)
        }).catch(error => message.reply(`imposible de suprimer ce message a cause de: ${error}`));
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////don't forget to fix the command stop, resume and leave to be able to destroye queu with stop, and to resume music after the use of leave.////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (commande === '!play') {
        const voiceChannel = message.member.voiceChannel
        if (!voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour cette action !');
        if (!args[0]) return message.channel.send('Il me faut un link pour lancé une video youtube');
        if (!regex.test(args[0])) return message.channel.send('Seulement les video youtube son autorisé');
        const songInfo = await YoutubeStream.getInfo(args[0])
            .catch((err) => {
                console.log(err);
            })
        const song = {
            url: songInfo.video_url,
            title: songInfo.player_response.videoDetails.title
        };

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I was unable to join the voice channel ${voiceChannel}, the error is : ${error}`);
                return;
            }
        } else {
            try {
                var connection = await voiceChannel.join();
            } catch (err) {
                console.log(err)
            }
            serverQueue.songs.push(song);
            return;
        }

        return;
    } else if (commande === '!pause') {
        // console.log(serverQueue)
        // console.log(playliste_to_play.connection.dispatcher)
        if (!message.member.voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour pouvoir faire cette action');
        if (serverQueue !== undefined) {
            serverQueue.connection.dispatcher.pause()
        } else if (playliste_to_play !== undefined) {
            playliste_to_play.connection.dispatcher.pause()
        }
    } else if (commande === '!stooooop') {
        if (!message.member.voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour pouvoir faire cette action');
        message.member.voiceChannel.leave()

    } else if (commande === '!resume') {
        if (serverQueue !== undefined) {
            serverQueue.connection.dispatcher.resume()
        } else if (playliste_to_play !== undefined) {
            playliste_to_play.connection.dispatcher.resume()
        }
    } else if (commande === '!leave') {
        if (!message.member.voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour pouvoir faire cette action');
        message.member.voiceChannel.leave()
        message.reply('bye')
    } else if (commande === '!volume') {
        // console.log(serverQueue.connection.dispatcher.volumeLogarithmic)
        if (!message.member.voiceChannel) return message.channel.send('Tu n\'es pas dans un channel audio');

        let argsVolume = message.content.split(' ')
        let volume = serverQueue.connection.dispatcher.volumeLogarithmic
        if (!argsVolume[1]) return message.channel.send('Le volume est a ' + volume);
        serverQueue.connection.dispatcher.setVolumeLogarithmic(argsVolume[1])
        return message.channel.send(`le volume et changer a: **${argsVolume[1]}**`);
    } else if (commande === '!skip') {
        if (serverQueue !== undefined) {
            serverQueue.connection.dispatcher.end();
        } else if (playliste_to_play !== undefined) {
            playliste_to_play.connection.dispatcher.end();
        } else {
            return message.channel.send('Il n\'y a pas de music a passer')
        }
    } else if (commande === '!queue') {
        if (!serverQueue) return message.channel.send('Il n\'y a pas de music dans la queue')
        let countSong = serverQueue.songs.length
        listeMusic = []
        for (i = 0; countSong > i; i++) {
            music = serverQueue.songs[i].title
            listeMusic.push(i + 1 + ' ' + music)
        }
        message.channel.send(listeMusic)
    } else if (commande === "!playliste") {
        if (!message.member.roles.some(r => ['Administrator', 'THE EXILE', 'the master of balec', 'The kulbutoké', 'the strength of yggdrasil', 'The Miro'].includes(r.name))) return message.reply('Tu n\'a pas les droit pour cette action')
        if (!message.member.voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour pouvoir faire cette action');
        // if (!args[1]) return message.channel.send('Il manque des arguments ! fait la commande !bot ci tu veut plus d\'info')
        if (!args[0]) return message.channel.send('Il me faut un nom de playliste avec une commande ou des link merci.\nCi vous avez besoin d\'aide taper !bot')
        if (args[1] === '!info') {
            if (search_playliste(args[0]) != false) {
                let info = search_playliste(args[0])
                get_info_music(info, message)
            }
        } else if (args[0] === '!info') {
            let allplayliste = []
            info_of_all_playliste = read_file_json()
            let len_of_all_playliste = info_of_all_playliste.length

            for (y = 0; len_of_all_playliste > y; y++) {
                allplayliste.push(y + 1 + ' ' + info_of_all_playliste[y].name + '\n')
            }
            console.log(allplayliste)
            message.channel.send('Toutes les playliste\n' + allplayliste)
                // console.log(info_of_all_playliste)
        } else if (args[1] === '!play') {
            if (search_playliste(args[0]) === false) return message.channel.send('Aucune playliste de ce nom tu peut réessayer ou faire la commande !playliste !liste')
            r = 0
            playliste_to_play = search_playliste(args[0])
            const voiceChannel = message.member.voiceChannel
            if (!voiceChannel) return message.channel.send('Tu doit etre dans un channel audio pour cette action !');
            try {
                var connection = await voiceChannel.join();
                playliste_to_play.connection = connection;
                play_playliste(message.guild, playliste_to_play.songs[r]);
            } catch (error) {
                console.error(`I was unable to join the voice channel ${voiceChannel}, the error is : ${error}`);
                return;
            }

        } else if (args[1] === "!add") {
            if (search_playliste(args[0]) === false) {
                message.channel.send('aucun playliste a ce nom dsl')
            } else {
                //console.log(args)
                if (verife_url_YT_for_playliste(args) === false) return message.channel.send('Je n\'est le droit qu\'au link youtube dsl');
                let playliste = search_playliste(args[0])
                    //console.log(playliste)
                const only_link = args.filter(arg => arg.includes('youtube'))
                count_link = only_link.length
                if (count_link <= 0) return message.channel.send('Bip bop tu na rien a ajouter dans ta playlist réessaye')
                    //console.log(only_link)
                await add_playliste(playliste, only_link)
                    .catch((err) => {
                        console.log(err);
                    })
                console.log('song add')
                message.channel.send('Song add in playliste ' + args[0])
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////need to read the file json if i want to show the new music add in live ////////////////////////////////////////////
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                get_info_music(playliste, message)
            }
        } else if (args[1] === "!delete") {
            let playliste_to_delete = search_playliste(args[0])
            if (playliste_to_delete === false) {
                message.reply("Il n'y a aucun playliste de ce nom !")
            } else {
                message.reply("Est tu sure de vouloire suprimer la playliste \'" + args[0] + "\' ?? repond par: oui ou non")
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
                collector.on('collect', message => {
                    time = false
                    if (message.content == 'oui') {
                        time = true
                        delete_playliste(playliste_to_delete);
                        message.channel.send(`La playliste: ${args[0]} a bien éte suprimer`)
                    } else if (message.content == 'non') {
                        time = true
                        message.reply('J\'annule la commande :)')
                    } else {
                        message.reply("Je n\'est pas compris dsl")
                    }
                })
                collector.on('end', () => {
                    console.log('end of delete')
                    if (time != true) {
                        message.reply('Tu a mis trop de temps pour te decider réessaye')
                    }
                })
            }
        } else {
            if (!args[1].includes('youtube')) return message.channel.send('Il me faut un un link ci tu veut crée ta playliste ou une autre commande merci :)');
            if (verife_url_YT_for_playliste(args) === false) return message.channel.send('Je n\'est le droit qu\'au link youtube dsl');
            // console.log(args[0])
            if (search_playliste(args[0]) != false) return message.channel.send('Une playliste a deja ce nom')
                // console.log(search_playliste(args[0]))
                // console.log("test")
            playlistes = []
            let name_PL = args.shift()
            let song = []
            let nb_of_music = args.length
            console.log(args)
            const playliste = {
                name: name_PL,
                songs: []
            }
            for (m = 0; nb_of_music > m; m++) {
                console.log(m)
                playliste_song_info = await YoutubeStream.getInfo(args[m])
                    .catch((err) => {
                        console.log(err);
                    })
                    // console.log(playliste_song_info)
                song = {
                    title: playliste_song_info.player_response.videoDetails.title,
                    url: playliste_song_info.video_url
                }
                playliste.songs.push(song)
            }
            // playlistes.push(playliste)
            fs.readFile('playliste.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    playlistes = JSON.parse(data)
                        // console.log(playlistes)
                    playlistes.push(playliste)
                    json = JSON.stringify(playlistes, null, 2, function(err) {
                        if (err) {
                            console.log('error stringify' + err);
                        }
                    });
                }
                fs.writeFile('playliste.json', json, 'utf8', function(err) {
                    if (err) {
                        console.log('erro write file' + err);
                    }
                })
            })
        }
    } else if (commande === '!search') {
        const voiceChannel = message.member.voiceChannel
        search(args.join(' '), function(err, res) {
            if (err) return message.channel.send('Cela n\a pas marcher dsl')
            let videos = res.videos.slice(0, 10);
            // console.log(videos)
            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
            }
            resp += `\n**choisie un nomre entre 1 et 10 \`1-${videos.length}\``;
            message.channel.send(resp)

            const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;

            const collector = message.channel.createMessageCollector(filter)

            collector.videos = videos;

            collector.once('collect', async function(m) {
                const song = {
                    name: this.videos[parseInt(m.content) - 1].title,
                    url: this.videos[parseInt(m.content) - 1].url
                }
                if (!serverQueue) {
                    const queueConstruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    };
                    queue.set(message.guild.id, queueConstruct);
                    queueConstruct.songs.push(song);
                    try {
                        var connection = await voiceChannel.join();
                        queueConstruct.connection = connection;
                        play(message.guild, queueConstruct.songs[0]);
                    } catch (error) {
                        console.error(`I was unable to join the voice channel ${voiceChannel}, the error is : ${error}`);
                        return;
                    }
                } else {
                    serverQueue.songs.push(song);
                    // console.log(serverQueue)
                    return;
                }
            });
        });
    } else if (commande === '!ascii') {
        ascii.font(args.join(' '), 'Doom', function(render) {
            render = render.trimRight();

            if (render.length > 2000) return message.channel.send('Desoler le message et trop long!');
            message.channel.send(render, {
                code: 'md'
            });
        })
        message.delete({ timeout: 1000 })
    } else if (commande === '!myplaylisteyt') {
        await youtube.getPlaylist('https://www.youtube.com/playlist?list=PLDfKAXSi6kUZAzR2eWSf9wNmzruVfa35J')
            .then(playlist => {
                console.log(`The playlist's title is ${playlist.title}`);
                playlist.getVideos()
                    .then(videos => {
                        console.log(`This playlist has ${videos.length === 50 ? '50+' : videos.length} videos.`);
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    } else if (commande === '!lol') {
        console.log("lol")
        lolClient.getChampionById('euw', 60, { champData: ['all'] })
            .then(function(data) {
                console.log("Found ", data.name);
                lolClient.destroy();
            });
    } else if (commande === "!top") {
        if (args[0] === "f") {
            ù
            var time = 300000;
            if (args[1] === "stop") {
                for (var A = 0; A < FeatureAllTimeout.FinalTabTimeOutFlashTop.length; A++) {
                    clearTimeout(FeatureAllTimeout.FinalTabTimeOutFlashTop[A]);
                }
                return;
            }
            message.reply("no flash top", {
                tts: true
            });

            if (args[1]) {
                milisecond_cdr = convertCdrInMiliseconde(args[1], time);
            } else {
                milisecond_cdr = 0;
            }
            var finaleTime = time - milisecond_cdr;
            var seconde_time_out = setTimeout(() => {
                message.channel.send(`flash top ${converteMillisecondeToMinuteAndSeconde(finaleTime / 2)}  `, {
                    tts: true
                });
            }, finaleTime / 2);

            var third_time_out = setTimeout(() => {
                message.channel.send("flash top up", {
                    tts: true
                });
            }, finaleTime);

            pushTabTimeOut([seconde_time_out, third_time_out]);
        } else if (args[0] === "tp") {

        } else {
            message.channel.send("Je n'est pas compris dsl.");
        }
    }
})

/**
 * @function pushTabTimeOut
 * @param setTimeout 
 * @return {Array} all setTimeOut
 */
function pushTabTimeOut(tabTimeOut) {
    for (O = 0; O < tabTimeOut.length; O++) {
        FeatureAllTimeout.FinalTabTimeOutFlashTop.push(tabTimeOut[O]);
    }
}

/**
 * @function converteMillisecondeToMinuteAndSeconde
 * @param millis miliseconde 
 * @return {string} int(minute) + string(minute) + int(seconde) + int(seconde) 
 */
function converteMillisecondeToMinuteAndSeconde(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " minute " + (seconds < 10 ? '0' : '') + seconds + " seconde";
}

/**
 * @function convertCdrInMiliseconde
 * @param pourcenCdr+milliseconde of 5mn pourcentage 
 * @return {int} milliseconde of cdr
 */
function convertCdrInMiliseconde(pourcentageCdr, time) {
    return time * (pourcentageCdr / 100);
}

async function play(guild, song) {
    const serverQueue = queue.get(guild.id)
    if (!song) {
        // serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    let stream = await YoutubeStream(song.url)
    stream.on('error', function(e) {
            console.log(e)
        })
        // console.log("stream")
    const dispatcher = serverQueue.connection.playStream(stream, { filter: 'audioonly', quality: 'highestaudio' })
        .on('end', () => {
            // console.log(dispatcher)
            console.log('song ended');
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
            return;
        })
        .on('error', error => console.error(error));



    dispatcher.setVolumeLogarithmic(5 / 5);
}

/**
 * 
 * sjqkfezofjziojfizfj
 * @function search_playliste
 * @param name 
 * @return {JSON} file_playlistes
 */
function search_playliste(name) {
    file_playlistes = read_file_json()
    let nb_playlistes = file_playlistes.length
    for (n = 0; nb_playlistes > n; n++) {
        // console.log(file_playlistes[n].name)
        if (name === file_playlistes[n].name) {
            // console.log(file_playlistes[n])
            return file_playlistes[n]
        }
    }
    return false
}


// refaire cette function et mettre une vrai regex !
function verife_url_YT_for_playliste(args) {
    const only_link = args.filter(arg => arg.includes('youtube'))
    let nb_of_music = only_link.length
    for (m = 1; nb_of_music > m; m++) {
        if (!only_link[m].includes('youtube')) {
            return false
        }
        return true
    }
}

function play_playliste(guild, song) {

    if (!song) {
        if (dispatcher_playliste != undefined) {
            // guild.voiceChannel.leave();
            return;
        }
    }

    const dispatcher_playliste = playliste_to_play.connection.playStream(YoutubeStream(song.url))
        .on('end', () => {
            r++
            console.log(`song ended`);
            play_playliste(guild, playliste_to_play.songs[r]);
            return;
        })
        .on('error', error => console.error(error));

    dispatcher_playliste.setVolumeLogarithmic(5 / 5);
}

async function add_playliste(playliste, music_add) {
    let count_music_add = music_add.length
        // console.log(count_music_add)
    let playlistes = read_file_json()
        // console.log(playlistes)
    for (c = 0; count_music_add > c; c++) {
        playliste_add_song = await YoutubeStream.getInfo(music_add[c])
            .catch((err) => {
                console.log(err);
            })
            // console.log("ok")
        song = {
            title: playliste_add_song.title,
            url: playliste_add_song.video_url
        }
        playlistes[n].songs.push(song)
    }
    // console.log(playlistes[n])
    json = JSON.stringify(playlistes, null, 2, function(err) {
        if (err) {
            console.log('error stringify' + err);
        }
    });
    // console.log(json)
    fs.writeFile('playliste.json', json, 'utf8', function(err) {
        if (err) {
            console.log('erro write file' + err);
        }
    })
}


function read_file_json() {
    try {
        var file = fs.readFileSync('playliste.json', 'utf8')
        file = JSON.parse(file)
            // console.log(file)
        return file
    } catch (e) {
        console.log(e)
    }
}

function get_info_music(info, message) {
    // console.log(info)
    count_music = info.songs.length;
    song_info_playliste = [];
    song_info_playliste.push("\n");
    for (c = 0; count_music > c; c++) {
        song_info_playliste.push(c + 1 + ' ' + info.songs[c].title)
    }
    message.reply(song_info_playliste);
}

function delete_playliste(playliste_to_delete) {
    playlistes = read_file_json()
    console.log(playlistes[n])
    playlistes.splice(n, 1)
        // console.log(playlistes)
    json = JSON.stringify(playlistes, null, 2, function(err) {
        if (err) {
            console.log(err)
        }
    });
    fs.writeFile('playliste.json', json, 'utf8', function(err) {
        if (err) {
            console.log(err)
        }
    })
}

function removeExtraSpace(str) {
    str = str.replace(/[\s]{2,}/g, " "); // Enlève les espaces doubles, triples, etc.
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
    str = str.replace(/[\s]$/, ""); // Enlève les espaces à la fin
    return str;
}