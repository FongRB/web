//被pager触发data改变
$(document).on("pagerDone",function(){
    myData=new data({
        len:5,
        url:"test.php"
    });
    $(document).trigger("dataDone");
});
/*$(document).on("pagerDone",dataOn);
function dataOn(){
    new data({
        len:5
    });
}*/
//被data触发grid改变
$(document).on("dataDone",function(){
    myGrid=new grid({
        render:'grid',
        mydata:myData.curData,
        colsName:new Array('name','sex','age')
    });
});
//分页初始化
var myPager={};
myPager= new pager({cur:1,total:20,render:'pager'});
myPager.action();