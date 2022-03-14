
/**
 * @param {number} totalNumberOfComputers
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (totalNumberOfComputers, connections) {

    const IMPOSSIBLE_TO_CONNECT = -1;
    if (connections.length < totalNumberOfComputers - 1) {
        return IMPOSSIBLE_TO_CONNECT;
    }

    this.disonnectedComputers = totalNumberOfComputers;
    this.rank = new Array(totalNumberOfComputers).fill(0);
    this.parent = new Array(totalNumberOfComputers).fill().map((_, intFromZero) => intFromZero++);
    for (const connection of connections) {
        unionFind(connection[0], connection[1]);
    }

    return this.disonnectedComputers - 1;
};

/**
 * @param {number} first
 * @param {number} second
 */
function unionFind(first, second) {
    let parentFirst = findParent(first);
    let parentSecond = findParent(second);

    if (parentFirst !== parentSecond) {
        joinByRank(parentFirst, parentSecond);
        this.disonnectedComputers--;
    }
}

/**
 * @param {number} index
 */
function findParent(index) {
    if (this.parent[index] !== index) {
        this.parent[index] = findParent(this.parent[index]);
    }
    return this.parent[index];
}

/**
 * @param {number} first
 * @param {number} second
 */
function joinByRank(first, second) {
    if (this.rank[first] < this.rank[second]) {
        this.parent[first] = second;
    } else if (this.rank[second] < this.rank[first]) {
        this.parent[second] = first;
    } else {
        this.parent[first] = second;
        this.rank[second]++;
    }
}
