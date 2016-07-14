import replaceAll from "../util/replaceAll"

function replaceAnonymousNodes(originalQuery, id, id2) {
    var matchNodeToRecommend = "MATCH (_nodeToRecommend) WHERE id(_nodeToRecommend) = " + id + " ";
    originalQuery = replaceAll(originalQuery, "(*)", "(_nodeToRecommend)");
    
    var matchNodeToScore = id2 ? "MATCH (_nodeToScore) WHERE id(_nodeToScore) = " + id2 + " " : "";
    originalQuery = id2 ? replaceAll(originalQuery, "(?)", "(_nodeToScore)") : originalQuery;
    
    return matchNodeToRecommend + matchNodeToScore + originalQuery;
}

export default replaceAnonymousNodes;