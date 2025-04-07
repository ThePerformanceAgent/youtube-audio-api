const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/convert', (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) return res.status(400).send('Faltou o videoId');

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const fileName = `audio_${videoId}.mp3`;

  const command = `yt-dlp -x --audio-format mp3 -o ${fileName} ${url}`;

 exec(command, (err, stdout, stderr) => {
  console.log("STDOUT:", stdout);
  console.log("STDERR:", stderr);

  if (err) {
    console.error("Erro real:", err);
    return res.status(500).send('Erro na conversão');
  }
    const filePath = path.join(__dirname, fileName);
    res.download(filePath, () => {
      fs.unlinkSync(filePath); // limpa depois do envio
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor a correr em http://localhost:${port}`);
});
