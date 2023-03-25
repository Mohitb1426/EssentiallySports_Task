import Image from "next/image";
import React from "react";
import headerLogo from '../assets/images/headerImage.webp';

function Header() {
    return (
        <div className="header">
            <Image src={headerLogo} />
            <div className="header__menuItem">Contact us : @essentiallysports.com</div>
        </div>
    );
}

export default Header;
