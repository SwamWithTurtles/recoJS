import cypherRunner from "../../neo4j-access/neo4jRepo"
import recoQueries from "../../reco/config"

import replaceAnonymousNodes from "../cypherBuilder"
import mapResults from "./mapResults"
import flatten from "../../util/flatten"


var filterNodes = function (results, id, discoveredNodes, setPostProcessed) {
    var additionalScores = mapResults(results);

    var nodeObj = {};
    Object.keys(discoveredNodes).forEach(
        i => nodeObj[i] = (additionalScores[i] ? additionalScores[i] : 0) + discoveredNodes[i]
    );
    setPostProcessed(nodeObj);

    var queries = Object.keys(nodeObj).map(
        key => recoQueries.filter.map(query => replaceAnonymousNodes(query, id, key))
    );
    var allQueries = flatten(queries);

    return Promise.all(allQueries.map(query => cypherRunner(query)))
};

export default filterNodes;