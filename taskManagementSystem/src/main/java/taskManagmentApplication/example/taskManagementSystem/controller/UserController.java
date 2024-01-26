package taskManagmentApplication.example.taskManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskManagmentApplication.example.taskManagementSystem.entity.UserEntity;
import taskManagmentApplication.example.taskManagementSystem.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    //To create a user
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserEntity user) {
        String username = user.getUsername();

        // Check if the username already exists
        if (userService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists. Please choose another.");
        } else {
            // Proceed to create the user
            UserEntity createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        }
    }

    //To get user by username
    @GetMapping("getUserByUsername/{username}")
    public ResponseEntity<UserEntity> getUserByUsername(@PathVariable String username){
        Optional<UserEntity> user= userService.getByUsername(username);
        return user.map(value -> new ResponseEntity<>(value,HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //To get all the users
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUsers();
    }

    //To update user by username
    @PutMapping("updateUser/{username}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable String username, @RequestBody UserEntity updatedUser){
        UserEntity updated= userService.updateUser(username,updatedUser);
        return new ResponseEntity<>(updated,HttpStatus.OK);
    }

    //To delete user by username
    @DeleteMapping("deleteUser/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username){
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //To log 
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity user) {
        try {
            String username = user.getUsername();
            String password = user.getPassword();


            UserEntity authenticatedUser = userService.authenticatedUser(username, password);

            if (authenticatedUser != null) {
                String role = userService.findUserRole(username);
                System.out.println(role);
                return ResponseEntity.ok(role);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Add this line for detailed exception logging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }
}
