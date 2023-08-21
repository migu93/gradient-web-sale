import React from 'react';
import NavMenu from "./NavMenu";
import NadBar from "./NadBar"; // Путь к вашему логотипу


const Header: React.FC = () => {
  return (
    <div style={{marginLeft: 0}}>
        <NadBar/>
      <NavMenu/>
    </div>
  );
}

export default Header;

