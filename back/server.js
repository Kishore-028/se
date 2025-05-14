import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express();
const PORT =5000;
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

mongoose.connect("mongodb://localhost:27017/trail")
.then(() => console.log("connecgted successfully"))
.catch( err => console.log("error",err))

const useSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
})

const User= mongoose.model("User",useSchema,"users")



app.post("/register" , async(req,res) =>{
    try{
        const { name ,email, password} =req.body;
        const user = new User({name ,email, password});
        const result =await user.save();

        console.log("user",result)
        res.status(201).json({message:"user register successful"})

    }
    catch (err) {
        console.error("Registeration error",err);
        res.status(500).json({message:"Registeration fail"})
    }
})

const trySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const TryModel = mongoose.model('Try', trySchema,"try");

// Route to handle form submission
app.post('/try', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const newEntry = new TryModel({ name });
        await newEntry.save();
        res.status(200).json({ message: `Hello, ${name}! Your name was saved.` });
    } catch (err) {
        console.error('Error saving to MongoDB:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // fetch only name and email
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});



app.listen(PORT, () => {
    console.log("server is running in port 5000");
});
