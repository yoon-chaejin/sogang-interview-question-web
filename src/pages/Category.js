import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const Home = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags();
    })

    const getTags = async () => {
        axios.get(API_BASE_URL + '/tag', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setTags(response.data);
        })
    }
    return (
        <div>
            <h2>Category</h2>
            {tags.map(item => <p key={item.id}>{item.name}</p>)}
        </div>
    )
}

export default withRouter(Home);