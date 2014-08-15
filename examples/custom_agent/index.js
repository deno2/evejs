var eve = require('../../index');
var MyAgent = require('./MyAgent');

var config = {
  transports: [
    {id: 123, type: 'local'}
  ]
};
var services = new eve.ServiceManager(config);

var agent1 = new MyAgent('agent1', services);
var agent2 = new MyAgent('agent2', services);

// send a message to agent 1
agent2.sayHi('agent1');
