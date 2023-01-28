import data from "../../../src/data.json";

/**
 * uncomment to render correct category page data
 * **/

async function categoryHandler(req, res) {
  res.status(200).json(data.category[req.query.category]);
}

export default categoryHandler;

/**
 * uncomment to render correct category page data
 * **/
