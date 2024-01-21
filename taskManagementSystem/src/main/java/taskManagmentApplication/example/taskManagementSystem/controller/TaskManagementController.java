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

    @PostMapping("/createTask")
    public ResponseEntity<TaskManagementEntity> createTask(@RequestBody TaskManagementEntity task){
        TaskManagementEntity createdTask = taskManagementService.createTasks(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/getAllTask")
    public List<TaskManagementEntity> getAllTasks(){
        return taskManagementService.getAllTasks();
    }

    @GetMapping("getTaskById/{id}")
    public ResponseEntity<TaskManagementEntity> getTaskById(@PathVariable String id){
        Optional<TaskManagementEntity> task=taskManagementService.getTaskById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("updateTask/{id}")
    public ResponseEntity<TaskManagementEntity> updateTask(@PathVariable String id, @RequestBody TaskManagementEntity updatedTask){
        TaskManagementEntity updated = taskManagementService.updateTask(id, updatedTask);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id){
        taskManagementService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
