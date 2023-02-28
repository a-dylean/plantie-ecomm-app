const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/api/users");
const loginRouter = require("./routes/auth/login");
const registerRouter = require("./routes/auth/register");
const ordersRouter = require("./routes/api/orders");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plantie Express API with Swagger",
      version: "0.1.0",
      description:
        "This is an CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs)
);

//middleware
// set up for reading ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

require("./passport"); // import Passport config

//session config
app.use(
  session({
    genid: (req) => {
      console.log("1. in genid req.sessionID: ", req.sessionID);
      return uuidv4();
    },
    // where we store the session data
    // session-file-store package defaults to ./sessions
    store: new FileStore(),
    secret: "a private key",
    resave: false,
    saveUninitialized: true,
    ameSite: "none",
    secure: true,
  })
);

//passport config
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log("get / req.sessionId; ", req.sessionID);
  res.send("get index route. /");
});

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
