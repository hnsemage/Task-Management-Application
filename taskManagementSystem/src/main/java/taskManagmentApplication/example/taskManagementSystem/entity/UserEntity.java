package taskManagmentApplication.example.taskManagementSystem.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
@TypeAlias("UserEntity")
public class UserEntity {


    @Id
    @Field("userId")
    private String userId;

    @Indexed(unique = true)
    private String username;
    private String password;
    private String role;
}
