package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private PasswordEncoder passwordEncoder;

    public UserEntity createUser (UserEntity user){

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

            return userRepository.save(user);
        }catch (Exception e){
            throw new RuntimeException("An error occurred while creating a user",e);
        }
    }

    public List<UserEntity> getAllUsers(){
        try {
            return userRepository.findAll();
        }catch (Exception e) {
            throw new RuntimeException("An error occurred while retrieving all the users", e);
        }
    }


    public Optional<UserEntity> getByUsername(String username){
        try {
            return userRepository.findByUsername(username);
        }catch (Exception e){
            throw new RuntimeException("An error occurred when retrieving by username",e);
        }
    }

    public UserEntity updateUser(String userId, UserEntity updateUser){
        try{
            Optional<UserEntity> exsitingUser = userRepository.findById(userId);

            if(exsitingUser.isPresent()){
                UserEntity eUser = exsitingUser.get();

                //Check and update password
                if (updateUser.getPassword() != null && !updateUser.getPassword().equals(eUser.getPassword())){
                    eUser.setPassword(updateUser.getPassword());
                }

                //Check and update password
                if (updateUser.getRole() != null && !updateUser.getRole().equals(eUser.getRole())){
                    eUser.setRole(updateUser.getRole());
                }

                return userRepository.save(updateUser);
            }else {
                throw new ResourceAccessException("User is not found" + userId);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occurred while updating the user",e);
        }

    }

    public void deleteUser(String userId){
        try {
            userRepository.deleteById(userId);
        }catch (Exception e){
            throw new RuntimeException("Error occurred when deleting the user",e);
        }
    }

    public boolean existsByUsername(String username) {
        try {
            Optional<UserEntity> existingUser = userRepository.findByUsername(username);
            return existingUser.isPresent();
        }catch (Exception e){
            throw new RuntimeException("Error occurred when finding the existence of the username",e);
        }
    }

    public UserEntity authenticatedUser (String username, String password){
        try {
            Optional<UserEntity> existingUser = userRepository.findByUsername(username);
            if (existingUser.isPresent()) {
                UserEntity user = existingUser.get();
                if (passwordEncoder.matches(password, user.getPassword())) {
                    return user;
                }
            }
            return null;
        }catch (Exception e){
            throw new RuntimeException("Error occurred when authenticating",e);
        }
    }

    public String getUserRole(String username){
        try {
            UserEntity user = userRepository.findByUsernameToGetRole(username);
            return (user != null) ? user.getRole() : null;
        }catch (Exception e){
            throw new RuntimeException("Error occurred when getting the role",e);
        }
    }
}
