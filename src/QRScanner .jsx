  import React, { useState } from 'react';
  import QrScanner from '@yudiel/react-qr-scanner';

  const QRScanner = () => {
    const [data, setData] = useState('No result');

    return (
      <div>
        <QrScanner
          onResult={(result) => {
            if (result) setData(result.text);
          }}
        />
        <p>Scanned Data: {data}</p>
      </div>
    );
  };

  export default QRScanner;
