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
            Member.of("id", "name", email, "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10)));
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
            Member.of("id", "name", email, "password", "phone", Gender.FEMALE,
                LocalDate.of(1992, 10, 10)));
        //when
        boolean isExistsEmail = memberJpaRepository.existsByEmail(newEmail);

        //then
        Assertions.assertThat(isExistsEmail).isFalse();
    }


}