// const { AbilityBuilder, createMongoAbility } = require('@casl/ability');
const { defineAbility } = require('@casl/ability');


const defineUserAbilitiesForTask = (user, task) => defineAbility((can, cannot) => {
    if (user.isAdmin) {
        // admins can advance the status and read the properties of any task
        can('advance_status', 'Task');
        can('read_all', 'Task');
    } else if (task.status === 1){
        // if the task is in status 1, any user can advance the status
        can('advance_status', 'Task');
    }
    // if the user is the author of the task, they can read the name property as well as the ID property
    if (user.id === task.author) {
        can('read_some', 'Task', { author: user.id });
    } else {
    // if the user is not the author, they can only read the ID property
        can('read_minimal', 'Task');
    }
  });

module.exports = defineUserAbilitiesForTask;