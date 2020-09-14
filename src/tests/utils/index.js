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

const getTokenExpired = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaXZhbkBpdmFuLmNvbSIsIm5hbWUiOiJQYWJsbyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoibWVjYWx1eCJ9LCJpYXQiOjE1OTk4NjA1NjUsImV4cCI6MTU5OTk0Njk2NX0.O93bXKszbJDoofKInbGsMSa7IDOmHpU126LndUs-48A';
}

module.exports = {
    getUserCredentials,
    getTokenExpired
}