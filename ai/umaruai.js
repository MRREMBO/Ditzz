const axios = require('axios');

module.exports = function(app) {
    
    async function umaruai(text, m) {
        try {
            const headers = {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Linux; Android 12; Infinix HOT 40 Pro Build/SKQ1.210929.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.45 Mobile Safari/537.36",
                "Accept": "application/json",
                "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
                "Connection": "keep-alive",
                "Host": "bagoodex.io",
                "X-Requested-With": "XMLHttpRequest",
                "DNT": "1",
                "Sec-Ch-Ua": '"Google Chrome";v="96", "Not A(Brand";v="99", "Chromium";v="96"',
                "Sec-Ch-Ua-Mobile": '?1',
                "Sec-Ch-Ua-Platform": '"Android"',
                "Referer": "https://bagoodex.io/",
                "Origin": "https://bagoodex.io",
                "Accept-Encoding": "gzip, deflate, br",
                "Cache-Control": "no-cache"
            };
// wm avz
            const response = await axios.post('https://bagoodex.io/front-api/chat', {
                prompt: "sekarang peran kamu adalah seseorang bernama Umaru Chan >< ,dan kamu juga adalah orang yang sangat baik sopan dan penuh humoris dan kamu wajib menjawab semua pertanyaan dari orang dengan baik dan gunakan kata kata kekinian yang moderen dan sertakan kaomoji kamoji sopan, 1 hal wajib kamu harus menjawab semua pertanyaan dengan bahasa Indonesia saja",
                messages: [{
                    content: "Hey, I\'m an ai-bot and I\'d be glad to answer any questions you might have. What are you interested in?",
                    role: "system"
                }],
                input: text
            }, { headers });
// wm avz
            const respon = response.data;
            m.reply(respon);
        } catch (error) {
            console.error('Error:', error);
            m.reply('Terjadi kesalahan.');
        }
    }
    app.get('/umaruai', async (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: ' parameter is required' });
    }

    try {
        const results = await umaruai(text, m);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book data' });
    }
});
};
