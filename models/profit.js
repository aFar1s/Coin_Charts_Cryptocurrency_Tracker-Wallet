const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const profitSchema = Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    record: { type: array }
});

const Profit = model("Profit", profitSchema);

module.exports = Profit;