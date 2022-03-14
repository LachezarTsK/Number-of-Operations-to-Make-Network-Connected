
import java.util.Arrays;

public class Solution {

    private static final int IMPOSSIBLE_TO_CONNECT = -1;
    private int disonnectedComputers;
    private int[] parent;
    private int[] rank;

    public int makeConnected(int totalNumberOfComputers, int[][] connections) {
        if (connections.length < totalNumberOfComputers - 1) {
            return IMPOSSIBLE_TO_CONNECT;
        }

        disonnectedComputers = totalNumberOfComputers;
        rank = new int[totalNumberOfComputers];
        parent = new int[totalNumberOfComputers];
        Arrays.setAll(parent, intFromZero -> intFromZero++);

        for (final int[] connection : connections) {
            unionFind(connection[0], connection[1]);
        }

        return disonnectedComputers - 1;
    }

    private void unionFind(int first, int second) {
        int parentFirst = findParent(first);
        int parentSecond = findParent(second);

        if (parentFirst != parentSecond) {
            joinByRank(parentFirst, parentSecond);
            disonnectedComputers--;
        }
    }

    private int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    private void joinByRank(int first, int second) {
        if (rank[first] < rank[second]) {
            parent[first] = second;
        } else if (rank[second] < rank[first]) {
            parent[second] = first;
        } else {
            parent[first] = second;
            rank[second]++;
        }
    }
}
