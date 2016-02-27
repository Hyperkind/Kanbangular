# Kanbangular

> "The Kanban technique emerged in the late 1940s as Toyota’s reimagined approach to manufacturing and engineering. ... The system’s highly visual nature allowed teams to communicate more easily on what work needed to be done and when. It also standardized cues and refined processes, which helped to reduce waste and maximize value." - [via LeanKit.com](http://leankit.com/learn/kanban/kanban-board/)

## Goal
Create a 3 column Kanban board:
  - using AngularJS to build the **client**
  - using ExpressJS to build the **server**
  - using a **SQL database** to store your data.
  - implement stretch goals.

After the basic functionality and stretch goals have been met, You will then add:
  - User Registration, which means to also implement:
    - Authentication
    - Sessions

![http://www.eylean.com/blog/wp-content/uploads/2013/01/physical_kanban_board1.jpg](http://www.eylean.com/blog/wp-content/uploads/2013/01/physical_kanban_board1.jpg)

## Specifications

### Columns
Columns represent the status of a Card.

The board you will building will have **3 columns**:
  - Queue
    - A card will automatically appear in this column after creation.
  - In Progress
    - When a card is being worked on it should be displayed in this column.
  - Done
    - When work has finished on a card it should be displayed in this column.

### Cards

#### Card Properties

Cards have 6 properties:
  1. A unique identifier, e.g. "Card-Id #001".
  1. A Title
  1. A priority selection
  1. A status, the status of a card. Should match the column the card can be found in. Columns: "Queue", "In Progress", or "Done".
  1. A "Created by" field. This should display name of the person who created the task.
  1. An "Assigned to field". This should display the name of the person who is currently working on the task.

#### Creating a new Card
There should be a form which is used to create a new Card. When a card is first created we need minimal information, the information needed is:
  - Title (String)
  - Priority (low, Medium, High, Blocker)
  - Created By (Full Name)
  - Assigned To (Full Name)

All other fields are not needed when creating a new Card. The other fields: "Unique Identifier", and "Status" fields will be automatically added by the application.

**Ask Yourself:** How will I add an auto-incrementing ID? What's the initial "Status" of a card when it is first created?

### Cards in Columns
When a Card appears in a column there should be a way (something clickable?) to move that card to either the next or previous column.

**caveat: do not try to implement click-and-drag just yet**

### Server
Build an Express server which will serve your `index.html` (which contains your angular code).

#### Routes

Your server will have these routes:
  - RESTful API endpoints to create, read, update, and delete kanban cards for your application.
    - Remember to use MVC architechture: Models, Views, Controllers!
  - A "fall-thorugh" route to serve your `index.html` file (which contains your angular application) when a request is anything other than **an api endpoint**.

### Database
All of the work above can be done without a database. You can use runtime variables to store your data as you develop your application but then a time comes when you need your data to persist, now we need a database.

Design a schema for your cards. *You won't need relationships until we implement users.*

### Styles (stretch goal)
Consider a very simple style. The board's columns should be easily identified, find a way to display the **priority** with some color, etc. **Refrain from doing too much CSS work ;)**

## Users
Plan this out with your partner and when ready present it to an instructor or TA for approval.

**Ask Yourself:**
  - How will someone register for your application?
  - Login?
    - Once logged in, how can you use that user's data when creating new cards?

## References

### Kanban Servies

[Trello](http://www.trello.com)

[Taiga](http://www.taiga.io)

[Asana](http://www.asana.com)