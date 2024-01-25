package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
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
        try{
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
        }catch (Exception e){
            throw new RuntimeException("An error occurred while creating a task",e);
        }
    }

    //To get all tasks
    public List<TaskManagementEntity> getAllTasks(){
        try {
            return taskManagementRepo.findAll();
        }catch (Exception e){
            throw new RuntimeException("An error occurred while retrieving all the tasks",e);
        }
    }

    //get all the tasks and order by taskId
    public List<TaskManagementEntity> getAllTasksOrderByTaskId() {
        try {
            // Specify the sorting criteria
            Sort sort = Sort.by(Sort.Order.asc("taskId"));

            // Use findAll with sorting
            return taskManagementRepo.findAll(sort);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving all the tasks", e);
        }
    }

    //get all the tasks and order by taskId
    public List<TaskManagementEntity> getAllTasksOrderByUsername() {
        try {
            // Specify the sorting criteria
            Sort sort = Sort.by(Sort.Order.asc("username"));

            // Use findAll with sorting
            return taskManagementRepo.findAll(sort);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving all the tasks", e);
        }
    }

    //To get all tasks by username
    public List<TaskManagementEntity> findAllTasksByUsername(String username){
        try{
            return taskManagementRepo.findAllTasksByUsername(username);
        }catch (Exception e){
            throw new RuntimeException("An error occurred while retrieving all tasks using username",e);
        }
    }

    //To get task by username
    public Optional<TaskManagementEntity> getTaskByUsername(String username){
        try {
            return taskManagementRepo.findTaskByUsername(username);
        }catch (Exception e){
            throw new RuntimeException("An error occurred when retrieving tasks by username",e);
        }
    }

    //To get task by taskId
    public Optional<TaskManagementEntity> getTaskById(String taskId){
        try {
            return taskManagementRepo.findById(taskId);
        }catch (Exception e){
            throw new RuntimeException("An error occurred when retrieving tasks by taskId",e);
        }
    }
    //To update tasks
    public TaskManagementEntity updateTask(String taskId, TaskManagementEntity updateTask){
        try {
            Optional<TaskManagementEntity> existingTask = taskManagementRepo.findById(taskId);

            if (existingTask.isPresent()){
                TaskManagementEntity eTask = existingTask.get();

                // Check and update taskName
                if (updateTask.getTaskName() != null && !updateTask.getTaskName().equals(eTask.getTaskName())){
                    eTask.setTaskName(updateTask.getTaskName());
                }

                // Check and update description
                if (updateTask.getDescription() != null && !updateTask.getDescription().equals(eTask.getDescription())){
                    eTask.setDescription(updateTask.getDescription());
                }

                // Check and update assignedUsername
                if (updateTask.getUsername() != null && !updateTask.getUsername().equals(eTask.getUsername())){
                    eTask.setUsername(updateTask.getUsername());
                }

                // Check and update startDate
                if (updateTask.getStartDate() != null && !updateTask.getStartDate().equals(eTask.getStartDate())){
                    eTask.setStartDate(updateTask.getStartDate());
                }

                // Check and update startTime
                if (updateTask.getEndDate() != null && !updateTask.getEndDate().equals(eTask.getEndDate())){
                    eTask.setEndDate(updateTask.getEndDate());
                }

                // Check and update taskStatus
                if (updateTask.getTaskStatus() != null && !updateTask.getTaskStatus().equals(eTask.getTaskStatus())){
                    eTask.setTaskStatus(updateTask.getTaskStatus());
                }

                return taskManagementRepo.save(updateTask);
            }else {
                throw new ResourceAccessException("Task is not found" + taskId);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occurred while updating the task",e);
        }
    }

    //To delete tasks
    public void deleteTask(String taskId) {
        try {
            taskManagementRepo.deleteById(taskId);
        }catch (Exception e){
            throw new RuntimeException("Error occurred when deleting the task",e);
        }
    }

    public boolean existsByTaskName(String taskName) {
        try {
            Optional<TaskManagementEntity> existingTaskName = taskManagementRepo.findByTaskName(taskName);
            return existingTaskName.isPresent();
        }catch (Exception e){
            throw new RuntimeException("Error occurred when finding the existence of the task name",e);
        }
    }
}
