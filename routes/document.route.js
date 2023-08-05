const documentController = require('../controllers/document_controller');
const {validateShipping} = require('../middlewares');

module.exports = (app) => {
    app.post('/api/v1/documents', documentController.createDocument);
    app.get('/api/v1/documents', documentController.getDocuments);
    app.get('/api/v1/documents/:id', documentController.getDocumentsById);
    app.delete('/api/v1/documents/:id', documentController.deleteDocument);
    app.put('/api/v1/documents/:id', documentController.updateDocument);
}

