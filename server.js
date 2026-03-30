const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Ruta test
app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

// Ruta arbitraje
app.get("/arbitraje", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );

    const precio = parseFloat(response.data.price);

    const binance = precio;
    const bybit = precio + (Math.random() * 100 - 50);

    const diferencia = bybit - binance;

    const comision = 0.001;
    const feeCompra = binance * comision;
    const feeVenta = bybit * comision;
    const transferencia = 10;

    const ganancia =
      diferencia - feeCompra - feeVenta - transferencia;

res.json({
  binance,
  bybit,
  diferencia,
  ganancia,
  rentable: ganancia > 0,
  timestamp: Date.now(),
  randomTest: Math.random()
});

  } catch (error) {
  console.error("ERROR COMPLETO:", error);

  res.status(500).json({
    error: "Error obteniendo datos",
    detalle: error.message,
    data: error.response?.data || null
  });
}
});

// ⚠️ ESTO ES CLAVE (no borrar)
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});