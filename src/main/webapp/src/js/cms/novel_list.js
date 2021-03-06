function NovelList(){

}
// 初始化时间选择框
NovelList.prototype.initDatePicker = function(){
    var startPicker = $('#start-picker');
    var endPicker = $('#end-picker');
    var todayDate = new Date();
    var todayStr = todayDate.getFullYear() + '/' + (todayDate.getMonth()+1) + '/' + todayDate.getDate();
    var options = {
        'showButtonPanel': true,
        'format': 'yyyy/mm/dd',
        'startDate': '2019/11/1',
        'endDate': todayStr,
        'language': 'zh-CN',
        'todayBtn': 'linked',
        'todayHeightLight': true,
        'clearBtn': true,
        'autoclose': true,
    };

    startPicker.datepicker(options);
    endPicker.datepicker(options);
};

// 监听删除小说事件
NovelList.prototype.listenDeleteNovelEvent = function(){
    var deleteBtn = $('.delete-btn');
    deleteBtn.click(function(){
        var novelId = $(this).parents('tr').attr('data-novel-id');
        xfzalert.alertConfirm({
            'text': '您确定要删除这个小说吗？',
            'confirmCallback': function(){
                myajax.post({
                    'url': '/account/delete_novel/',
                    'data': {
                        'novel_id': novelId
                    },
                    'success': function(result){
                        if(result['code'] === 200){
                            xfzalert.alertSuccessToast('删除成功');
                            setTimeout(function(){
                                window.location = window.location.href;
                            },1000);
                        }
                    }
                });
            }
        });
    });
};

// 监听推荐事件
NovelList.prototype.listenSetRecommendEvent = function(){
    $('.set-recommend-btn').click(function(){
        var novelId = $(this).parents('tr').attr('data-novel-id');
        xfzalert.alertConfirm({
            'text': '您确定要推荐该小说吗？',
            'confirmCallback': function(){
                myajax.post({
                    'url': '/cms/set_recommend/',
                    'data': {
                        'novel_id': novelId
                    },
                    'success': function(result){
                        if(result['code'] === 200){
                            xfzalert.alertSuccessToast('设置成功');
                            setTimeout(function(){
                                window.location = window.location.href;
                            },1000);
                        }
                    }
                });
            }
        });
    })
};

// 监听取消推荐事件
NovelList.prototype.listenCancelRecommendEvent = function(){
    $('.cancel-recommend-btn').click(function(){
        var novelId = $(this).parents('tr').attr('data-novel-id');
        xfzalert.alertConfirm({
            'text': '您确定要取消推荐该小说吗？',
            'confirmCallback': function(){
                myajax.post({
                    'url': '/cms/cancel_recommend/',
                    'data': {
                        'novel_id': novelId
                    },
                    'success': function(result){
                        if(result['code'] === 200){
                            xfzalert.alertSuccessToast('设置成功');
                            setTimeout(function(){
                                window.location = window.location.href;
                            },1000);
                        }
                    }
                });
            }
        });
    })
};

NovelList.prototype.run = function(){
    this.initDatePicker();
    this.listenDeleteNovelEvent();
    this.listenSetRecommendEvent();
    this.listenCancelRecommendEvent();
};


$(function(){
    var novelList = new NovelList();
    novelList.run();
});