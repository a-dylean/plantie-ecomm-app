import express, { urlencoded } from 'express';
// import { usersRouter } from './features/users/routes';
// import { productsRouter } from './features/products/routes';
// import { ordersRouter } from './features/orders/routes';
// import { loginRouter } from './features/auth/routes/login-routes';
// import { registerRouter } from './features/auth/routes/register-routes';
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import passport from 'passport';
import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../build/swagger.json";
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

RegisterRoutes(app);
//app.use('/products', productsRouter);
//app.use('/users', usersRouter);
//app.use('/orders', ordersRouter);
//app.use('/login', loginRouter);
//app.use('/register', registerRouter);

app.use(["/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});