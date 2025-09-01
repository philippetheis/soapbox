import React from 'react';
import { SOAPScenario, ScenarioCategory, DifficultyLevel } from '../types';
import { Search, Plus, Download, Upload, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  scenarios: SOAPScenario[];
  selectedScenario: SOAPScenario | null;
  onSelectScenario: (scenario: SOAPScenario) => void;
  collapsed: boolean;
  onToggle: () => void;
  searchQuery: string;
  selectedCategory: ScenarioCategory | 'All';
  selectedDifficulty: DifficultyLevel | 'All';
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: ScenarioCategory | 'All') => void;
  onDifficultyChange: (difficulty: DifficultyLevel | 'All') => void;
  onAddScenario: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  scenarios,
  selectedScenario,
  onSelectScenario,
  collapsed,
  onToggle,
  searchQuery,
  selectedCategory,
  selectedDifficulty,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onAddScenario,
  onExport,
  onImport
}) => {
  const categories: (ScenarioCategory | 'All')[] = [
    'All',
    'XML Structure Errors',
    'Authentication Issues',
    'Certificate Problems',
    'Server-side Errors',
    'Timeout Issues',
    'Payment-specific Errors'
  ];

  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredScenarios = scenarios.filter(scenario => {
    const matchesSearch = scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scenario.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scenario.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || scenario.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || scenario.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-error';
      default: return 'text-muted';
    }
  };

  if (collapsed) {
    return (
      <div className="sidebar-collapsed">
        <button className="btn btn-secondary" onClick={onToggle} title="Expand sidebar">
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">SoapBox Scenarios</h2>
        <button className="btn btn-secondary btn-sm" onClick={onToggle} title="Collapse sidebar">
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="sidebar-controls">
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input search-input"
          />
        </div>

        <div className="filter-container">
          <Filter size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as ScenarioCategory | 'All')}
            className="input filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-container">
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel | 'All')}
            className="input filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="btn btn-primary btn-sm" onClick={onAddScenario}>
          <Plus size={16} />
          Add Scenario
        </button>
        
        <div className="import-export-buttons">
          <button className="btn btn-secondary btn-sm" onClick={onExport}>
            <Download size={16} />
          </button>
          <label className="btn btn-secondary btn-sm" title="Import scenarios">
            <Upload size={16} />
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div className="scenarios-list">
        {filteredScenarios.length === 0 ? (
          <div className="no-scenarios">
            <p className="text-muted">No scenarios found</p>
            <p className="text-sm text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredScenarios.map(scenario => (
            <div
              key={scenario.id}
              className={clsx(
                'scenario-item',
                selectedScenario?.id === scenario.id && 'selected'
              )}
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="scenario-header">
                <h3 className="scenario-name">{scenario.name}</h3>
                <span className={clsx('difficulty-badge', getDifficultyColor(scenario.difficulty))}>
                  {scenario.difficulty}
                </span>
              </div>
              <p className="scenario-description">{scenario.description}</p>
              <div className="scenario-meta">
                <span className="category-tag">{scenario.category}</span>
                <div className="scenario-tags">
                  {scenario.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                  {scenario.tags.length > 3 && (
                    <span className="tag">+{scenario.tags.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
