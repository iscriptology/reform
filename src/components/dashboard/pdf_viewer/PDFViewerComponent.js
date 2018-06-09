'use strict';

import React from 'react';
import {Document, Page, setOptions} from 'react-pdf';

require('styles/dashboard/PDFViewer.scss');
type Props = {
  file: string,
};

type State = {
  numPages: number
};

class PDFViewerComponent extends React.Component<Props, State> {

  constructor(){
    super();
    this.state = {
      numPages: 0
    };
    setOptions({
      workerSrc: '/files/pdf.worker.js'
    });
  }

  onPageRenderSuccess(page) {
    let pageCanvas = document.querySelectorAll('div[data-page-number="'+ page + '"] > canvas')[0];
    pageCanvas.id = 'page-' + page;
  }

  onDocumentLoad(doc: any) {
    this.setState({numPages: doc.numPages});
  }

  render() {
    let pages = [];
    for(let i = 0; i < this.state.numPages; i++){
      pages.push(<Page renderTextLayer={false} onRenderSuccess={() => this.onPageRenderSuccess(i+1)} key={'page'+(i+1).toString()} pageNumber={i+1} />);
    }
    return (
      <Document
        onLoadSuccess={this.onDocumentLoad.bind(this)}
        file={this.props.file}
      >
        {pages}
      </Document>
    );
  }
}

PDFViewerComponent.displayName = 'DashboardPDFViewerComponent';

// Uncomment properties you need
// PdfviewerComponent.propTypes = {};
// PdfviewerComponent.defaultProps = {};

export default PDFViewerComponent;
