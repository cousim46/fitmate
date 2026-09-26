package fitmate.memberservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    NON_NULL_REQUIRED_ELEMENT(HttpStatus.BAD_REQUEST, "필수 요소들은 null일수 없습니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
