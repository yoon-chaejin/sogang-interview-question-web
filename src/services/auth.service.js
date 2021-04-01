import axios from "axios";
import { API_BASE_URL } from "../constants";

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

export const isComplicated = (password) => {
    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/ig);
    var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
   
    if(password.length < 8 || password.length > 20){
//        alert("8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
    }
    if(password.search(/₩s/) != -1){  
//        alert("비밀번호는 공백업이 입력해주세요.");
        return false;
    } if(num < 0 || eng < 0 || spe < 0 ){  
//        alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
    }

    return true;
}

export const isValidateToken = (props) => {
    axios.get(API_BASE_URL + 'tag', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .catch(error => {
        localStorage.removeItem('token');
        props.history.push('/');
    })
}