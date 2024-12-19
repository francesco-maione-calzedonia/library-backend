**Set NVM to use at least version 23:**
```
nvm install 23
nvm use 23
```

**Prepare the repo with required dependencies**
```
npm install express
```

**Run the local server**
```
node app.js
```

You can test the endpoints with Postman using the url displayed in the output.

# Library Web App API Documentation

## Base URL
`http://localhost:3000`

## Books Endpoints

### Get All Books
**GET** `/books`

Returns a list of all books. If a book is picked, the `pickedBy` field contains the full customer object.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "isPicked": true,
    "pickingDate": "2024-12-18",
    "pickedBy": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "pickedBooksId": [1]
    }
  }
]
```

### Get a Single Book
**GET** `/books/:id`

Returns the details of a single book by its ID. If the book is picked, the `pickedBy` field contains the full customer object.

**Response:**
```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "isPicked": true,
  "pickingDate": "2024-12-18",
  "pickedBy": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "pickedBooksId": [1]
  }
}
```

### Create a New Book
**POST** `/books`

Creates a new book.

**Request Body:**
```json
{
  "title": "New Book Title",
  "author": "Author Name",
  "isPicked": false,
  "pickingDate": null,
  "pickedBy": null
}
```

**Response:**
```json
{
  "id": 2,
  "title": "New Book Title",
  "author": "Author Name",
  "isPicked": false,
  "pickingDate": null,
  "pickedBy": null
}
```

### Update a Book
**PUT** `/books/:id`

Updates the details of a book.

**Request Body:**
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "isPicked": true,
  "pickingDate": "2024-12-20",
  "pickedBy": 1
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "author": "Updated Author",
  "isPicked": true,
  "pickingDate": "2024-12-20",
  "pickedBy": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "pickedBooksId": [1]
  }
}
```

### Delete a Book
**DELETE** `/books/:id`

Deletes a book by its ID.

**Response:**
```json
{
  "message": "Book deleted successfully"
}
```

## Customers Endpoints

### Get All Customers
**GET** `/customers`

Returns a list of all customers.

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "pickedBooksId": [1]
  }
]
```

### Get a Single Customer
**GET** `/customers/:id`

Returns the details of a single customer by their ID.

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "pickedBooksId": [1]
}
```

### Create a New Customer
**POST** `/customers`

Creates a new customer.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "098-765-4321",
  "pickedBooksId": []
}
```

**Response:**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "098-765-4321",
  "pickedBooksId": []
}
```

### Update a Customer
**PUT** `/customers/:id`

Updates the details of a customer.

**Request Body:**
```json
{
  "firstName": "Updated First Name",
  "lastName": "Updated Last Name",
  "email": "updated.email@example.com",
  "phone": "111-222-3333",
  "pickedBooksId": [2]
}
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Updated First Name",
  "lastName": "Updated Last Name",
  "email": "updated.email@example.com",
  "phone": "111-222-3333",
  "pickedBooksId": [2]
}
```

### Delete a Customer
**DELETE** `/customers/:id`

Deletes a customer by their ID.

**Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

## Notes
- Make sure the server is running on `http://localhost:3000` before making requests.
- For `pickedBy` in books, if a customer ID is invalid or not found, it defaults to `null`.

## Changelog

### [1.1.0] - 2024-12-18
- Updated `/books` and `/books/:id` endpoints to include the full customer object in the `pickedBy` field instead of just the ID.
