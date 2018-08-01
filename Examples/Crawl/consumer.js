const Agenda = require('agenda');
const request = require('request');

async function run() {
  const mongoConnectString = 'mongodb://localhost:27017/agendatest';
  const agenda = new Agenda({db: {address: mongoConnectString, collection: 'jobs'}});

  agenda.define('crawl', (job, done) => {
    var url = job.attrs.data.url;
    request(url, (error, response, body) => {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']);
      console.log(body);
      done();
    });
  });

  await new Promise(resolve => agenda.once('ready', resolve));

  agenda.start();
}

run().catch(err => {
  console.error(error);
  process.exit(-1);
})