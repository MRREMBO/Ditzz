const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

async function HentaiTv(query) {
 return new Promise((resolve, reject) => {
 axios.get("https://hentai.tv/?s=" + query).then(async ({ data }) => {
 let $ = cheerio.load(data)
 let results = []

 $('div.flex > div.crsl-slde').each(function (a, b) {
 let _thumb = $(b).find('img').attr('src')
 let _title = $(b).find('a').text().trim()
 let _views = $(b).find('p').text().trim()
 let _link = $(b).find('a').attr('href')
 let hasil = { creator: 'Ditzz', thumbnail: _thumb, title: _title, views: _views, url: _link }
 results.push(hasil)
 })
 resolve(results)
 }).catch(err => {
 console.log(err)
 })
 })
}
app.get('/hentaitv', async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.status(400).json({ error: 'search parameter is required' });
    }

    try {
        const results = await HentaiTv(search);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book data' });
    }
});
};
