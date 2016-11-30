// function PhoneListCtrl($scope){
// 	$scope.phones=[
// 	{
// 		'name':'iphone',
// 		'snippet':'ffffff'
// 	},
// 	{
// 		'name':'sumsing',
// 		'snippet':'fdesasf'
// 	},
// 	{
// 		'name':'huawei',
// 		'snippet':'sfaefaf'
// 	}
// 	];
// 	$sc
// 	ope.hello="Hello World!";
// }

var myApp=angular.module('myApp',[]);
myApp.controller('phoneController',function($scope){
	$scope.phones=[
		{
			name:'iphone',
			snippet:111
		},
		{
			name:'sumsing',
			snippet:222
		},
		{
			name:'huawei',
			snippet:333
		}
	];
});