const url = {
  host: '127.0.0.1',
  port: '8123',
  auth: 'default:CH0rd@SAIC',
  method: 'GET',
  path: '/?database=&query=show%20databases%20FORMAT%20JSON',
  query: { database: '', query: 'show databases FORMAT JSON' }
};

console.log(new URL('http://default:CH0rd@SAIC@127.0.0.1:8123/?database=&query=show%20databases%20FORMAT%20JSON'));
