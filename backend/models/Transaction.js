const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Expense', 'Income', 'Transfer', 'Atm Withdrawal', 'Cash Received', 'Cashback', 'Refund'],
        required: true
    },
    account: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    recurring: {
        type: Boolean,
        default: false
    },
    note: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
