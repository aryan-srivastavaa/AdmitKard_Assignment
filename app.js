const express = require('express')
express.urlencoded();
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));





app.use(express.static('public'));
app.use(express.static('./'));
  app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/verification.html');
})
  
app.post('/otppage', (req, res) => {
    let mobileNumber = req.body.mobile;
    const len = mobileNumber.length;
    console.log('Mobile Number submitted:', mobileNumber);
    if(len!==10) res.send("Go back and Enter 10 digits Mobile Number ")
    else{
        res.sendFile(__dirname + '/otp.html');
    }
    
    
});
const OTP = Math.floor(Math.random()*10000);
console.log("generated otp is:",OTP);
app.post('/match',(req,res)=>{
    const a= req.body.a;
    const b =req.body.b;
    const c = req.body.c;
    const d = req.body.d;
    
    const num = (a*1000)+(b*100)+(c*10)+(d*1);
    
    if(num === OTP) res.sendFile(__dirname + '/success.html');
    else res.send('Wrong OTP Entered! Go back and try again');

})


  app.listen(4000,()=>{
    console.log("App is running on Port 4000");
  })