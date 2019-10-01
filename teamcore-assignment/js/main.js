var angular_app = angular.module("movieSearch",[]);
angular_app.directive("hello", function() {
    return {
        restrict: 'E',
      template : "<h3>Made by a directive!</h3>"
    };
  });
angular_app.controller("movieController",function($scope,$http,$timeout,$interval){
    $scope.theTime = new Date().toDateString();
    $interval(function () {
        $scope.theTime = new Date().toDateString;
    }, 1000);
$scope.getMovies = function(){
    $scope.movieDetails = null;
    $http.get('https://api.themoviedb.org/3/search/movie?api_key=ed2f480d35c680cceb45bc6efd6ac96c&page=1&include_adult=false&query='+$scope.searchText)
        .then(function success(response){
            $scope.movieResponse = response.data.results;
            $scope.movie_paths=[];
            angular.forEach($scope.movieResponse,function(value,key){
                angular.forEach(value,function(value1,key1){
                if(key1== "poster_path" && value1 != null)
                {
                    $scope.movie_paths.push("http://image.tmdb.org/t/p/w45"+value1);
                }
                else if(key1=="backdrop_path" && value1 != null)
                {
                    $scope.movie_paths.push("http://image.tmdb.org/t/p/w45"+value1);
                }
                })
            })
    });
}

$timeout(function () {
    $scope.myHeader = "How are you today?";
  }, 2000);

$scope.getDetails = function(id){
    $http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=ed2f480d35c680cceb45bc6efd6ac96c')
    .then(function success(response){
        $scope.movieDetails = response.data;

        angular.forEach($scope.movieDetails,function(value,key){
            
            if(key == "poster_path" && value != null)
            {
                $scope.poster_path = "http://image.tmdb.org/t/p/w154/"+value;
            }
            else if(key=="backdrop_path" && value != null)
                {
                    $scope.poster_path = "http://image.tmdb.org/t/p/w154/"+value;
                }
        })
    });
}
});