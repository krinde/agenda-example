const Agenda = require('agenda');

async function run() {
  const mongoConnectString = 'mongodb://localhost:27017/agendatest';
  const agenda = new Agenda({db: {address: mongoConnectString, collection: 'jobs'}});

  // Define a "job", an arbitrary function that agenda can execute
  agenda.define('hello', () => {
    console.log('Hello, World!');
  });

  // Wait for agenda to connect. Should never fail since connection failures
  // should happen in the `await MongoClient.connect()` call.
  await new Promise(resolve => agenda.once('ready', resolve));

  // `start()` is how you tell agenda to start processing jobs. If you just
  // want to produce (AKA schedule) jobs then don't call `start()`
  agenda.start();
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});