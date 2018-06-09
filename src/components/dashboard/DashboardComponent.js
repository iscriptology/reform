'use strict';

import React from 'react';
import PDFViewerComponent from 'components/dashboard/pdf_viewer/PDFViewerComponent';
import DataEditorComponent from 'components/dashboard/data_editor/DataEditorComponent';
import DashboardHeaderComponent from 'components/dashboard/dashboard_header/DashboardHeaderComponent';
import windowSize from 'react-window-size';
import {Scrollbars} from 'react-custom-scrollbars';
import {observer, inject} from 'mobx-react';

require('styles/dashboard/Dashboard.scss');

@inject("rootStore") @observer @windowSize
class DashboardComponent extends React.Component {

  handleScrollEvent() {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    let scrollTop = window.scrollY;
    if(scrollTop > height - this.props.windowHeight - 290){
      this._dataEditorRef.style.position = 'absolute';
      this._dataEditorRef.style.top = null;
      this._dataEditorRef.style.bottom = '0px';
    } else if(scrollTop >= 50){
      this._dashboardHeaderRef.className = 'dashboard-header sticky';
      this._pdfViewerRef.style.marginTop = '60px';
      this._dataEditorRef.style.height = ((this.props.windowHeight - 140) + (50)).toString() + 'px';
      this._dataEditorRef.style.position = 'fixed';
      this._dataEditorRef.style.top = '60px';
    } else {
      this._dashboardHeaderRef.className = 'dashboard-header';
      this._pdfViewerRef.style.marginTop = '0px';
      this._dataEditorRef.style.height = ((this.props.windowHeight - 140) + (parseInt(scrollTop))).toString() + 'px';
      this._dataEditorRef.style.position = 'relative';
      this._dataEditorRef.style.top = '0px';
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollEvent.bind(this));
  }

  render() {
    if(this.props.rootStore.currFormDefinition === null) return null;
    return (
      <div className="dashboard-component" ref={(ref) => this._dashboardRef = ref}>
        <DashboardHeaderComponent dashboardHeaderRef={(ref) => this._dashboardHeaderRef = ref}/>
        <div className="dashboard-editor" ref={(ref) => this._dashboardEditorRef = ref}>
          <div className="pdf-viewer-component" ref={(ref) => this._pdfViewerRef = ref}>
            <PDFViewerComponent file={this.props.rootStore.currFormDefinition.pdfFile}/>
          </div>


          <div className="data-editor-component" style={{height: this.props.windowHeight - 140}}
               ref={(ref) => this._dataEditorRef = ref}>
            <Scrollbars
              renderThumbHorizontal={({style, ...props}) => <div {...props} style={{...style, display: 'none'}}/>}
              renderTrackHorizontal={({style, ...props}) => <div {...props} style={{...style, display: 'none'}}/>}
              renderView={({style, ...props}) => <div {...props}
                                                      style={{...style, marginBottom: -14, overflowX: 'hidden'}}/>}
              className="data-editor">
              <DataEditorComponent/>
            </Scrollbars>
          </div>

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
