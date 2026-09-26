package fitmate.memberservice.domain.member.entity;

import fitmate.memberservice.domain.common.BaseEntity;
import fitmate.memberservice.domain.member.enums.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(comment = "회원")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {
    @Id
    @Column(nullable = false,length = 50)
    private String id;
    @Column(nullable = false,length = 100, comment = "이름")
    private String name;
    @Column(nullable = false,length = 100, comment = "이메일")
    private String email;
    @Column(nullable = false, comment = "비밀번호")
    private String password;
    @Column(nullable = false,length = 50, comment = "전화번호")
    private String phone;
    @Column(nullable = false, comment = "생년월일")
    private LocalDate birth;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30, comment = "성별")
    private Gender gender;


    public static Member of(String id, String name, String email, String password, String phone, Gender gender, LocalDate birth) {
        Member member = new Member();
        member.id = id;
        member.name = name;
        member.email = email;
        member.password = password;
        member.phone = phone;
        member.birth = birth;
        member.gender = gender;
        return member;
    }
}
