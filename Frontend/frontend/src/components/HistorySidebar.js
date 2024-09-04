import React from 'react';

// Static data for history
const historyData = [
    { id: 1, date: '2024-01-01T12:00:00Z', action: 'Création d\'audit', reference: 'AUD001' ,created_at: '2024-01-01T12:00:00Z' , created_by: 'Michael Brown'}, 
    { id: 2, date: '2024-02-01T12:00:00Z', action: 'Création d\'audit', reference: 'AUD002' ,created_at: '2024-02-01T12:00:00Z' , created_by: 'Michael Christopher'},
    { id: 3, date: '2024-03-01T12:00:00Z', action: 'Création d\'audit', reference: 'AUD003' ,created_at: '2024-03-01T12:00:00Z' , created_by: 'Michael Chris'}
];

function HistorySidebar() {
    return (
        <aside className="history-sidebar">           
         <h5>Historique des Créations</h5>
         <br />
            <ul>
                {historyData.map(item => (
                    <li key={item.id}>
                        <p><strong>Date :</strong> {new Date(item.date).toLocaleString()}</p>
                        <p><strong>Référence :</strong> {item.reference}</p>
                        <p><strong>Date de création :</strong> {item.created_at} - {item.created_by}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default HistorySidebar;