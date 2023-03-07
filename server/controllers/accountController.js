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

    // 쿼리를 통해 지출내역을 가져옴
    Account.find(query, (err, accounts) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Database error' });
        }

        // 월별 지출내역을 저장할 객체를 생성
        const monthlyTotal = {};

        // 각각의 지출내역을 순회하면서 월별 합계를 계산
        accounts.forEach((account) => {
            const date = new Date(account.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const key = `${year}-${month.toString().padStart(2, '0')}`;

            if (!monthlyTotal[key]) {
                monthlyTotal[key] = 0;
            }

            monthlyTotal[key] += parseInt(account.amount);
        });

        // 결과를 반환
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
