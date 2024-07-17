// src/DownloadPage.js
import React from 'react';

const DownloadPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Download App</h1>
      <p style={styles.paragraph}>Click the button below to download the APK file:</p>
      <a href="/app-release.apk" download style={styles.downloadButton}>
        Download App.apk
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  downloadButton: {
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default DownloadPage;
