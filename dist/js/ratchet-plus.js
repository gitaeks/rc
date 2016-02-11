/*!
 * =====================================================
 * Ratchet Plus v0.5 (https://github.com/kimsq/rc)
 * Copyright 2016 redblock inc.
 * Author kiere (kiere@kimsq.com)
 * Licensed under MIT.
 * =====================================================
 */

// 히스토리백
$('body').on('touchend', '[data-history=back]', function() {
    window.history.back();
});


// 페이지 호출 함수 
$('body').on('tap click','[data-toggle="page"]',function(e){
    e.preventDefault();
    var startPage=$(this).data('start'); // 스타트 페이지 id 
    var loadPage=$(this).data('target'); // 타겟 페이지 id 
    var transition=$(this).data('transition'); // 호출 방향 
    var title=$(this).data('title'); // 
    var url=$(this).data('url'); // url 
    var mod=$(this).data('content'); // content 종류 
    var uid=$(this).attr('data-id'); // 포스트 uid 
    var etc=$(this).data('etc'); // 기타 데이타 배열 
    var loadData;

    // 타겟 페이지 title 값 세팅 
    $(loadPage).find('[data-role="title"]').html(title); 
    
    // 나머지 데이타들 일괄적용  
    if(etc!=undefined){
         var etc_array=etc.split(','); // 쉼표로 분리 
         for(i=0;i<etc_array.length;i++){
               var data_array=etc_array[i].split('-');
               var data_key=data_array[0];
               var data_val=data_array[1];
                         
               // key 값을 load 페이지 data-role="" 속성명과 매칭한다.   
               if(data_key=='avatar') $(loadPage).find('[data-role="'+data_key+'"]').attr('src',data_val); 
               else {
                     // like 숫자가 있는 경우 좋아요 버튼 active 처리 
                     if(data_key=='like' && data_val!='0') $('[data-bbs-act="opinion"]').addClass('active');
                     else $('[data-bbs-act="opinion"]').removeClass('active');
                     
                     $(loadPage).find('[data-role="'+data_key+'"]').html(data_val); 
               }
         }
    }
    

    // 권기택 추가
    var header_list=$('[data-role="list-header"]'); 
    var view_list=$('[data-role="view-header"]'); 
    $(header_list).addClass('rb-hidden');
    $(view_list).removeClass('rb-hidden');

    // 타겟 페이지 호출    
    loadSlidePage(startPage,loadPage,transition);

    // content 내용 가져오기
    //getLoadPageContent(mod,loadPage,title,uid);             
    
    // 페이지 정보 : object 구분값 , 현재 페이지, 로드 페이지, 방향 
    var object = {'type': 'page', 'target':{'start': startPage,'load':loadPage,'transition':transition}}
    
    // 브라우저 history 객체에 추가함수 호출  
    addHistoryObject(object,title,url);
});

var addHistoryObject=function(object,title,url){
        History.pushState(object, title, url); // history 저장 ==> title, url 적용 목적 (state 는 사용하지 않는다.) 
        //updateHistoryObject(object,'add');// historyObj sessionStorage 에 본 object 추가 ===> back 버튼 적용시 사용 
}   

// historyObj 닫기(원복) 처리 함수
var resetHistoryObjet=function(objType,objTarget){
        if(objType=='page'){
              var startPage=objTarget.start;
              var loadPage=objTarget.load;
              var transition=objTarget.transition;
              var object=loadPage; // title, content 초기화를 object 로 일괄적용하기 위해서  
              closeSlidePage(startPage,loadPage,transition);// startPage 와 loadPage 위치를 바꿔준다.
        }else if(objType=='modal'){
               var object=objTarget;  
              $(object).removeClass('active');
        }else if(objType=='popup'){
              var object=objTarget;
              $(object).removeClass('active'); 
              $("body .backdrop").remove(); 
        }else if(objType=='sheet'){
              var object=objTarget.sheet;
              var placement=objTarget.placement;
              $(object).removeClass('rb-'+placement+' visible'); // 노출과 함께 방향 설정  
              $(object).css("display","none"); 
              $("body .backdrop").remove(); 
        }

         // object 입력내용 초기화 (object 공통내용) 
         $(object).find('[data-role="title"]').html('');
         $(object).find('[data-role="content"]').html('');
         if(object=='#page-bbs-view'){
             $(object).find('[data-role="comment-wrapper"]').html(''); // 댓글 리스트 초기화  
             $(object).find('[data-role="like-wrapper"]').html(''); // 좋아요 리스트 초기화  
         }              
         $(object).find('[data-role="focus"]').blur();// 포커싱한 것 초기화 

        // 권기택 추가
        var header_list=$('[data-role="list-header"]'); 
        var view_list=$('[data-role="view-header"]'); 
        $(header_list).removeClass('rb-hidden');
        $(view_list).addClass('rb-hidden');
}  

// 슬라이딩으로 페이지 호출(열기) 함수     
var loadSlidePage=function(startPage,loadPage,transition){     
    $(loadPage).attr('class','page right'); // 출발 위치 세팅 
    $(loadPage).attr('class','page transition center'); // 출발위치에서 중앙으로 이동 
    $(startPage).attr('class','page transition left'); // start 페이지는 반대로 이동 
}

// 슬라이딩으로 페이지 닫기 함수     
var closeSlidePage=function(startPage,loadPage,transition){     
    $(startPage).attr('class','page left'); // 출발 위치 세팅 
    $(startPage).attr('class','page transition center'); // 출발위치에서 중앙으로 이동 
    $(loadPage).attr('class','page transition right'); // start 페이지는 반대로 이동 
}

// back button 이벤트  
window.addEventListener('popstate', function(event) {     
        var CurrentIndex=History.getCurrentIndex();
        var CurrentObj=History.getStateByIndex(CurrentIndex);
        CurrentObj=JSON.stringify(CurrentObj);
        var ForwardIndex=parseInt(CurrentIndex)-1;
        var ForwardObj=History.getStateByIndex(ForwardIndex); // 직전 object 
        var ForwardObj=JSON.stringify(ForwardObj);
        var result=$.parseJSON(ForwardObj);
        //History.log('직전 history : state =' +ForwardObj+'/ index='+ForwardIndex);
        var objType=result.data.type; // modal, page, popover, popup,...     
        var objTarget=result.data.target; // modal, page, popover..의 id 정보          
        resetHistoryObjet(objType,objTarget);
        //History.log('현재 history : state ='+CurrentObj+' / index='+CurrentIndex);
        //updateHistoryObject(null,'delete'); // historyObj(modal, page, popover, popup , bottomsheet ...) 닫기 함수 호출 
});   



// Instance
snapper = new Snap({
    element: $("#drawer-left")[0],
    maxPosition: 1,
    minPosition: -1,
    transitionSpeed: 0.1,
    tapToClose: true,
    touchToDrag: true
}),

snapper.on('open', function(){
    $('.snap-content').append('<div class="backdrop" data-drawer-close="left"></div>');
});


snapper.on('close', function(){
    $(".backdrop").remove();
});

$('body').on('tap click', '[data-drawer-close="left"]', function() {
    snapper.close('left');
});
$('body').on('click', '[data-drawer-open="left"]', function() {
    snapper.open('left');
});
$('body').on('click', '[data-drawer-expand="left"]', function() {
    snapper.expand('left');
});
$('body').on('tap click','[data-drawer-toggle="left"]',function(){
    if( snapper.state().state=="left" ){
        snapper.close();
    } else {
        snapper.open('left');
    }
});

$('body').on('click', '[data-drawer-close="right"]', function() {
    snapper.close('right');
});
$('body').on('click', '[data-drawer-open="right"]', function() {
    snapper.open('right');
});
$('body').on('click', '[data-drawer-expand="right"]', function() {
    snapper.expand('right');
});
$('body').on('click','[data-drawer-toggle="right"]',function(){
    if( snapper.state().state=="right" ){
        snapper.close();
    } else {
        snapper.open('right');
    }
});
