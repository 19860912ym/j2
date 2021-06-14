function generatorAvator(username,size,bgcolor,canvasId,avatarContainerId){
    //设置头像昵称，如果为null或者为空时，设置为无
    var nickname = username==null?"无":username==""?"无":username;
    //设置头像大小
    var avatarSize = size==null?30:size;

    //设置头像内部文字大小
    var fontSize = size==null?12:avatarSize/2;

    //设置头像内部字体
    var fontWeight = 'normal';

    //设置头像背景颜色
    var colors = [
        "#31bc9f", "#33cc70", "#4a94db", "#9b5fb6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
        "#f1cb1e", "#e6761b", "#e7363b", "#00bcd4", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ];
    var avatarColor = bgcolor==null?colors[Math.floor((Math.random()*colors.length))]:bgcolor==""?bgcolor:colors[Math.floor((Math.random()*colors.length))];

    /*根据id获取canvas
    * 如果为空，则创建新的canvas
    * */
    var canvas = document.getElementById(canvasId);

    if(canvas){
        canvas.remove();
    }else{
        var newcanvas = "<canvas id='"+canvasId+"' style='display:none'></canvas>";
        document.getElementsByName("body").append(newcanvas);
        canvas = document.getElementById(canvasId);
    }

    //初始化canvas设置
    canvas.width = avatarSize;
    canvas.height = avatarSize;
    var context = canvas.getContext('2d');

    //头像背景颜色设置
    context.fillStyle = avatarColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //头像字体颜色设置
    context.fillStyle = '#FFFFFF';
    context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline="middle";
    console.log(avatarSize/2-fontSize/2);
    console.log(avatarSize/2);

    context.fillText(nickname.charAt(0), fontSize, fontSize);
    document.getElementById(avatarContainerId).src = canvas.toDataURL("image/png");
}
