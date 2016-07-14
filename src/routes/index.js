import express from "express"
import recommend from "../neo4j-access/reco"

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.json({
        href: {
            recommend: "/recommend/:id"
        }
    });
});

router.get('/recommend/:id', (req, res, next) => {
  recommend("MATCH (n) WHERE id(n) = " + req.params.id + " RETURN n", req.query.limit)
      .then(result => res.json(result))
      .catch(next)
});

export default router;
