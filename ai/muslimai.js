module.exports = function(app) {
    const axios = require('axios');

const headers = {
  'authority': 'www.muslimai.io',
  'content-type': 'application/json',
  'user-agent': 'Postify/1.0.0'
};

const muslimai = {
    async function(query) {
    try {
      const cari = await axios.post('https://www.muslimai.io/api/search', { query }, { headers });
      const passages = cari.data.map(result => result.content).join("\\n\\n");

      const jawaban = await axios.post('https://www.muslimai.io/api/answer', {
        prompt: `Use the following passages to answer the query to the best of your ability as a world class expert in the Quran. Do not mention that you were provided any passages in your answer in Indonesian: ${query} \\n\\n${passages}`
      }, { headers });

    }
        return chatResponse.data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  
     app.get('/muslimai', async (req, res) => {
      try {
        const { text } = req.query;
        if (!text) {
          return res.status(400).json({ error: 'Parameter "text" tidak ditemukan.' });
        }
        const response = await muslimai(text);
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
  
