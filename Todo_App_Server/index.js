const express = require('express');
const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const PORT = 3000;
const uri = 'mongodb+srv://<username>:<password>@cluster0.nnegxht.mongodb.net/'; // Add your username and password

app.use(cors())
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

//Update a todo
app.put('/updateTodo', async (req, res) => {
    const dbClient = new MongoClient(uri);
    const todoId = req.query.todo_id;
    const { title, description, completed } = req.body;

    try {
        await dbClient.connect();
        const database = dbClient.db('todo-clone');
        const collection = database.collection('todos');

        const filter = { todo_id: todoId };
        //const updateDocument = { $set: { title: title, description: description, completed: completed } };

        let updateDocument = { $set: {} };

        if (title !== undefined) updateDocument.$set.title = title;
        if (description !== undefined) updateDocument.$set.description = description;
        if (completed !== undefined) updateDocument.$set.completed = completed;

        if (Object.keys(updateDocument.$set).length === 0) {
            res.status(400).json({ "message": 'No fields provided for update' });
            return;
        }

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

// Delete todo
app.delete('/deleteTodo', async (req, res) => {
    const todoId = req.query.todo_id;
    const dbClient = new MongoClient(uri);

    try {
        await dbClient.connect();
        const database = dbClient.db('todo-clone');
        const collection = database.collection('todos');

        const query = { todo_id: todoId };
        const result = await collection.deleteOne(query);

        console.log(result);

        if (result.deletedCount === 0) {
            // No document was deleted
            res.status(404).json({ message: "Todo not found or already deleted" });
        } else {
            // Document was deleted
            res.status(200).json({ message: "Todo deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error: error.message });
    } finally {
        await dbClient.close();
    }
});


app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`) });
