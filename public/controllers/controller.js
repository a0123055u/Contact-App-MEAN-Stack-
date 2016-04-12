var myApp = angular.module('myApp',[]);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    
    var refresh = function(){    
            $http.get('/contactlist').success(function(response){
            console.log('got data from server');
            $scope.contactlist=response;
            //to empty text box after refresh
            $scope.contact="";
            });
    
        };
        refresh();
    
    console.log("Hello World from controller");

    $scope.addCustomer = function(){
    
            $scope.contactlist.push({
            name:$scope.contact.name, 
            email:$scope.contact.email,
            number:$scope.contact.number});
            console.log("Input to insert"+ $scope.contact);
                $http.post('/contactlist',$scope.contact);
                refresh();
        
    };
    
    $scope.remove= function(id){
        console.log("Id to delete"+id);
        $http.delete('/contactlist/'+id).success(function(response){
            refresh();
            
        
        });
    };
    $scope.edit= function(id){
        console.log("Id to Edit"+id);
        $http.get('/contactlist/'+id).success(function(response){
            $scope.contact=response;
        });
    };
    
    
    $scope.updateContact = function(){
        console.log("@@ Id to Update"+$scope.contact._id);
        $http.put('/contaclist/'+$scope.contact._id,$scope.contact).success(function(response){
            refresh();
        });
        
        
    };
        
	
}]);
 