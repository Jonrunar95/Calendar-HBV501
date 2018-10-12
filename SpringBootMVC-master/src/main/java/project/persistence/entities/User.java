package project.persistence.entities;

public class User{
    private String email;
    private String token;
    public User(String email, String token){
        this.email = email;
        this.token = token;
    }
}