package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import taskManagmentApplication.example.taskManagementSystem.entity.UserEntity;
import taskManagmentApplication.example.taskManagementSystem.entity.UserSequenceEntity;
import taskManagmentApplication.example.taskManagementSystem.repository.UserRepository;
import taskManagmentApplication.example.taskManagementSystem.repository.UserSequenceRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSequenceRepository userSequenceRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserEntity createUser(UserEntity user) {

        try {
            UserSequenceEntity userSequenceEntity = userSequenceRepository.findById("userId").orElseGet(() -> {
                UserSequenceEntity newUserSequenceEntity = new UserSequenceEntity();
                newUserSequenceEntity.setId("userId");
                newUserSequenceEntity.setValue(0l);
                return userSequenceRepository.save(newUserSequenceEntity);
            });

            long nextUserId = userSequenceEntity.getValue() + 1;
            userSequenceEntity.setValue(nextUserId);

            userSequenceRepository.save(userSequenceEntity);

            user.setUserId(String.valueOf(nextUserId));
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            user.setRole(user.getRole().toLowerCase());

            System.out.println(user.getFirstName());
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating a user", e);
        }
    }



    public List<UserEntity> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving all the users", e);
        }
    }


    public Optional<UserEntity> getByUsername(String username) {
        try {
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred when retrieving by username", e);
        }
    }

    public UserEntity updateUser(String userId, UserEntity updateUser) {
        try {
            Optional<UserEntity> exsitingUser = userRepository.findById(userId);

            if (exsitingUser.isPresent()) {
                UserEntity eUser = exsitingUser.get();

                //Check and update first name
                if (updateUser.getFirstName() != null && !updateUser.getFirstName().equals(eUser.getFirstName())) {
                    eUser.setFirstName(updateUser.getFirstName());
                }

                //Check and update last name
                if (updateUser.getFirstName() != null && !updateUser.getFirstName().equals(eUser.getFirstName())) {
                    eUser.setLastName(updateUser.getFirstName());
                }

                //Check and update email
                if (updateUser.getEmail() != null && !updateUser.getEmail().equals(eUser.getEmail())) {
                    eUser.setEmail(updateUser.getEmail());
                }

                //Check and update password
                if (updateUser.getPassword() != null && !updateUser.getPassword().equals(eUser.getPassword())) {
                    eUser.setPassword(updateUser.getPassword());
                }

                //Check and update role
                if (updateUser.getRole() != null && !updateUser.getRole().equals(eUser.getRole())) {
                    eUser.setRole(updateUser.getRole());
                }

                return userRepository.save(updateUser);
            } else {
                throw new ResourceAccessException("User is not found" + userId);
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the user", e);
        }

    }

    public void deleteUser(String userId) {
        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred when deleting the user", e);
        }
    }

    public boolean existsByUsername(String username) {
        try {
            Optional<UserEntity> existingUser = userRepository.findByUsername(username);
            return existingUser.isPresent();
        } catch (Exception e) {
            throw new RuntimeException("Error occurred when finding the existence of the username", e);
        }
    }

    public UserEntity authenticatedUser(String username, String password) {
        try {
            Optional<UserEntity> existingUser = userRepository.findByUsername(username);
            if (existingUser.isPresent()) {
                UserEntity user = existingUser.get();
                System.out.println("Raw Password: " + password);
                System.out.println("Encoded Password from Database: " + user.getPassword());
                System.out.println("Encoded Password from Input: " + passwordEncoder.encode(password));

                if (passwordEncoder.matches(password, user.getPassword())) {
                    return user;
                }
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error occurred when authenticating", e);
        }
    }



    public String findUserRole(String username) {
        try {
            Optional<UserEntity> optionalUser = userRepository.findByUsername(username);

            if (optionalUser.isPresent()) {
                UserEntity user = optionalUser.get();
                return user.getRole();
            } else {
                return null; // or throw an exception if appropriate
            }
        } catch (Exception e) {
            throw new RuntimeException("Error occurred when getting the role", e);
        }
    }
}