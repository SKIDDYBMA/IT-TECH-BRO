const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "🤍", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url:'https://files.catbox.moe/n40mdn.jpg' }, // Image URL from your request
            caption: `╭━━〔 *꧁༒☬ ℑ𝔗-𝔗𝔈ℭℌ-𝔅ℜ𝔒-𝔖 ☬༒꧂* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Here is the owner details*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 2.0.0 Beta
┃◈╰─┬──────────┈⊷
┃◈╭─┴────────────●●►

╰──────────────┈⊷
> 『 ⚡𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 ℑ𝔗-𝔗𝔈ℭℌ-𝔅ℜ𝔒-𝔖⚡ 』`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398106360290@newsletter',
                    newsletterName: '꧁༒☬ ℑ𝔗-𝔗𝔈ℭℌ-𝔅ℜ𝔒-𝔖☬༒꧂',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

        // Send audio as per your request
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/loftxmd23/Loft-base/raw/main/autovoice/Menunew.m4a' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
