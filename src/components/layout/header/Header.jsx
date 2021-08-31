import React from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {AccountCircle} from '@material-ui/icons';

/* actions */
import {signOutUser} from "../../../store/actions/authAction";

const Header = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    const signOut = (e) => {
        e.preventDefault();
        dispatch(signOutUser());
    }

    return (
        <header id="header">
            <nav className="site-header">
                <div className="container header-nav">
                    <Link className="link" to={'/'}>Home</Link>
                    <Link className="link user-link" to={'/'}><AccountCircle/> <span>{user.firstName} {user.lastName}</span></Link>
                    <Link className="link" to={'/'} onClick={(e) => signOut(e)}>SignOut</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;