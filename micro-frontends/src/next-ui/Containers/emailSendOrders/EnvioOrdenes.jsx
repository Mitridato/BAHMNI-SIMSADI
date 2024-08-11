import React, { useState, useEffect } from 'react';

const EnvioOrdenes = () => {
    const [combinedOrders, setCombinedOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async (orderType) => {
            const response = await fetch(`/openmrs/ws/rest/v1/${orderType}`);
            return await response.json();
        };

        const fetchCombinedOrders = async () => {
            const labOrders = await loadOrders('labOrders');
            const radiologyOrders = await loadOrders('radiologyOrders');
            setCombinedOrders([...labOrders, ...radiologyOrders]);
        };

        fetchCombinedOrders();
    }, []);

    const shareOrders = (visitStartDate, visitUuid) => {
        console.log('Sharing order for visit:', visitStartDate, visitUuid);
    };

    const downloadOrder = (visitStartDate, visitUuid) => {
        console.log('Downloading order for visit:', visitStartDate, visitUuid);
    };

    return (
        <div className="dashboard-combined-orders-section">
            <h2 className="section-title">Combined Lab and Radiology Orders</h2>
            <div>
                <table className="combined-orders-table">
                    <thead>
                        <tr>
                            <th>Order Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedOrders.map(order => (
                            <tr key={order.visitUuid}>
                                <td>{order.type}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.description}</td>
                                <td>
                                    <div className="share-order-icon">
                                        <i className="fa fa-envelope" onClick={() => shareOrders(order.visitStartDate, order.visitUuid)}></i>
                                        <i className="fa fa-download" onClick={() => downloadOrder(order.visitStartDate, order.visitUuid)}></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnvioOrdenes;
