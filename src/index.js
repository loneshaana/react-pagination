import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./Pagination";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    // an example array of items to be paged
    var exampleItems = [...Array(150).keys()].map(i => ({
      id: i + 1,
      name: "Item " + (i + 1)
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: []
    };
  }
  onChangePage = pageOfItems => {
    this.setState({ pageOfItems });
  };
  render() {
    return (
      <div className="App">
        <h1>React Redux Pagination</h1>
        {this.state.pageOfItems.map(item => (
          <div key={item.id} className="distance">
            {item.name}
          </div>
        ))}
        <Pagination
          items={this.state.exampleItems}
          onChangePage={this.onChangePage}
          pageSize={10}
          onPage={1}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
