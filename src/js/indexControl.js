(function (root){
   function Index(len){
       this.index = 0;
       this.len = len;//数据的长度，用于做判断
   }
   Index.prototype = {
    //用于取上一个索引（上一首）  
    prev:function(){
        return this.get(-1)
    },
     //取下一个索引（下一首）
   next:function(){
       return this.get(1)
   },
   //用来获取索引，参数为+1或-1
   get:function(val){
       this.index = (this.index + val + this.len) % this.len;//左右边过界情况，就都处理了。一个数字模比自己大的数字，结果就是自己本身。当当前值为0时，再-1，该行结果都是this.len - 1;当值为this.len -1 的时候再加1，该行结果就是0；在这两值之间的情况正好等于中间的索引值。，
       return this.index;
   }
  //

   }
   root.controlIndex = Index;//把构造函数暴露出去。因为实例对象需要传参。
  
})(window.player || (window.player={}))