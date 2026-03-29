const express = require("express");
const axios = require("axios");
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
app.get("/arbitraje", async (req, res) => {
  try {
    const binanceRes = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );

    const bybitRes = await axios.get(
      "https://api.bybit.com/v2/public/tickers?symbol=BTCUSDT"
    );

    const binance = parseFloat(binanceRes.data.price);
    const bybit = parseFloat(bybitRes.data.result[0].last_price);

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

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo precios" });
  }
});

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