//gaussBlur.js是高斯模糊的处理函数
// zepto.min.js此处用到这个文件的原因是要用其中的ajax，而这个文件比jquery小得多
(function($,player){
    function MusicPlayer(dom){
        this.wrap = dom;//播放器的容器（用于加载ListControl模块）
        this.dataList = [];//存储请求获得的数据
        this.indexObj = null;//索引值对象
        this.rotateTimer = null;
        this.curIndex = 0;//当前播放的歌曲的索引值
        this.list = null;//列表切割对象，在listPlay里赋值。
    }
    MusicPlayer.prototype={
        init:function(){
          this.getDom();//获取元素
          this.getData('../mock/data.json');//请求数据
        },
        getData:function(url){
            var This = this;
          $.ajax({//用的是window.Zepto里的ajax,该库内方法与jquery区别不大
              url:url,
              method:'get',
              success:function(data){
                  This.dataList = data;
                  This.listPlay();
                  This.indexObj = new player.controlIndex(data.length);//给索引值对象赋了值
                  This.loadMusic(This.indexObj.index);//加载音乐及信息
                    This.musicControl();
                  console.log(data);
              },
              error:function(){
                  console.log('请求数据失败')
              }
          })
        },
        getDom:function(){
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelectorAll('.control li');
        },
        loadMusic:function(index){//加载音乐
           player.render(this.dataList[index])//渲染图片和文字信息
           player.music.load(this.dataList[index].audioSrc);
           //播放音乐(只有音乐状态为play才能播放)
           if(player.music.status === 'play'){
             player.music.play();//一刷新就会开始播放当前音乐；
             this.controlBtns[2].className = 'playing';
             this.imgRotate(0);//切歌的时候旋转图片。
           }
           this.list.changeSelect(index);
           this.curIndex = index;//存储当前歌曲对应的索引值

        },
        musicControl:function(){
          //上一首
          var This = this;

          this.controlBtns[1].addEventListener('touchend',function(){
              player.music.status = 'play';
              This.loadMusic(This.indexObj.prev());
        
          })
          //下一首
          this.controlBtns[3].addEventListener('touchend',function(){
            player.music.status = 'play';
            This.loadMusic(This.indexObj.next());
      
        });
        //喜欢的歌
        this.controlBtns[0].addEventListener('touchend',function(){
            if(this.className === 'liking'){
                this.className='';
                This.dataList[This.indexObj.index].isLike = false
            }else{
                this.className='liking';
                This.dataList[This.indexObj.index].isLike = true
            }

        });
        // 播放.暂停
        this.controlBtns[2].addEventListener('touchend',function(){
            if(player.music.status == 'play'){
                player.music.pause();
               This.imgStop();

                this.className = '';
            }else{
                player.music.play()
                this.className = 'playing';
                var deg= This.record.dataset.rotate || 0;//第二次播放就记录之前的旋转角度，但对第一次要做容错处理。
                This.imgRotate(deg);
            }
            
           
      
        })

        },
        imgRotate:function(deg){//旋转图片
            var This = this;
          clearInterval(this.rotateTimer);
          this.rotateTimer = setInterval(function(){
              deg = +deg + 0.2;
          This.record.style.transform = 'rotate('+deg+'deg)';
          This.record.dataset.rotate = deg;
          }, 1000/60);//这个事件是为了跟电脑的刷新频率保持一致
        },
        imgStop:function(){//停止图片旋转
            clearInterval(this.rotateTimer);
        },
        listPlay:function(){//列表切割
            var This = this;
           this.list = player.listControl(this.dataList,this.wrap);
           //给列表按钮添加点击事件
           this.controlBtns[4].addEventListener('touchend',function(){
              This.list.slideUp();
           })
           //歌曲列表添加事件
           this.list.musicList.forEach(function(item,index){
               item.addEventListener('touchend',function(){
                   //点击当前播放的歌曲，无论是播放还是暂停都是无效
                   if(This.curIndex == index){
                       return
                   }
                   player.music.status = 'play';//歌曲要变成播放状态，否则其他状态无法控制了。
                   This.indexObj.index = index;//索引值对象当前索引值要更新
                   This.loadMusic(index);//加载索引对应音乐
                   This.list.slideDown();//切歌后播放列表收回。
               })
           })
        }
    }
    
    var musicPlayer = new MusicPlayer(document.getElementById('wrap'))
       musicPlayer.init();
})(window.Zepto,window.player)