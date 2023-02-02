import User from "../model/User.js"

//인증 처리 하는곳
let auth = (req, res, next) => {

    console.log("hello?")
    //1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    
    console.log("\r\n============================================================\r\n");
    console.log(User)
    console.log("\r\n============================================================");

    //2. 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err,user) =>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next()
    })

    //2-1. 유저가 있으면 Okay

    //2-2. 유저가 없으면 No
}

export default auth