import './Navbar.css'
import { Menu } from "antd"
import { Link } from "react-router-dom"
import { HomeOutlined, FundOutlined, MoneyCollectOutlined, BulbOutlined } from "@ant-design/icons"




const Navbar = () => {
    return (
                <Menu  mode='horizontal' className='nav' theme="dark">
                    <Menu.Item className='icon' icon={<HomeOutlined  style={{fontSize:"28px"}} />}>
                        <Link to='/'> Home </Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined style={{fontSize:"28px"}} />}>
                        <Link to='/cryptocurrencies'> Cryptocurrencies </Link>
                    </Menu.Item>
                    {/* <Menu.Item icon={<MoneyCollectOutlined style={{fontSize:"28px"}} />}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>  */}
                    <Menu.Item icon={<BulbOutlined style={{fontSize:"28px"}} />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
    )
}

export default Navbar