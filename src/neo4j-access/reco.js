import cypherRunner from "../neo4j-access/neo4jRepo"

import discoverNodes from "./steps/discoverNodes"
import scoreNodes from "./steps/scoreNodes"
import filterNodes from "./steps/filterNodes"
import aggregateScores from "./steps/aggregateScores"

import getNodeId from "../util/getNodeId"

var node = function (nodeFinder, limit) {
    limit = limit ? limit : 0;
    return new Promise(function (resolve, reject) {
        var id;
        var discoveredNodes;
        var postProcessed;

        var setId = _id => id = _id;
        var setDiscoveredNodes = _nodes => discoveredNodes = _nodes;
        var setPostProcessed = _postProcessed => postProcessed = _postProcessed;

        var formatResult = result => {
            var node = result.records[0];
            var id = getNodeId(node);
            return {node: node._fields[0], score: postProcessed[id]}
        };

        cypherRunner(nodeFinder)
            .then((results) => discoverNodes(results, setId))
            .then((results) => scoreNodes(results, id, setDiscoveredNodes))
            .then((results) => filterNodes(results, id, discoveredNodes, setPostProcessed))
            .then((results) => aggregateScores(results, postProcessed))
            .then(function (results) {
                var recommendations = results.map(formatResult).sort(a => a.score);
                if(limit) {recommendations = recommendations.slice(0, limit);}
                resolve(recommendations);
            })
            .catch(reject);
        }
    )
};

export default node;