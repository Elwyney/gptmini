import vk from '../img/free-png 1.png'
const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <a className="logo" href="">GPT<span>MINI</span></a>
                    <nav>
                        <a href=""><img className='social' src={vk} alt="" /> Мы вконтакте</a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Header;