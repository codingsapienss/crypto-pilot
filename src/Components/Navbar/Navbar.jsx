import './Navbar.css'
import { Menu } from "antd"
import { Link } from "react-router-dom"




const Navbar = () => {
    return (
        <Menu mode='inline' className='nav' theme="dark">
            <Menu.Item className='icon' >
                <Link to='/'> Home </Link>
            </Menu.Item>
            <Menu.Item >
                <Link to='/cryptocurrencies'> Crypto </Link>
            </Menu.Item>

            <Menu.Item >
                <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
    )
}

export default Navbar