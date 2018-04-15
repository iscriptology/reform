'use strict';

import React from 'react';
import PDFViewerComponent from 'components/dashboard/pdf_viewer/PDFViewerComponent';
import DataEditorComponent from 'components/dashboard/data_editor/DataEditorComponent';
import {Sticky} from 'semantic-ui-react';
import DashboardHeaderComponent from 'components/dashboard/dashboard_header/DashboardHeaderComponent';
import windowSize from 'react-window-size';
import {Scrollbars} from 'react-custom-scrollbars';

require('styles/dashboard/Dashboard.scss');

@windowSize
class DashboardComponent extends React.Component {

  handleScrollEvent() {
    let scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 50){
      this._dashboardHeaderRef.className = 'dashboard-header sticky';
      this._pdfViewerRef.style.marginTop = '60px';
      this._dataEditorRef.style.height = ((this.props.windowHeight - 140) + (50)).toString() + 'px';
    } else {
      this._dashboardHeaderRef.className = 'dashboard-header';
      this._pdfViewerRef.style.marginTop = '0px';
      this._dataEditorRef.style.height = ((this.props.windowHeight - 140) + (parseInt(scrollTop))).toString() + 'px';
    }
  }

  constructor(){
    super();

    this.state = {
      numPages: 0
    };
  }

  componentDidMount() {
    this.setState({dashboardRef: this._dashboardRef });
    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  render() {
    return (
      <div className="dashboard-component" ref={(ref) => this._dashboardRef = ref }>
        <DashboardHeaderComponent dashboardHeaderRef={(ref) => this._dashboardHeaderRef = ref } />
        <div className="dashboard-editor" ref={(ref) => this._dashboardEditorRef = ref }>
          <div className="pdf-viewer-component" ref={(ref) => this._pdfViewerRef  = ref}>
            <PDFViewerComponent file="files/AP_2013.pdf" />
          </div>

          <Sticky offset={60} context={this._dashboardRef} style={{width:'600px'}}>
            <div className="data-editor-component" style={{height: this.props.windowHeight - 140}} ref={(ref) => this._dataEditorRef = ref }>
              <Scrollbars
                renderThumbHorizontal={({style, ...props }) => <div {...props} style={{...style, display: 'none'}} />}
                renderTrackHorizontal={({style, ...props }) => <div {...props} style={{...style, display: 'none'}} />}
                renderView={({style, ...props }) => <div {...props} style={{...style, marginBottom: -14, overflowX: 'hidden'}} />}
                          className="data-editor">
                <DataEditorComponent />
              </Scrollbars>
            </div>
          </Sticky>
        </div>
      </div>
    );
  }
}

DashboardComponent.displayName = 'DashboardComponent';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default DashboardComponent;
