//被pager触发data改变
$(document).on("pagerDone",function(){
    new data({
        len:5,
        url:"test.php"
    });
});
/*$(document).on("pagerDone",dataOn);
function dataOn(){
    new data({
        len:5
    });
}*/
//被data触发grid改变
$(document).on("dataDone",function(){
    new grid({
        render:'grid',
        myData:curData,
        colsName:new Array('name','sex','age')
    });
});
//分页初始化
new pager({
    cur:1,
    total:20,
    render:'pager'
});