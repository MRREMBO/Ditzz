module.exports = function(app) {

async function tnyim(url) {
        try {
            const response = await fetch(`https://tny.im/yourls-api.php?format=json&action=shorturl&url=${url}`);
            const result = await response.json();
            return result.shorturl;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
//Contoh Penggunaan
app.get('/tnyim', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await tnyim(text);
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



