package taskManagmentApplication.example.taskManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskManagmentApplication.example.taskManagementSystem.entity.UserEntity;
import taskManagmentApplication.example.taskManagementSystem.entity.UserSequenceEntity;
import taskManagmentApplication.example.taskManagementSystem.repository.UserRepository;
import taskManagmentApplication.example.taskManagementSystem.repository.UserSequenceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSequenceRepository userSequenceRepository;

    public boolean existsByUsername(String username) {
        Optional<UserEntity> existingUser = userRepository.findByUsername(username);
        return existingUser.isPresent();
    }
    public UserEntity createUser (UserEntity user){

        UserSequenceEntity userSequenceEntity = userSequenceRepository.findById("userId").orElseGet(() -> {
           UserSequenceEntity newUserSequenceEntity = new UserSequenceEntity();
           newUserSequenceEntity.setId("userId");
           newUserSequenceEntity.setValue(0l);
           return userSequenceRepository.save(newUserSequenceEntity);
        });

        long nextUserId = userSequenceEntity.getValue()+1;
        userSequenceEntity.setValue(nextUserId);

        userSequenceRepository.save(userSequenceEntity);

        user.setUserId(String.valueOf(nextUserId));

        return userRepository.save(user);
    }

    public List<UserEntity> getAllUsers(){
        return  userRepository.findAll();
    }


    public Optional<UserEntity> getByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public UserEntity updateUser(String userId, UserEntity updateUser){
        updateUser.setUserId(userId);
        return userRepository.save(updateUser);
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }
}
