'use strict';

import React from 'react';

require('styles/header/Header.css');

class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="header-two-bars">
        <div className="header-first-bar">
          <div className="header-limiter">
            <div className="logo-holder">
              <h1><a href="#">Re<span>forms</span></a></h1>
              <h2>forms made EASY</h2>
            </div>
            <nav>
              <a href="#" className="selected">Home</a>
              <a href="#">Search</a>
              <a href="#">Add your own</a>
              <a href="#">Contact us</a>
            </nav>
            <a href="#" className="flag-button"><img className="flag" src="https://lipis.github.io/flag-icon-css/flags/4x3/il.svg" alt="Israel Flag" /></a>
            <a href="#" className="logout-button">Logout</a>
          </div>
        </div>
      </header>
    );
  }
}

HeaderComponent.displayName = 'HeaderHeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
