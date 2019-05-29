const express = require('express');
const app = express();

app.get('/cards', function(req, res) {
  const { id } = req.query;

  return {
    description:
      'Friendly OpenSea Creature that enjoys long swims in the ocean.',
    external_url: `https://openseacreatures.io/${id}`,
    image:
      'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
    name: 'Dave Starbelly',
    attributes: []
  };
});

const port = process.env.PORT || 3000;
app.listen(port);
