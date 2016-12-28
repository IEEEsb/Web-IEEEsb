const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const itemSchema = new Schema({
    code: { type: String, default: "", index: { unique: true, dropDups: true } },
    name: { type: String, default: "", index: { unique: true, dropDups: true } },
    location: {
        main: { type: String, default: "" },
        sub: { type: String, default: "" }
    },
    goodState: { type: Boolean, default: true },
    consumable: { type: Boolean, default: false },
    buyPrice: { type: Number, default: 0.00 },
    sellPrice: { type: Number, default: 0.00 },
    quantity: { type: Number, default: 0 },
    icon: { type: String, default: "" },
    files: [{
        name: { type: String, default: "" },
        url: { type: String, default: "" }
    }]
});

mongoose.model('ItemModel', itemSchema);