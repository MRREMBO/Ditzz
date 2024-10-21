const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

async function animeNews() {
  try {
    const { data: memek } = await axios.get('https://www.animenewsnetwork.com/news/');
    const tobrut = cheerio.load(memek);
    const anjay = tobrut('.mainfeed-section .herald.box.news.t-news');

    const pukimak = [];
    const babiq = {
      name: "Zaenishi",
      website: "https://zaenishi.xyz"
    };

    pukimak.push({ creator: babiq, totalBerita: anjay.length });

    anjay.each((index, element) => {
      const bajingan = tobrut(element).find('h3 a').text().trim();
      const titid = tobrut(element).find('time').attr('datetime');
      const titid2 = new Date(titid).toISOString().split('T')[0];
      const cekerbabat = tobrut(element).find('.snippet .hook').text().trim();
      const puki = 'https://www.animenewsnetwork.com' + tobrut(element).find('h3 a').attr('href');
      const kontol = tobrut(element).find('.byline .topics a').map((i, el) => tobrut(el).text().trim()).get();
      
      pukimak.push({
        judul: bajingan,
        tanggal: titid2,
        cuplikan: cekerbabat,
        link: puki,
        topik: kontol
      });
    });

    return pukimak;
    
  } catch (error) {
    return { creator: "Ditzz", message: "Error" };
    console.log(error)
  }
}
app.get('/animenews', async (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'search parameter is required' });
    }

    try {
        const results = await animeNews();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book data' });
    }
});
};
