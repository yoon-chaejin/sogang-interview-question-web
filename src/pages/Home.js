import { React, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { signOut } from '../services/auth.service';

const Home = () => {

    return (
        <div>
            <h2>Home</h2>
            <Link to='/signin'><button onClick={signOut}>Sign Out</button></Link>
            <Link to='/categories'><button>Category</button></Link>
            <Link to='/questions'><button>Questions</button></Link>
        </div>
    )
}

export default withRouter(Home);