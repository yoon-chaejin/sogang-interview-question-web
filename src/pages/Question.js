import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { signOut } from '../services/auth.service';

const Question = (props) => {
    const [questions, setQuestions] = useState([]);
    const [tagId, setTagId] = useState(1)
    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = async () => {
        axios.get(API_BASE_URL+'/intv-question/tag/'+tagId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            } 
        })
        .then(response => {
            console.log(response.data);
            setQuestions(response.data);
        })
    }
    
    return (
        <div>
            <h2>Question</h2>            
            {questions.map(item => <p key={item.id}>{item.content}</p>)}
        </div>
    )
}

export default withRouter(Question);