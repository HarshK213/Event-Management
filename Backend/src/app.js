import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { upload } from './middleware/multer.middleware.js';

const app = express();
app.use(cors({
    // origin: '*', // Explicitly set your frontend URL
    origin: 'http://localhost:5173', // Explicitly set your frontend URL
    credentials: true
}));
app.use(express.json({limit : "15kb"}));
app.use(express.urlencoded({extended : true, limit : "15kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(upload.any());


//routes declaration and use
import Adminrouter from './routes/admin.route.js';
import Authrouter from './routes/auth.route.js';
import Coordinatorrouter from './routes/coordinator.route.js';
import Studnetrouter from './routes/student.route.js';

app.use("/api/v1/admin", Adminrouter);
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/coordinator",Coordinatorrouter);
app.use("/api/v1/student",Studnetrouter);

export default app;
