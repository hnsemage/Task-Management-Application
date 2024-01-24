package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskManagementEntity;

import java.util.List;
import java.util.Optional;

public interface TaskManagementRepo extends MongoRepository<TaskManagementEntity, String> {

    //To find task by username
    Optional<TaskManagementEntity> findTaskByUsername(String username);

    Optional<TaskManagementEntity> findByTaskName(String taskName);

}
