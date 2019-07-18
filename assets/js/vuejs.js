new Vue({
  el: '#app',
  data: {
    message: '',
    fontLetter: 8
  },
  methods: {
    resetear : function(){
      var _this = this

      setTimeout(function(){
        _this.message = ''
      }, 3000);
    }
  },
  watch: {
    message(newVal, oldVal){
      wNow   = $('.titleImage span').width()
      wTotal = $('.titleImage').width()
      var dif = 1.5
      var vstandart = window.matchMedia( "(min-width: 1088px)" );
      if (vstandart.matches) {
        dif = 1.5
        this.fontLetter = 8
      }else{
        dif = 2
        this.fontLetter = 4

      }
      margin = 20
      console.log(wNow+margin)
      console.log(wTotal)
      if ((wNow+margin) > wTotal){
        this.fontLetter = this.fontLetter - dif
        if (this.fontLetter > dif){
          $('.titleImage').css('font-size',this.fontLetter+'rem')
          console.log(this.fontLetter)
        }
      }
      if(newVal.length < 6){
        // this.fontLetter = 8
        $('.titleImage').css('font-size',this.fontLetter+'rem')
      }
    }
  }
})
