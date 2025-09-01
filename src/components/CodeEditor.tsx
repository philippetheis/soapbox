import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, AlertCircle, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { SOAPScenario } from '../types';
import clsx from 'clsx';

interface CodeEditorProps {
  content: string;
  isReadOnly: boolean;
  showResolveButton: boolean;
  hasRun: boolean;
  isResolved: boolean;
  onRun: () => void;
  onResolve: () => void;
  selectedScenario: SOAPScenario | null;
  showTemporaryHighlight: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  isReadOnly,
  showResolveButton,
  hasRun,
  isResolved,
  onRun,
  onResolve,
  selectedScenario,
  showTemporaryHighlight
}) => {
  const editorRef = useRef<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const getStatusIcon = () => {
    if (showTemporaryHighlight) {
      return <Loader2 size={16} className="text-error animate-spin" />;
    }
    if (isResolved) {
      return <CheckCircle size={16} className="text-success" />;
    }
    if (hasRun && !showResolveButton) {
      return <AlertCircle size={16} className="text-error" />;
    }
    return null;
  };

  const getStatusText = () => {
    if (showTemporaryHighlight) {
      return 'Running...';
    }
    if (isResolved) {
      return 'Resolved';
    }
    if (hasRun && !showResolveButton) {
      return 'Error';
    }
    if (hasRun) {
      return 'Ready to resolve';
    }
    return 'Ready to run';
  };

  const getStatusColor = () => {
    if (showTemporaryHighlight) {
      return 'text-error';
    }
    if (isResolved) {
      return 'text-success';
    }
    if (hasRun && !showResolveButton) {
      return 'text-error';
    }
    if (hasRun) {
      return 'text-warning';
    }
    return 'text-muted';
  };

  return (
    <div className={clsx('code-editor', { 'temporary-highlight': showTemporaryHighlight })}>
      <div className="editor-header">
        <div className="editor-title">
          <h3>SOAP Request</h3>
          {selectedScenario && (
            <div className="scenario-info">
              <span className="scenario-name">{selectedScenario.name}</span>
              <span className="scenario-category">{selectedScenario.category}</span>
            </div>
          )}
        </div>
        
        <div className="editor-status">
          {getStatusIcon()}
          <span className={clsx('status-text', getStatusColor())}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="xml"
          value={content}
          onMount={handleEditorDidMount}
          options={{
            readOnly: isReadOnly,
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
      </div>

      <div className="editor-actions">
        <button
          className="btn btn-primary"
          onClick={onRun}
          disabled={!selectedScenario}
        >
          <Play size={16} />
          Run Request
        </button>
        
        {showResolveButton && (
          <button
            className="btn btn-success"
            onClick={onResolve}
          >
            <CheckCircle size={16} />
            Resolve Issue
          </button>
        )}
      </div>

      {selectedScenario?.explanation && (
        <div className="explanation-section">
          <button
            className="explanation-toggle"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Explanation</span>
          </button>
          
          {showExplanation && (
            <div className="explanation-content">
              <p>{selectedScenario.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
