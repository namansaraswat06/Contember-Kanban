import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./table.css";

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null, // To store any fetch errors
    };
  }

  componentDidMount() {
    // Fetch data from your local API endpoint
    fetch("http://localhost:5000") // Use the appropriate API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        this.setState({ error });
        console.error("Error fetching data:", error);
      });
  }

  renderTableHeader() {
    if (this.state.data.length === 0) return null;
    let header = Object.keys(this.state.data[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.status}</td>
          <td>{item.priority}</td>
          <td className="tableDescription">{item.description}</td>
          <td>{item.username}</td>
          <td>{item.serviceid}</td>
          <td>{item.assignedto}</td>
          <td>{item.customername}</td>
          <td>{item.createddate}</td>
          <td>{item.modifieddate}</td>
          <td>{item.targetdate}</td>
        </tr>
      );
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h2>Error</h2>
          <p>{error.message}</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Tabular Data</h2>
        <Table
          striped
          className="container"
          bordered
          hover
          variant="dark"
          responsive
        >
          <thead className="tableHead">
            <tr className="" style={{ textAlign: "center" }}>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody className="border tableData" style={{ textAlign: "center" }}>
            {this.renderTableData()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DynamicTable;
