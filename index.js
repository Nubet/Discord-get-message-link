const discord = require("discord.js");
const client = new discord.Client();
const { Webhook } = require('discord-webhook-node');
const { TOKEN,STATUS,WEBHOOK, CHANNELID} = require("./config.json");
const hook = new Webhook(WEBHOOK);



var ImageLink;
var VideoLink;



  client.on('ready', async message => 
  {
    client.user.setActivity(STATUS);
   
  });
  
  client.on('message', async message => 
  {
    if (message.attachments.size > 0) 
    {
      if (message.attachments.every(attachIsImagePNG) || message.attachments.every(attachIsImageJPG) )
      {
        try
        {
              message.attachments.forEach(attachment =>   
              {
                ImageLink = attachment.proxyURL;
              });
              if(message.channel.id === CHANNELID) 
              {
              hook.send("```" + ImageLink  + "```");  
              message.delete();
              } 
        }
        catch{}
        }
        else if ( message.attachments.every(attachIsVideoMP4) || message.attachments.every(attachIsVideoMOV)  )
        {
          try
          {
            message.attachments.forEach(attachment =>   
            {
              VideoLink = attachment.proxyURL;
            });
            if(message.channel.id === CHANNELID) 
            {
              hook.send("```" + VideoLink  + "```");  
              message.delete();
            }
          }
          
          catch{}
        }
    }});
  
   function attachIsVideoMP4(msgAttach)
   {
    var url = msgAttach.url;
    return url.indexOf("mp4", url.length - "mp4".length) !== -1;
   }
   function attachIsVideoMOV(msgAttach)
   {
    var url = msgAttach.url;
    return url.indexOf("mov", url.length - "mov".length) !== -1;
   }
   function attachIsImagePNG(msgAttach)
   {
    var url = msgAttach.url;
    return url.indexOf("png", url.length - "png".length) !== -1;
   }
   function attachIsImageJPG(msgAttach)
   {
    var url = msgAttach.url;
    return url.indexOf("jpg", url.length - "jpg".length) !== -1;
   }



  
  client.login(TOKEN);