const getUserCredentials = (perfil) => {
    let result = {};
    if (perfil === 'ADMIN') {
        result.username = 'mecalux'
        result.password = '12345'
    } else {
        result.username = 'mecalux2'
        result.password = '12345'
    }
    return result;
}

module.exports = {
    getUserCredentials
}