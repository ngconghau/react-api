import React from 'react'
import { Button, Nav, NavItem } from 'reactstrap'
import Logo from './elements/Logo'
import Link from 'next/link'

type Props = { showMobilemenu: () => void }

const navigation = [
  {
    title: 'Gas Stations',
    href: '/',
    icon: 'bi bi-speedometer2',
  },
  {
    title: 'Gas Types',
    href: '/gastype',
    icon: 'bi bi-layout-split',
  },
  {
    title: 'Area',
    href: '/area',
    icon: 'bi bi-geo-alt',
  },
]

const SideBar = (props: Props) => {
  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={props.showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a className="text-primary nav-link py-3">
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  )
}

export default SideBar
