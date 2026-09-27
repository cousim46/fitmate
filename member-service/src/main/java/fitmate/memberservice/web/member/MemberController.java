package fitmate.memberservice.web.member;

import com.github.f4b6a3.ulid.UlidCreator;
import fitmate.memberservice.service.member.MemberReadService;
import fitmate.memberservice.service.member.facade.MemberFacadeService;
import fitmate.memberservice.web.member.dto.MemberJoinRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberFacadeService memberFacadeService;
    private final MemberReadService memberReadService;

    @PostMapping("/sign-up")
    public void signUp(@Valid @RequestBody MemberJoinRequest memberJoinRequest) {
        String userId = UlidCreator.getUlid().toString();
        memberFacadeService.join(memberJoinRequest.of(userId));
    }

    @GetMapping("/check/email")
    public void checkEmail(@RequestParam String email) {
        memberReadService.duplicateEmail(email);
    }

    @GetMapping("/check/nickname")
    public void checkNickname(@RequestParam String nickname) {
        memberReadService.duplicateNickname(nickname);
    }
}
