import express from "express";
import { middleware } from "./middleware.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    const t = Date.now();
    let k = 2 + 3;
    new Promise((resolve) => {
        setTimeout(() => {
            k += 22;
            resolve(k);
        }, 2000);
    }).then((result) => {
        res.status(200).json({
            result: result,
            msg: `this process took ${((Date.now() - t) / 1000).toFixed(3)} seconds`
        });
    });
});
app.get('/cpu', middleware, (req, res) => {
    let ans = 0;
    const t = Date.now();
    for (let i = 0; i < 5000000; i++) {
        ans += 100;
    }
    const end = Date.now();
    const total = (end - t) / 1000;
    res.status(200).json({ msg: `total time taken was ${total.toFixed(3)}s with status code is 200` });
    console.log(total.toFixed(3));
});
app.post("/sum", async (req, res) => {
    const data = req.body;
    res.status(200).json({ msg: `${data.name}, ${data.age}` });
});
app.listen(200, () => { console.log("server running here"); });
//# sourceMappingURL=index.js.map