import * as functions from 'firebase-functions';
import { initializeApp, firestore } from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

initializeApp(functions.config().firebase);

const app = express();

app.use(cors({ origin: true }));

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const db = firestore();
  const ref = db.collection('cards').doc(id);
  try {
    const snapshot = await ref.get();
    if (!snapshot.exists) {
      res.status(404).send();
    } else {
      const data = snapshot.data();
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

exports.cards = functions.https.onRequest(app);
