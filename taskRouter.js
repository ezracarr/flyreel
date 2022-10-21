var express = require('express');
const data = require('./data');
const defineUserAbilitiesForTask = require('./permissions/user.js');
const { determineUser } = require('./helpers/utils.js');



var router = express.Router({
  mergeParams: true
});

router.use(function (req, res, next) {
  console.log(req.method, 'for', req.params.taskId, 'at', req.path, ' in taskRouter');
  next();
});

router.get('/', function (req, res) {
    const userToken = req.headers.authtoken
    const user = determineUser(userToken);
    var taskId = parseInt(req.params.taskId);
    const taskToGet = data[`task${taskId}`];
    const ability = defineUserAbilitiesForTask(user, taskToGet);
    if (ability.can('read_all', taskToGet)){
        res.json(taskToGet);
    } else if (ability.can('read_some', taskToGet)) {
        res.json({taskId: taskToGet.id, name: taskToGet.name});
    } else if (ability.can('read_minimal', taskToGet)) {
        res.json({taskId: taskToGet.id});
    }
});

router.use(function (err, req, res, next) {
  if (err) console.error(err.stack);
  res.status(500).send('Something broke!');
});

router.put('/', function (req, res) {
    const taskId = req.params.taskId;
    const taskToUpdate = data[`task${taskId}`];

    const userToken = req.headers.authtoken
    const user = determineUser(userToken);
    const ability = defineUserAbilitiesForTask(user, taskToUpdate);
    if (ability.can('advance_status', taskToUpdate)){
        taskToUpdate.incrementStatus();
        console.log(taskToUpdate)
        res.send(`Task ${taskId} status updated to ${taskToUpdate.status.toString()}`);
    } else {
        res.status(403).send('You are not authorized to update this task');
    }
//   ability.can('advance_status', taskToUpdate) ? res.send('Task updated') : res.send('Task not updated');
//   getUserUpdateTaskAbility(data.user1, task).can('advance_status', task) ? res.send('Task updated') : res.send('Task not updated');
  // find task by id
  // check permissions
  // update task according to rules
});

// router.delete('/', function (req, res) {
//   var fp = helpers.getUserFilePath(req.params.username);
//   fs.unlinkSync(fp); // delete the file
//   res.sendStatus(200);
// });

module.exports = router;
