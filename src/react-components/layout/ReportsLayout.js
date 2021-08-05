import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ReportsLayout = props => {

  const [load, setLoad] = useState(true);
  const [matomoData, setMatomoData] = useState({});

  useEffect(() => {
    fetch("https://threesixtyvreality.matomo.cloud/?module=API&method=Live.getLastVisitsDetails&idSite=1&format=json&token_auth=68b41fdcd3b9e304a3864643be319b98&period=year&date=2021")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setMatomoData(result);
          setLoad(false);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoad(false);
          console.log('errors - ', error);
        }
      )
  }, []);

  return (
    <div>
      <p>This is ReportsLayout</p>
      {load && <p>Loading..</p>}
      {!load && <table>
          <tr>
            <td>visitIp</td>
            <td>referrerType</td>
            <td>deviceType</td>
            <td>operatingSystem</td>
            <td>visitLocalTime</td>
            <td>location</td>
          </tr>
          {
            matomoData.map((row, i) => {
              return (
                <tr key={`as-${i}`}>
                  <td>{row.visitIp}</td>
                  <td>{row.referrerType}</td>
                  <td>{row.deviceType}</td>
                  <td>{row.operatingSystem}</td>
                  <td>{row.visitLocalTime}</td>
                  <td>{row.location}</td>
                </tr>  
              );
            })
          }
        </table>}
    </div>
  );
}

export default ReportsLayout;

ReportsLayout.propTypes = {
  // className: PropTypes.string,
  // viewportClassName: PropTypes.string,
  // sidebar: PropTypes.node,
  // sidebarClassName: PropTypes.string,
  // toolbarLeft: PropTypes.node,
  // toolbarCenter: PropTypes.node,
  // toolbarRight: PropTypes.node,
  // toolbarClassName: PropTypes.string,
  // modal: PropTypes.node,
  // viewport: PropTypes.node,
  // objectFocused: PropTypes.bool,
  // streaming: PropTypes.bool,
  // viewportRef: PropTypes.any
};
