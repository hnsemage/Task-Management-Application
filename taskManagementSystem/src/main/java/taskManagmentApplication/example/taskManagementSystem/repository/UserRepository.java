package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByUsername(String username);
}
