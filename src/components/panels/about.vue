<template>
<div class="about">
    <a href="https://wattspeed.com" target="_blank">
      <svg width="300" height="70" class="logo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/symbols.svg#logo"></use>
      </svg>
    </a>

    <p class="mt0">Made with
      <span class="heart">
        <svg width="18" height="18">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/symbols.svg#heart"></use>
        </svg>
      </span>
      by <a href="https://www.advancedwebranking.com/" target="_blank">Advanced Web Ranking</a>
    </p>

    <div>
      <a href="https://twitter.com/intent/tweet?text=Get powerful insights on web technologies with AWRStudyr&url=https%3A%2F%2Fawrstudyr.com%2F" class="btn" target="_blank">
        <svg width="20" height="20">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/symbols.svg#twitter"></use>
        </svg>
        <span>Tweet</span>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fawrstudyr.com%2F" class="btn" target="_blank">
        <svg width="20" height="20">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/symbols.svg#facebook"></use>
        </svg>
        <span>Share on Facebook</span>
      </a>
    </div>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .about {
    display: flex;
    flex-direction: column;
    height: calc(100% - 52px); // 48px(nav) + 4px(top and bottom white gap)
    align-items: center;
    justify-content: center;
    color: #fff;

    .logo {
      margin-bottom: 1rem;
    }
  }

  .btn {
    display: inline-block;
    color: currentColor;
    border: 1px solid currentColor;
    border-radius: 3px;
    text-decoration: none;
    padding: .5rem 1rem;

    &:not(:last-of-type) {
      margin-right: .5rem;
    }

    &:hover {
      background-color: rgba(255,255,255,.2);
    }

    span {
      vertical-align: bottom;
    }
  }

  .heart svg {
    margin: 0 10px;
    fill: #F44336;
    animation: 1s pumping infinite;

    @keyframes pumping {
      0% { transform: scale(1, 1); }
      15% { transform: scale(1.05, 1.05); }
      25% { transform: scale(1.15, 1.15); }
      50% { transform: scale(1.25, 1.25); }
      65% { transform: scale(1.15, 1.15); }
      75% { transform: scale(1.05, 1.05); }
      100% { transform: scale(1, 1); }
    }
  }
</style>
