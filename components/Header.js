import React from 'react';
// import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
// import {Link} from "react-router-dom"
// import SearchIcon from '@material-ui/icons/Search';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';   
// import {useStateValue} from "./StateProvider";
// import { auth } from './firebase';

function Header() {
//     const [{basket,user},dispatch]=useStateValue();

// const handleAuthenticaton = () =>{
//     if(user) {
//         auth.signOut();
//     }
// }

    return (
    <div className='header'>
        <Link href ="/">
            
        {/* <img className="header_logo" src="http://onlinemeatshop.in/image/catalog/blog/chicken%20(3).png"/> */}
        <h1>Arowdrops</h1>
        
        </Link>
    <div className="header_search">
        <input className="header_searchInput" type="text"/> 
        {/* <SearchIcon className="header_searchIcon"/> */}
        </div>    


        <div className="header_nav">
            <Link href='/about'>
            <div  className='header_option'>
            <span className='header_optionLineOne'>About Us </span>     
            </div>
            </Link>
            <div className='header_option'>
               <span className='header_optionLineOne'>Products </span>              
            </div>
         <div className='header_option'>  
            <span className='header_optionLineOne'>Contact Us</span>
            </div> 
            <Link href ="/checkout">
            <div className="header_optionBasket">
               
                <span className="header_optionLineTwo header_basketCount">hi</span>
            </div>
            </Link>

        </div>  
        </div>
    )    
}
export default Header