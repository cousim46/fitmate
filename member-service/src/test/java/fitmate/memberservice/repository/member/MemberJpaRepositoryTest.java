package fitmate.memberservice.repository.member;

import fitmate.memberservice.domain.member.entity.Member;
import fitmate.memberservice.domain.member.enums.Gender;
import java.time.LocalDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

@DataJpaTest
class MemberJpaRepositoryTest {

    @Autowired
    private MemberJpaRepository memberJpaRepository;

    @Test
    @DisplayName("이메일이 존재하면 true를 반환한다.")
    void existEmailReturnTrue() {
        //given
        String email = "test@naver.com";
        memberJpaRepository.save(
            Member.of("id", "nickname", "name", email, "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10), null));
        //when
        boolean isExistsEmail = memberJpaRepository.existsByEmail(email);

        //then
        Assertions.assertThat(isExistsEmail).isTrue();
    }


    @Test
    @DisplayName("이메일이 존재하지 않으면 false를 반환한다.")
    void notExistEmailReturnFalse() {
        //given
        String email = "test@naver.com";
        String newEmail = "test123@naver.com";
        memberJpaRepository.save(
            Member.of("id", "nickname", "name", email, "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10), null));
        //when
        boolean isExistsEmail = memberJpaRepository.existsByEmail(newEmail);

        //then
        Assertions.assertThat(isExistsEmail).isFalse();
    }

    @DisplayName("닉네임이 존재하지 않으면 false를 반환한다.")
    @Test
    void existNicknameReturnFalse() {
        //given
        String nickname = "nickname";
        String newNickname = "newNickname2";
        memberJpaRepository.save(
            Member.of("id", nickname, "name", "test123@naver.com", "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10), null));
        //when
        boolean isExistsNickname = memberJpaRepository.existsByNickname(newNickname);

        //then
        Assertions.assertThat(isExistsNickname).isFalse();

    }

    @DisplayName("닉네임이 존재하면 true를 반환한다.")
    @Test
    void existNicknameReturnTrue() {
        //given
        String nickname = "nickname";
        memberJpaRepository.save(
            Member.of("id", nickname, "name", "test123@naver.com", "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10), null));
        //when
        boolean isExistsNickname = memberJpaRepository.existsByNickname(nickname);

        //then
        Assertions.assertThat(isExistsNickname).isTrue();

    }


}