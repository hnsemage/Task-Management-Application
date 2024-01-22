package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskManagementEntity;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskSequenceEntity;
import taskManagmentApplication.example.taskManagementSystem.repository.TaskManagementRepo;
import taskManagmentApplication.example.taskManagementSystem.repository.TaskSequenceRepository;

import java.util.List;
import java.util.Optional;

import static javax.swing.text.html.HTML.Tag.OL;

@Service
public class TaskManagementService {
    @Autowired
    private TaskManagementRepo taskManagementRepo;

    @Autowired
    private TaskSequenceRepository taskSequenceRepository;


    //To create a task
    public TaskManagementEntity createTasks(TaskManagementEntity task) {
        //Get the current taskId
        TaskSequenceEntity taskSequenceEntity = taskSequenceRepository.findById("taskId").orElseGet(() -> {
            TaskSequenceEntity newTaskSequenceEntity = new TaskSequenceEntity();
            newTaskSequenceEntity.setId("taskId");
            newTaskSequenceEntity.setValue(0l);
            return taskSequenceRepository.save(newTaskSequenceEntity);
        });

        long nextTaskId = taskSequenceEntity.getValue()+1;
        taskSequenceEntity.setValue(nextTaskId);

        //Save the updated sequence value
        taskSequenceRepository.save(taskSequenceEntity);

        //Set the taskId for the next new Task
        task.setTaskId(String.valueOf(nextTaskId));


        //Save the task
        return taskManagementRepo.save(task);

    }

    //To get all tasks
    public List<TaskManagementEntity> getAllTasks(){
        return taskManagementRepo.findAll();
    }

    //To get all task and sort by username in ascending order
    public List<TaskManagementEntity> getAllTasksSortByUsername(){
        Sort sort = Sort.by(Sort.Order.asc("assignedUsername"));
        return taskManagementRepo.findAll(sort);
    }

    //To get all task and sort by taskId in ascending order
    public List<TaskManagementEntity> getAllTasksSortByTaskId(){
        Sort sort = Sort.by(Sort.Order.asc("taskId"));
        return taskManagementRepo.findAll(sort);
    }

    //To get task by username
    public Optional<TaskManagementEntity> getTaskByUsername(String username){
        return taskManagementRepo.findTaskByUsername(username);
    }

    //To get task by username and sort by username in ascending order
    public Optional<TaskManagementEntity> getTaskByUsernameSortByUsername(String username){
        Sort sort = Sort.by(Sort.Order.asc("assignedUsername"));
        return taskManagementRepo.findByUsernameOrderByUsername(username, sort);
    }

    //To get task by username and sort by taskId in ascending order
    public Optional<TaskManagementEntity> getTasksByUsernameSortedByTaskId(String username) {
        Sort sort = Sort.by(Sort.Order.asc("taskId"));
        return taskManagementRepo.findByUsernameOrderByTaskId(username, sort);
    }

    //To get task by taskId
    public Optional<TaskManagementEntity> getTaskById(String id){
        return taskManagementRepo.findById(id);
    }

    //To get task by taskId and sort by username in ascending order
    public Optional<TaskManagementEntity> getTaskByTaskIdSortByUsername(String username){
        Sort sort = Sort.by(Sort.Order.asc("assignedUsername"));
        return taskManagementRepo.findByTaskIdSortByUsername(username, sort);
    }

    //To get task by taskId and sort by taskId in ascending order
    public Optional<TaskManagementEntity> getTasksByTaskIdSortedByTaskId(String username) {
        Sort sort = Sort.by(Sort.Order.asc("taskId"));
        return taskManagementRepo.findByTaskIdSortOrderByTaskId(username, sort);
    }

    //To update tasks
    public TaskManagementEntity updateTask(String username, TaskManagementEntity updateTask){
        updateTask.setTaskId(username);
        return taskManagementRepo.save(updateTask);
    }

    //To delete tasks
    public void deleteTask(String username){
        taskManagementRepo.deleteById(username);
    }
}
