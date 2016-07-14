import cypherRunner from "../../neo4j-access/neo4jRepo"
import recoQueries from "../../reco/config"
import getNodeId from "../../util/getNodeId"
import replaceAnonymousNodes from "../cypherBuilder"

var discoverNodes = function (result, _setId) {
    if (result.records.length !== 1) {
        throw "Need single node for recommendations";
    }

    var id = getNodeId(result.records[0]);
    _setId(id);

    return Promise.all(recoQueries.discover.map(query =>
        cypherRunner(replaceAnonymousNodes(query, id))
    ))
};

export default discoverNodes;