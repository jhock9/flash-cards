const express = require("express");
const { dataFetch } = require("../utils/dataFetch");

const router = express.Router();

router.get("/api/dataFetch", async (req, res) => {
  try {
    const result = await dataFetch();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Data fetch failed" });
  }
});

module.exports = router;
