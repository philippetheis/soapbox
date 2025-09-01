import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle, Code, Eye } from 'lucide-react';
import { SOAPResponse } from '../types';
import clsx from 'clsx';

interface ResponseViewerProps {
  response: SOAPResponse | null;
  collapsed: boolean;
  onToggle: () => void;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({
  response,
  collapsed,
  onToggle
}) => {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');

  const formatXml = (xml: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const serializer = new XMLSerializer();
      return serializer.serializeToString(doc);
    } catch (error) {
      return xml;
    }
  };

  const getStatusIcon = () => {
    if (!response) return null;
    return response.success ? (
      <CheckCircle size={16} className="text-success" />
    ) : (
      <AlertCircle size={16} className="text-error" />
    );
  };

  const getStatusText = () => {
    if (!response) return 'No response';
    return response.success ? 'Success' : 'Error';
  };

  const getStatusColor = () => {
    if (!response) return 'text-muted';
    return response.success ? 'text-success' : 'text-error';
  };

  if (collapsed) {
    return (
      <div className="response-viewer-collapsed">
        <button className="btn btn-secondary" onClick={onToggle} title="Expand response viewer">
          <ChevronLeft size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="response-viewer">
      <div className="response-header">
        <div className="response-title">
          <h3>Response</h3>
          {response && (
            <div className="response-status">
              {getStatusIcon()}
              <span className={clsx('status-text', getStatusColor())}>
                {getStatusText()}
              </span>
              {response.statusCode && (
                <span className="status-code">({response.statusCode})</span>
              )}
            </div>
          )}
        </div>
        
        <button className="btn btn-secondary btn-sm" onClick={onToggle} title="Collapse response viewer">
          <ChevronRight size={16} />
        </button>
      </div>

      {response && (
        <div className="response-meta">
          {response.responseTime && (
            <div className="response-time">
              <Clock size={14} />
              <span>{response.responseTime}ms</span>
            </div>
          )}
          
          <div className="view-mode-toggle">
            <button
              className={clsx('btn btn-sm', viewMode === 'formatted' ? 'btn-primary' : 'btn-secondary')}
              onClick={() => setViewMode('formatted')}
            >
              <Eye size={14} />
              Formatted
            </button>
            <button
              className={clsx('btn btn-sm', viewMode === 'raw' ? 'btn-primary' : 'btn-secondary')}
              onClick={() => setViewMode('raw')}
            >
              <Code size={14} />
              Raw
            </button>
          </div>
        </div>
      )}

      <div className="response-content">
        {!response ? (
          <div className="no-response">
            <p className="text-muted">Run a request to see the response</p>
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage="xml"
            value={viewMode === 'formatted' ? formatXml(response.xml) : response.xml}
            options={{
              readOnly: true,
              theme: 'vs-dark',
              fontSize: 14,
              lineNumbers: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: 'boundary',
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true
              }
            }}
          />
        )}
      </div>

      {response?.error && (
        <div className="error-details">
          <div className="error-header">
            <AlertCircle size={16} className="text-error" />
            <span className="error-title">Error Details</span>
          </div>
          <div className="error-message">
            {response.error}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;
