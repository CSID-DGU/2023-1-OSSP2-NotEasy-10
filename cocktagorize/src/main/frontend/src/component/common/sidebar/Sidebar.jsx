import React from "react";
import '../sidebar/Sidebar.css'
import {VscHome, 
        VscCommentDiscussion, 
        VscNotebook, 
        VscHeartFilled,
        VscWand,
        VscArrowCircleRight, 
        VscAccount, } from 'react-icons/vsc';

export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className='menu'>
                MENU
            </div>
            <hr></hr>
            <ul className='menulist'>
                <li><VscHome/> HOME</li>
                <li><VscCommentDiscussion/> Community</li>
                <li><VscNotebook/> My Post</li>
                <li><VscHeartFilled/> Favorites</li>
            </ul>
            <ul className='menulist_personal'>
                <li><VscWand/> My Page</li>
                <li><VscArrowCircleRight/> Logout</li>
            </ul>
            <hr></hr>
            <div className='dropdown'>
                <VscAccount /> User Name
            </div>
        </div>
    );
}