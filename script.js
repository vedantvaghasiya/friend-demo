// Social Network Graph
const network = {};

// Add User
function addUser() {
    const username = document.getElementById("username").value.trim();
    if (username) {
        if (!network[username]) {
            network[username] = new Set();
            alert(`User ${username} added!`);
        } else {
            alert("User already exists!");
        }
    }
    document.getElementById("username").value = "";
}

// Add Friendship (Bidirectional Relationship)
function addFriendship() {
    const user1 = document.getElementById("friend1").value.trim();
    const user2 = document.getElementById("friend2").value.trim();

    if (user1 && user2 && user1 !== user2) {
        if (!network[user1]) network[user1] = new Set();
        if (!network[user2]) network[user2] = new Set();

        network[user1].add(user2);
        network[user2].add(user1);
        alert(`Friendship added between ${user1} and ${user2}`);
    } else {
        alert("Invalid user names!");
    }
    document.getElementById("friend1").value = "";
    document.getElementById("friend2").value = "";
}

// Find Friends Using DFS
function recommendFriends() {
    const user = document.getElementById("recommendUser").value.trim();
    const maxDistance = parseInt(document.getElementById("distance").value, 10);

    if (!network[user]) {
        document.getElementById("recommendationText").innerText = "User not found!";
        return;
    }

    let visited = new Set();
    let recommendations = new Set();

    function dfs(current, depth) {
        if (depth > maxDistance || visited.has(current)) return;
        visited.add(current);

        if (depth > 0 && depth <= maxDistance) {
            recommendations.add(current);
        }

        for (let friend of network[current]) {
            dfs(friend, depth + 1);
        }
    }

    dfs(user, 0);
    
    // Remove direct friends and self from recommendations
    let filteredRecommendations = [...recommendations].filter(f => !network[user].has(f) && f !== user);

    // Display Recommendations
    document.getElementById("recommendationText").innerText =
        filteredRecommendations.length > 0
            ? `Recommended Friends at Distance ${maxDistance}: ${filteredRecommendations.join(", ")}`
            : "No recommendations available.";
}
