var SweetSelector = {
  select: function(element) {
    switch (element[0]) {
      case "#":
        return document.getElementById(element.slice(1));
      case ".":
        return document.getElementsByClassName(element.slice(1));
      default:
        return document.getElementsByTagName(element);
    }
  }
}

var DOM = (function(){

  // general helper functions

  var _iterateAndExecute = function(array, func) {
    for (var i = 0; i < array.length; i++) {
      func(array[i]);
    }
  }

  var _findElementAndPrepare = function(element) {
    var elements = SweetSelector.select(element);
    return elements.length == undefined ? [elements] : elements;
  }

    // show/hide helper functions

  var _addHiddenClasstoCollection = function(elementCollection) {
    var makeInvisible = function(element){
      element.setAttribute("style", "display: none");
    };

    _iterateAndExecute(elementCollection, makeInvisible)
  }

  var _removeHiddenClasstoCollection = function(elementCollection) {
    var makeVisible = function(element){
      element.setAttribute("style", "display: initial");
    };

    _iterateAndExecute(elementCollection, makeVisible)
  }

  // public

  return {
    hide: function(element) {
      var elements = _findElementAndPrepare(element);
      _addHiddenClasstoCollection(elements);
    },

    show: function(element) {
      var elements = _findElementAndPrepare(element);
      _removeHiddenClasstoCollection(elements);
    },

    addClass: function(findClass, newClass) {
      var elements        = _findElementAndPrepare(findClass);
      var appendClassName = function(element){
        element.classList.add(newClass);
      };

      _iterateAndExecute(elements, appendClassName);
    },

    removeClass: function(findClass, removeClass) {
      var elements        = _findElementAndPrepare(findClass);
      var removeClassName = function(element){
        element.classList.remove(removeClass);
      };

      _iterateAndExecute(elements, removeClassName);
    }
  }
})();

// EventDispatcher.on('.klass', 'click', function() { console.log("awesome") });
// EventDispatcher.trigger('.klass', 'click');

var EventDispatcher = (function(){
  var _listenTo = function(element){
    return SweetSelector.select(element)[0]
  }

  return {
    on: function(element, userAction, blockToExecute){
      _listenTo(element).addEventListener(userAction, blockToExecute, false)
    },

    trigger: function(element, userAction){
      var event = new Event(userAction)
      _listenTo(element).dispatchEvent(event)
    }
  }
})();

// Usefull things below ----------------
// Object.prototype.toString.call(t)
// http://vanilla-js.com/
// http://stackoverflow.com/questions/12770147/is-htmlcollection-an-array
// https://socrates.devbootcamp.com/labs/javascript/loops/each-map-select-max
// http://stackoverflow.com/a/14101453
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
// http://www.w3schools.com/cssref/pr_class_display.asp