package fitmate.memberservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(exception = FitmateException.class)
    public ResponseEntity<FitmateErrorResponse> handleException(FitmateException fitmateException) {
        ErrorCode errorCode = fitmateException.getErrorCode();
        return new ResponseEntity<>(FitmateErrorResponse.build(errorCode.getHttpStatus(),errorCode.getMessage()), errorCode.getHttpStatus());
    }
}
