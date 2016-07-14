import * as neo4j from "neo4j-driver"

var driver = neo4j.v1.driver("bolt://localhost");
var session = driver.session();

var runCypher = function (cypher) {

    return new Promise(function (resolve, reject) {
        session
            .run(cypher)
            .then(resolve)
            .catch(reject)
    });
};

export default runCypher;