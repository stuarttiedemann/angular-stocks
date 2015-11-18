var stocksApp = angular.module('stocksApp',[]);



stocksApp.controller('stocksController',function ($scope, $http){

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
			
			// $scope.listOfStocks = [stockData.query.results.quote];
			// console.log($scope.listOfStocks);
			// $scope.loadStock($scope)
		});
		// $scope.listOfStocks = [
  //           {
  //               Symbol: "Goog",
  //               Change: "+1.2",
  //               Name: "Google"
  //           },
  //           {
  //               Symbol: "Yhoo",
  //               Change: "-1.2",
  //               Name: "Yahoo"
  //           },
  //           {
  //               Symbol: "X",
  //               Change: "+2.2",
  //               Name: "Trinity Trains"
  //           }
  //           ];
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
            console.log($scope.mainData);
        }
        
	$scope.getChangeClass = function (change){
		// console.log(change);
            if(change.indexOf('+') > -1){
                return 'change-positive';
            }else if(change.indexOf('-') > -1){
                return 'change-negative';
            }else{
            	return 'unchanged';
            }
        }

})