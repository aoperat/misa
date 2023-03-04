
// import express from 'express';
// import User from '../models/User.js';
// import auth from '../middleware/auth.js';

// const router = express.Router();

// router.post('/api/users/register', (req, res) => {

//     //회원가입할 때 필요한 정보들을 client에서 가져오면
//     //그것들을 데이터 베이스에 넣어준다.
//     const user = new User(req.body);

//     user.save((err, userInfo) => {
//         if (err) return res.json({ success: false, err })
//         return res.status(200).json({
//             success: true
//         })
//     });
// })

// //로그인 
// router.post('/api/users/login', (req, res) => {
//     //1. 요청된 이메일을 데이터베이스에서 찾는다.
//     User.findOne({ email: req.body.email }, (err, user) => {
//         if (!user) {
//             return res.json({
//                 loginSuccess: false,
//                 message: "제공된 이메일에 해당하는 유저가 없습니다."
//             })
//         }
//         //2. 요청된 이메일이 있는 경우, 비밀번호가 맞는지 체크.
//         user.comparePassword(req.body.password, (err, isMatched) => {
//             if (!isMatched) {
//                 return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
//             }

//             //3. 비밀번호 일치시 토큰 생성.
//             user.generateToken((err, user) => {
//                 if (err) return res.status(400).send(err);

//                 // 토큰 저장. 어디에? 쿠키, 로컬스토리지 중 쿠키

//                 res.cookie("x_auth", user.token)
//                     .status(200)
//                     .json({ loginSuccess: true, userId: user._id })
//             })
//         })
//     })
// })

// // role 
// // 0이 아니면 관리자
// // 0: 일반유저 
// // 1: 어드민 
// // 2: 특별 부서 

// //auth 미들웨어
// //미들웨어: 중간에서 어떤 동작을 수행한다. hook 과 어떻게 다른거?
// router.get('/api/users/auth', auth, (req, res) => {
//     //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
//     res.status(200).json({
//         _id: req.user._id,
//         isAdmin: req.user.role === 0 ? false : true,
//         isAuth: true,
//         email: req.user.email,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         role: req.user.role,
//         image: req.user.image
//     })
// })

// router.get('/api/users/logout', auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id }, {
//         token: ""
//     }, (err, user) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).send({ success: true });
//     })
// })

// export default router;