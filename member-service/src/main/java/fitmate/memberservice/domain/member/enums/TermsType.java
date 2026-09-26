package fitmate.memberservice.domain.member.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TermsType {

    SERVICE("서비스 이용약관", true),
    PRIVACY("개인정보 수집 및 이용 동의", true),
    AGE("만 14세 이상 확인", true);

    private final String description;
    private final boolean required;
}
