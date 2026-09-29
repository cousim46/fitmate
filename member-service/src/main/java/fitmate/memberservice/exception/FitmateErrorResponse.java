package fitmate.memberservice.exception;

import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class FitmateErrorResponse {
    private HttpStatus httpStatus;
    private String message;
    private LocalDateTime timestamp;


    public static FitmateErrorResponse build(HttpStatus httpStatus, String message) {
        FitmateErrorResponse fitmateErrorResponse = new FitmateErrorResponse();
        fitmateErrorResponse.httpStatus = httpStatus;
        fitmateErrorResponse.message = message;
        fitmateErrorResponse.timestamp = LocalDateTime.now();
        return fitmateErrorResponse;
    }

}
