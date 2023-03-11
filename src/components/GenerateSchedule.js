import React, { Component } from "react";

import "../css/GenerateSchedule.css";

const data = [
  { Day: "Saturday", Hour: "04:00", Status: "Completed" },
  { Day: "Sunday", Hour: "05:30", Status: "Completed" },
  { Day: "Monday", Hour: "04:00", Status: "Completed" },
  { Day: "Tuesday", Hour: "04:00", Status: "Scheduled" },
  { Day: "Wedensday", Hour: "04:00", Status: "Scheduled" },
  { Day: "Thursday", Hour: "04:00", Status: "Scheduled" },
  { Day: "Friday", Hour: "04:00", Status: "Scheduled" },
  { Day: "Saturday", Hour: "04:00", Status: "Scheduled" },
];

export class GenerateSchedule extends Component {
  render() {
    return (
      <div className="GenerateSchedule">
        <table>
          <tr>
            <th> Day</th>
            <th> Hour </th>
            <th> Status</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Day}</td>
                <td>{val.Hour}</td>
                <td>{val.Status}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
