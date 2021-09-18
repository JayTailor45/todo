import 'reflect-metadata';
import { Todo } from './entity/Todo';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { validate } from 'class-validator';
import * as cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/todos', async (req: express.Request, res: express.Response) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (e) {
    return res.status(500).json(e);
  }
});

app.post('/todos', async (req: express.Request, res: express.Response) => {
  const { todo, done } = req.body;
  try {
    const todoObj = Todo.create({ todo, done });
    const errors = await validate(todoObj);
    if (errors.length > 0) {
      throw errors;
    }
    await todoObj.save();
    return res.status(201).json(todoObj);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put('/todos/:uuid', async (req: express.Request, res: express.Response) => {
  const uuid = req.params.uuid;
  const { todo, done } = req.body;
  try {
    const todoObj = await Todo.findOneOrFail({ uuid });

    todoObj.todo = todo || todoObj.todo;
    todoObj.done = done;

    await todoObj.save();

    return res.status(200).json(todoObj);
  } catch (e) {
    return res.status(500).json(e);
  }
});

app.delete(
  '/todos/:uuid',
  async (req: express.Request, res: express.Response) => {
    const uuid = req.params.uuid;
    try {
      const todo = await Todo.findOneOrFail({ uuid });
      await todo.remove();
      return res.status(204).json({ message: 'Todo Deleted' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

createConnection()
  .then((_) => {
    app.listen(5000, () => console.log(`Serer is running on port 5000`));
  })
  .catch((error) => console.log(error));