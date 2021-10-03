<template>
  <div class="common-container">
    <div class="flex">
      <p class="title">404</p>
      <div class="image">
        <img src="@/assets/images/404.png" alt="" class="img" />
      </div>
      <p>
        よくこのページまで辿り着けましたね！<br />すみまよキャンプアプリを使い倒してくれてるおかげかな?笑
      </p>
      <p>気を取り直して、とりあえずさっきのページ戻ろか。</p>
      <button class="common-button -error" @click="$router.go(-1)">Back</button>
    </div>
  </div>
</template>
