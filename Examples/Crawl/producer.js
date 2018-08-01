const Agenda = require('agenda');

async function run() {
  const mongoConnectString = 'mongodb://localhost:27017/agendatest';
  const agenda = new Agenda({db: {address: mongoConnectString, collection: 'jobs'}});

  // Wait for agenda to connect. Should never fail since connection failures
  // should happen in the `await MongoClient.connect()` call.
  await new Promise(resolve => agenda.once('ready', resolve));

  // Schedule a job for 1 second from now and persist it to mongodb.
  // Jobs are uniquely defined by their name, in this case "hello"
  await agenda.schedule(new Date(Date.now() + 1000), 'crawl', { url : 'http://google.com' });

  console.log('Crawl job is scheduled successfully.')
  process.exit(0);
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});