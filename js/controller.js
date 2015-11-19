var stocksApp = angular.module('stocksApp',['ngRoute']);
	
	stocksApp.config(function($routeProvider,$locationProvider){
		$routeProvider.when('/',{
			templateUrl:'stock-summary.html',
			controller: 'stocksController'
		}).
		when('/stock-detail',{
			templateUrl:'stock-detail.html',
			controller: 'stocksDetailController'
		}).
		otherwise({
			redirectTo: 'stock-summary.html'
		});
	});


stocksApp.controller('stocksDetailController',function ($scope, $location){

 $scope.detailsFunction = function(){
     	$scope.detailsList = allData;
     	// console.log($scope.detailsList);
     }
})	

stocksApp.controller('stocksController',function ($scope, $http, $location){
	allData =[];
	$scope.detailsList = [];
	$scope.getStocks = function(){
		var encodedTickers= encodeURIComponent($scope.userStocks);
		var stocksInput= {};
		url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		$http.get(url).success(function (stockData){
			// console.log(stockData);
			// console.log(encodedTickers);
			var commaCount=0;
			for(i=0; i< $scope.userStocks.length; i++){
				if($scope.userStocks[i]===','){
					commaCount ++;	
				}
			}
				if(commaCount > 0){
					$scope.listOfStocks = stockData.query.results.quote;
					commaCount = 0;
				}else{
					$scope.listOfStocks = [stockData.query.results.quote];
					commaCount = 0;
				}
		});
	}

	$scope.loadStock = function(stockData){
            // init array
            $scope.dataList = [];
            
            for(name in stockData){
                $scope.dataList.push({
                    prop:name,
                    value: stockData[name]
                });
            }
            // console.log($scope.dataList);
            $scope.mainData = [];
            // symbol
            $scope.mainData.push($scope.dataList[0].value);
            //bid
            $scope.mainData.push($scope.dataList[3].value);
            //ask
            $scope.mainData.push($scope.dataList[1].value);
            //change
            $scope.mainData.push($scope.dataList[8].value);
            //average daily volume
            $scope.mainData.push($scope.dataList[2].value);
            //day low
            $scope.mainData.push($scope.dataList[21].value);
            //day high
            $scope.mainData.push($scope.dataList[22].value);
            // console.log($scope.mainData);
           

            allData.push({val: $scope.dataList[38].value});
            allData.push({val: $scope.dataList[5].value});
            allData.push({val: $scope.dataList[4].value});
            allData.push({val: $scope.dataList[11].value});
            allData.push({val: $scope.dataList[21].value});
            allData.push({val: $scope.dataList[22].value});
            allData.push({val: $scope.dataList[46].value});
            allData.push({val: $scope.dataList[23].value});
            allData.push({val: $scope.dataList[24].value});
            allData.push({val: $scope.dataList[74].value});
            allData.push({val: $scope.dataList[2].value});
            allData.push({val: $scope.dataList[48].value});
            allData.push({val: $scope.dataList[50].value});
            allData.push({val: $scope.dataList[60].value});
            allData.push({val: $scope.dataList[62].value});
            allData.push({val: $scope.dataList[13].value});
            allData.push({val: $scope.dataList[81].value});
            allData.push({val: $scope.dataList[70].value});
            

            console.log(allData);
        }
    

	$scope.getChangeClass = function (change){
		
            if(change.indexOf('+') > -1){
                return 'change-positive';
            }else if(change.indexOf('-') > -1){
                return 'change-negative';
            }else{
            	return 'unchanged';
            }
        }
    $scope.detailsPage = function(){
    	$location.path('/stock-detail')
    }
    $scope.stockSummary = function(){
    	$location.path('/');
    }
})