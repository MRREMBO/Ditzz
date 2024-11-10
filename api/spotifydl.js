module.exports = function(app) {
const axios = require('axios');

async function getToken() {
  try {
    const token = await axios.post("https://api.ssspotify.buzz/v1/token");
    return token.data;
  } catch (error) {
    return { status: false, message: error.message }
    console.error("Error:", error);
  }
}

async function spotifydl(url) {
  try {
    const tokenAccess = await getToken()
    const { data } = await axios.post("https://api.ssspotify.buzz/v1/ajax", {
      q: url
    }, 
    {
      headers: {
        "Authorization": `Bearer ${tokenAccess.token}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "X-Api-Token": "d1dbb92e043abb9e6d00b11e8e013b5bbdc6c445be0ca2908b7ab8f196079e68YOBXfRKeW2yKTyFSYi5qGEIDWI3APOWn3tZOViPSwLcGBvqGReHVwFUDrNswB5Qkb7/CO43C2OhMNyIckDlZ7dBj0sys35hiG6300JYk5og="
      }
    })
    let result = {
      status: data.status,
      title: data.data.title,
      thumbnail: data.data.thumbnail,
      duration: data.data.duration,
      priview: data.data.preview,
      media: data.data.url,
      artist: {
        name: data.data.artist.name,
        url: data.data.artist.external_urls.spotify,
        id: data.data.artist.id,
      },
    }
    return result;
  } catch (error) {
    return { status: false, message: error.message }
    console.error("Error:", error);
  }
}
app.get('/spotifydl', async (req, res) => {
      try {
        const { text } = req.query;
        if (!text) {
          return res.status(400).json({ error: 'Parameter "url" tidak ditemukan.' });
        }
        const response = await spotifydl(data);
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
