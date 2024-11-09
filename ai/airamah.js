module.exports = function(app) {

const axios = require('axios');

async function fetchContent(content) {
    try {
        const response = await axios.post('https://luminai.my.id/', { content, cName: "latukam", cID: "latukam" });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.get('/airamah', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await fetchContent(text);
      res.status(200).json({
        status: 200,
        creator: "Ditzz",
        data: response
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};