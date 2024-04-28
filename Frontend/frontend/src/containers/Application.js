import React, { useState } from 'react';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isUserProfileOpen: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.toggleUserProfile = this.toggleUserProfile.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  toggleUserProfile() {
    this.setState(prevState => ({ isUserProfileOpen: !prevState.isUserProfileOpen }));
  }

  render() {
    return (
      <div>
        <div>Applications</div>
        <div className="search-bar">
          Recherche... <input type="text" value={this.state.searchQuery} onChange={this.handleSearchChange} />
          <button onClick={this.toggleUserProfile}>User</button>
          {this.state.isUserProfileOpen && (
            <div className="user-profile">
              <div>My Company (San Francisco)</div>
              <div>1-80460 &lt;&gt;</div>
              <div>Mitchell Admin</div>
            </div>
          )}
        </div>
        <div>
          Filtres <span>=Regrouper par</span>
        </div>
        <div>
          <span>✰ </span>Favoris
        </div>
        <div id="user-profile">
          <div>My Company (San Francisco)</div>
          <div>1-80460 &lt;&gt;</div>
          <div>Mitchell Admin</div>
        </div>
      </div>
    );
  }
}

export default Application;