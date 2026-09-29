package fitmate.memberservice.service.member.dto;


import fitmate.memberservice.domain.member.entity.Member;
import fitmate.memberservice.domain.member.enums.Gender;
import java.time.LocalDate;
import java.util.Objects;

public record MemberJoin(
    String id,
    String nickname,
    String name,
    String phone,
    String email,
    String password,
    String confirmPassword,
    Gender gender,
    LocalDate birth,
    String recommendationCode
) {

    public Member toEntity() {
        return Member.of(id,nickname, name, email, password, phone, gender, birth,recommendationCode);
    }

    public boolean nonNullRequiredElement() {
        return Objects.nonNull(name) &&
            Objects.nonNull(id) &&
            Objects.nonNull(nickname) &&
            Objects.nonNull(phone) &&
            Objects.nonNull(email) &&
            Objects.nonNull(password) &&
            Objects.nonNull(confirmPassword) &&
            Objects.nonNull(birth) &&
            Objects.nonNull(gender);

    }

    public static MemberJoin of(String id, String nickname, String name, String phone, String email, String password,
        String confirmPassword, Gender gender, LocalDate birth, String recommendationCode) {
        return new MemberJoin(id,nickname, name, phone, email, password, confirmPassword, gender, birth, recommendationCode);
    }

    public boolean mismatchPassword() {
        return !Objects.equals(password, confirmPassword);
    }

}
