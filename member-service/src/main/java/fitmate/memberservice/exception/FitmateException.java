package fitmate.memberservice.exception;


import lombok.Getter;

@Getter
public class FitmateException extends RuntimeException {
    private final ErrorCode errorCode;

    public FitmateException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
