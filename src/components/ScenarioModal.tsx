import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ScenarioFormData, ScenarioCategory, DifficultyLevel } from '../types';

interface ScenarioModalProps {
  onClose: () => void;
  onSave: (data: ScenarioFormData) => void;
}

const ScenarioModal: React.FC<ScenarioModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<ScenarioFormData>({
    name: '',
    description: '',
    category: 'XML Structure Errors',
    difficulty: 'Beginner',
    requestXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:UsernameToken>
        <wsse:Username>merchant123</wsse:Username>
        <wsse:Password>password123</wsse:Password>
      </wsse:UsernameToken>
    </wsse:Security>
  </soap:Header>
  <soap:Body>
    <ProcessPayment xmlns="http://payment.example.com/">
      <amount>100.00</amount>
      <currency>USD</currency>
      <cardNumber>4111111111111111</cardNumber>
      <expiryDate>12/25</expiryDate>
    </ProcessPayment>
  </soap:Body>
</soap:Envelope>`,
    responseXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ProcessPaymentResponse xmlns="http://payment.example.com/">
      <transactionId>txn_123456789</transactionId>
      <status>SUCCESS</status>
      <amount>100.00</amount>
      <currency>USD</currency>
    </ProcessPaymentResponse>
  </soap:Body>
</soap:Envelope>`,
    errorXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Error message here</faultstring>
      <detail>
        <error>Detailed error description</error>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: '',
    explanation: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const categories: ScenarioCategory[] = [
    'XML Structure Errors',
    'Authentication Issues',
    'Certificate Problems',
    'Server-side Errors',
    'Timeout Issues',
    'Payment-specific Errors'
  ];

  const difficulties: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (field: keyof ScenarioFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Scenario</h2>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Scenario Name *</label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter scenario name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  className="input"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the scenario and what error it demonstrates"
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="input"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as ScenarioCategory)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  className="input"
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value as DifficultyLevel)}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="requestXml">Request XML *</label>
                <textarea
                  id="requestXml"
                  className="input xml-editor"
                  value={formData.requestXml}
                  onChange={(e) => handleInputChange('requestXml', e.target.value)}
                  placeholder="Enter the SOAP request XML"
                  rows={8}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="errorXml">Error Response XML</label>
                <textarea
                  id="errorXml"
                  className="input xml-editor"
                  value={formData.errorXml}
                  onChange={(e) => handleInputChange('errorXml', e.target.value)}
                  placeholder="Enter the error response XML (optional)"
                  rows={6}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="responseXml">Success Response XML *</label>
                <textarea
                  id="responseXml"
                  className="input xml-editor"
                  value={formData.responseXml}
                  onChange={(e) => handleInputChange('responseXml', e.target.value)}
                  placeholder="Enter the success response XML"
                  rows={6}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="fixedRequestXml">Fixed Request XML</label>
                <textarea
                  id="fixedRequestXml"
                  className="input xml-editor"
                  value={formData.fixedRequestXml}
                  onChange={(e) => handleInputChange('fixedRequestXml', e.target.value)}
                  placeholder="Enter the corrected request XML (optional)"
                  rows={8}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="explanation">Explanation</label>
                <textarea
                  id="explanation"
                  className="input"
                  value={formData.explanation}
                  onChange={(e) => handleInputChange('explanation', e.target.value)}
                  placeholder="Explain what was wrong and how it was fixed"
                  rows={3}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="tags">Tags</label>
                <div className="tags-input">
                  <div className="tags-list">
                    {formData.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => removeTag(tag)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input">
                    <input
                      type="text"
                      className="input"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={addTag}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Scenario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScenarioModal;
