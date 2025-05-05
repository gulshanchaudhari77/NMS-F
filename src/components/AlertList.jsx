import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('All');

  const filteredAlerts = filter === 'All' ? alerts : alerts.filter((alert) => alert.type === filter);

  return (
    <div>
      <h3>Alerts</h3>
      <ul>
        {filteredAlerts.map((alert, index) => (
          <li key={index}>
            <strong>{alert.type}:</strong> {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;
