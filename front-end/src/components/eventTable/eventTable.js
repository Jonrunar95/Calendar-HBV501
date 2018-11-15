import React, { Component } from 'react';
// import Event from '../event';

class EventTable extends Component {

  constructor(props) {
    super(props);
    const { data } = props;

    this.state = { data };
  }

  generateTable() {
    const d = new Date();
    const cols = [];

    for (let i = 0; i < 7; i++) {
      const d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() - i) + 1);
      const entry = { label: d1, rows: [] };
      for (let j = 0; j < 24; j++) {
        const hour = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), j);
        entry.rows.push(hour.getHours());
      }
      cols.push(entry);
    }

    return cols;

  }

  render(){
    // const { data } = this.state;

    const tds = this.generateTable();

    return (
      <table>
        <tbody>
          {tds.map((td, i) => {
            return (
              <td key={i}>
                {td.label.toLocaleString()}
                {td.rows.map((row, j) =>
                  <tr key={j}> {row} </tr>
                )}
              </td>
            )
          })}
        </tbody>
      </table>
    );
  }
}

export default EventTable;
