"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("./utils/winston"));
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    const app = express_1.default();
    app.set('port', process.env.PORT || 3000);
    const host = '0.0.0.0';
    app.listen(app.get('port'), host, () => {
        winston_1.default.info('App is running at http://localhost:3000 in %s mode', app.get('port'), app.get('env'));
        winston_1.default.info('Press CTRL-C to stop!\n');
    });
});
startServer();
//# sourceMappingURL=app.js.map