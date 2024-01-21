package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.UserSequenceEntity;

public interface UserSequenceRepository extends MongoRepository<UserSequenceEntity,String> {

}
