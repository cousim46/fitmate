package fitmate.memberservice.repository.member;

import fitmate.memberservice.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaRepository extends JpaRepository<Member, String> {

    boolean existsByEmail(String email);

}
