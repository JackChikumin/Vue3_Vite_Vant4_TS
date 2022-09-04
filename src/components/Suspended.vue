<template>
  <div
    class="Suspended"
    ref="Suspended"
    :style="{
      top: StyleObject.top + 'px',
      left: StyleObject.left + 'px',
      width: itemWidth + 'px',
      height: itemHeight + 'px',
    }"
  >
    <Image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
  </div>
</template>

<script lang="ts" setup>
  import { Image } from 'vant';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const props = defineProps({
    itemWidth: {
      type: Number,
      default: 100,
    },
    itemHeight: {
      type: Number,
      default: 100,
    },
    gapWidth: {
      type: Number,
      default: 5,
    },
    coefficientHeight: {
      type: Number,
      default: 0.8,
    },
  });

  // 视口宽
  const clientW = ref<number>(document.documentElement.clientWidth);
  // 视口高
  const clientH = ref<number>(document.documentElement.clientHeight);
  const currentTop = ref<number>(0);
  const Timer = ref<any>(null);

  // ref
  const Suspended = ref();

  // 高度
  const StyleObject = reactive({
    left: clientW.value - props.itemWidth - props.gapWidth,
    top: clientH.value * props.coefficientHeight,
  });

  // 滚动事件
  const handleScrollStart = (): void => {
    Timer.value && clearTimeout(Timer.value);
    Timer.value = setTimeout((): void => {
      handleScrollEnd();
    }, 300);
    currentTop.value = document.documentElement.scrollTop || document.body.scrollTop;
    if (StyleObject.left > clientW.value / 2) {
      StyleObject.left = clientW.value - props.itemWidth / 2;
    } else {
      StyleObject.left = props.itemWidth / 2;
    }
  };

  const handleScrollEnd = (): void => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === currentTop.value) {
      if (StyleObject.left > clientW.value / 2) {
        StyleObject.left = clientW.value - props.itemWidth - props.gapWidth;
      } else {
        StyleObject.left = props.gapWidth;
      }
      clearTimeout(Timer.value);
    }
  };

  onMounted((): void => {
    window.addEventListener('scroll', handleScrollStart);
    Suspended.value.addEventListener('touchstart', (): void => {
      Suspended.value.style.transition = 'none';
    });
    Suspended.value.addEventListener('touchmove', (event: any): void => {
      if (event.targetTouches.length === 1) {
        let touch = event.targetTouches[0];
        StyleObject.left = touch.clientX - props.itemWidth / 2;
        StyleObject.top = touch.clientY - props.itemHeight / 2;
      }
    });

    Suspended.value.addEventListener('touchend', (): void => {
      Suspended.value.style.transition = 'all 0.3s';
      if (StyleObject.left > clientW.value / 2) {
        StyleObject.left = clientW.value - props.itemWidth - props.gapWidth;
      } else {
        StyleObject.left = props.gapWidth;
      }
      if (StyleObject.top > clientH.value) {
        StyleObject.top = clientH.value - props.itemHeight - props.gapWidth;
      } else if (StyleObject.top < 20) {
        StyleObject.top = props.gapWidth;
      }
    });
  });

  onUnmounted((): void => {
    window.removeEventListener('scroll', handleScrollStart);
  });
</script>

<style lang="less" scoped>
  .Suspended {
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    color: #666666;
    z-index: 20;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20vw;
  }
</style>
