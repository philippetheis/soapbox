# SoapBox - SOAP Integration Support Training Tool

SoapBox is an interactive web application designed to help software engineers master SOAP API integration through hands-on training with realistic error scenarios. This comprehensive training platform simulates common integration issues in payment systems and guides users through debugging and resolution processes.

## Features

### 🎯 Core Functionality
- **Interactive Scenario System**: Browse categorized SOAP error scenarios
- **Code Editor**: Syntax-highlighted SOAP XML editor with Monaco Editor
- **Response Viewer**: Real-time response display with error highlighting
- **Resolution System**: Step-by-step fix demonstration with explanations
- **Custom Scenarios**: Create, save, and share your own scenarios
- **Import/Export**: Backup and restore scenario collections

### 📚 Scenario Categories
- **XML Structure Errors**: Malformed XML, missing elements, namespace issues
- **Authentication Issues**: Missing credentials, expired tokens, wrong methods
- **Certificate Problems**: SSL certificate errors, validation failures
- **Server-side Errors**: HTTP 500 errors, service unavailability, rate limiting
- **Timeout Issues**: Connection timeouts, request timeouts
- **Payment-specific Errors**: Invalid amounts, currency issues, card validation

### 🎨 User Interface
- **VS Code-inspired Design**: Dark theme with familiar color palette
- **Three-panel Layout**: Sidebar, code editor, and response viewer
- **Responsive Design**: Works on desktop and tablet devices
- **Keyboard Shortcuts**: Efficient navigation and interaction
- **Collapsible Panels**: Maximize workspace when needed

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd soapbox
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Usage

### Running Scenarios
1. **Select a Scenario**: Choose from the categorized list in the left sidebar
2. **Run the Request**: Click the "Run Request" button to execute the SOAP call
3. **View Response**: See the error response in the right panel
4. **Resolve the Issue**: Click "Resolve Issue" to see the corrected request
5. **Learn**: Read the explanation to understand what was wrong and how it was fixed

### Creating Custom Scenarios
1. Click "Add Scenario" in the sidebar
2. Fill in the scenario details:
   - Name and description
   - Category and difficulty level
   - Request XML (with intentional errors)
   - Error response XML
   - Success response XML
   - Fixed request XML (optional)
   - Explanation of the issue
   - Tags for organization
3. Save the scenario to your collection

### Import/Export
- **Export**: Download your scenarios as a JSON file
- **Import**: Upload scenario collections from JSON files
- **Share**: Exchange scenario files with team members

## Technical Details

### Architecture
- **Frontend**: React 18 with TypeScript
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Styling**: Custom CSS with CSS variables for theming
- **State Management**: React hooks and local state
- **Storage**: LocalStorage for scenario persistence

### Project Structure
```
soapbox/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.tsx     # Scenario list and controls
│   │   ├── CodeEditor.tsx  # SOAP XML editor
│   │   ├── ResponseViewer.tsx # Response display
│   │   └── ScenarioModal.tsx  # Scenario creation form
│   ├── data/               # Sample scenarios and data
│   ├── styles/             # CSS stylesheets
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
├── public/                 # Static assets
├── package.json            # Dependencies
└── README.md              # Documentation
```

### Key Components

#### Sidebar
- Scenario list with search and filtering
- Category and difficulty filters
- Import/export functionality
- Add scenario button

#### CodeEditor
- Monaco Editor integration
- XML syntax highlighting
- Read-only and editable modes
- Run and resolve buttons
- Explanation panel

#### ResponseViewer
- Response display with syntax highlighting
- Formatted and raw view modes
- Error details and status indicators
- Response time display

## Sample Scenarios

The application includes several pre-built scenarios covering common SOAP integration issues:

1. **Malformed XML Syntax** - Missing closing tags
2. **Missing Authentication Header** - No WS-Security credentials
3. **Expired SSL Certificate** - Certificate validation failure
4. **Internal Server Error** - Database connection timeout
5. **Invalid Payment Amount** - Amount exceeds limits

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Integration with real SOAP testing environments
- Collaborative scenario sharing platform
- Progress tracking and achievements
- Video tutorials for complex scenarios
- API documentation integration
- Multi-language support for error messages
- Advanced scenario validation
- Scenario difficulty progression
- User authentication and cloud storage
- Real-time collaboration features

## Support

For questions, issues, or feature requests, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## Acknowledgments

- Monaco Editor team for the excellent code editor
- VS Code team for design inspiration
- SOAP specification contributors
- Open source community for various dependencies
