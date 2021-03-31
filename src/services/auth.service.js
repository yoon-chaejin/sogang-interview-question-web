export const signOut = () => {
    alert('성공적으로 로그아웃 하였습니다.');
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