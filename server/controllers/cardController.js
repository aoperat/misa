import express from 'express';
import Card from '../models/Card.js';

const router = express.Router();

// Add card
router.post('/insert', (req, res) => {
  const card = new Card(req.body);
  console.log(card)
  card.save((err, cardInfo) => {
    console.log(err)
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  });
})

// Retrieve cards
router.post('/retrieve', (req, res) => {
  const { userId } = req.body;

  const query = { userId };

  Card.find(query, (err, cards) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Database error' });
    }

    return res.status(200).send({ success: true, cards });
  });
});

// Update card
router.put('/update', (req, res) => {
  const updatedCard = req.body;
  Card.findByIdAndUpdate(updatedCard._id, updatedCard, { new: true }, (err, updatedCard) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ success: false, message: 'Database error' });
    }

    return res.status(200).send({ success: true, updatedCard });
  });
});

// Delete card
router.delete('/delete/:cardId', (req, res) => {
    
  const { cardId } = req.params;
  console.log(cardId,"cardId")
  Card.findByIdAndDelete(cardId, (err, deletedCard) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ success: false, message: 'Database error' });
    }

    return res.status(200).send({ success: true, deletedCard });
  });
});

export default router;
