# 컴포넌트 

<br><br><br><br>
## 모달 modal.js

autofocus HTML 속성은 RC 모달에는 효과가 없습니다. 같은 효과를 이루려면, 약간의 맞춤 자바스크립트를 사용하세요.
```
$('#myModal').on('shown.rc.modal', function () {
  $('#myInput').focus()
})
```
> ##### 컨포넌트 마크업 위치
> 다른 콤포넌트가 모달의 모습이나 기능에 영향을 끼치지 않도록 항상 컨포넌트는 HTML 코드를 문서 상단에 위치하도록 하세요.

### 예제
#### 정적 예제(Static example)

<div style="background-image:url('http://coenraets.org/blog/wp-content/uploads/2013/06/iphone5.png');background-repeat:no-repeat;margin: 0px 0px 0px 0px;padding: 145px 0px 0px 27px;width:375px;height:690px;">
<iframe src="http://coenraets.org/apps/directory-backbone-ratchet" width="320" height="550"></iframe>
</div>


<br><br>
## 페이지 전환 (Page Transitions) page.js
#### 페이지 전환 이란

<br><br>
## 팝오버 popover.js
어떤 요소에 부가적인 정보를 위해 작은 콘텐츠 오버레이를 추가합니다. 제목과 콘텐츠의 길이가 0 인 팝오버는 절대 보여지지 않습니다.
> #### 플러그인 의존성
> 팝오버는 rc 플러그인이 반드시 포함되어야 합니다. 


> #### Opt-in 기능성
> 성능 이유로, 툴팁과 팝오버 data-api 들은 opt-in 입니다. 이 의미는 당신은 그들을 스스로 초기화 해야한다는 것입니다.
> 페이지의 모든 팝오버를 초기화하는 한가지 방법은 그들을 `data-toggle` 로 선택하는 것입니다.

```
$(function () {
    $('[data-toggle="popover"]').popover()
    })
```

### 사용법
자바스크립트로 팝오버를 설치합니다.
```
$('#example').popover(options)
```
#### 옵션
옵션은 data 속성이나 자바스크립트로 전해질 수 있다. data 속성은 `data-animation=""` 처럼 `data-`에 옵션명을 덧붙히면 됩니다

| 이름  | 유형 | 기본값 | 설명 |
| --- | --- | --- | --- |
| animation  | boolean  | true  | 팝오버에 페이드 전환을 적용합니다.  |
| backdrop  | boolean or the string `static`  | true  |  배경을 포함합니다. 그렇지 않으면, 클릭 시 모달을 닫지 않는 배경을 위해 `static` 을 명시하세요.  |
| container  | string | true  | 특정 요소에 팝오버를 붙힙니다. 예: `container: 'body'` 이 옵션은 특히 작동하는 요소 근처 문서흐름에서 팝오버를 위치하는데 유용합니다. - 팝오버가 윈도우가 리사이즈 되는 동안 작동하는 요소로부터 멀리 떠다니는 것을 막아줍니다  |

<br><br><br><br>

## 팝업 popup.js
팝업은 날씬하지만, 신축성이 있고, 최소한의 기능성과 스마트함을 갖춘 대화창이다
<br><br>
## 쉬트 sheet.js
<br><br>
## 로더 loader.js
<br><br>
## 피드백 feedback.js