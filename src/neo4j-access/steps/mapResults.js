import getNodeId from "../../util/getNodeId"

var mapResultsAsObject = function (results) {
    var nodes = {};

    results.forEach(result => {
        result.records.forEach(record => {
            var recordId = getNodeId(record);
            var score = record._fields[1].low;

            nodes[recordId] = nodes[recordId] ? nodes[recordId] + score : score;
        });
    });

    return nodes;
};

export default mapResultsAsObject;