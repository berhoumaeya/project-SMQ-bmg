import React from 'react';
import '../styles/History.css'; 
const History = ({ historyData, title, isVerifDoc }) => {
    return (
        <aside className="history-sidebar">
            <h5>{title}</h5>
            <br />
            <ul>
                {historyData.map(item => (
                    <li key={item.id}>
                        <p><strong>Date :</strong> {new Date(item.date).toLocaleString()}</p>
                        <p><strong>Référence :</strong> {item.reference}</p>
                        <p><strong>Créé par :</strong> {item.created_by}</p>
                        <p><strong>Date de création :</strong> {new Date(item.created_at).toLocaleString()}</p>
                        {isVerifDoc && (
                            <>
                                <p><strong>Verificateur :</strong> {item.selection_verificateur}</p>
                                <p><strong>Approbateur :</strong> {item.selection_approbateur}</p>
                            </>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default History;
