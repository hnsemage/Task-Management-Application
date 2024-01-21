package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskManagementEntity;

import java.util.List;

public interface TaskManagementRepo extends MongoRepository<TaskManagementEntity, String> {
    List<TaskManagementEntity> findByTaskId(String taskId);
}
