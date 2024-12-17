const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const booksFilePath = path.join(__dirname, 'books.json');
const customersFilePath = path.join(__dirname, 'customers.json');

const readData = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

let books = readData(booksFilePath);
let customers = readData(customersFilePath);
let bookIdCounter = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
let customerIdCounter = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.post('/books', (req, res) => {
    const { title, author, isPicked = false, pickingDate = null, pickedBy = null } = req.body;
    const newBook = { id: bookIdCounter++, title, author, isPicked, pickingDate, pickedBy };
    books.push(newBook);
    writeData(booksFilePath, books);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        const { title, author, isPicked, pickingDate, pickedBy } = req.body;
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (isPicked !== undefined) book.isPicked = isPicked;
        if (pickingDate !== undefined) book.pickingDate = pickingDate;
        if (pickedBy !== undefined) book.pickedBy = pickedBy;
        writeData(booksFilePath, books);
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        writeData(booksFilePath, books);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});

app.post('/customers', (req, res) => {
    const { firstName, lastName, email, phone, pickedBooksId = [] } = req.body;
    const newCustomer = { id: customerIdCounter++, firstName, lastName, email, phone, pickedBooksId };
    customers.push(newCustomer);
    writeData(customersFilePath, customers);
    res.status(201).json(newCustomer);
});

app.put('/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (customer) {
        const { firstName, lastName, email, phone, pickedBooksId } = req.body;
        if (firstName !== undefined) customer.firstName = firstName;
        if (lastName !== undefined) customer.lastName = lastName;
        if (email !== undefined) customer.email = email;
        if (phone !== undefined) customer.phone = phone;
        if (pickedBooksId !== undefined) customer.pickedBooksId = pickedBooksId;
        writeData(customersFilePath, customers);
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});

app.delete('/customers/:id', (req, res) => {
    const customerIndex = customers.findIndex(c => c.id === parseInt(req.params.id));
    if (customerIndex !== -1) {
        customers.splice(customerIndex, 1);
        writeData(customersFilePath, customers);
        res.json({ message: 'Customer deleted successfully' });
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
