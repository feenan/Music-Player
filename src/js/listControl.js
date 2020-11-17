(function (root){
    function listControl(data,wrap){
        var list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
        musicList = [];//储存歌曲列表各dom标签。
        list.className = 'list';
        dt.innerHTML = '播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';
        dl.appendChild(dt);
        data.forEach(function(item,index){
            var dd = document.createElement('dd');
            dd.addEventListener('touchend',function(){
                changeSelect(index);
            })
            dd.innerHTML = item.name;
            dl.appendChild(dd);
            musicList.push(dd);
        });
           list.appendChild(dl);
           list.appendChild(close);
           wrap.appendChild(list);
           var disY = list.offsetHeight;
           list.style.transform = 'translateY(' + disY + 'px)';
           close.addEventListener('touchend',function(){
               slideDown();
           })
           changeSelect(0);
           function slideUp(){
            list.style.transion = '.2s'
            list.style.transform = 'translateY(0)';
           }
           function slideDown(){
            list.style.transion = '.2s'
            list.style.transform = 'translateY(' + disY + 'px)';
        }
        //切换选中元素
        function changeSelect(index){
            for(var i = 0;i<musicList.length;i++){
                musicList[i].className = '';
            }
            musicList[index].className = 'active';
        }
        
    return {
        dom:list,
        musicList:musicList,
        slideDown:slideDown,
        slideUp:slideUp,
        changeSelect:changeSelect
    }

    }
    
    root.listControl = listControl;//把构造函数暴露出去。因为实例对象需要传参。
   
 })(window.player || (window.player={}))