const data = require('../data');

const determineUser = (userToken) => {
    const user = data[`user${userToken}`];
    return user;
}

module.exports = {
    determineUser
}