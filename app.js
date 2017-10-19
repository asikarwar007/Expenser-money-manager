var budgetController =(function () {

})();

var UIController = (function () {
  var DOMstring = {
    inputType : '.add__type',
    addDescription : '.add__description',
    addValue : '.add__value',
    addButtun : '.add__btn',


  };
  return {
    getInput : function () {
      return {
         type : document.querySelector(DOMstring.inputType).value,
         description : document.querySelector(DOMstring.addDescription).value,
         value : document.querySelector(DOMstring.addValue).value
      };
    },
    getDOMstrings : function () {
        return DOMstring;
    }


  };

})();

var controller = (function (budgetCtrl,UICtrl) {
  var setupEventListener = function () {
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.addButtun).addEventListener('click',controllerAddItem);
      document.addEventListener('Keypress',function(event) {
        if(event.keycode === 13 || event.which === 13){
          controllerAddItem();

        }
      });
  };


  var controllerAddItem = function() {

    var input = UICtrl.getInput();
    console.log(input);
  };
  return {
    init : function () {
      setupEventListener();
    }
  };

})(budgetController, UIController);

  controller.init();
