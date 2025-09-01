import { SOAPScenario } from '../types';

export const sampleScenarios: SOAPScenario[] = [
  {
    id: 'xml-malformed-1',
    name: 'Malformed XML Syntax',
    description: 'XML request contains syntax errors that prevent parsing',
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
      <faultstring>XML parsing error: Unclosed tag on line 8</faultstring>
      <detail>
        <error>Malformed XML: Missing closing tag for 'ProcessPayment'</error>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The XML was missing the closing tag for the ProcessPayment element. All XML elements must be properly closed with a corresponding closing tag.',
    tags: ['xml', 'syntax', 'parsing'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'auth-missing-1',
    name: 'Missing Authentication Header',
    description: 'SOAP request lacks required authentication credentials',
    category: 'Authentication Issues',
    difficulty: 'Beginner',
    requestXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
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
      <faultstring>Authentication required</faultstring>
      <detail>
        <error>Missing authentication credentials in SOAP header</error>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The SOAP request was missing the required authentication header. Payment APIs typically require WS-Security authentication in the SOAP header with username and password credentials.',
    tags: ['authentication', 'security', 'header'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cert-expired-1',
    name: 'Expired SSL Certificate',
    description: 'Client certificate has expired, causing SSL handshake failure',
    category: 'Certificate Problems',
    difficulty: 'Intermediate',
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
    errorXml: `HTTP/1.1 500 Internal Server Error
Content-Type: text/xml; charset=utf-8

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>SSL Certificate validation failed</faultstring>
      <detail>
        <error>Client certificate has expired on 2023-12-31</error>
        <errorCode>CERT_EXPIRED</errorCode>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The client SSL certificate used for authentication has expired. You need to obtain a new certificate from your certificate authority and update your client configuration.',
    tags: ['ssl', 'certificate', 'security', 'expired'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'server-error-1',
    name: 'Internal Server Error',
    description: 'Server encounters an unexpected error during payment processing',
    category: 'Server-side Errors',
    difficulty: 'Intermediate',
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
    errorXml: `HTTP/1.1 500 Internal Server Error
Content-Type: text/xml; charset=utf-8

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>Internal server error</faultstring>
      <detail>
        <error>Database connection timeout</error>
        <errorCode>DB_TIMEOUT</errorCode>
        <timestamp>2024-01-15T10:30:00Z</timestamp>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'This is a server-side error caused by a database connection timeout. The request itself is valid, but the server infrastructure is experiencing issues. This typically requires server-side investigation and may need to be retried later.',
    tags: ['server', 'database', 'timeout', 'infrastructure'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'payment-invalid-amount-1',
    name: 'Invalid Payment Amount',
    description: 'Payment amount exceeds maximum allowed limit',
    category: 'Payment-specific Errors',
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
      <amount>999999.99</amount>
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
      <faultstring>Invalid payment amount</faultstring>
      <detail>
        <error>Amount exceeds maximum limit of $10,000.00</error>
        <errorCode>AMOUNT_EXCEEDED</errorCode>
        <maxAmount>10000.00</maxAmount>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The payment amount of $999,999.99 exceeds the maximum allowed limit of $10,000.00. Payment processors typically have transaction limits for security and risk management purposes.',
    tags: ['payment', 'amount', 'validation', 'limits'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'namespace-wrong-1',
    name: 'Incorrect Namespace Declaration',
    description: 'SOAP request uses wrong namespace for payment operations',
    category: 'XML Structure Errors',
    difficulty: 'Intermediate',
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
    <ProcessPayment xmlns="http://wrong.namespace.com/">
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
      <faultstring>Unknown operation: ProcessPayment</faultstring>
      <detail>
        <error>Namespace 'http://wrong.namespace.com/' not recognized</error>
        <errorCode>UNKNOWN_NAMESPACE</errorCode>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The namespace declaration was incorrect. SOAP services require the exact namespace URI to identify the service and operations. Using the wrong namespace causes the server to not recognize the operation.',
    tags: ['xml', 'namespace', 'soap', 'operation'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'auth-expired-1',
    name: 'Expired Authentication Token',
    description: 'Authentication token has expired and needs renewal',
    category: 'Authentication Issues',
    difficulty: 'Intermediate',
    requestXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:BinarySecurityToken EncodingType="wsse:Base64Binary" ValueType="wsse:X509v3">
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </wsse:BinarySecurityToken>
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
      <faultstring>Authentication token expired</faultstring>
      <detail>
        <error>Token expired at 2024-01-15T10:00:00Z</error>
        <errorCode>TOKEN_EXPIRED</errorCode>
        <expiredAt>2024-01-15T10:00:00Z</expiredAt>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:BinarySecurityToken EncodingType="wsse:Base64Binary" ValueType="wsse:X509v3">
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </wsse:BinarySecurityToken>
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
    explanation: 'The authentication token has expired. You need to obtain a new token from the authentication service before making API calls. Tokens typically have a limited lifespan for security reasons.',
    tags: ['authentication', 'token', 'expired', 'security'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cert-self-signed-1',
    name: 'Self-Signed Certificate Rejected',
    description: 'Server rejects self-signed SSL certificate',
    category: 'Certificate Problems',
    difficulty: 'Advanced',
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
    errorXml: `HTTP/1.1 403 Forbidden
Content-Type: text/xml; charset=utf-8

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>SSL Certificate validation failed</faultstring>
      <detail>
        <error>Self-signed certificate not allowed</error>
        <errorCode>CERT_SELF_SIGNED</errorCode>
        <certificateIssuer>CN=Self-Signed-Cert</certificateIssuer>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The server rejected the self-signed SSL certificate. Production payment systems require certificates from trusted Certificate Authorities (CA) for security. You need to obtain a valid certificate from a trusted CA.',
    tags: ['ssl', 'certificate', 'self-signed', 'ca', 'security'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'server-rate-limit-1',
    name: 'Rate Limit Exceeded',
    description: 'API rate limit has been exceeded for the current time window',
    category: 'Server-side Errors',
    difficulty: 'Intermediate',
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
    errorXml: `HTTP/1.1 429 Too Many Requests
Content-Type: text/xml; charset=utf-8
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>Rate limit exceeded</faultstring>
      <detail>
        <error>Maximum 100 requests per hour exceeded</error>
        <errorCode>RATE_LIMIT_EXCEEDED</errorCode>
        <retryAfter>3600</retryAfter>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The API rate limit has been exceeded. You need to wait for the rate limit window to reset or implement request throttling in your application. Check the Retry-After header for when you can make requests again.',
    tags: ['rate-limit', 'throttling', 'api-limits', 'retry'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'timeout-connection-1',
    name: 'Connection Timeout',
    description: 'Connection to the payment service times out',
    category: 'Timeout Issues',
    difficulty: 'Intermediate',
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
    errorXml: `Connection timeout after 30 seconds
Error: ETIMEDOUT
Code: ETIMEDOUT
Host: payment.example.com
Port: 443`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The connection to the payment service timed out. This could be due to network issues, server overload, or firewall restrictions. Implement retry logic with exponential backoff and consider increasing timeout values.',
    tags: ['timeout', 'connection', 'network', 'retry'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'payment-currency-1',
    name: 'Unsupported Currency Code',
    description: 'Payment request uses an unsupported currency code',
    category: 'Payment-specific Errors',
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
      <currency>XYZ</currency>
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
      <faultstring>Unsupported currency code</faultstring>
      <detail>
        <error>Currency 'XYZ' is not supported</error>
        <errorCode>UNSUPPORTED_CURRENCY</errorCode>
        <supportedCurrencies>USD,EUR,GBP,CAD,AUD</supportedCurrencies>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The currency code "XYZ" is not supported by the payment processor. Use a valid ISO 4217 currency code like USD, EUR, GBP, etc. Check the API documentation for supported currencies.',
    tags: ['payment', 'currency', 'validation', 'iso4217'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'xml-encoding-1',
    name: 'Invalid Character Encoding',
    description: 'XML request contains invalid character encoding',
    category: 'XML Structure Errors',
    difficulty: 'Advanced',
    requestXml: `<?xml version="1.0" encoding="ISO-8859-1"?>
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
      <description>Payment for café</description>
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
      <faultstring>Invalid character encoding</faultstring>
      <detail>
        <error>Character encoding 'ISO-8859-1' not supported</error>
        <errorCode>INVALID_ENCODING</errorCode>
        <supportedEncodings>UTF-8,UTF-16</supportedEncodings>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
      <description>Payment for café</description>
    </ProcessPayment>
  </soap:Body>
</soap:Envelope>`,
    explanation: 'The XML declaration specifies an unsupported character encoding. Most modern SOAP services require UTF-8 encoding. Change the encoding declaration to UTF-8 and ensure your XML content is properly encoded.',
    tags: ['xml', 'encoding', 'utf-8', 'character-set'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'auth-wrong-method-1',
    name: 'Wrong Authentication Method',
    description: 'Using incorrect authentication method for the service',
    category: 'Authentication Issues',
    difficulty: 'Advanced',
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
      <faultstring>Authentication method not supported</faultstring>
      <detail>
        <error>UsernameToken authentication not allowed for this service</error>
        <errorCode>AUTH_METHOD_NOT_SUPPORTED</errorCode>
        <supportedMethods>X509Certificate,SamlToken</supportedMethods>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:BinarySecurityToken EncodingType="wsse:Base64Binary" ValueType="wsse:X509v3">
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </wsse:BinarySecurityToken>
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
    explanation: 'The service requires X509 certificate authentication instead of username/password. Different payment processors use different authentication methods. Check the API documentation for the required authentication method.',
    tags: ['authentication', 'x509', 'certificate', 'method'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'server-maintenance-1',
    name: 'Service Temporarily Unavailable',
    description: 'Payment service is under maintenance',
    category: 'Server-side Errors',
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
    errorXml: `HTTP/1.1 503 Service Unavailable
Content-Type: text/xml; charset=utf-8
Retry-After: 3600

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>Service temporarily unavailable</faultstring>
      <detail>
        <error>Payment service is under scheduled maintenance</error>
        <errorCode>SERVICE_UNAVAILABLE</errorCode>
        <maintenanceWindow>2024-01-15T02:00:00Z to 2024-01-15T04:00:00Z</maintenanceWindow>
        <retryAfter>3600</retryAfter>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The payment service is temporarily unavailable due to scheduled maintenance. Check the Retry-After header to know when to retry. Implement proper error handling for maintenance windows in your application.',
    tags: ['maintenance', 'unavailable', 'retry', 'scheduled'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'payment-card-invalid-1',
    name: 'Invalid Card Number Format',
    description: 'Credit card number format is invalid',
    category: 'Payment-specific Errors',
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
      <cardNumber>1234-5678-9012-3456</cardNumber>
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
      <faultstring>Invalid card number format</faultstring>
      <detail>
        <error>Card number must be 16 digits without spaces or dashes</error>
        <errorCode>INVALID_CARD_FORMAT</errorCode>
        <expectedFormat>16 digits, no separators</expectedFormat>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
    fixedRequestXml: `<?xml version="1.0" encoding="UTF-8"?>
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
    explanation: 'The card number contains dashes which are not allowed. Payment processors typically require card numbers as continuous digits without any separators. Remove all spaces, dashes, and other formatting characters.',
    tags: ['payment', 'card', 'validation', 'format'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];
