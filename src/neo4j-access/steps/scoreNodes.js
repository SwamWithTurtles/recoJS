import cypherRunner from "../../neo4j-access/neo4jRepo"
import recoQueries from "../../reco/config"
import replaceAnonymousNodes from "../cypherBuilder"
import flatten from "../../util/flatten"
import mapResults from "./mapResults"

var scoreNodes = function (results, id, _setDiscoveredNodes) {
    var discoveredNodes = mapResults(results);
    _setDiscoveredNodes(discoveredNodes);

    var queries = Object.keys(discoveredNodes).map(
        key => recoQueries.score.map(query => replaceAnonymousNodes(query, id, key))
    );

    var allQueries = flatten(queries);

    return Promise.all(allQueries.map(query => cypherRunner(query)))
};



export default scoreNodes;  