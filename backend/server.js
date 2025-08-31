const express = require('express')

const app = express();

const PORT = 8086;

const fs = require('fs');

const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());

const readData = () => {
    const data = fs.readFileSync('./data.json', 'utf-8');
    return JSON.parse(data);
}

const writeData = (data) => {
    fs.writeFileSync('./data.json', JSON.stringify(data));
}

app.get('/persons', (req, res) => {
    res.json(readData())
})

// GET
app.get('/person', (req, res) => {
    try {
        const personId = parseInt(req.query.personId);
        const person = readData().find(p => p.personId === personId);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json(person);
    } catch (err) {
        res.status(500).json({ err: 'Server error' });
    }
});


// POST
app.post('/person', (req, res) => {
    const { firstName, lastName, birthDate, hobbies } = req.body;
    let readDataFunction = readData();

    if (!firstName || !lastName || !birthDate || !hobbies) {
        return res.status(404).send('Some thing missing')
    }

    const newPersonId = readDataFunction.length > 0 ? readDataFunction[readDataFunction.length - 1].personId + 1 : 1;

    const newPerson = {
        personId: newPersonId,
        firstName,
        lastName,
        birthDate,
        hobbies
    }

    readDataFunction.push(newPerson)
    writeData(readDataFunction)

    res.status(201).send(newPerson)
})

// PUT
app.put('/person', (req, res) => {
    const { personId, firstName, lastName, birthDate, hobbies } = req.body;
    const readDataFunction = readData();
    const personIndex = readDataFunction.findIndex(p => p.personId === personId)

    if (personIndex < 0) {
        return res.status(404).send('404 Error - Person not found')
    }

    readDataFunction[personIndex] = { personId, firstName, lastName, birthDate, hobbies };
    writeData(readDataFunction);

    res.json(readDataFunction[personIndex])
})

// DELETE
app.delete('/person', (req, res) => {
    const personId = parseInt(req.query.personId);
    const readDataFunction = readData();
    const newPerson = readDataFunction.filter(p => p.personId !== personId);

    if (newPerson.length === readDataFunction.length) {
        return res.status(404).send('404 Error - Person not found')
    }

    writeData(newPerson);
    res.send("Person deleted")
})

app.get('/', (req, res) => {
    res.send('Welcome to the Web Development Project')
});

app.listen(PORT, () => {
    console.log(`Server is running at Port: http://localhost:${PORT}`);
});