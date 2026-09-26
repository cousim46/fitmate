package fitmate.memberservice.service.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.github.f4b6a3.ulid.UlidCreator;
import fitmate.memberservice.domain.member.enums.Gender;
import fitmate.memberservice.exception.ErrorCode;
import fitmate.memberservice.exception.FitmateException;
import fitmate.memberservice.repository.member.MemberJpaRepository;
import fitmate.memberservice.service.member.dto.MemberJoin;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberWriteServiceTest {
    @Autowired
    private MemberWriteService memberWriteService;
    @Autowired
    private MemberJpaRepository memberJpaRepository;

    @BeforeEach
    void clearAll() {
        memberJpaRepository.deleteAll();
    }

    @DisplayName("이미 존재하는 이메일로 가입할 경우 예외가 발생한다.")
    @Test
    void occurDuplicateEmailJoinException() {
        //given
        String email = "test@naver.com";
        String name = "name";
        String phone = "phone";
        String password = "password";
        Gender gender = Gender.MALE;
        LocalDate birth = LocalDate.now();
        MemberJoin memberJoin = new MemberJoin(UlidCreator.getUlid().toString(), name, phone, email,
            password, gender,
            birth);
        memberJpaRepository.save(memberJoin.toEntity());
        MemberJoin duplicateEmailmemberJoin = new MemberJoin(UlidCreator.getUlid().toString(), name, phone, email,
            password, gender,
            birth);

        //when
        FitmateException fitmateException = assertThrows(FitmateException.class,
            () -> memberWriteService.join(duplicateEmailmemberJoin));

        //then
        assertThat(fitmateException.getErrorCode()).isEqualTo(ErrorCode.DUPLICATE_EMAIL);
        assertThat(fitmateException.getMessage()).isEqualTo(ErrorCode.DUPLICATE_EMAIL.getMessage());

    }

    @DisplayName("이름, 이메일, 전화번호, 패스워드 등 필수 요소들중 값이 하나라도 null일 경우 예외가 발생한다.")
    @Test
    void occurRequireElementNullException() {
        //given
        String email = "test@naver.com";
        String name = null;
        String phone = "phone";
        String password = "password";
        Gender gender = Gender.MALE;
        LocalDate birth = LocalDate.now();
        MemberJoin memberJoin = new MemberJoin(UlidCreator.getUlid().toString(), name, phone, email,
            password, gender,
            birth);
        //when
        FitmateException fitmateException = assertThrows(FitmateException.class,
            () -> memberWriteService.join(memberJoin));

        //then
        assertThat(fitmateException.getErrorCode()).isEqualTo(ErrorCode.NON_NULL_REQUIRED_ELEMENT);
        assertThat(fitmateException.getMessage()).isEqualTo(ErrorCode.NON_NULL_REQUIRED_ELEMENT.getMessage());

    }

}