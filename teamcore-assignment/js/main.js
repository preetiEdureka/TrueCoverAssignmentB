var angular_app = angular.module("movieSearch",[]);

angular_app.controller("movieController",function($scope,$http){
$scope.getMovies = function(){
    $scope.movieDetails = null;
    $http.get('https://api.themoviedb.org/3/search/movie?api_key=ed2f480d35c680cceb45bc6efd6ac96c&page=1&include_adult=false&query='+$scope.searchText)
        .then(function success(response){
            $scope.movieResponse = response.data.results;
    });
}

$scope.getDetails = function(id){
    $http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=ed2f480d35c680cceb45bc6efd6ac96c')
    .then(function success(response){
        console.log(response);
        $scope.movieDetails = response.data;
    });
}
});