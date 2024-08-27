import React from 'react';
import './DashboardDocInt.css';
import SidebarDoc from '../../components/SidebarDoc';
import SubNavbarDoc from '../../components/SubNavbarDOC';

// Static data
const staticDocuments = [
    {
        id: 1,
        libelle: 'Document A',
        type: 'Type X',
        selection_site: 'Site A',
        selection_activite: 'Activité A',
        selection_verificateur: 'Verificateur A',
        selection_approbateur: 'Approbateur A',
        liste_informee: ['Personne A', 'Personne B'],
        updated_by: 'User A',
        updated_at: '2024-08-01',
        selection_redacteur: 'Redacteur A',
        created_at: '2024-07-01',
        statut: 'Active',
        fichier: true
    },
];

const Archive = () => {
    return (
        <> <SubNavbarDoc />

            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <SidebarDoc />
                <div className="dashboard-doc-int" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' }}>
                    <div className="formation-title">
                        <h3>Liste d'archive du document</h3>
                    </div>
                    <div className="documents-list">
                        {staticDocuments.length > 0 ? (
                            staticDocuments.map(doc => (
                                <div key={doc.id} className="document-item" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f7f7f7' }}>
                                    <p><strong>Libellé:</strong> {doc.libelle}</p>
                                    <p><strong>Type:</strong> {doc.type}</p>
                                    <p><strong>Site:</strong> {doc.selection_site}</p>
                                    <p><strong>Activité:</strong> {doc.selection_activite}</p>
                                    <p><strong>Vérificateur:</strong> {doc.selection_verificateur}</p>
                                    <p><strong>Approbateur:</strong> {doc.selection_approbateur}</p>
                                    <p><strong>Liste informée:</strong> {doc.liste_informee.join(', ')}</p>
                                    <p><strong>Modifié par:</strong> {doc.updated_by}</p>
                                    <p><strong>Modifié le:</strong> {doc.updated_at}</p>
                                    <p><strong>Créé par:</strong> {doc.selection_redacteur}</p>
                                    <p><strong>Créé à:</strong> {doc.created_at}</p>
                                    <p><strong>Statut:</strong> {doc.statut}</p>
                                    <p><strong>Pièces jointes:</strong> {doc.fichier ? <a href={`/DashboardDocInt`} target="_blank" rel="noopener noreferrer">Consulter</a> : 'Aucun'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Aucun document disponible</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Archive;
