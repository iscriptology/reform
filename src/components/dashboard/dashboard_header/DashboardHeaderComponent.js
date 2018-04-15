'use strict';

import React from 'react';

require('styles/dashboard/dashboard_header/DashboardHeader.scss');

class DashboardHeaderComponent extends React.Component {
  constructor(){
    super();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  render() {
    return (
      <div ref={(ref) => ref ? this.props.dashboardHeaderRef(ref) : null} className="dashboard-header">
        <div className="header-limiter">
          <h2><a href="#">Hungarian citizenship</a></h2>
          <nav>
            <a href="#"><i className="fa fa-comments-o"></i> Questions</a>
            <a href="#"><i className="fa fa-file-text"></i> Results</a>
            <a href="#"><i className="fa fa-group"></i> Participants</a>
            <a href="#"><i className="fa fa-cogs"></i> Settings</a>
          </nav>
        </div>
      </div>
    );
  }
}

DashboardHeaderComponent.displayName = 'DashboardDashboardHeaderDashboardHeaderComponent';

// Uncomment properties you need
// DashboardHeaderComponent.propTypes = {};
// DashboardHeaderComponent.defaultProps = {};

export default DashboardHeaderComponent;
