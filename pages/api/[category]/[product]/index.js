// import React from "react";
import data from "../../../../src/data.json";

function productHandler(req, res) {
  res.status(200).json(data.details[req.query.product]);
}

export default productHandler;
