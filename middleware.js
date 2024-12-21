import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const middlewares = jsonServer.defaults();
server.use(middlewares);

const router = jsonServer.router("db.json");

const SECRET_KEY = "your_secret_key";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ email, password }) {
  return userdb.users.find(
    (user) => user.email === email && user.password === password
  );
}

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = isAuthenticated({ email, password });
  if (!user) {
    const status = 401;
    const message = "Email atau Password salah";
    res.status(status).json({ status, message });
    return;
  }
  const { id, role, name } = user;
  const token = createToken({ id, role, name });
  res.status(200).json({ token });
});

// const { v4: uuidv4 } = require("uuid");

function generateUniqueId() {
  // Anda bisa menggunakan library seperti uuid untuk generate unique ID
  // Contoh dengan uuid:
  return uuidv4();
}

server.post("http://localhost:3002/queues", (req, res) => {
  try {
    const { polyclinicId, date, currentQueue } = req.body;

    // 1. Baca data dari db.json
    const db = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

    // 2. Cari antrian yang sudah ada

    let queue = db.queues.find(
      (q) => q.polyclinicId === polyclinicId && q.date === date
    );

    if (queue) {
      // Update antrian yang sudah ada
      queue.currentQueue = currentQueue;
    } else {
      // Buat antrian baru
      queue = {
        id: generateUniqueId(),
        polyclinicId: polyclinicId,
        date: date,
        currentQueue: currentQueue,
      };
      db.queues.push(queue);
    }

    // 3. Tulis data kembali ke db.json
    fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
    console.log("Data queues berhasil diupdate:", db.currentQueue)

    res.status(201).json(queue);
  } catch (error) {
    console.error("Error creating queue:", error);
    res.status(500).json({ error: "Gagal membuat antrian" });
  }
});

server.use(router);
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
