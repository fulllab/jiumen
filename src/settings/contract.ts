exports.arConfig = () => {
  return {
    arlocal: {
      arweave: {
        host: 'localhost',
        protocol: 'http',
      },
      arLocal: {
        port: 1988,
        showLogs: false,
      },
    },
    production: {
      arweave: {
        host: 'dh48zl0solow5.cloudfront.net',
        port: 443,
        protocol: 'https',
      },
    },
  }
}
