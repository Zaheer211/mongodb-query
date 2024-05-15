
Run the project by running the following command in the terminal:
Make sure MongoDB is running on the default port 27017
It will create a database named `test` and collection named `projects` and `threads`

```bash
npm install
node index.js
```

## Structure

Make a GET request to the following endpoint to add [count] random projects:
With following JSON structure,
```json
{
  "title": "Some title 0",
  "description": "Description 0",
  "customFields": [ // length of customFields will be random between 1 and 10
    {
      "name": "Custom field 0",
      "value": "Custom value 0"
    },
    {
      "name": "Custom field 1",
      "value": "Custom value 1"
    },
    {
      "name": "Custom field 2",
      "value": ["module-1", "module-2", "module-3"] // This will be randomly set as module-1 to 4 with random length upto 5
    }
  ]
}
```


```bash
http://localhost:3000/add-random-projects?count=10
```

Make a GET request to the following endpoint to add [count] random threads with similar structure as projects:

```bash
http://localhost:3000/add-random-threads?count=10

```

Make a GET request to the following endpoint to delete/clear all projects:

```bash
http://localhost:3000/delete-projects

```