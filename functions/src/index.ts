import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

initializeApp(functions.config().firebase);

const app = express();

app.use(cors({ origin: true }));

app.get('/:id', async (req, res) => {

  const { id } = req.params;

  res.send({
    "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo", 
    "external_url": `https://gameofblocks.io/cards/${id}`, 
    "image": "https://firebasestorage.googleapis.com/v0/b/gameofblocks-staging.appspot.com/o/card0.png?alt=media&token=90764550-7ffe-4736-8aa0-542087e0a59a", 
    "name": "Ser Davos",
    "attributes": [], 
  })
  
  // const db = firestore();
  // const ref = db.collection('cards').doc(id);
  // try {
  //   const snapshot = await ref.get();
  //   if (!snapshot.exists) {
  //     res.status(404).send();
  //   } else {
  //     const data = snapshot.data();
  //     res.status(200).send(data);
  //   }
  // } catch (err) {
  //   res.status(500).send(err.message);
  // }
});

exports.cards = functions.https.onRequest(app);
