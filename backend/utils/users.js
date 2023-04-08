const users = [];

// Join user to workspace
function userJoin(id, username, roomId) {
    const user = { id, username, roomId }
    users.push(user);
    return user;
}

// Get Current user
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

//Remove current user 
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1)
        return users.splice(index, 1)[0]
}

// Get room users
function getRoomUsers(roomId) {
    return users.filter(el => el.roomId === roomId)
}

module.exports = {
    userJoin, userLeave, getCurrentUser, getRoomUsers
}