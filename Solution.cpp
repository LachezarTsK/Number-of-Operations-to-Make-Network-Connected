
#include <numeric>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int IMPOSSIBLE_TO_CONNECT = -1;
    int disonnectedComputers;
    vector<int> parent;
    vector<int> rank;

public:
    int makeConnected(int totalNumberOfComputers, vector<vector<int>>&connections) {
        if (connections.size() < totalNumberOfComputers - 1) {
            return IMPOSSIBLE_TO_CONNECT;
        }

        disonnectedComputers = totalNumberOfComputers;
        rank.resize(totalNumberOfComputers);
        parent.resize(totalNumberOfComputers);
        iota(parent.begin(), parent.end(), 0);

        for (const auto& connection : connections) {
            unionFind(connection[0], connection[1]);
        }

        return disonnectedComputers - 1;

    }

private:
    void unionFind(int first, int second) {
        int parentFirst = findParent(first);
        int parentSecond = findParent(second);

        if (parentFirst != parentSecond) {
            joinByRank(parentFirst, parentSecond);
            disonnectedComputers--;
        }
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] < rank[second]) {
            parent[first] = second;
        } else if (rank[second] < rank[first]) {
            parent[second] = first;
        } else {
            parent[first] = second;
            rank[second]++;
        }
    }
};
