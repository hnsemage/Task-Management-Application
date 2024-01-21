package taskManagmentApplication.example.taskManagementSystem.controller;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskManagmentApplication.example.taskManagementSystem.entity.UserEntity;
import taskManagmentApplication.example.taskManagementSystem.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserEntity user) {
        String username = user.getUsername();

        // Check if the username already exists
        if (userService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists. Please choose another.");
        }

        // Proceed to create the user
        UserEntity createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("getUserByUsername/{username}")
    public ResponseEntity<UserEntity> getUserByUsername(@PathVariable String username){
        Optional<UserEntity> user= userService.getByUsername(username);
        return user.map(value -> new ResponseEntity<>(value,HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("updateUser/{username}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable String username, @RequestBody UserEntity updatedUser){
        UserEntity updated= userService.updateUser(username,updatedUser);
        return new ResponseEntity<>(updated,HttpStatus.OK);
    }

    @DeleteMapping("deleteTask/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username){
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
