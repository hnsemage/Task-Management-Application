package taskManagmentApplication.example.taskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskManagementEntity;
import taskManagmentApplication.example.taskManagementSystem.service.TaskManagementService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskManagementController {

    @Autowired
    private TaskManagementService taskManagementService;

    //To create a task
    @PostMapping("/createTask")
    public ResponseEntity<TaskManagementEntity> createTask(@RequestBody TaskManagementEntity task){
        TaskManagementEntity createdTask = taskManagementService.createTasks(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    //To get all tasks
    @GetMapping("/getAllTasks")
    public List<TaskManagementEntity> getAllTasks(){
        return taskManagementService.getAllTasks();
    }

    // To get all tasks sorted by username
    @GetMapping("/getAllTasksSortedByUsername")
    public List<TaskManagementEntity> getAllTasksSortByUsername() {
        return taskManagementService.getAllTasksSortByUsername();
    }

    // To get all tasks sorted by taskId
    @GetMapping("/getAllTasksSortedByTaskId")
    public List<TaskManagementEntity> getAllTasksSortByTaskId() {
        return taskManagementService.getAllTasksSortByTaskId();
    }

    //To get task by username
    @GetMapping("getTaskByUsername/{username}")
    public ResponseEntity<TaskManagementEntity> getTaskByUsername(@PathVariable String username){
        Optional<TaskManagementEntity> task=taskManagementService.getTaskByUsername(username);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get Task by username sorted by username ascending order
    @GetMapping("getTaskByUsernameSortByUsername/{username}")
    public ResponseEntity<TaskManagementEntity> getTaskByUsernameSortByUsername(@PathVariable String username){
        Optional<TaskManagementEntity> task=taskManagementService.getTaskByUsernameSortByUsername(username);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get task by username and sorted by the taskId in ascending order
    @GetMapping("getTaskByUsernameSortByTaskId/{username}")
    public ResponseEntity<TaskManagementEntity> getTaskByUsernameSortByTaskId(@PathVariable String username){
        Optional<TaskManagementEntity> task=taskManagementService.getTasksByUsernameSortedByTaskId(username);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get task by taskId
    @GetMapping("getTaskByTaskId/{id}")
    public ResponseEntity<TaskManagementEntity> getTaskById(@PathVariable String id){
        Optional<TaskManagementEntity> task=taskManagementService.getTaskById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get task by taskId and sort by username in ascending order
    @GetMapping("getTaskByTaskIdeSortByUsername/{taskId}")
    public ResponseEntity<TaskManagementEntity> getTaskByIdSortByUsername(@PathVariable String id){
        Optional<TaskManagementEntity> task = taskManagementService.getTaskByTaskIdSortByUsername(id);
        return task.map(value -> new ResponseEntity<>(value,HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get task by taskId and sort by taskId in ascending order
    public  ResponseEntity<TaskManagementEntity> getTaskByIdSortByTaskId(@PathVariable String id){
        Optional<TaskManagementEntity> task = taskManagementService.getTasksByTaskIdSortedByTaskId(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To update a task
    @PutMapping("updateTask/{id}")
    public ResponseEntity<TaskManagementEntity> updateTask(@PathVariable String id, @RequestBody TaskManagementEntity updatedTask){
        TaskManagementEntity updated = taskManagementService.updateTask(id, updatedTask);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    //To delete a task
    @DeleteMapping("deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id){
        taskManagementService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
