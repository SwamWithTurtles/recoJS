import cypherRunner from "../../neo4j-access/neo4jRepo"
import flatten from "../../util/flatten"
import getNodeId from "../../util/getNodeId"

var aggregateScores = function (results, postProcessed) {
    var filteredNodes = mapResultsAsObjectWithoutScore(results);

    var queries = Object.keys(postProcessed)
        .filter(key => filteredNodes.indexOf(parseInt(key, 10)) < 0)
        .map(key =>
            "MATCH (t) WHERE id(t) = " + key + " RETURN (t)"
        );

    return Promise.all(queries.map(query => cypherRunner(query)))
};

var mapResultsAsObjectWithoutScore = function (results) {
    var nodes = results.map(
        result => result.records.map(getNodeId)
    );

    return flatten(nodes);
};

export default aggregateScores;