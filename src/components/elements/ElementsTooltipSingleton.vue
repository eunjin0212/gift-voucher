<script setup>
/**
 * Tooltip 은 Flowbite 라이브러리(TailwindCss 호환) 을 사용한다.
 * 예제 ) https://flowbite.com/docs/components/tooltips/
 * 이 컴포넌트의 경우 TransitionRoot 을 사용하기에 초기화 타이밍이 느리다.
 * 툴팁이 있는 페이지가 Transition/Dialog 와 open 이라는 변수에 의해 언제 생성될지 모르기 때문에 (즉 null 유지)
 * 아래와 같이 :ref=(el)=>{....} 를 통해 초기화를 천천히 해줄 수 있는 도구가 필요하다.
 * 
 * !! 주의 !! 툴팁 Element 는 1개여야 하고, Share 한다. Trigger 가 여러개가 있고 설정을 통해 onShow 로 바꿔서 텍스트만 바꿔보여줘야 한다. 
 */
import { ref, defineExpose } from "vue";

const message = ref('');

// Element 의 추가/잦은 호출때문에 메모리 누수를 조심해야 한다.
function loadAfterTransition(ele, msgFn, options){
    // ele == null 일때는 transition ele 를 포함한 div 가 사라질때 이므로 null 일때는 무시해야 한다. (즉 여러번 call 당한다.)
    if( ! ele ) return;
    
    const tooltipDom = this.$el;

    // 편법 : Transition 영역 바깥에 있는 tooltipBloomMsg element 를 Transition 이 완료된 이후의 ele 가 들어오는 시점에
    // ele 근처로 편입시킨다.
    // 이유는 이 Transition 은 Fixed overlay popup 으로 다른 윈도우보다 앞선다. 따라서 z-index 등으로 tooltip 을 상위에 올릴 수 없다.
    // 최소한 이 DOM 과 같은 레벨안에 존재해야 한다.
    ele.appendChild(tooltipDom);

    if( ele.__tooltip__ ) {
        // 이미 툴팁 오브젝트를 가지고 있다. 지우지 않으면 메모리 누수.
        delete ele.__tooltip__;
    }
    
    ele.__tooltip__ = new Tooltip(tooltipDom, ele, {
        triggerType: (options || {}).triggerType || 'hover',
        onShow: () => {
            const dynamicMsg = ( msgFn && msgFn() ) || 'No message defined';
            message.value = dynamicMsg;
        }
    });
}

function loadBasic(ele, msgFn, options){
    // ele == null 일때는 transition ele 를 포함한 div 가 사라질때 이므로 null 일때는 무시해야 한다. (즉 여러번 call 당한다.)
    if( ! ele ) return;
    
    const tooltipDom = this.$el;

    if( ele.__tooltip__ ) {
        // 이미 툴팁 오브젝트를 가지고 있다. 지우지 않으면 메모리 누수.
        delete ele.__tooltip__;
    }
    
    ele.__tooltip__ = new Tooltip(tooltipDom, ele, {
        triggerType: (options || {}).triggerType || 'hover',
        onShow: () => {
            const dynamicMsg = ( msgFn && msgFn() ) || 'No message defined';
            message.value = dynamicMsg;
        }
    });
}

defineExpose({
    loadAfterTransition,
    loadBasic
});

</script>
<template>
    <div id="tooltip-default"
        role="tooltip" 
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {{ message }}
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>