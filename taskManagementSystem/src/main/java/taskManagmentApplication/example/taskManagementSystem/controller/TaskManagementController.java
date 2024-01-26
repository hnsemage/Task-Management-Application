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
@CrossOrigin(origins = "http://localhost:3000")
public class TaskManagementController {

    @Autowired
    private TaskManagementService taskManagementService;

    //To create a task
    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@RequestBody TaskManagementEntity task){
        String taskName = task.getTaskName();

        //Check if the taskName already exists
        if (taskManagementService.existsByTaskName(taskName)){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Task name already exists. Please choose another.");
        }

        TaskManagementEntity createdTask = taskManagementService.createTasks(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    //To get all tasks
    @GetMapping("/getAllTasks")
    public List<TaskManagementEntity> getAllTasks(){
        return taskManagementService.getAllTasks();
    }

    //To get all tasks and sort by taskId
    @GetMapping("/getAllTasksOrderByTaskId")
    public ResponseEntity<List<TaskManagementEntity>> getAllTasksOrderByTaskId() {
        try {
            List<TaskManagementEntity> tasks = taskManagementService.getAllTasksOrderByTaskId();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // You can customize the error response
        }
    }

    //To get all tasks and sort by taskId
    @GetMapping("/getAllTasksOrderByUsername")
    public ResponseEntity<List<TaskManagementEntity>> getAllTasksOrderByUsername() {
        try {
            List<TaskManagementEntity> tasks = taskManagementService.getAllTasksOrderByUsername();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // You can customize the error response
        }
    }

    //To get all tasks by username
    @GetMapping("/getAllTasksByUsername/{username}")
    public ResponseEntity<List<TaskManagementEntity>> findAllTasksByUsername(@PathVariable String username){
        try{
            List<TaskManagementEntity> tasks = taskManagementService.findAllTasksByUsername(username);
            return ResponseEntity.ok(tasks);
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    //To get task by username
    @GetMapping("getTaskByUsername/{username}")
    public ResponseEntity<TaskManagementEntity> getTaskByUsername(@PathVariable String username){
        try {
            Optional<TaskManagementEntity> task = taskManagementService.getTaskByUsername(username);
            return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    //To get task by taskId
    @GetMapping("getTaskByTaskId/{taskid}")
    public ResponseEntity<TaskManagementEntity> getTaskById(@PathVariable String taskid){
        try {
            Optional<TaskManagementEntity> task = taskManagementService.getTaskById(taskid);
            return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    //To update a task
    @PutMapping("updateTask/{id}")
    public ResponseEntity<TaskManagementEntity> updateTask(@PathVariable String id, @RequestBody TaskManagementEntity updatedTask){
        try {
            TaskManagementEntity updated = taskManagementService.updateTask(id, updatedTask);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    //To delete a task
    @DeleteMapping("deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id){
        try {
            taskManagementService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }
}
