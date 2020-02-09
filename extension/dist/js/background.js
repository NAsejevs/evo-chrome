/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

chrome.runtime.onInstalled.addListener(function () {
  // Sets storage variable 'color' to beused in popup.js
  chrome.storage.sync.set({
    color: '#3aa757'
  }, function () {
    console.log("The color is green.");
  }); // Adds a rule to show page_action only if we're on developer.chrome.com

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'localhost'
        }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  }); // Let's inject our script as soon as the page is loaded, but before any assets

  chrome.webNavigation.onCommitted.addListener(function (e) {
    chrome.tabs.executeScript({
      file: "js/content_script.js"
    });
  }, {
    url: [{
      hostContains: "localhost"
    }]
  }); // Adds a message listener to listen for messages from page_action or any 
  // injected script.

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
      case "notification":
        {
          // Display test notification to user
          chrome.notifications.create("betsOpen", {
            type: "basic",
            iconUrl: "images/evo_128.png",
            title: "Title of bets open",
            message: "Hello World!!"
          }, function () {});
          break;
        }

      default:
        {
          sendResponse({
            error: "Invalid request type."
          });
          break;
        }
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiXSwibmFtZXMiOlsiY2hyb21lIiwicnVudGltZSIsIm9uSW5zdGFsbGVkIiwiYWRkTGlzdGVuZXIiLCJzdG9yYWdlIiwic3luYyIsInNldCIsImNvbG9yIiwiY29uc29sZSIsImxvZyIsImRlY2xhcmF0aXZlQ29udGVudCIsIm9uUGFnZUNoYW5nZWQiLCJyZW1vdmVSdWxlcyIsInVuZGVmaW5lZCIsImFkZFJ1bGVzIiwiY29uZGl0aW9ucyIsIlBhZ2VTdGF0ZU1hdGNoZXIiLCJwYWdlVXJsIiwiaG9zdEVxdWFscyIsImFjdGlvbnMiLCJTaG93UGFnZUFjdGlvbiIsIndlYk5hdmlnYXRpb24iLCJvbkNvbW1pdHRlZCIsImUiLCJ0YWJzIiwiZXhlY3V0ZVNjcmlwdCIsImZpbGUiLCJ1cmwiLCJob3N0Q29udGFpbnMiLCJvbk1lc3NhZ2UiLCJyZXF1ZXN0Iiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwidHlwZSIsIm5vdGlmaWNhdGlvbnMiLCJjcmVhdGUiLCJpY29uVXJsIiwidGl0bGUiLCJtZXNzYWdlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2pGQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVDLFdBQWYsQ0FBMkJDLFdBQTNCLENBQXVDLFlBQVc7QUFDakQ7QUFDQUgsUUFBTSxDQUFDSSxPQUFQLENBQWVDLElBQWYsQ0FBb0JDLEdBQXBCLENBQXdCO0FBQUNDLFNBQUssRUFBRTtBQUFSLEdBQXhCLEVBQTRDLFlBQVc7QUFDdERDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0EsR0FGRCxFQUZpRCxDQU1qRDs7QUFDQVQsUUFBTSxDQUFDVSxrQkFBUCxDQUEwQkMsYUFBMUIsQ0FBd0NDLFdBQXhDLENBQW9EQyxTQUFwRCxFQUErRCxZQUFXO0FBQ3pFYixVQUFNLENBQUNVLGtCQUFQLENBQTBCQyxhQUExQixDQUF3Q0csUUFBeEMsQ0FBaUQsQ0FBQztBQUNqREMsZ0JBQVUsRUFBRSxDQUNYLElBQUlmLE1BQU0sQ0FBQ1Usa0JBQVAsQ0FBMEJNLGdCQUE5QixDQUErQztBQUM5Q0MsZUFBTyxFQUFFO0FBQUNDLG9CQUFVLEVBQUU7QUFBYjtBQURxQyxPQUEvQyxDQURXLENBRHFDO0FBTWpEQyxhQUFPLEVBQUUsQ0FDUixJQUFJbkIsTUFBTSxDQUFDVSxrQkFBUCxDQUEwQlUsY0FBOUIsRUFEUTtBQU53QyxLQUFELENBQWpEO0FBVUEsR0FYRCxFQVBpRCxDQW9CakQ7O0FBQ0FwQixRQUFNLENBQUNxQixhQUFQLENBQXFCQyxXQUFyQixDQUFpQ25CLFdBQWpDLENBQTZDLFVBQUNvQixDQUFELEVBQWdFO0FBQzVHdkIsVUFBTSxDQUFDd0IsSUFBUCxDQUFZQyxhQUFaLENBQTBCO0FBQ3pCQyxVQUFJLEVBQUU7QUFEbUIsS0FBMUI7QUFHQSxHQUpELEVBSUc7QUFDRkMsT0FBRyxFQUFFLENBQ0o7QUFDQ0Msa0JBQVksRUFBRTtBQURmLEtBREk7QUFESCxHQUpILEVBckJpRCxDQWlDakQ7QUFDQTs7QUFDQTVCLFFBQU0sQ0FBQ0MsT0FBUCxDQUFlNEIsU0FBZixDQUF5QjFCLFdBQXpCLENBQXFDLFVBQUMyQixPQUFELEVBQVVDLE1BQVYsRUFBa0JDLFlBQWxCLEVBQW1DO0FBQ3ZFLFlBQU9GLE9BQU8sQ0FBQ0csSUFBZjtBQUNDLFdBQUssY0FBTDtBQUFxQjtBQUNwQjtBQUNBakMsZ0JBQU0sQ0FBQ2tDLGFBQVAsQ0FBcUJDLE1BQXJCLENBQTRCLFVBQTVCLEVBQXdDO0FBQ3ZDRixnQkFBSSxFQUFFLE9BRGlDO0FBRXZDRyxtQkFBTyxFQUFFLG9CQUY4QjtBQUd2Q0MsaUJBQUssRUFBRSxvQkFIZ0M7QUFJdkNDLG1CQUFPLEVBQUU7QUFKOEIsV0FBeEMsRUFLRyxZQUFNLENBRVIsQ0FQRDtBQVFBO0FBQ0E7O0FBQ0Q7QUFBUztBQUNSTixzQkFBWSxDQUFDO0FBQUNPLGlCQUFLLEVBQUU7QUFBUixXQUFELENBQVo7QUFDQTtBQUNBO0FBaEJGO0FBa0JBLEdBbkJEO0FBb0JBLENBdkRELEUiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKCkge1xuXHQvLyBTZXRzIHN0b3JhZ2UgdmFyaWFibGUgJ2NvbG9yJyB0byBiZXVzZWQgaW4gcG9wdXAuanNcblx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2NvbG9yOiAnIzNhYTc1Nyd9LCBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyhcIlRoZSBjb2xvciBpcyBncmVlbi5cIik7XG5cdH0pO1xuXG5cdC8vIEFkZHMgYSBydWxlIHRvIHNob3cgcGFnZV9hY3Rpb24gb25seSBpZiB3ZSdyZSBvbiBkZXZlbG9wZXIuY2hyb21lLmNvbVxuXHRjaHJvbWUuZGVjbGFyYXRpdmVDb250ZW50Lm9uUGFnZUNoYW5nZWQucmVtb3ZlUnVsZXModW5kZWZpbmVkLCBmdW5jdGlvbigpIHtcblx0XHRjaHJvbWUuZGVjbGFyYXRpdmVDb250ZW50Lm9uUGFnZUNoYW5nZWQuYWRkUnVsZXMoW3tcblx0XHRcdGNvbmRpdGlvbnM6IFtcblx0XHRcdFx0bmV3IGNocm9tZS5kZWNsYXJhdGl2ZUNvbnRlbnQuUGFnZVN0YXRlTWF0Y2hlcih7XG5cdFx0XHRcdFx0cGFnZVVybDoge2hvc3RFcXVhbHM6ICdsb2NhbGhvc3QnfSxcblx0XHRcdFx0fSlcblx0XHRcdF0sXG5cdFx0XHRhY3Rpb25zOiBbXG5cdFx0XHRcdG5ldyBjaHJvbWUuZGVjbGFyYXRpdmVDb250ZW50LlNob3dQYWdlQWN0aW9uKClcblx0XHRcdF1cblx0XHR9XSk7XG5cdH0pO1xuXG5cdC8vIExldCdzIGluamVjdCBvdXIgc2NyaXB0IGFzIHNvb24gYXMgdGhlIHBhZ2UgaXMgbG9hZGVkLCBidXQgYmVmb3JlIGFueSBhc3NldHNcblx0Y2hyb21lLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQuYWRkTGlzdGVuZXIoKGU6IGNocm9tZS53ZWJOYXZpZ2F0aW9uLldlYk5hdmlnYXRpb25GcmFtZWRDYWxsYmFja0RldGFpbHMpID0+IHtcblx0XHRjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHtcblx0XHRcdGZpbGU6IFwianMvY29udGVudF9zY3JpcHQuanNcIixcblx0XHR9KTtcblx0fSwge1xuXHRcdHVybDogW1xuXHRcdFx0e1xuXHRcdFx0XHRob3N0Q29udGFpbnM6IFwibG9jYWxob3N0XCIsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pO1xuXG5cdC8vIEFkZHMgYSBtZXNzYWdlIGxpc3RlbmVyIHRvIGxpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSBwYWdlX2FjdGlvbiBvciBhbnkgXG5cdC8vIGluamVjdGVkIHNjcmlwdC5cblx0Y2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuXHRcdHN3aXRjaChyZXF1ZXN0LnR5cGUpIHtcblx0XHRcdGNhc2UgXCJub3RpZmljYXRpb25cIjoge1xuXHRcdFx0XHQvLyBEaXNwbGF5IHRlc3Qgbm90aWZpY2F0aW9uIHRvIHVzZXJcblx0XHRcdFx0Y2hyb21lLm5vdGlmaWNhdGlvbnMuY3JlYXRlKFwiYmV0c09wZW5cIiwge1xuXHRcdFx0XHRcdHR5cGU6IFwiYmFzaWNcIixcblx0XHRcdFx0XHRpY29uVXJsOiBcImltYWdlcy9ldm9fMTI4LnBuZ1wiLFxuXHRcdFx0XHRcdHRpdGxlOiBcIlRpdGxlIG9mIGJldHMgb3BlblwiLFxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiSGVsbG8gV29ybGQhIVwiXG5cdFx0XHRcdH0sICgpID0+IHtcblx0XHRcdFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdHNlbmRSZXNwb25zZSh7ZXJyb3I6IFwiSW52YWxpZCByZXF1ZXN0IHR5cGUuXCJ9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=