var app = angular.module("foodOrderApp", ['ngMaterial', 'ngMessages']);

app.controller('firstController', function ($scope) {
        "use strict";
    
    $scope.foodOrderItems = [];
    $scope.orderTotal = 0;
    $scope.orderTotalFormatted = '';
    $scope.selectAll = false;
    
    $scope.selectAllItems = function(){        
        $scope.toppingsList.forEach(function(item){
            if(item.product === $scope.toppingFilter) {
             item.selected = !$scope.selectAll;   
            }
        });            
    }
    
    $scope.findItemById = function(id){
        
    }    
    $scope.deleteItem = function(id){
        for (var i=0; i < $scope.foodOrderItems.length; i++) {
            if ($scope.foodOrderItems[i].id  === id ) {
                $scope.foodOrderItems.splice(i, 1);
            }
        }   
        $scope.calculateOrderTotal();
    }
    
    $scope.makeQuickGUID = function(){
      return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);  
    }        
        
    $scope.addFoodItem =  function(foodItemName){  
        $scope.selectAll = false;
        $scope.toppingFilter = foodItemName;
        $scope.toppingsList.forEach(function(item){item.selected = false;});    
        $scope.editedItemID = $scope.makeQuickGUID();        
        $scope.foodItem = { 
            id : $scope.editedItemID,
            name : foodItemName,
            basePrice : $scope.getBasePriceForFood(foodItemName),
            toppings: [],
            itemTotal:0         
        }        
    }
    
    $scope.editItem = function (id){
        for (var i=0; i < $scope.foodOrderItems.length; i++){
                if ($scope.foodOrderItems[i].id  === id ){
                    $scope.foodItem = $scope.foodOrderItems[i];
                    $scope.toppingFilter = $scope.foodItem.name;
                    
                    for (var x=0; x < $scope.foodItem.toppings.length; x++) {
                        var selectedTopping = $scope.foodItem.toppings[x];                        
                        for (var y=0; y < $scope.toppingsList.length; y++) {
                            var masterListTopping = $scope.toppingsList[y];
                            if (selectedTopping.name === masterListTopping.name && selectedTopping.product === masterListTopping.product)
                                masterListTopping.selected = true;
                        }
                    }
                
                    
                }                
            }
        
    }
        
    $scope.getBasePriceForFood = function(foodName){
        switch(foodName){
            case 'pizza' : return 10;
            case 'cake' : return 20;
            case 'taco' : return 2;
        }
    }
    
    $scope.calculateOrderTotal = function(){
        $scope.orderTotal = 0;
        $scope.foodOrderItems.forEach(function(item){$scope.orderTotal += item.itemTotal}); 
        $scope.orderTotalFormatted = $scope.orderTotal.toFixed(2);
    }
    
    $scope.completeItem = function(){
        //Get list of selected toppings
        var toppingsTotal = 0;
        $scope.foodItem.toppings = null;
        $scope.foodItem.toppings = $scope.toppingsList.filter(function(item){return item.selected;});
        
        for (var i = 0; i < $scope.foodItem.toppings.length; i++){
            toppingsTotal = toppingsTotal + $scope.foodItem.toppings[i].price;
        }
        
        $scope.foodItem.itemTotal = toppingsTotal + $scope.foodItem.basePrice;
        
        var itemFound = false;        
        for (var g=0; g < $scope.foodOrderItems.length; g++){
          itemFound = $scope.foodOrderItems[g].id === $scope.foodItem.id;
        }
        
        if (!itemFound) {
            $scope.foodOrderItems.push($scope.foodItem);    
        }
        
        $scope.toppingFilter = '';
        $scope.toppingsList.forEach(function(item){item.selected = false;});
        $scope.calculateOrderTotal();
    }    
        
    $scope.toppingFilter = ''; 
        
    $scope.toppingsList = [
        {product: 'pizza', name: 'Peppers', price: 0.15, selected: false },
        {product: 'pizza', name: 'Olives', price: 0.15, selected: false },
        {product: 'pizza', name: 'Tomatoes', price: 0.15, selected: false },
        {product: 'pizza', name: 'Broccoli', price: 0.15, selected: false },
        {product: 'pizza', name: 'Onions', price: 0.15, selected: false },
        {product: 'pizza', name: 'Mushrooms', price: 0.15, selected: false },
        {product: 'pizza', name: 'Sausage', price: 0.15, selected: false },        
        {product: 'pizza', name: 'Cheese', price: 0.10, selected: false },
        {product: 'cake', name: 'Gumdrops', price: 0.12, selected: false },     
        {product: 'cake', name: 'Jelly Beans', price: 0.12, selected: false },   
        {product: 'cake', name: 'Strawberries', price: 0.12, selected: false },
        {product: 'cake', name: 'Candle(s)', price: 0.35, selected: false },
        {product: 'taco', name: 'Red Salsa', price: 0.10, selected: false },
        {product: 'taco', name: 'Beans', price: 0.10, selected: false },
        {product: 'taco', name: 'Green Salsa', price: 0.10, selected: false },
        {product: 'taco', name: 'Cheese', price: 0.10, selected: false },
        {product: 'taco', name: 'Beef', price: 0.10, selected: false },
        {product: 'taco', name: 'Avocado', price: 0.10, selected: false },
        {product: 'taco', name: 'Peppers', price: 0.10, selected: false },
        {product: 'taco', name: 'Lettuce', price: 0.10, selected: false }          
    ];    
});