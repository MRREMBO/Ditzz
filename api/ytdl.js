module.exports = function(app) {

async function ytdl(url) {
    const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'api_key': 'free',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: url
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

app.get('/ytdl', async (req, res) => {
      try {
        const { text } = req.query;
        if (!text) {
          return res.status(400).json({ error: 'Parameter "url" tidak ditemukan.' });
        }
        const response = await ytdl(text);
             res.status(200).json({
          status: true,
          creator: "Ditzz",
          result: response,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  };
    
