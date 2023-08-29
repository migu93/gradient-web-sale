import React from 'react';
import NavMenu from "./NavMenu";
import NadBar from "./NadBar"; // Путь к вашему логотипу


const Header: React.FC = () => {
  return (
    <header style={{marginLeft: 0, marginRight: 0}}>
        <NadBar/>
      <NavMenu/>
    </header>
  );
}

export default Header;

