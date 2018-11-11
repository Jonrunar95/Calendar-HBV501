package project.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import project.controller.exceptions.UnauthorizedException;
import project.persistence.entities.User;
import project.persistence.repositories.UserRepository;

@Order(1)
public class AuthFilter implements Filter {

    private final static Logger LOG = LoggerFactory.getLogger(AuthFilter.class);
    private UserRepository userRepository;

    public AuthFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
        LOG.info("Initializing filter :{}", this);
    }

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String token = req.getHeader("Authorization");

        try {
            authenticate(token);
        } catch (UnauthorizedException e) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
        }

        chain.doFilter(request, response);

    }

    @Override
    public void destroy() {
        LOG.warn("Destructing filter :{}", this);
    }

    private void authenticate(String token) throws UnauthorizedException {
        if (token == null) throw new UnauthorizedException("No token given");

        String sub = token.substring(7);

        User user = userRepository.findByToken(sub);

        if (user == null) throw new UnauthorizedException("Invalid token");
    }
}