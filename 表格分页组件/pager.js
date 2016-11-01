//分页
function pager(options){
	this.cur = parseInt(options.cur);
	this.total = parseInt(options.total);
	this.render = $('#'+options.render);
    this.action=function(){
        if(!this.render || !this.total){
        return '';
        }

        var html = '<ul class="pages"><li class="page">';
        //总页数为1
        if (this.total === 1) {
            html += '<a href="javascript:void(0);" class="page-index">' + 1 + '</a>';
        }
        //总页数不为1，当前页数不是第一页，则最前面加一个前一页按钮
        if (this.cur !== 1 && this.total !== 1) {
            // 上一页
            html += '<a href="javascript:void(0);" class="prev page-index" data-index="' + (this.cur - 1) + '">&lt;</a>';
        }
        //总页数大于1小于6，不会出现前面和后面的...
        if(this.total > 1 && this.total < 6){
            for(var i=1;i<=this.total;i++){
                if(this.cur === i){
                    html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + this.cur + '">'+this.cur+'</a>';
                } else {
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                }
            }
        }
        //总页数大于等于6，当前页面小于6，不出现前面的...
        if(this.total >= 6 && this.cur < 6){
            for(var i = 1; i < 6 ; i++){
                if(this.cur === i){
                    html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + this.cur + '">'+this.cur+'</a>';
                } else {
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                }
            }
            if(this.total<=8){
                //总页数大于等于6且小于等于8，则不出现后面的...
                for(var i=6;i<=total;i++){
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                }
            }else{
                //总页数大于8，则出现后面的...
                for(var i=6;i<=8;i++){
                    html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                }
                html += '<span class="more">...</span><a href="javascript:void(0);" class="page-index" data-index="' + this.total + '">'+this.total+'</a>';                        
            }
        }
        //总页面大于等于6，当前页面大于等于6，前面出现...
        if(this.total >= 6 && this.cur >= 6){
            html += '<a href="javascript:void(0);" class="page-index" data-index="1">1</a>';
            html += '<span class="more">...</span>';
            //总页面小于等于当前页面+2，则遍历至总页面，后面不出现...
            if(this.total <= this.cur+2){
                for(var i=this.cur-2;i<=this.total;i++){
                    if(this.cur === i){
                        html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + this.cur + '">'+this.cur+'</a>';
                    } else {
                        html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                    }
                }
            }else{
                //总页面大于当前页面+2，则遍历至当前页面+2，后面出现...
                for(var i=this.cur-2;i<=this.cur+2;i++){
                    if(this.cur === i){
                        html += '<a href="javascript:void(0);" class="cur page-index" data-index="' + this.cur + '">'+this.cur+'</a>';
                    } else {
                        html += '<a href="javascript:void(0);" class="page-index" data-index="' + i + '">'+i+'</a>';
                    }
                }
                html += '<span class="more">...</span><a href="javascript:void(0);" class="page-index" data-index="' + this.total + '">'+this.total+'</a>';  
            }
            
        }
        //当前页面不为最后一页，则最后加上后一面按钮
        if(this.cur < this.total){
            html += '<a href="javascript:void(0);" class="page-index next" data-index="' + (this.cur + 1) + '">&gt;</a>';            
        }
        html += '<span class="page-total">共<span class="number">' + this.total + '</span>页</span>\
          <span class="page-go">到第<input class="w35 go" id="yeshu" type="text" value="">页</span>\
          <input type="button" class="gray-btn" id="go-search" value="确定">';
        $(this.render).html(html);
        $(document).trigger("pagerDone");

        //页面更改
        var me = this;
        var curIndex;
        var oPages = $('.page-index');
        for(var i = 0; i < oPages.length; i++) {
            $(oPages[i]).click(function() {
                curIndex=$(this).attr('data-index');
                myPager=new pager({
                    cur : curIndex,
                    total : parseInt(options.total),
                    render : options.render
                });
                 myPager.action();
            });
        }    
        var goPage = $('#go-search');
        $(goPage).click(function() {
            var index = $('#yeshu').val();
            if(!index || (+index > me.total) || (+index < 1)) {
                return;
            }
            curIndex=index;
            myPager=new pager({
                    cur : curIndex,
                    total : parseInt(options.total),
                    render : options.render
                });
            myPager.action();
        });
    }	   
}

//数据
function data(options){
	this.index=$('.cur:first').attr("data-index");
	this.len=options.len;
    this.url=options.url;
    this.curData='[["Bob","man","'+this.index+'"],["Lisa","woman","14"],["Tina","woman","22"],["Lisa","woman","14"],["Tina","woman","22"]]';
    // $(document).trigger("dataDone");
}


//视图
function grid(options){
    this.render=$('#'+options.render);
    this.cols=options.colsName.length;
    this.colsName=options.colsName;
    this.mydata=$.parseJSON(options.mydata);
    this.action=function(){
        //绘制表格
            var html="<table><tbody><tr>";
        for(var i=0;i<this.cols;i++){
            html+='<td class="header">'+this.colsName[i]+'</td>';
        }
        html+='</tr>';
        for(var i=0;i<this.mydata.length;i++){
            html+='<tr>';
            for(var j=0;j<this.cols;j++){
                html+='<td>'+this.mydata[i][j]+'</td>';
            }
            html+='</tr>';
        }
        html+='</tbody></table>';
        $(this.render).html(html);
    }
    
}



