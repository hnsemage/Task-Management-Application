package taskManagmentApplication.example.taskManagementSystem.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import taskManagmentApplication.example.taskManagementSystem.entity.TaskManagementEntity;

import java.util.List;
import java.util.Optional;

public interface TaskManagementRepo extends MongoRepository<TaskManagementEntity, String> {

    //To get the task by taskId and sort by username
    Optional<TaskManagementEntity> findByTaskIdSortByUsername(String username, Sort sort);

    //To find task by username and order by username
    Optional<TaskManagementEntity> findByUsernameOrderByUsername(String username, Sort sort);

    //To find task by username
    Optional<TaskManagementEntity> findTaskByUsername(String username);

    //To find task by username and order by taskId
    Optional<TaskManagementEntity> findByUsernameOrderByTaskId(String username, Sort sort);


    //To find task by taskId and sort by taskId
    Optional<TaskManagementEntity> findByTaskIdSortOrderByTaskId(String username, Sort sort);


}
