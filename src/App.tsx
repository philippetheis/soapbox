import React, { useState, useEffect } from 'react';
import { AppState, SOAPScenario, SOAPResponse } from './types';
import { sampleScenarios } from './data/sampleScenarios';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import ResponseViewer from './components/ResponseViewer';
import ScenarioModal from './components/ScenarioModal';
import './styles/globals.css';
import './styles/App.css';
import './styles/Sidebar.css';
import './styles/CodeEditor.css';
import './styles/ResponseViewer.css';
import './styles/ScenarioModal.css';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    scenarios: sampleScenarios,
    selectedScenario: null,
    editorState: {
      content: '',
      isReadOnly: true,
      showResolveButton: false,
      hasRun: false,
      isResolved: false
    },
    response: null,
    sidebarCollapsed: false,
    rightPanelCollapsed: false,
    searchQuery: '',
    selectedCategory: 'All',
    selectedDifficulty: 'All'
  });

  const [rightPanelWidth, setRightPanelWidth] = useState(25); // percentage
  const [isResizing, setIsResizing] = useState(false);

  const [showScenarioModal, setShowScenarioModal] = useState(false);

  // Load scenarios from localStorage on mount
  useEffect(() => {
    const savedScenarios = localStorage.getItem('soap-scenarios');
    if (savedScenarios) {
      try {
        const parsed = JSON.parse(savedScenarios);
        setAppState(prev => ({
          ...prev,
          scenarios: parsed.map((s: any) => ({
            ...s,
            createdAt: new Date(s.createdAt),
            updatedAt: new Date(s.updatedAt)
          }))
        }));
      } catch (error) {
        console.error('Failed to load saved scenarios:', error);
      }
    }
  }, []);

  // Save scenarios to localStorage when they change
  useEffect(() => {
    localStorage.setItem('soap-scenarios', JSON.stringify(appState.scenarios));
  }, [appState.scenarios]);

  const selectScenario = (scenario: SOAPScenario) => {
    setAppState(prev => ({
      ...prev,
      selectedScenario: scenario,
      editorState: {
        content: scenario.requestXml,
        isReadOnly: true,
        showResolveButton: false,
        hasRun: false,
        isResolved: false
      },
      response: null
    }));
  };

  const runRequest = async () => {
    if (!appState.selectedScenario) return;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const response: SOAPResponse = {
      success: false,
      xml: appState.selectedScenario.errorXml || appState.selectedScenario.responseXml,
      statusCode: appState.selectedScenario.errorXml ? 400 : 200,
      error: appState.selectedScenario.errorXml ? 'Request failed' : undefined,
      responseTime: Math.floor(Math.random() * 500) + 200
    };

    setAppState(prev => ({
      ...prev,
      response,
      editorState: {
        ...prev.editorState,
        hasRun: true,
        showResolveButton: !response.success && !!appState.selectedScenario?.fixedRequestXml
      }
    }));
  };

  const resolveScenario = () => {
    if (!appState.selectedScenario?.fixedRequestXml) return;

    setAppState(prev => ({
      ...prev,
      editorState: {
        content: appState.selectedScenario!.fixedRequestXml!,
        isReadOnly: true,
        showResolveButton: false,
        hasRun: true,
        isResolved: true
      }
    }));

    // Auto-run the fixed request
    setTimeout(() => {
      const response: SOAPResponse = {
        success: true,
        xml: appState.selectedScenario!.responseXml,
        statusCode: 200,
        responseTime: Math.floor(Math.random() * 300) + 150
      };

      setAppState(prev => ({
        ...prev,
        response
      }));
    }, 500);
  };

  const addScenario = (scenarioData: any) => {
    const newScenario: SOAPScenario = {
      id: `custom-${Date.now()}`,
      ...scenarioData,
      tags: scenarioData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAppState(prev => ({
      ...prev,
      scenarios: [...prev.scenarios, newScenario]
    }));

    setShowScenarioModal(false);
  };

  const exportScenarios = () => {
    const dataStr = JSON.stringify(appState.scenarios, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'soap-scenarios.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importScenarios = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        const scenarios = imported.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        }));
        setAppState(prev => ({
          ...prev,
          scenarios: [...prev.scenarios, ...scenarios]
        }));
      } catch (error) {
        alert('Failed to import scenarios. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const toggleSidebar = () => {
    setAppState(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  };

  const toggleRightPanel = () => {
    setAppState(prev => ({ ...prev, rightPanelCollapsed: !prev.rightPanelCollapsed }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const containerWidth = window.innerWidth;
    const sidebarWidth = appState.sidebarCollapsed ? 40 : 300;
    const availableWidth = containerWidth - sidebarWidth;
    const mouseX = e.clientX - sidebarWidth;
    const newWidth = Math.max(20, Math.min(60, (mouseX / availableWidth) * 100));
    
    setRightPanelWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  return (
    <div className={`app ${isResizing ? 'resizing' : ''}`}>
      <Sidebar
        scenarios={appState.scenarios}
        selectedScenario={appState.selectedScenario}
        onSelectScenario={selectScenario}
        collapsed={appState.sidebarCollapsed}
        onToggle={toggleSidebar}
        searchQuery={appState.searchQuery}
        selectedCategory={appState.selectedCategory}
        selectedDifficulty={appState.selectedDifficulty}
        onSearchChange={(query) => setAppState(prev => ({ ...prev, searchQuery: query }))}
        onCategoryChange={(category) => setAppState(prev => ({ ...prev, selectedCategory: category }))}
        onDifficultyChange={(difficulty) => setAppState(prev => ({ ...prev, selectedDifficulty: difficulty }))}
        onAddScenario={() => setShowScenarioModal(true)}
        onExport={exportScenarios}
        onImport={importScenarios}
      />
      
      <div className="main-content">
        <div 
          className="code-editor-container"
          style={{ width: `${100 - rightPanelWidth}%` }}
        >
          <CodeEditor
            content={appState.editorState.content}
            isReadOnly={appState.editorState.isReadOnly}
            showResolveButton={appState.editorState.showResolveButton}
            hasRun={appState.editorState.hasRun}
            isResolved={appState.editorState.isResolved}
            onRun={runRequest}
            onResolve={resolveScenario}
            selectedScenario={appState.selectedScenario}
          />
        </div>
        
        {!appState.rightPanelCollapsed && (
          <div 
            className="resize-handle"
            onMouseDown={handleMouseDown}
          />
        )}
        
        <div 
          className="response-viewer-container"
          style={{ width: `${rightPanelWidth}%` }}
        >
          <ResponseViewer
            response={appState.response}
            collapsed={appState.rightPanelCollapsed}
            onToggle={toggleRightPanel}
          />
        </div>
      </div>

      {showScenarioModal && (
        <ScenarioModal
          onClose={() => setShowScenarioModal(false)}
          onSave={addScenario}
        />
      )}
    </div>
  );
};

export default App;
