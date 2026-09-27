package fitmate.memberservice.web.member.dto;

import fitmate.memberservice.domain.member.enums.Gender;
import fitmate.memberservice.service.member.dto.MemberJoin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record MemberJoinRequest(
    @NotBlank
    @Size(max = 100)
    String nickname,
    @NotBlank
    @Size(max = 100)
    String name,
    @NotBlank
    @Size(max = 50)
    @Pattern(regexp = "^01[016789]-\\d{3,4}-\\d{4}$", message = "전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)")
    String phone,

    @NotBlank
    @Size(max = 100)
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    String email,

    @NotBlank
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,}$",
        message = "비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 모두 포함해야 합니다."
    )
    String password,

    @NotBlank
    String confirmPassword,

    @NotNull
    Gender gender,

    @NotNull
    LocalDate birth,
    String recommendationCode
) {

    public MemberJoin of(String id) {
        return MemberJoin.of(id,
            nickname,name, phone, email, password, confirmPassword, gender, birth, recommendationCode);
    }
}
