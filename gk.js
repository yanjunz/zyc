
class User {
    constructor(userId, agentId, is_A, is_B) {
        this.userId = userId;
        this.agentId = agentId;
        this.is_A = is_A;
        this.is_B = is_B;
        // this.left = -1;
        // this.right = -1;
        this.left1 = -1;
        this.right1 = -1;
        this.left2 = -1;
        this.right2 = -1;
        this.level = -1;
    }
}

function readAllUsers() {
    return {
        10000 : new User(10000, 0, 10001, 10002),
        10001 : new User(10001, 10000, 10004, 10005),
        10002 : new User(10002, 10000, 10006, 0),
        10003 : new User(10003, 10000, 10009, 10010),
        10004 : new User(10004, 10001, 10007, 10008),
        10005 : new User(10005, 10001, 0, 0),
        10006 : new User(10006, 10002, 0, 0),
        10007 : new User(10007, 10004, 0, 0),
        10008 : new User(10008, 10004, 0, 0),
        10009 : new User(10009, 10003, 0, 0),
        10010 : new User(10010, 10003, 0, 0),
    };
}

function getChildren(allUsers, userId) {
    var children = [];
    var curUser = allUsers[userId];
    for (var k in allUsers) {
        var user = allUsers[k];
        if (user.agentId == userId) {
            children.push(user);
        }
    }
    return children;
}

function readUser(userId) {
    return null;
}

function saveUser(user) {

}

const kLevelupTo2 = 2;
const kLevelupTo3 = 2;

function calcLeftRight(curUser, children) {
    var left1 = 0, right1 = 0, left2 = 0, right2 = 0;
    for (var k in children) {
        var child = children[k];
        if (child.userId == curUser.is_A || child.userId == curUser.is_B) {
            left1 += (child.left1 + child.right1 + (child.level == 1 ? 1 : 0));
            left2 += (child.left2 + child.right2 + (child.level == 2 ? 1 : 0));
        } else {
            right1 += (child.left1 + child.right1 + (child.level == 1 ? 1 : 0));
            right2 += (child.left2 + child.right2 + (child.level == 2 ? 1 : 0));
        }
    }
    curUser.left1 = left1;
    curUser.right1 = right1;
    curUser.left2 = left2;
    curUser.right2 = right2;
}

// 全量更新
function calcRecursive(allUsers, curUserId) {
    var curUser = allUsers[curUserId];
    // 先计算所有children
    var children = getChildren(allUsers, curUserId);
    for (var i in children) {
        calcRecursive(allUsers, children[i].userId);
    }
    // 再根据children来计算当前节点的left/right
    calcLeftRight(curUser, children);
    if (curUser.is_A != 0 && curUser.is_B != 0) {
        if (curUser.left2 >= kLevelupTo3 && curUser.right2 >= kLevelupTo3) {
            curUser.level = 3;
        } else if (curUser.left1 >= kLevelupTo2 && curUser.right1 >= kLevelupTo2) {
            curUser.level = 2;
        } else {
            curUser.level = 1;
        }
    } else {
        curUser.level = 0;
    }
}

function printUsers(allUsers) {
    for (var k in allUsers) {
        console.log(k, allUsers[k]);
    }
}

function main() {
    var allUsers = readAllUsers();
    calcRecursive(allUsers, 10000);
    printUsers(allUsers);
}

main();

/*
function calcLeft1Total(allUsers, curUserId, results) {
    if (results[curUserId] == undefined) { // 有计算结果
        var left = 0;
        var curUser = allUsers[curUserId];
        if (curUser.is_A > 0) {
            left += calcLeft1Total(allUsers, curUser.is_A, results);
        }
        if (curUser.is_B > 0) {
            left += calcLeft1Total(allUsers, curUser.is_B, results);
        }
        results[curUserId] = left;
    }
    return results[curUserId];
}

// 当前节点left、right需要重新计算(增量更新)，在增量更新前确保做过全量更新
function updateLeftAndRightInc(user) {
    
}

function checkLevel0ShouldUpdate(user) {
    return user.is_A != 0 && user.is_B != 0 && user.level == 0;
}

function checkLevel1ShouldUpdate(user) {
    return user.left > 5 && user.right > 5 && user.level == 1;
}

function checkLevel2ShouldUpdate(user) {
    return user.left > 5 && user.right > 5 && user.level == 2;
}

// 自底向上广播
function notifyNodeUpdated(userId, ) {
    beginTranscation();
    var user = readUser(userId);
    if (checkLevel0ShouldUpdate(user)) { // 0 => 1
        user.level += 1
        saveUser(user);
        if (user.agentid != 0) {
            notifyNodeUpdated(user.agentid);
        }
    } else if (checkLevel1ShouldUpdate(user)) { // 1 => 2

    }
    commitTranscation();
}
*/