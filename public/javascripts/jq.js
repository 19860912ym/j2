$('#nextPage').click (function(){
    $.ajax({
        url: "/nextPage",
        type: "Post",
        success: function(data){
            console.log(data);
           document.getElementById('show').innerHTML =
           data.map(a =>
           ` 
           <tr>
            <td>${a.name}</td>
            <td>${a.s1}</td>
            <td>${a.s2}</td>
            <td>${a.s3}</td>
            <td>${a.s3+a.s2+a.s1}</td>
           `).join(" ");
        }
    })
})
