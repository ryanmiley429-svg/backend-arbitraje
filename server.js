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

// Ruta arbitraje con datos reales
app.get("/arbitraje", async (req, res) => {
  try {
    const binanceRes = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );

    const precioBase = parseFloat(binanceRes.data.price);

    // Simulación de segundo exchange
    const binance = precioBase;
    const bybit = precioBase + (Math.random() * 100 - 50);

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
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Error obteniendo precio de Binance",
    });
  }
});