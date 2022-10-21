class Task {
    static get modelName() {
      return 'Task'
    }
    constructor(attributes) {
        this.name = attributes.name;
        this.id = attributes.id;
        this.status = attributes.status;
        this.author = attributes.author;
        this.incrementStatus = this.incrementStatus.bind(this);
    }

    incrementStatus() {
        this.status = this.status + 1;
    }
  }
  
class User {
    static get modelName() {
        return 'User'
    }

    constructor(attributes) {
        this.id = attributes.id;
        this.isAdmin = attributes.isAdmin;
        this.name = attributes.name;
        this.age = attributes.age;
        
    }
}

const task1 = new Task ({
    name: 'do something',
    priority: 1,
    status: 1,
    id: 1,
    author: 2,
    modelName: 'Task',
    incrementStatus: function() {
        this.status = this.status + 1;
    }
});
const task2 = new Task ({
    name: 'do something else',
    priority: 2,
    status: 2,
    id: 2,
    author: 2,
    modelName: 'Task',
    incrementStatus: function() {
        this.status = this.status + 1;
    }
});

const user1 = new User({
    name: 'user1',
    age: 31,
    isAdmin: false,
    id: 1
})

const user2 = new User({
    name: 'user2',
    age: 32,
    isAdmin: true,
    id: 2
})

const data = {
    task1,
    task2,
    user1,
    user2
}

module.exports = data