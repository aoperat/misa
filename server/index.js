
// Import libraries
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Import models
import User from './model/User.js';
import Account from './model/Account.js';

// Import middleware
import auth from './middleware/auth.js';

// Import configuration
import config from './config/dev.js';

// Set up express app
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose
.connect(config.mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!!')
})




app.post('/api/users/register', (req, res) => {

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });

})

//로그인 
app.post('/api/users/login', (req, res) => {
    //1. 요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //2. 요청된 이메일이 있는 경우, 비밀번호가 맞는지 체크.
        user.comparePassword(req.body.password, (err, isMatched) => {
            if (!isMatched) {
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            //3. 비밀번호 일치시 토큰 생성.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰 저장. 어디에? 쿠키, 로컬스토리지 중 쿠키

                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })

        })
    })
})


// role 
// 0이 아니면 관리자
// 0: 일반유저 
// 1: 어드민 
// 2: 특별 부서 

//auth 미들웨어
//미들웨어: 중간에서 어떤 동작을 수행한다. hook 과 어떻게 다른거?
app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
  })


app.get('/api/users/logout',auth,(req,res) =>{

    User.findOneAndUpdate({_id: req.user._id}, {
        token:""
    },(err,user) =>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({success:true});
    })
})



app.get('/api/hello', (req,res) =>{
    res.send("안녕하세요");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//account
app.post('/api/account/insert', (req, res) => {

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const account = new Account(req.body);
    account.save((err, accountInfo) => {
        console.log(err)
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });

})

app.post('/api/account/retrieve', (req, res) => {
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
  