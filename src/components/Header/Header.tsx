import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-home-button'>
        <a href={'/'}>
          <h3>Realword blog</h3>
        </a>
      </div>
      <div className='header-auth-menu'>
        <div className='header-auth-menu-signin header-button-big'>Sign in</div>
        <div className='header-auth-menu-signup header-button-big'>Sign up</div>
      </div>
    </div>
  )
}

export default Header
