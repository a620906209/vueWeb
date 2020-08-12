<template>
<div class="footer">
    <div class="leftLogo"></div>
    <div class="rightText">
      <p>Copyright ©{{thisYear}} MHL CO.,LTD<br> Use of this site constitutes acceptance of our User Agreement and Privacy Policy.<br>
  The material on this site may not be reproduced, distributed , transmitted, cached or otherwise used, except with the prior written permission of LOPHURA.<br>E-mail: service@mhlpromor.com</p>
    </div>
</div>
</template>
<script >
 export default {
    data() {
      return {
          thisYear: 0
      }
    },
    created(){
      var toDay = new Date()
      this.thisYear = toDay.getFullYear()
    }
  }
</script>


<style scoped lang="sass">
  @import './lib/sass/footer.sass'
</style>
