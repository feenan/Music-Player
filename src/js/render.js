//渲染功能：图片，音乐，信息，是否喜欢
;(function(root){//分号是为了避免压缩的时候代码放在一块出错。
    //渲染图片
    function renderImg(src){
       root.blurImg(src);//就是geibody添加背景图片所以第二个参数不传。
       var img = document.querySelector('.songImg img');
       img.src = src;
    }
    // 渲染音乐信息
    function renderInfo(data){
       var songInfoChildren = document.querySelector('.songInfo').children;
       songInfoChildren[0].innerHTML = data.name;
       songInfoChildren[1].innerHTML = data.singer;
       songInfoChildren[2].innerHTML = data.album;

    }
    // 渲染是否喜欢
    function renderIsLike(isLike){
       var lis = document.querySelectorAll('.control li')
       lis[0].className = isLike?'liking':'';
    }
    root.render =function(data){//渲染所需数据
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };
})(window.player || (window.player = {}))