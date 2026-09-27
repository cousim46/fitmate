package fitmate.memberservice.service.member;

import static fitmate.memberservice.exception.ErrorCode.DUPLICATE_EMAIL;
import static fitmate.memberservice.exception.ErrorCode.MISMATCH_PASSWORD;
import static fitmate.memberservice.exception.ErrorCode.NON_NULL_REQUIRED_ELEMENT;

import fitmate.memberservice.annotation.WriteService;
import fitmate.memberservice.exception.FitmateException;
import fitmate.memberservice.repository.member.MemberJpaRepository;
import fitmate.memberservice.service.member.dto.MemberJoin;
import lombok.RequiredArgsConstructor;

@WriteService
@RequiredArgsConstructor
public class MemberWriteService {

    private final MemberJpaRepository memberJpaRepository;

    public void join(MemberJoin memberJoin)  {
        if(memberJoin.mismatchPassword()) {
            throw new FitmateException(MISMATCH_PASSWORD);
        }
        if(!memberJoin.nonNullRequiredElement()) {
            throw new FitmateException(NON_NULL_REQUIRED_ELEMENT);
        }
        memberJpaRepository.save(memberJoin.toEntity());
    }
}
