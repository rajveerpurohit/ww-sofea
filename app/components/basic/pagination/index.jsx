import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getCLPPageData } from '../../../pages/clp/actions';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.genratePreviousBlocks = this.genratePreviousBlocks.bind(this);
        this.genrateNextBlocks = this.genrateNextBlocks.bind(this);
    }
    
    getParameterByName(name, url) {
    if (typeof window !== 'undefined' && window) {
      if (!url) url = window.location.pathname;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2].replace(/\+/g, ' ');
  }
    genratePreviousBlocks(Nr, Ns, recsPerPage) {
        let prevValue = (this.props.paginationData.firstRecNum - 1) - recsPerPage;
        if (prevValue < 0) {
            prevValue = 0;
        }
        const params = {
            pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
            No: prevValue,
            Nr,
            Nrpp: recsPerPage,
            Ns
        };
        return (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
          <span className="icon icon--left-dark" />
          <span className="icon-text">Previous</span>
        </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
          <span className="icon icon--left-dark" />
          <span className="icon-text">Previous</span>
        </Link>
        );
    }
    genrateNextBlocks(Nr, Ns, recsPerPage) {
        const nextValue = (this.props.paginationData.firstRecNum - 1) + recsPerPage;
        const params = {
            pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
            No: nextValue,
            Nr,
            Nrpp: recsPerPage,
            Ns
        };

        return (Ns === null ? <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
          <span className="icon-text">Next</span>
          <span className="icon icon--right-dark" />
        </Link> : <Link className="pagination__nav" to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
          <span className="icon-text">Next</span>
          <span className="icon icon--right-dark" />
        </Link>
        );
    }
    render() {
        if (!this.props.paginationData) {
            return null;
        }
        const totalNumRecs = this.props.paginationData.totalNumRecs;
        const recsPerPage = this.props.paginationData.recsPerPage;
        let Nr = '';
        let Ns = '';
        if (typeof document !== 'undefined' && document && document.getElementById('sort') !== null) {
            const elem = document.getElementById('sort');
            const selectedNode = elem.options[elem.selectedIndex].value;
            if (elem.selectedIndex === 0) {
                 Ns = this.getParameterByName('Ns', window.location.href);
            } else {
                Ns = this.getParameterByName('Ns', selectedNode);
            }
            Nr = this.getParameterByName('Nr', selectedNode);
            // const optionVal = document.getElementById('show').selectedIndex;
            // if (optionVal === 0) {
            //     recsPerPage = 24;
            // }
        }
        // console.log("pppppppppppprecsPerPage", recsPerPage);
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
        if (currentPageNum > maxPages) {
            const start = currentPageNum - (maxPages - 1);
            let i = 0;
            for (let y = start; y <= currentPageNum; y++) {
                paginationArray[i] = y;
                i += 1;
            }
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
                <span className="pagination__info">{this.props.paginationData.totalNumRecs} Items Found</span>
                {currentPageNum >= 2 ?
                        this.genratePreviousBlocks(Nr, Ns, recsPerPage)
                        : ''
                    }
                <ol className="pagination__pages">
                  {
                            paginationArray.map((pagination) => {
                                const startValue = (pagination - 1) * recsPerPage;
                                const params = {
                                    pageURL: typeof window !== 'undefined' && window ? window.location.pathname : '',
                                    No: startValue,
                                    Nr,
                                    Nrpp: recsPerPage,
                                    Ns
                                };
                                if (currentPageNum === pagination) {
                                    return (<li className="pagination__page is-current">
                                      {pagination}
                                    </li>);
                                }
                                if (currentPageNum !== pagination) {
                                    return (<li className="pagination__page">
                                      {Ns === null ? <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}`}>
                                        {pagination}
                                      </Link> : <Link to={`${params.pageURL}?No=${params.No}&Nr=${params.Nr}&Nrpp=${params.Nrpp}&Ns=${Ns}`}>
                                        {pagination}
                                      </Link>}
                                    </li>);
                                }
                                return null;
                            })
                        }
                </ol>
                {currentPageNum < parseInt(totalNumPages, 10) ?
                        this.genrateNextBlocks(Nr, Ns, recsPerPage) : ''
                    }
              </nav>
            );
        }
        return (
          <nav className="pagination">
            <span className="pagination__info">{this.props.paginationData.totalNumRecs} Items Found</span>
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
    return bindActionCreators({ getCLPPageData }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(Pagination);
