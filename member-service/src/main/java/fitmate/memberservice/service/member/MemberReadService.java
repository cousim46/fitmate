package fitmate.memberservice.service.member;

import static fitmate.memberservice.exception.ErrorCode.DUPLICATE_EMAIL;
import static fitmate.memberservice.exception.ErrorCode.DUPLICATE_NICKNAME;

import fitmate.memberservice.annotation.ReadService;
import fitmate.memberservice.exception.FitmateException;
import fitmate.memberservice.repository.member.MemberJpaRepository;
import lombok.RequiredArgsConstructor;

@ReadService
@RequiredArgsConstructor
public class MemberReadService {

    private final MemberJpaRepository memberJpaRepository;

    public void duplicateEmail(String email) {
        if(memberJpaRepository.existsByEmail(email)) {
            throw new FitmateException(DUPLICATE_EMAIL);
        }
    }
    public void duplicateNickname(String nickname) {
        if(memberJpaRepository.existsByNickname(nickname)) {
            throw new FitmateException(DUPLICATE_NICKNAME);
        }
    }

}
