"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const PORT = 5001;
app.use((0, body_parser_1.json)());
(0, db_1.connect)();
app.get('/', (req, res) => {
    res.send('Welcome to Wist Weal!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map