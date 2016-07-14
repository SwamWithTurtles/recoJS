var queries = {
    
    //What nodes we should find - return node and score.
    //Use (*) to represent the node that will we want recommendations for
    discover: [
        "MATCH (*)--(:TVShow)--(:Genre)--(t:TVShow) RETURN t, 5 AS score",
        "MATCH (*)--(:TVShow)--(:Director)--(t:TVShow) RETURN t, 1 AS score"
    ],
    
    //Once we have matched nodes, then we can provide these additional scores
    //Use (*) to represent the node that we want recommendations for, and (?) to represent the discovered nodes
    score: [
        
    ],

    //A list of nodes that we should filter out
    //Use (*) to represent the node that we want recommendations for, and (?) to represent the discovered nodes
    filter: [
        "MATCH (*)--(t:TVShow) RETURN t"
    ]
    
};

export default queries;