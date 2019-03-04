import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose, { Connection } from 'mongoose';
import MongoStore from 'connect-mongo';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares';

import './passport';

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
// Post로 넘어오는 form을 받기위해 사용 / req로 받음
// 미사용시 undefined 로 넘어옴
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    // mongoose 와 연결해줘야함
    store: new CookieStore({
        mongooseConnection: mongoose.connection,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());
// 로컬 변수를 글로벌 변수로 만들어줌
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.videos, videoRouter);

export default app;
