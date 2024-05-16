
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
      "value": [{"name": "module-1", "data": "some other data"}] // This will be randomly set as module-1 to 5
      // As type of value is array of any type so it can be like ["module-1", "module-2"]
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

Make GET request to the following endpoints to delete/clear all projects/threads:

```bash
http://localhost:3000/delete-projects
http://localhost:3000/delete-threads

```

Make a GET request to the following endpoint to get stats for "module-1":

  ```bash
http://localhost:3000/stats?searchTerm=module-1

  ```
It will return the following JSON structure:
```json
{"success":true,"result":{"module-1":"2 projects and 3 threads"}}
```