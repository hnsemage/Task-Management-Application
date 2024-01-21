package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskSequenceEntity;

public interface TaskSequenceRepository extends MongoRepository<TaskSequenceEntity,String> {
}
