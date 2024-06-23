const express = require("express");
const { authMiddleware } = require("../middleware");
const Router = express.Router();
const { Account } = require("../db");
const mongoose = require("mongoose"); // No need for destructuring here

Router.get('/balance', authMiddleware, async (req, res) => {
    const user = req.userId;
    const account = await Account.findOne({ userId: user });
    if (!account) {
        return res.status(403).json({
            msg: "Account doesn't exist"
        });
    }

    return res.status(200).json({
        msg: "Account Balance Fetched Successfully",
        data: {
            balance: account.balance
        }
    });
});

// for doing transaction you have to apply docker type things here
// : "Transaction numbers are only allowed on a replica set member or mongos"
// see chatgpt

// mongod --dbpath /path/to/your/db --replSet rs0
// mongo
// rs.initiate()

// 
// Router.post('/transfer', authMiddleware, async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { amount, to } = req.body;

//         const account = await Account.findOne({ userId: req.userId }).session(session);

//         if (!account || account.balance < amount) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(400).json({
//                 msg: "Insufficient Balance"
//             });
//         }

//         const toAccount = await Account.findOne({ userId: to }).session(session);
//         if (!toAccount) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(401).json({
//                 msg: "Invalid Account"
//             });
//         }

//         // Perform the operation
//         await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//         await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//         await session.commitTransaction();
//         session.endSession();

//         return res.status(200).json({
//             msg: "Transaction Complete"
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(500).json({
//             msg: "Transaction Failed",
//             error: error.message
//         });
//     }
// });

Router.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId });

        if (!account || account.balance < amount) {
            return res.status(400).json({
                msg: "Insufficient Balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to });
        if (!toAccount) {
            return res.status(401).json({
                msg: "Invalid Account"
            });
        }

        // Perform the operation
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

        return res.status(200).json({
            msg: "Transaction Complete"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Transaction Failed",
            error: error.message
        });
    }
});

module.exports = Router;
