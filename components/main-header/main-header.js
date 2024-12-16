
import Link from 'next/link'
import React from 'react'
import logoImg from '@/app/assets/logo.png'
import Image from 'next/image'
import classes from './main-header.module.css'
import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'

const MainHeader = () => {

    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image
                        src={logoImg}
                        alt="logo-image"
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meal">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader 
