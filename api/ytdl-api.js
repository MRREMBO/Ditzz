const FormData = require('form-data');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {
 
async function ytdl2(query) {
 const form = new FormData();
 form.append('query', query);

 try {
 const response = await axios.post('https://yttomp4.pro/', form, {
 headers: {
 ...form.getHeaders()
 }
 });

 const $ = cheerio.load(response.data);

 const results = {
 success: true,
 title: $('.vtitle').text().trim(),
 duration: $('.res_left p').text().replace('Duration: ', '').trim(),
 image: $('.ac img').attr('src'),
 video: [],
 audio: [],
 other: []
 };
 
 $('.tab-item-data').each((index, tab) => {
 const tabTitle = $(tab).attr('id');
 $(tab).find('tbody tr').each((i, element) => {
 const fileType = $(element).find('td').eq(0).text().trim();
 const fileSize = $(element).find('td').eq(1).text().trim();
 const downloadLink = $(element).find('a.dbtn').attr('href');

 if (tabTitle === 'tab-item-1') {
 results.video.push({
 fileType,
 fileSize,
 downloadLink
 });
 } else if (tabTitle === 'tab-item-2') {
 results.audio.push({
 fileType,
 fileSize,
 downloadLink
 });
 } else if (tabTitle === 'tab-item-3') {
 results.other.push({
 fileType,
 fileSize,
 downloadLink
 });
 }
 });
 });
 
 return results;
 } catch (error) {
 return { success: false, message: error.message };
 console.log('Error:' + error);
 }
}
app.get('/ytdl2', async (req, res) => {
      try {
        const { url } = req.query;
        if (!url) {
          return res.status(400).json({ error: 'Parameter "url" tidak ditemukan.' });
        }
        const response = await ytdl2(url);
             res.status(200).json({
          status: true,
          creator: "Ditzz",
          data: response,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  };
    
