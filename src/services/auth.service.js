export const signOut = () => {
    localStorage.removeItem('token');
}

export const authHeader = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {}
    }
}