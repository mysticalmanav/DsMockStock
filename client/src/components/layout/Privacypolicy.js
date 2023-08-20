import React from 'react';

const PrivacyPolicy = () => {
  const effectiveDate = "August 21, 2023"; 
  
  return (
    <div className="container mt-5">
      <h2>Privacy Policy</h2>
      <p>
        At mysticalmanav, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.
      </p>
      <p>
        <strong>Information We Collect:</strong> When you visit our website, we may collect certain information such as your IP address, browser type, and pages visited. We do not collect personally identifiable information unless you provide it voluntarily through forms or user accounts.
      </p>
      <p>
        <strong>How We Use Your Information:</strong> Any information collected is used to improve our website, provide relevant content, and enhance your user experience. We do not sell, trade, or share your personal information with third parties.
      </p>
      <p>
        <strong>Cookies:</strong> We may use cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, but this may limit certain features on our website.
      </p>
      <p>
        <strong>Security:</strong> We take measures to protect your information, but remember that no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
      </p>
      <p>
        <strong>Changes to this Policy:</strong> We may update this Privacy Policy from time to time. You are advised to review this page periodically for any changes. Your continued use of our website constitutes your acceptance of these changes.
      </p>
      <p>
        If you have any questions or concerns about our Privacy Policy, please don't hesitate to <a href="#footer">contact us</a>.
      </p>
      <p>
        Effective Date: {effectiveDate}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
