import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("✅ Node + Rust 后台运行中");
});

app.post("/", (req, res) => {
  console.log("POST /");
  res.send({
    message: "✅ Node + Rust 后台运行中",
    code: 200,
    data: null,
  });
});

app.put("/", (req, res) => {
  console.log(req.body);
  console.log("PUT /");
  res.send({
    message: "✅ Node + Rust 后台运行中",
    code: 200,
    data: null,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`🚀 服务已启动: http://localhost:${port}`);
});
