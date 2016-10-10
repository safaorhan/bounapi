# bounapi

Boun API is a developer friendly way of gathering information about Boğaziçi University.

Updates are coming soon!


Bounapi uses [deployd](http://deployd.com/) to serve you the interface. In bounapi there are two kinds of resources:
* Collection Resources
* Event Resources

## Collections

Collections are the most fun way to make CRUD operations on the fly. For now, bounapi only allows the GET requests over HTTP to protect the data being modified.

### Querying
When querying collection resources, you can use deployd's (hence also mongo's) query operators to select, filter or sort the collection data.

**Examples:**
* Get the buildings in the south campus: `/buildings?campus=South%20Campus`
* Get the CMPE courses with 3 credits: `/courses?name=CMPE&credits=3`
* Sort the buildings in reverse alphabetical order: `/buildings?{"$sort":{"nameTR":-1}}`

### Pagination
Maximum number of elements you can get from a collection query is set to 100 in a time. It's highly recommended to paginate your queries using $limit and $skip operators.

**Example:**
* Get the CMPE courses a dozen at a time: `/courses?name=CMPE&$limit=12$skip=24`
In this query you limit the element count to 12 and skip the first 24. So you can get the 3rd batch.


**If you want additional information about querying the collections check [Deployd's official documentation](http://docs.deployd.com/docs/collections/reference/querying-collections.html).**

### Collections in bounapi

#### /courses
Courses is a collection of the courses which are available in the current semester. These courses are fetched from the schedule pages of the [Registration](http://registration.boun.edu.tr) and stored in the database. To see how it is fetched, look at the `/fetch` and `/fetchAll` event resources.

Fields of the course:

* id
* term
* department
* name
* code
* section
* title
* credits
* ects
* quota
* instructor
* classes
* reqForDepartment
* forDepartments
* isLab
* isPS

Let's see an example:

ENG 493.01 course is opened by SARAÇOĞLU. Since this course is listed under the CMPE Department in the Course Schedule in Registration, the term will be CMPE. However the name of the code will be ENG since the course code is ENG 493.

```json
```

Note that each section is stored as different courses. This is because each section has different instructors and class hours. Same applies to the PS and labs.
