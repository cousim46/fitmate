package fitmate.memberservice.exception;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class FitmateException extends RuntimeException{
    private ErrorCode errorCode;

}
