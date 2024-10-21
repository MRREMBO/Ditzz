const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

async function videy(url) {

	return new Promise(async (resolve, reject) => {

		try {

			const res = await axios(`${url}`, { method: 'get' });

			const $ = cheerio.load(res.data);

			const video = $('source[type="video/mp4"]').attr('src');

			if (video) {

				resolve(video);

			} else {

				throw new Error('Video source not found');

			}

		} catch (error) {

			reject(`Error while fetching the URL: ${error.message}`);

h		}

	});

}

app.get('/videydl', async (req, res) => {
      try {
        const { text } = req.query;
        if (!text) {
          return res.status(400).json({ error: 'Parameter "text" tidak ditemukan.' });
        }
        const response = await videy(text);
        res.status(200).json({
          status: 200,
          creator: "Ditzz",
          data: response,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  };
  