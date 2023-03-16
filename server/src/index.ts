import express from 'express';
import { usersRouter } from './features/users/routes';
import { productsRouter } from './features/products/routes';
import { ordersRouter } from './features/orders/routes';
import { loginRouter } from './features/auth/routes/login';
import { registerRouter } from './features/auth/routes/register';
import cors from "cors";
import passport from 'passport';
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:4001", credentials: true }))
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello')
});


app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});