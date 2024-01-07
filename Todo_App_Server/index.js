const express = require('express');
const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const app = express();
const PORT = 3000;
const uri = 'mongodb+srv://admin:XX5Z6wpskUN2V0nI@cluster0.nnegxht.mongodb.net/';

app.use(express.json());


// Get all Todos
app.get('/getTodos', async (req, res) => {
    const dbClient = new MongoClient(uri);

    try {
        await dbClient.connect();
        const database = dbClient.db('todo-clone');
        const collection = database.collection('todos');

        const response = await collection.find().toArray();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error)
    } finally {
        await dbClient.close()
    }
});

// Create a Todo
app.post('/createTodo', async (req, res) => {
    const { title, description } = req.body;
    const dbClient = new MongoClient(uri);

    try {
        await dbClient.connect();
        const database = dbClient.db('todo-clone');
        const collection = database.collection('todos');

        const newTodoId = uuid.v4();

        const createdTodo = await collection.insertOne({
            todo_id: newTodoId,
            title: title,
            description: description,
            completed: false
        })

        res.status(201).json({ message: `Inserted Todo Id is ${newTodoId}` });
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await dbClient.close();
    }
});

//Complete a todo
app.put('/updateTodo', async (req, res) => {
    const dbClient = new MongoClient(uri);
    const todoId = req.query.todo_id;
    const {title, description, completed} = req.body;

    try {
        await dbClient.connect();
        const database = dbClient.db('todo-clone');
        const collection = database.collection('todos');

        const filter = { todo_id: todoId };
        const updateDocument = { $set: { title: title, description: description, completed: completed } };

        const result = await collection.updateOne(filter, updateDocument);

        // Check if a document was found and updated
        if (result.matchedCount === 0) {
            res.status(404).json({ message: "Todo not found" });
        } else {
            res.status(200).json({ message: "Todo updated successfully", matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await dbClient.close();
    }
})

app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`) });
