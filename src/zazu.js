'use strict';
const QRCode = require('qrcode')

module.exports = (pluginContext) => {
  function toQrCode(query) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(query, function (err, url) {
        resolve(url, query);
      })
    });
  }

  function toQrCodePreview(url, query) {
    return `
    <style>
      body {
        display:flex;
        align-items: center;
        justify-content: center;
        background: '#FFF'
      }
     .qr-box {
       width: 150px;
       height: 150px;
     }
     .qr-box img {
        width: 100%;
        height: 100%;
     }
    </style>
    <div class="qr-box">
      <img title="${query}" src="${url}" />
    </div>`
  }

  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      toQrCode(query).then((url) => {
        resolve([
          {
            icon: 'fa-qrcode',
            title: `Convert to QRCode`,
            value: query,
            preview: toQrCodePreview(url)
          }
        ])
      })
    })
  }
}
