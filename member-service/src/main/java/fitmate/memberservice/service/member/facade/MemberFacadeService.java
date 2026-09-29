package fitmate.memberservice.service.member.facade;

import fitmate.memberservice.service.member.MemberReadService;
import fitmate.memberservice.service.member.MemberWriteService;
import fitmate.memberservice.service.member.dto.MemberJoin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberFacadeService {

    private final MemberWriteService memberWriteService;
    private final MemberReadService memberReadService;

    public void join(MemberJoin memberJoin) {
        memberReadService.duplicateEmail(memberJoin.email());
        memberWriteService.join(memberJoin);
    }

}
