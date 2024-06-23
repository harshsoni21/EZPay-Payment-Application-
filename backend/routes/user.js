const express = require("express");
const Router = express.Router();
const zod = require("zod");
const {User} = require("../db"); // Ensure this is the correct path
const {Account} = require("../db"); // Ensure this is the correct path
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config"); // Ensure this is the correct path
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
    email: zod.string().email(),
    lastname: zod.string(),
    firstname: zod.string(),
    password: zod.string()
});

Router.post('/signup', async (req, res) => {
    const body = req.body;
    const parseResult = signupSchema.safeParse(body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
        });
    }

    const existingUser = await User.findOne({
        email: body.email,
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken"
        });
    }

    const newUser = new User(body);
    await newUser.save();

    const account = await Account.create({
        userId: newUser._id,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId: newUser._id
    }, "harsh");

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

Router.post('/signin', async (req, res) => {
    const parseResult = signinSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, "harsh");

        return res.json({
            token: token
        });
    }

    res.status(401).json({
        message: "Invalid email or password"
    });
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

Router.put('/', authMiddleware, async (req, res) => {
    const parseResult = updateSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid inputs"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    });
});

Router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstname: { "$regex": filter, "$options": "i" } },
            { lastname: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});

// Logout if need in future
// Router.post("/logout",authMiddleware,(req,res)=>{

// })

module.exports = Router;
