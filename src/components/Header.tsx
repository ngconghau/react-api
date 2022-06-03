import React from 'react'
import Image from 'next/image'
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap'
import logo from '../../public/logos/logo-mobile.png'
import user1 from '../../public/users/user1.jpg'
type Props = {
  showMobmenu: () => void
}

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const Handletoggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/" className="d-lg-none">
            <Image src={logo} alt="logo" />
          </NavbarBrand>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={props.showMobmenu}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar></Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="primary">
              <div style={{ lineHeight: '0px' }}>
                <Image
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem>Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    </div>
  )
}
export default Header
