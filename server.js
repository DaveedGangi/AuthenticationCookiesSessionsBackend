require("dotenv").config();
const express=require("express");
const cors=require("cors");
const bcrypt=require("bcrypt");
const sqlite3=require("sqlite3");

const session=require("express-session");
const SQLiteStore=require("connect-sqlite3")(session);

const app=express();

app.use(express.json());
app.use(cors({
  origin:"https://authenticationsessioncookiesdaveed.netlify.app",
  credentials:true
}));

app.set("trust proxy", 1);

// Sessions 

app.use(session({
  name:"sid",
  store:new SQLiteStore({db:"sessions.sqlite"}),
  secret:process.env.secret_key,
  resave:false,
  saveUninitialized:false,
  cookie:{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge:1000*60*60,
  }

}));


// database setup 
const db=new sqlite3.Database("./auth.db");

// creating a table for users
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE,password TEXT)");

// register users new user
app.post("/register",(req,res)=>{
 const{email,password}=req.body 
 if(!email || !password) return res.status(400).json({message:"Invalid password or email"})

  // check user exists
db.get("SELECT * FROM users WHERE email=?",[email],async(err,row)=>{
      if(row){
        return res.status(400).json({message:"User alleady exists"})
      }

      // if not exists store id db 
const hasedPassword=await bcrypt.hash(password,10);
db.run("INSERT INTO users(email,password) values(?,?)",[email,hasedPassword],(err)=>{
  if(err){
    return res.status(500).json({message:"Error while inserting data into db"});
  }
  res.status(200).json({message:"User registered successfully"});

}
)

 })

})



 // for login the users 
 app.post("/login",(req,res)=>{
  const {email,password}=req.body 
   
  // check if they exists or not in db to create a sessions 
  db.get("SELECT * FROM users WHERE email=?",[email],async(err,user)=>{
    if(err) return res.status(500).json({message:"Database error"});
    if(!user) return res.status(404).json({message:"User not found"});

    // if present then check password with hassed password by using bcrypt 
    const checking=await bcrypt.compare(password,user.password);
    if(checking){
      req.session.user={id:user.id,email:user.email}
      return res.status(200).json({message:"Successfully logged in"});
    }
    else{
      return res.status(400).json({message:"Invalid password"});
    }

  })

 })



// for logout , it does destory the session from db and clear cookie from browser

app.post("/logout",(req,res)=>{
  if(!req.session){
    return res.json({message:"No session to destroy"});
  }

 req.session.destroy(()=>{
  res.clearCookie("connect.sid"); // delete cookie from browser
  res.status(200).json({message:"Logged out successfully"});

 })
  
})

// dashobard check 
app.get("/dashboard",(req,res)=>{

  if(req.session.user){
    return res.status(200).json({message:`Welcome ${req.session.user.email}`});
  }
  else{
    return res.status(401).json({message:"Unauthorized"});
  }
})

app.get("/me", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ user: req.session.user });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
});



// start the server 

app.listen(process.env.PORT,()=> { console.log(`Server is running on ${process.env.PORT}`)} );



