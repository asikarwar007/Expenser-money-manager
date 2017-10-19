var budgetController =(function () {
  var Expense = function (id, description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems :{
      exp : [],
      inc : []
    },
    total : {
      exp : 0,
      inc :0
    }
  };

  return {
    addItem : function (type,des,val) {
      var newItem ;
      if (data.allItems[type].length > 0 ) {
        ID = data.allItems[type][data.allItems[type].length -1].id +1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des,val);
      }else if(type === 'inc'){
        newItem = new Income(ID, des,val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    }
  };
})();

var UIController = (function () {
  var DOMstring = {
    inputType : '.add__type',
    addDescription : '.add__description',
    addValue : '.add__value',
    addButtun : '.add__btn',
    incomeContainer : '.income__list',
    expensesContainer : '.expenses__list'

  };
  return {
    getInput : function () {
      return {
         type : document.querySelector(DOMstring.inputType).value,
         description : document.querySelector(DOMstring.addDescription).value,
         value : document.querySelector(DOMstring.addValue).value
      };
    },
    addListItem: function(obj, type) {
        var html, newHtml, element;
        // Create HTML string with placeholder text

        if (type === 'inc') {
            element = DOMstring.incomeContainer;

            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
            element = DOMstring.expensesContainer;

            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        // Replace the placeholder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        // Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields : function () {
      var fields, fields;
      fields =document.querySelectorAll(DOMstring.addDescription + ', ' +DOMstring.addValue);
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },

    getDOMstrings : function () {
        return DOMstring;
    }


  };

})();


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.addButtun).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
      };
  var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
        //
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();
            //
            // // 5. Calculate and update budget
            // updateBudget();
            //
            // // 6. Calculate and update percentages
            // updatePercentages();
         }
    };

    return {
        init: function() {
            console.log('Application has started.');

            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();
