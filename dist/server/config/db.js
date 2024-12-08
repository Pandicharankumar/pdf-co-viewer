"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    mongoose_1.default.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log('Database connected successfully!');
    })
        .catch((error) => {
        if (error instanceof Error) {
            console.error(`MongoDB connection failed: ${error.message}`);
        }
        else {
            console.error('MongoDB connection failed with unknown error');
        }
    });
};
exports.connect = connect;
//# sourceMappingURL=db.js.map