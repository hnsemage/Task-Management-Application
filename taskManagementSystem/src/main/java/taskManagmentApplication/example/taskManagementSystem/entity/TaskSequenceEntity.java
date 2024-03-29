package taskManagmentApplication.example.taskManagementSystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "taskSequence")
@NoArgsConstructor
@AllArgsConstructor
@TypeAlias("TaskSequenceEntity")
public class TaskSequenceEntity {
    @Id
    private String id;

    private long value;


}
