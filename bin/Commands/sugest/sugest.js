const Commando = require("discord.js-commando");

class SugestCommand extends Commando.Command{
    constructor(client){
        super(client,{
            name: 'sugest',
            group: 'sugest',
            memberName: 'sugest',
            description: 'Takes your suggestion to mod chat so the moderators can either reject it or implement it'
        });
    }

    async run(messages, args){
        
        
    }
}