package project.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.persistence.repositories.UserRepository;


@Configuration
public class FilterConfig {

    private UserRepository userRepository;

    @Autowired
    public FilterConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public FilterRegistrationBean<AuthFilter> loggingFilter() {
        FilterRegistrationBean<AuthFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new AuthFilter(userRepository));

        registrationBean.addUrlPatterns("/users/*");

        return registrationBean;

    }

}
