"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/events",{

/***/ "./pages/events/index.jsx":
/*!********************************!*\
  !*** ./pages/events/index.jsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Navi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Navi */ \"./components/Navi.jsx\");\n/* harmony import */ var _styles_Events_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/Events.module.scss */ \"./styles/Events.module.scss\");\n/* harmony import */ var _styles_Events_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Events_module_scss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\n/* harmony import */ var _components_events_EventCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/events/EventCard */ \"./components/events/EventCard.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\nvar _this = undefined;\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar events = function() {\n    _s();\n    // const dbInstance = '';\n    // const getEvents = () => {\n    //     getDocs(dbInstance)\n    //         .then((data) => {\n    //         console.log(data);\n    //         })\n    // }\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function() {\n        getEvents();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Events_module_scss__WEBPACK_IMPORTED_MODULE_5___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navi__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/ojassingh/Documents/fullstack/deca/pages/events/index.jsx\",\n                lineNumber: 23,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Events\"\n            }, void 0, false, {\n                fileName: \"/Users/ojassingh/Documents/fullstack/deca/pages/events/index.jsx\",\n                lineNumber: 24,\n                columnNumber: 9\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ojassingh/Documents/fullstack/deca/pages/events/index.jsx\",\n        lineNumber: 22,\n        columnNumber: 12\n    }, _this);\n};\n_s(events, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (events);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9ldmVudHMvaW5kZXguanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFBeUM7QUFDWTtBQUNHO0FBQ0U7QUFDeEI7O0FBRWxDLElBQU1NLE1BQU0sR0FBRyxXQUFNOztJQUNqQix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLGFBQWE7SUFDYixJQUFJO0lBR0pELGdEQUFTLENBQUMsV0FBSTtRQUNWRSxTQUFTLEVBQUUsQ0FBQztLQUNmLEVBQUUsRUFBRSxDQUFDO0lBR04scUJBQU8sOERBQUNDLEtBQUc7UUFBQ0MsU0FBUyxFQUFFUiw2RUFBZ0I7OzBCQUNuQyw4REFBQ0Qsd0RBQUk7Ozs7cUJBQUU7MEJBQ1AsOERBQUNXLElBQUU7MEJBQUMsUUFBTTs7Ozs7cUJBQUs7Ozs7OzthQUNiLENBQUU7Q0FDWDtHQW5CS0wsTUFBTTtBQXFCWiwrREFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2V2ZW50cy9pbmRleC5qc3g/NWQ4YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmF2aSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9OYXZpXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uLy4uL3N0eWxlcy9FdmVudHMubW9kdWxlLnNjc3MnO1xuaW1wb3J0IHsgZ2V0RG9jcywgY29sbGVjdGlvbn0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuaW1wb3J0IEV2ZW50Q2FyZCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9ldmVudHMvRXZlbnRDYXJkXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgZXZlbnRzID0gKCkgPT4ge1xuICAgIC8vIGNvbnN0IGRiSW5zdGFuY2UgPSAnJztcbiAgICAvLyBjb25zdCBnZXRFdmVudHMgPSAoKSA9PiB7XG4gICAgLy8gICAgIGdldERvY3MoZGJJbnN0YW5jZSlcbiAgICAvLyAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy8gfVxuXG5cbiAgICB1c2VFZmZlY3QoKCk9PntcbiAgICAgICAgZ2V0RXZlbnRzKCk7XG4gICAgfSwgW10pXG5cbiAgICBcbiAgICByZXR1cm4oPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICA8TmF2aS8+XG4gICAgICAgIDxoMT5FdmVudHM8L2gxPlxuICAgIDwvZGl2Pik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50czsiXSwibmFtZXMiOlsiTmF2aSIsInN0eWxlcyIsImdldERvY3MiLCJjb2xsZWN0aW9uIiwiRXZlbnRDYXJkIiwidXNlRWZmZWN0IiwiZXZlbnRzIiwiZ2V0RXZlbnRzIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiaDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/events/index.jsx\n");

/***/ })

});