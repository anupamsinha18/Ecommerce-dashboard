import React from 'react';
import './Navbar.css';
import { ReactComponent as TableIcon } from './table.svg';
import { ReactComponent as Categorie } from './Categorie2.svg';
import { ReactComponent as Admin1 } from './admin.svg';
import { ReactComponent as Contact1 } from './contact.svg';
import { ReactComponent as ContactUs } from './Contactus.svg';
import { ReactComponent as Kitchen } from './kitchen.svg';

const Navbar = () => {
  return (
    <>
    <div className="left-sidebar">
      <div className='menuitem'>

        <div className='icon'><a href="/"><TableIcon/></a></div>
        <div className='icon'><a href="/catgory"><Categorie/></a></div>
        <div className='icon'><a href="/kitchen"><Kitchen/></a></div>
        <div className='icon'> <ContactUs/></div>
      </div>
    </div>
    <div className='top-header'>
   Admin
        <div className='rightside'>
          <Admin1/>

        </div>

    </div>
    </>
  );
}

export default Navbar;
