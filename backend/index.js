import express from "express";
import cors from "cors";
// const cors = require('cors');

import { router as rootRouter } from "./routes/index.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter);


app.listen(3000);
