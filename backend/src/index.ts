import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Todo } from './entity/Todo';

createConnection()
  .then(async (connection) => {
    console.log('Inserting a new user into the database...');
    const user = new Todo();
    user.todo = 'Timber';
    user.done = false;
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(Todo);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));
