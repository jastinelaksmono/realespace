<template>
    <div class="carousel">
      <slot :currentSlide="currentSlide"></slot>
  
      <!-- Navigation -->
      <div v-if="navEnabled" class="navigate">
        <div class="toggle-page left">
          <img src="../assets/img/prev_grey.png" @click="prevSlide" class="prevBtn">
        </div>
        <div class="toggle-page right">
          <img src="../assets/img/next_grey.png" @click="nextSlide" class="nextBtn">
        </div>
      </div>
  
      <!-- Pagination -->
      <div v-if="pagintationEnabled" class="pagination">
        <span
          @click="goToSlide(index)"
          v-for="(slide, index) in getSlideCount"
          :key="index"
          :class="{ active: index + 1 === currentSlide }"
        >
        </span>
      </div>

    </div>
  </template>
  
<script>
  import { ref, onMounted } from "vue";
  export default {
    props: ["startAutoPlay", "timeout", "navigation", "pagination"],
    setup(props) {
      const currentSlide = ref(1);
      const getSlideCount = ref(null);
      const pagintationEnabled = ref(
      props.pagination === undefined ? true : props.pagination
      );
      const navEnabled = ref(props.navigation === undefined ? true : props.navigation);

      // next slide
      const nextSlide = () => {
        if (currentSlide.value === getSlideCount.value) {
            currentSlide.value = 1;
            return;
        }
        currentSlide.value += 1;
      };

      // prev slide
      const prevSlide = () => {
        if (currentSlide.value === 1) {
            currentSlide.value = 3;
            return;
        }
        currentSlide.value -= 1;
      };

      const goToSlide = (index) => {
        currentSlide.value = index + 1;
      };

      // autoplay
      const autoPlay = () => {
        setInterval(() => {
            nextSlide();
        }, 8000);
      };

      onMounted(() => {
        getSlideCount.value = document.querySelectorAll(".slide").length;
      });

      return {
          currentSlide,
          nextSlide,
          prevSlide,
          getSlideCount,
          goToSlide,
          autoPlay,
          pagintationEnabled,
          navEnabled,
      };
    },
    created: function() {
      this.autoPlay();
    }
  };
</script>
  
<style lang="scss">
  .navigate {
    padding: 0 16px;
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .toggle-page {
      display: flex;
      flex: 1;
    }
  
    .right {
      justify-content: flex-end;
    }

    .left {
      justify-content: flex-start;
    }

    .prevBtn, .nextBtn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3vw;
    }

    .prevBtn:hover{
        content:url("../assets/img/prev_blue.png");
    }

    .nextBtn:hover{
        content:url("../assets/img/next_blue.png");
    }

  }
  
  .pagination {
    position: absolute;
    bottom: 2vw;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  
    span {
      cursor: pointer;
      width: 2vw;
      height: 2vw;
      margin-left: 2vw;
      border-radius: 2vw;
      background-color: #cecece;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
  
    .active {
      background-color: #5379F6;
    }
  }

  @media (max-width: 768px) {
    .navigate {
        .prevBtn, .nextBtn{
          height: 5vw;
      }
    }

  }

  @media (max-width: 576px) {

  
  }

  </style>