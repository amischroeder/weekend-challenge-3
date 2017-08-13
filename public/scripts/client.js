$(document).ready(function () {
    console.log('Jquery loaded');
    getTasks();

    $('#addButton').on('click', function(){
        console.log('Add button clicked!');
        var taskIn = $('#taskIn').val();
        var inputObject = {
            task: taskIn
        }
        postTask(inputObject);        
    });

     $('#taskList').on('click', '.completeButton', function(){
          console.log('completed button clicked');
            $(this).parent().css("background-color", "gray" );
            $(this).parent().append('&#10003;');
            //DO UPDATE METHOD AJAX
        }); 

     $('#taskList').on('click', '.deleteButton', function () {
    console.log('delete task')
    var taskId = $(this).parent().data().id;
    $.ajax({
      method: 'DELETE',
      url: '/tasks/' + taskId,
      success: function(response) {
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
    for(var i=0; i<tasksArray.length; i++) {
        var task = tasksArray[i];
        var $taskDiv = $('<div></div>');
        $taskDiv.data('id', task.id);
        $taskDiv.append('<div class="taskClass">' + task.task + '</div>');
        $taskDiv.append('<button class="deleteButton">Delete Task</button>');
        $taskDiv.append('<button class="completeButton">Completed</button>');
        // $taskDiv.append('<input id="checkBox" type="checkbox">');
        $('#taskList').prepend($taskDiv);
    }
}