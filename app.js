const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const server = require("http").createServer(app);
const router = express.Router();
env.config();

app.use("/uploads", express.static("uploads"));

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const authRoutes = require("./routes/auth");
const socketRouter = require("./routes/socketRouter")(io);
const messageRoutes = require("./routes/message");
const uploadRoutes = require("./routes/uploads")

mongoose
  .connect(
    `mongodb+srv://alif:alif2142@cluster0.xylmd1k.mongodb.net/whatsapp?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/api", authRoutes);
app.use("/api", socketRouter);
app.use("/api", messageRoutes);
app.use("/api", uploadRoutes);

io.on("connection", (socket) => {
  console.log(`ID: ${socket.id}`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${ process.env.PORT }`);
});

module.exports = router;
