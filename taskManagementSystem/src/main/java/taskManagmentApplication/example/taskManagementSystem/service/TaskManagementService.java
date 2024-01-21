package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<TaskManagementEntity> getAllTasks(){
        return taskManagementRepo.findAll();
    }

    public Optional<TaskManagementEntity> getTaskById(String id){
        return taskManagementRepo.findById(id);
    }

    public TaskManagementEntity updateTask(String id, TaskManagementEntity updateTask){
        updateTask.setTaskId(id);
        return taskManagementRepo.save(updateTask);
    }

    public void deleteTask(String id){
        taskManagementRepo.deleteById(id);
    }
}
