$(document).ready(function () {
  console.log('Jquery loaded');
  getTasks();

  $('#addButton').on('click', function () {
    console.log('Add button clicked!');
    var taskIn = $('#taskIn').val();
    var statusIn = $('#statusIn').val();
    var inputObject = {
      task: taskIn,
      status: statusIn
    }
    postTask(inputObject);
  });

  $('#taskList').on('click', '.completeButton', function () {
    console.log('completed button clicked');
    $(this).parent().css("background-color", "gray");
    $(this).parent().append('&#10003;');
    var taskId = $(this).parent().data().id;
    $.ajax({
      method: 'PUT',
      url: '/tasks/' + taskId,
      success: function (response) {
        getTasks();
      }
    })
  });

  $('#taskList').on('click', '.deleteButton', function () {
    console.log('delete task')
    var taskId = $(this).parent().data().id;
    $.ajax({
      method: 'DELETE',
      url: '/tasks/' + taskId,
      success: function (response) {
        getTasks();
      }
    })
  })
}); //end doc ready

function postTask(newTask) {
  console.log('in postTask', newTask);
  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: newTask,
    success: function (data) {
      console.log('got some tasks: ', data);
      getTasks(data);
    }
  });
}

function getTasks() {
  console.log('in getTasks');
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: function (data) {
      console.log('got some tasks: ', data);
      displayTasks(data);
    }
  });
}

function displayTasks(tasksArray) {
  $('#taskList').empty();
  $('#taskIn').val('');
  for (var i = 0; i < tasksArray.length; i++) {
    var task = tasksArray[i];
    var $taskTable = $('<tr></tr>');
    $taskTable.data('id', task.id);
    $taskTable.append('<td class="taskClass">' + task.task + '</td>');
    $taskTable.append('<td class="statusClass">' + task.status + '</td>');
    $taskTable.append('<button class="completeButton">Complete</button>');
    $taskTable.append('<button class="deleteButton">Delete Task</button>');
    // $taskDiv.append('<input id="checkBox" type="checkbox">');
    $('#taskList').prepend($taskTable);
  }
}