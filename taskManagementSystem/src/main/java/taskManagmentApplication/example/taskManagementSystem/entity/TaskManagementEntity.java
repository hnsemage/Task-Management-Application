package taskManagmentApplication.example.taskManagementSystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Document(collection = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@TypeAlias("TaskManagementEntity")
public class TaskManagementEntity {

    @Id
    //Making taskId as the primary key
    @Field("taskId")
    private String taskId;

    private String taskName;
    private String description;
    private String username;
    private String startDate;
    private String endDate;
    private String taskStatus;


    public String getTaskId() {
        return taskId;
    }
}
