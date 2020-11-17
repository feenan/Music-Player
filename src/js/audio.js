(function(root){
    function AudioManage(){
        this.audio = new Audio();//创建一个audio实例
        this.status = 'pause';
    }
    AudioManage.prototype = {
    //    加载音乐
        load:function(src){
            this.audio.src = src;
            this.audio.load();//这些属性和方法都是audio对象身上自带的并非我们给其实例或原型设置的。 
        },
        // 播放音乐
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        //暂停音乐
        pause:function(){
            this.audio.pause();
            this.status = 'pause';//这个load是audio对象身上自带的方法并非我们给其原型上设置的。 
        },
        //音乐播放完成事件
        end:function(fn){
          this.audio.onended = fn;//audio对象提供的一个事件，音乐播放完毕会执行这个函数fn
        },
        //跳到音乐的某个时间点
        playTo:function(time){
            this.audio.currentTime = time;
        }
    }
    root.music = new AudioManage();
})(window.player || (window.player = {}))