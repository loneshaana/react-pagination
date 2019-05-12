import React from "react";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length > 0) {
      this.setPager(this.props.onPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.onPage);
    }
  }

  setPager = onPage => {
    const { items, pageSize } = this.props;
    if (onPage < 1 && onPage > items.length) return;
    const newPager = this.getPager(items.length, onPage, pageSize);
    let pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);
    this.setState({ pager: newPager });
    this.props.onChangePage(pageOfItems);
  };

  getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = totalPages;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        console.log("Current Page ", currentPage);
        startPage = currentPage - 6;
        console.log("start Page ", startPage);
        endPage = currentPage + 4;
      }
    }
    // calculate the start and end indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create array of pages
    // console.log("Start Page ",startPage)
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };

  render() {
    const { pager } = this.state;
    return (
      <div className="pagination">
        <ul className="page-list">
          {pager.pages.map((page, index) => (
            <a
              key={index}
              className={pager.currentPage === page ? "active" : "none"}
            >
              <li className="page-item" onClick={() => this.setPager(page)}>
                {page}
              </li>
            </a>
          ))}
        </ul>
      </div>
    );
  }
}
export default Pagination;
