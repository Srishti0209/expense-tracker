const config = {
  env: 'development',
  port: 3000,
  mongoUri: 
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    ( '27017') +
    '/budget'
}

export default config


// To add process.env 