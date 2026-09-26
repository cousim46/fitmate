package fitmate.memberservice.service.member.dto;


import fitmate.memberservice.domain.member.entity.Member;
import fitmate.memberservice.domain.member.enums.Gender;
import java.time.LocalDate;
import java.util.Objects;

public record MemberJoin(
    String id,
    String name,
    String phone,
    String email,
    String password,
    Gender gender,
    LocalDate birth
) {

    public Member toEntity() {
        return Member.of(id, name, email, password,phone, gender, birth);
    }

    public boolean nonNullRequiredElement() {
        return Objects.nonNull(name) &&
            Objects.nonNull(id) &&
            Objects.nonNull(phone) &&
            Objects.nonNull(email) &&
            Objects.nonNull(password) &&
            Objects.nonNull(birth) &&
            Objects.nonNull(gender);

    }

}
