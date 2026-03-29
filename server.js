const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    mensaje: "API funcionando correctamente"
  });
});
app.get("/arbitraje", (req, res) => {
  const binance = 65000;
  const bybit = 65200;

  const diferencia = bybit - binance;

  const comision = 0.001;
  const feeCompra = binance * comision;
  const feeVenta = bybit * comision;
  const transferencia = 10;

  const ganancia = diferencia - feeCompra - feeVenta - transferencia;

  res.json({
    binance,
    bybit,
    diferencia,
    ganancia,
    rentable: ganancia > 0
  });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});