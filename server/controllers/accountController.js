import express from 'express';
import Account from '../models/Account.js';

const router = express.Router();

// Account 모델을 import 합니다.
// POST /api/account/insert
router.post('/insert', (req, res) => {

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const account = new Account(req.body);
    account.save((err, accountInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });

})

// POST /api/account/retrieve
router.post('/retrieve', (req, res) => {
    const { userId, searchContent, searchCategory, searchPaymentMethod } = req.body;

    const query = { userId };

    if (searchContent) {
        query.description = { $regex: searchContent, $options: 'i' };
    }

    if (searchCategory) {
        query.category = searchCategory;
    }

    if (searchPaymentMethod) {
        query.paymentMethod = searchPaymentMethod;
    }

    // Retrieve records from the database
    Account.find(query, (err, accounts) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Database error' });
        }

        // Create an object to store monthly expenses and incomes
        const monthlyTotal = {};

        // Iterate through each record and calculate the monthly expenses and incomes
        accounts.forEach((account) => {
            const date = new Date(account.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const key = `${year}-${month.toString().padStart(2, '0')}`;

            if (!monthlyTotal[key]) {
                monthlyTotal[key] = { expenses: 0, incomes: 0 };
            }

            const amount = parseInt(account.amount);

            if (amount > 0) {
                monthlyTotal[key].incomes += Math.abs(amount);
            } else {
                monthlyTotal[key].expenses += amount;
            }
        });

        // Return the result
        return res.status(200).send({ success: true, accounts, monthlyTotal });
    });
});


// POST /api/account/update/:id
router.put('/update', (req, res) => {
    const id = req.body;
    Account.findByIdAndUpdate(id, req.body, { new: true }, (err, account) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Database error' });
        }

        return res.status(200).send({ success: true, account });
    });
});

// // Update card
// router.put('/update', (req, res) => {
//     const updatedCard = req.body;
//     Card.findByIdAndUpdate(updatedCard._id, updatedCard, { new: true }, (err, updatedCard) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send({ success: false, message: 'Database error' });
//       }
  
//       return res.status(200).send({ success: true, updatedCard });
//     });
//   });

  

// POST /api/account/delete/:id
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    console.log("delete",id)
    Account.findByIdAndDelete(id, (err, account) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Database error' });
        }

        return res.status(200).send({ success: true, account });
    });
});


export default router;
