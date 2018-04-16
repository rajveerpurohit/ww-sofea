import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import localeInfoUtil from '../../../services/localeInfoUtil';
import ServiceUtil from '../../../services/serviceUtil';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.genratePreviousBlocks = this.genratePreviousBlocks.bind(this);
    this.genrateNextBlocks = this.genrateNextBlocks.bind(this);
  }

  genratePreviousBlocks(Nr, Ns, recsPerPage, Ntt) {
    let prevValue = (this.props.paginationData.firstRecNum - 1) - recsPerPage;
    if (prevValue < 0) {
      prevValue = 0;
    }
    const params = {
      pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
      No: prevValue,
      Nr,
      Nrpp: recsPerPage,
      Ns,
      Ntt
    };
    return (Ntt === null ? (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
      <span className="icon icon--left-dark" />
      <span className="icon-text">Previous</span>
    </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
      <span className="icon icon--left-dark" />
      <span className="icon-text">Previous</span>
    </Link>
        ) : (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ntt=${params.Ntt}`}>
          <span className="icon icon--left-dark" />
          <span className="icon-text">Previous</span>
        </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}&Ntt=${params.Ntt}`}>
          <span className="icon icon--left-dark" />
          <span className="icon-text">Previous</span>
        </Link>));
  }
  genrateNextBlocks(Nr, Ns, recsPerPage, Ntt) {
    const nextValue = (this.props.paginationData.firstRecNum - 1) + recsPerPage;
    const params = {
      pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
      No: nextValue,
      Nr,
      Nrpp: recsPerPage,
      Ns,
      Ntt
    };
    return (Ntt === null ? (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
      <span className="icon-text">Next</span>
      <span className="icon icon--right-dark" />
    </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
      <span className="icon-text">Next</span>
      <span className="icon icon--right-dark" />
    </Link>
        ) : (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ntt=${params.Ntt}`}>
          <span className="icon-text">Next</span>
          <span className="icon icon--right-dark" />
        </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}&Ntt=${params.Ntt}`}>
          <span className="icon-text">Next</span>
          <span className="icon icon--right-dark" />
        </Link>));
  }
  render() {
    if (!this.props.paginationData) {
      return null;
    }
    const totalNumRecs = this.props.paginationData.totalNumRecs;
    const recsPerPage = this.props.paginationData.recsPerPage;
    let Nr = '';
    let Ns = '';
    let Ntt = '';
    if (typeof document !== 'undefined' && document && document.getElementById('sort') !== null) {
      const elem = document.getElementById('sort');
      if (elem.selectedIndex >= 0) {
        const selectedNode = elem.options[elem.selectedIndex].value;
        if (elem.selectedIndex === 0) {
          Ns = localeInfoUtil.getParameterByName('Ns', window.location.href);
        } else {
          Ns = localeInfoUtil.getParameterByName('Ns', selectedNode);
        }
        Nr = localeInfoUtil.getParameterByName('Nr', selectedNode);
      }
      Ntt = localeInfoUtil.getParameterByName('Ntt', window.location.href);
            // const optionVal = document.getElementById('show').selectedIndex;
            // if (optionVal === 0) {
            //     recsPerPage = 24;
            // }
    }
    const maxPages = 5;
    let paginationArray = [];
    const contentItem = this.props.paginationData;
    let totalNumPages = 0;
    const currentPageNum = parseInt((contentItem.firstRecNum / contentItem.recsPerPage) + 1, 10);

    if (totalNumRecs > recsPerPage) {
      if (totalNumRecs % recsPerPage === 0) {
        totalNumPages = totalNumRecs / recsPerPage;
      } else {
        totalNumPages = (totalNumRecs / recsPerPage) + 1;
      }
    }
    paginationArray = new Array(parseInt(maxPages, 10));
    if (totalNumPages > maxPages) {
      let start = 1;
      let end = 0;
      if (currentPageNum > 2) {
        start = currentPageNum - 2;
        end = currentPageNum + 2;
        if (end > totalNumPages) {
          if (currentPageNum === parseInt(totalNumPages, 10)) {
            start = currentPageNum - (maxPages - 1);
          } else {
            start = currentPageNum - (maxPages - 2);
          }
        }
      }
      let i = 0;
      for (let y = start; y <= (start + (maxPages - 1)); y++) {
        paginationArray[i] = y;
        i += 1;
      }
            // } else if (currentPageNum > maxPages) {
            //     const start = currentPageNum - (maxPages - 1);
            //     let i = 0;
            //     for (let y = start; y <= currentPageNum; y++) {
            //         paginationArray[i] = y;
            //         i += 1;
            //     }
    } else if (totalNumPages < maxPages) {
      let i = 0;
      for (let y = 1; y <= totalNumPages; y++) {
        paginationArray[i] = y;
        i += 1;
      }
    } else {
      let i = 0;
      for (let y = 1; y <= maxPages; y++) {
        paginationArray[i] = y;
        i += 1;
      }
    }
    if (totalNumRecs > 60) {
      return (
        <nav className="pagination">
          <span className="pagination__info">{this.props.paginationData.totalNumRecs} {ServiceUtil.getLabel(this.props.labels, 'global-clp-items-found-label')}</span>
          {currentPageNum >= 2 ?
                        this.genratePreviousBlocks(Nr, Ns, recsPerPage, Ntt)
                        : ''
                    }
          <ol className="pagination__pages">
            {
                            paginationArray.map((pagination, index) => {
                              const startValue = (pagination - 1) * recsPerPage;
                              const params = {
                                pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
                                No: startValue,
                                Nr,
                                Nrpp: recsPerPage,
                                Ns,
                                Ntt
                              };
                              if (currentPageNum === pagination) {
                                return (<li className="pagination__page is-current" key={index} >
                                  {pagination}
                                </li>);
                              }
                              if (currentPageNum !== pagination) {
                                return (<li className="pagination__page" key={index} >
                                  {Ntt === null ? (
                                            Ns === null ? <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
                                              {pagination}
                                            </Link> : <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
                                              {pagination}
                                            </Link>) : (
                                                Ns === null ? <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ntt=${params.Ntt}`}>
                                                  {pagination}
                                                </Link> : <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}&Ntt=${params.Ntt}`}>
                                                  {pagination}
                                                </Link>)}
                                </li>);
                              }
                              return null;
                            })
                        }
          </ol>
          {currentPageNum < parseInt(totalNumPages, 10) ?
                        this.genrateNextBlocks(Nr, Ns, recsPerPage, Ntt) : ''
                    }
        </nav>
      );
    }
    return (
      <nav className="pagination">
        <span className="pagination__info">{this.props.paginationData.totalNumRecs} {ServiceUtil.getLabel(this.props.labels, 'global-clp-items-found-label')}</span>
      </nav>
    );
  }
}
// onClick={() => { this.props.getCLPPageData(params); }}
const mapStateToProps = (state) => {
  return {
  };
};
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Pagination);
