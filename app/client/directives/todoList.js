angular.module('app').directive('todoList', function($http) {
    return {
        restrict: 'EA',
        scope: {
            lists: '=lists'
        },
        replace: true,
        template: "<ul >" +
        "<li ng-repeat='list in lists'>" +
        "<input type='checkbox', ng-model='list.done'>  " +
        "<span class='done-{{list.done}}'>" +
        "{{list.title}}" +
        "</span>" +
        "<button ng-click='del($index, list)'>del</button>" +
        "</li>" +
        "</ul>",
        link: function(scope, elem, attr) {

            scope.del = function(indx, list) {
                scope.lists.splice(indx, 1);
                $http.delete('/removeTodo/'+list._id, list).success(function(data) {
                    console.log('data', data);
                });
            }
            scope.done = function(done){
                console.log(done);
                if(done) {
                    console.log('done', elem);
                    elem.css('background-color', 'yellow');
                } else {
                    elem.css('background-color', '');
                }
            }
        }

    }
});