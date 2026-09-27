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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberReadServiceTest {
    @Autowired
    private MemberReadService memberReadService;
    @Autowired
    private MemberJpaRepository memberJpaRepository;

    @DisplayName("이메일이 존재하면 예외가 발생한다.")
    @Test
    void occurExistEmailDoesException() {
        //given
        String email = "test@naver.com";
        String name = "name";
        String phone = "phone";
        String nickname = "nickname";
        String password = "password";
        Gender gender = Gender.MALE;
        LocalDate birth = LocalDate.now();
        MemberJoin memberJoin = new MemberJoin(UlidCreator.getUlid().toString(),nickname, name, phone, email,
            password, password,gender,
            birth,
            null);
        memberJpaRepository.save(memberJoin.toEntity());

        //when
        FitmateException fitmateException = assertThrows(FitmateException.class,
            () -> memberReadService.duplicateEmail(email));

        //then
        assertThat(fitmateException.getErrorCode()).isEqualTo(
            ErrorCode.DUPLICATE_EMAIL);
    }


    @DisplayName("닉네임이 존재하면 예외가 발생한다.")
    @Test
    void occurExistNicknameDoesException() {
        //given
        String email = "test@naver.com";
        String name = "name";
        String phone = "phone";
        String nickname = "nickname";
        String password = "password";
        Gender gender = Gender.MALE;
        LocalDate birth = LocalDate.now();
        MemberJoin memberJoin = new MemberJoin(UlidCreator.getUlid().toString(),nickname, name, phone, email,
            password, password,gender,
            birth,
            null);
        memberJpaRepository.save(memberJoin.toEntity());

        //when
        FitmateException fitmateException = assertThrows(FitmateException.class,
            () -> memberReadService.duplicateNickname(nickname));

        //then
        assertThat(fitmateException.getErrorCode()).isEqualTo(
            ErrorCode.DUPLICATE_NICKNAME);
    }

}