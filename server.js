const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/arbitraje", (req, res) => {
  const monto = Number(req.query.monto) || 1000;

  const compra = 1447.56;
  const venta = 1454;

  const ganancia = (venta - compra) * monto;
  const porcentaje = ((venta - compra) / compra) * 100;

  res.json({
    oportunidades: [
      {
        ruta: "binance → okx",
        ganancia,
        porcentaje,
      },
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Ruta de prueba
app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    mensaje: "API funcionando correctamente"
  });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});