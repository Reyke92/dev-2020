// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/app.ts":[function(require,module,exports) {
var C =
/** @class */
function () {
  function C() {}

  C.CONFIG_FILE_CONTENTS = "{\n    \"ApologyMessage\": \"I'm sorry, I wasn't able to find anything from what you typed. How about we try again?\",\n    \"IncorrectResponseApologyMessage\": \"I'm sorry about that. How about we try again?\",\n    \"StumpedApologyMessage\": \"I'm sorry, I'm having trouble finding what you're looking for; it is possible that I may not yet be able to help with finding this. You may still try and keep searching for this, however. Alternatively, please feel free to email us with further questions at: wkuchatbotteam@wku.edu\",\n    \"SuccessMessage\": \"I'm glad I was able to be of help to you! May I help you with anything else?\",\n    \"WelcomeMessage\": \"Hey there! What topic may I help you with today?\",\n    \"TipsFrequency\": 2,\n    \"Topics\":\n    [\n        {\n            \"Name\": \"Dining\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"On-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/oncampus.php\",\n                    \"Keywords\": [\"on campus\", \"meal/meals\", \"plan/plans\"]\n                },\n\n                {\n                    \"Name\": \"Off-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/offcampus.php\",\n                    \"Keywords\": [\"off campus\", \"meal/meals\", \"plan/plans\"]\n                },\n\n                {\n                    \"Name\": \"Flex meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/flexplan.php\",\n                    \"Keywords\": [\"meal/meals\", \"plan/plans\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"flex\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"WKU restaurants hours of operation\",\n                    \"Data\": \"https://www.wku.edu/wkurg/documents/fall2020hoursofoperation.pdf\",\n                    \"Keywords\":\n                    [\n                        \"restaurant/restaurants/dining\",\n                        \"open/opens/opening/close/closes/closing\",\n                        \"hours\",\n                        \"time/times\",\n                        \"operation\"\n                    ]\n                },\n\n                {\n                    \"Name\": \"Map of campus restaurants\",\n                    \"Data\": \"https://www.wku.edu/wkurg/images/2020-21campusrestaurantmap.jpg\",\n                    \"Keywords\": [\"campus\", \"restaurant/restaurants/dining\", \"map\", \"list\", \"eat\"]\n                },\n\n                {\n                    \"Name\": \"Hilltopper Hub restaurant menu\",\n                    \"Data\": \"https://wku.campusdish.com/en/LocationsAndMenus/Hilltopper-Hub\",\n                    \"Keywords\": [\"restaurant/restaurants/dining\", \"menu/menus/food\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"hilltopper hub\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Fresh Food Company restaurant menu\",\n                    \"Data\": \"https://wku.campusdish.com/en/LocationsAndMenus/FreshFoodCompany\",\n                    \"Keywords\": [\"restaurant/restaurants/dining\", \"menu/menus/food\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"fresh\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Add additional dining money to WKU student account\",\n                    \"Data\": \"https://www.wku.edu/wkurg/dbdollars.php\",\n                    \"Keywords\": [\"add/added/adding\", \"money/dollars/bucks\", \"account/bill\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"big red dollars / dining dollars / meal dollars / meal plan dollars / flex dollars / flex plan dollars\", \"Weight\": 3 }\n                    ]\n                }\n            ]\n        },\n        \n        {\n            \"Name\": \"Housing\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"How to apply for WKU housing\",\n                    \"Data\": \"https://wku.edu/housing/apply/index.php\",\n                    \"Keywords\": [\"information/info\", \"about/regarding\", \"how to\", \"apply/applying\", \"housing/room/rooms/hall/halls\"]\n                },\n\n                {\n                    \"Name\": \"How to apply for a private room\",\n                    \"Data\": \"A private room may be requested either through the Housing Portal (after a designated amount of time after the start of the semester) or - in the case that the requesting student has a documented disability - through working with the SARC (Student Accessibility Resource Center) office. If space is available, requests for private rooms will be approved on a first-come, first-serve basis, with one exception: a student with a documented disability may request housing accommodations (among other accommodations) from the WKU SARC (Student Accessbility Resource Center) office, and the SARC staff will work with WKU HRL (Housing and Residence Life) to try and secure a private room for the student, with that of a higher priority than of other students' requests for a private room. The resident of a private room agrees to pay the additional charges either before the semester begins or before the move is complete, unless the resident obtained the room through the SARC office, in which case there will be no extra charge for the resident. If you would like more information about the SARC office, please visit https://www.wku.edu/sarc/\",\n                    \"Keywords\": [\"how to\", \"apply/applying\", \"room/rooms/housing/hall/halls\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"private/solo\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Residence hall rates\",\n                    \"Data\": \"https://wku.edu/housing/halls/rates.php\",\n                    \"Keywords\": [\"hall/halls/room/rooms/housing\", \"community/pod/suite/hotel\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"rates / rate / prices / price / cost / costs / charge / charges / how much\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"How much does a private room cost?\",\n                    \"Data\": \"A private room costs 1.25x the double-rate listed at https://wku.edu/housing/halls/rates.php , unless the student has a documented disability and would like the SARC (Student Accessibility Resource Center) to intervene on their behalf to try and secure the student a private room at no additional cost. If you would like more information about the SARC office, and how to request housing accommodations (among other accommodations) through them, please visit https://www.wku.edu/sarc/\",\n                    \"Keywords\": [\"hall/halls/room/rooms/housing\", \"community/pod/suite/hotel\", \"private\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"rates / rate / prices / price / cost / costs / charge / charges / how much\", \"Weight\": 3 }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Academics\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Information about the Colonnade program\",\n                    \"Data\": \"https://www.wku.edu/colonnade/index.php\",\n                    \"Keywords\": [\"program\", \"info/information\", \"requirements/require/requires\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"colonnade/colonade\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"List of majors and minors offered\",\n                    \"Data\": \"https://www.wku.edu/majors/index.php\",\n                    \"Keywords\": [\"all/list\", \"available/offer/offers/offered/offering\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"major/majors/minor/minors\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"WKU Undergraduate academic catalog\",\n                    \"Data\": \"http://catalog.wku.edu/undergraduate/\",\n                    \"Keywords\": [\"undergraduate\", \"course/courses/class/classes\", \"program/programs/degree/degrees\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"catalog / course list / courses list / class list / classes list\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"WKU Graduate academic catalog\",\n                    \"Data\": \"http://catalog.wku.edu/graduate/\",\n                    \"Keywords\": [\"graduate\", \"course/courses/class/classes\", \"program/programs/degree/degrees\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"catalog / course list / courses list / class list / classes list\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"2017-2018 Academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2017_2018.pdf\",\n                    \"Keywords\": [\"17/2017\", \"18/2018\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2018-2019 Academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2018_2019.pdf\",\n                    \"Keywords\": [\"18/2018\", \"19/2019\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2019-2020 Academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2019_2020_update_covid19.pdf\",\n                    \"Keywords\": [\"19/2019\", \"20/2020\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2020-2021 Academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/final_fall20_spring21_updated11-20.pdf\",\n                    \"Keywords\": [\"20/2020\", \"21/2021\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Advising\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"How to schedule or cancel an advising appointment\",\n                    \"Data\": \"https://wku.edu/advising/advisingcalendar.php\",\n                    \"Keywords\": [\"schedule/scheduling/make/making/cancel/cancelling/reschedule/rescheduling/meet\", \"appointment/meeting\", \"advisor/advising\"]\n                },\n\n                {\n                    \"Name\": \"How to change my major/minor/concentration\",\n                    \"Data\": \"https://wku.edu/advising/change-of-major.php\",\n                    \"Keywords\": [\"change/changing/switch/switching/edit/editing/new/modify/modifying\", \"major/majors/minor/minors/concentration/concentrations\", \"form/document/request\"]\n                },\n\n                {\n                    \"Name\": \"Four-year degree paths\",\n                    \"Data\": \"To view potential four-year degree paths for your degree, please visit http://catalog.wku.edu/undergraduate/programs/ and select your major from the list shown on the website; then, click the 'Finish in Four' tab (it can be found beside the 'Overview' and 'Program Requirements' tabs)\",\n                    \"Keywords\": [\"path/paths/pathway/pathways/plan/plans\", \"degree/degrees\", \"4/four\"]\n                },\n\n                {\n                    \"Name\": \"What is 'Academic Standing'? (includes further information)\",\n                    \"Data\": \"https://wku.edu/advising/academicstanding.php\",\n                    \"Keywords\": [\"info/information\", \"what is / what's / work / works\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"standing/warning/probation/dismissal\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Information about repeating courses\",\n                    \"Data\": \"For more information about repeating courses (such as how many courses a student can repeat, and more), please visit https://wku.edu/advising/academicstanding.php and press the 'Repeating Courses' tab\",\n                    \"Keywords\": [\"info/information\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"repeat/repeating/repeated/repeats\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Information about the WKU grading and quality point system\",\n                    \"Data\": \"For more information about the WKU grading and quality point system, please visit https://wku.edu/advising/academicstanding.php and press the 'Grading and Quality Point System' tab\",\n                    \"Keywords\": [\"info/information\", \"what is / what's / work / works / gpa / grade point average\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"grading / quality point / quality points / system / fn / au / nr / er / ng / ip\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Information about academic renewal\",\n                    \"Data\": \"For more information about academic renewal (also known as academic bankruptcy), please visit https://wku.edu/advising/academicstanding.php and press the 'Academic Renewal' tab\",\n                    \"Keywords\": [\"info/information\", \"what is / what's / work / works / gpa / grade point average / transfer / petition\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"renewal/bankruptcy/bankrupt\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Information about the Colonnade program\",\n                    \"Data\": \"https://www.wku.edu/colonnade/index.php\",\n                    \"Keywords\": [\"info/information\", \"requirements/require/requires\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"colonnade/colonade\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"WKU Undergraduate academic catalog\",\n                    \"Data\": \"http://catalog.wku.edu/undergraduate/\",\n                    \"Keywords\": [\"undergraduate\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"catalog / course list / courses list / class list / classes list\", \"Weight\": 3 }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Financial Aid\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Cost of attending information\",\n                    \"Data\": \"https://www.wku.edu/financialaid/costinfo/\",\n                    \"Keywords\": [\"cost/price/money/tuition\", \"info/information\", \"how much\"]\n                },\n\n                {\n                    \"Name\": \"Financial aid timelines/deadlines\",\n                    \"Data\": \"https://www.wku.edu/financialaid/basics/timeline.php\",\n                    \"Keywords\": [\"apply/aid\", \"FAFSA/grant/grants/scholarship/scholarships/KHEAA/TOPDollar\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"when/timeline/timelines\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"How to apply for financial aid\",\n                    \"Data\": \"https://www.wku.edu/financialaid/applying/how-to-apply.php\",\n                    \"Keywords\": [\"how to / how do\", \"aid\", \"FAFSA/scholarship/scholarships/grant/grants/TOPDollar\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"apply/applying\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Financial aid options (scholarships, grants, waivers, ...)\",\n                    \"Data\": \"https://www.wku.edu/financialaid/scholarships/index.php\",\n                    \"Keywords\": [\"aid\", \"FAFSA/scholarship/scholarships/grant/grants/TOPDollar/waiver/waivers\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"options / types / what kind / resources / source\", \"Weight\": 2 }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"WKU Online\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"What are web classes?\",\n                    \"Data\": \"Web classes are semester-based, online classes that follow the same schedule as face-to-face courses - they have specific start and end dates with terms beginning in the fall, winter, spring, and summer. The campus location is listed as 'web' in TopNet. Most web classes do not require any face-to-face meetings. However, the professor may require as many as two and still list the class as a web class. If any meetings are required, they will be listed on TopNet in the 'blue notes' just below the class section on the 'Schedule of Classes' page. If this is a concern for you, please contact WKU Online prior to registration at learn.online@wku.edu or 888-4WKUWEB. For more information, please visit https://www.wku.edu/online/classes/index.php\",\n                    \"Keywords\": [\"web / web based\", \"what are / information / info\", \"about/regarding\"]\n                },\n\n                {\n                    \"Name\": \"What are WKU On-Demand classes?\",\n                    \"Data\": \"On demand classes provide students the opportunity to earn college credit when and where it is convenient for them.  The campus location is listed as 'On Demand' in TopNet. There are more than 100 undergraduate and graduate flex-paced courses available completely online. Students have the option to accelerate course completion by finishing in as little as 7 weeks or take advantage of an extended time frame. For more information, please visit https://www.wku.edu/ondemand/index.php\",\n                    \"Keywords\": [\"demand\", \"what are / information / info\", \"about/regarding\"]\n                },\n\n                {\n                    \"Name\": \"How to apply to WKU\",\n                    \"Data\": \"Please visit https://www.wku.edu/admissions/ to learn how to apply (or you may use this link if you would like to go directly to the admissions application page: https://www.wku.edu/apply). Once your enrollment application is accepted, you will be able to register for classes! If you have any questions, please feel free to call us at 270-745-2551 (WKU Office of Admissions), or you may visit https://www.wku.edu/admissions/ask/index.php to send us an email\",\n                    \"Keywords\": [\"how/where\", \"apply/applying\"]\n                },\n\n                {\n                    \"Name\": \"How to register for web classes at WKU\",\n                    \"Data\": \"We think it's awesome that you're interested in our web classes! First, you will need to apply to WKU, if you haven't already done so: please visit https://www.wku.edu/admissions/ to learn how to apply (or you may use this link if you would like to go directly to the admissions application page: https://www.wku.edu/apply). Once your enrollment application is accepted (or if you have already been accepted to enroll at WKU), please visit https://www.wku.edu/online/registration.php to learn how to register for your classes. If you have any questions, please feel free to call us at 270-745-2551 (WKU Office of Admissions), or you may visit https://www.wku.edu/admissions/ask/index.php to send us an email or https://www.wku.edu/online/contact.php\",\n                    \"Keywords\": [\"web / web based\", \"register / registering / registration / sign up / signing up / enroll / enrolling\"]\n                },\n\n                {\n                    \"Name\": \"How to register for WKU On-Demand classes\",\n                    \"Data\": \"We think it's awesome that you're interested in our On-Demand classes! First, you will need to apply to WKU, if you haven't already done so: please visit https://www.wku.edu/admissions/ to learn how to apply (or you may use this link if you would like to go directly to the admissions application page: https://www.wku.edu/apply). Once your enrollment application is accepted (or if you have already been accepted to enroll at WKU), please visit https://www.wku.edu/ondemand/register.php to learn how to register for your On-Demand classes. If you have any questions, please feel free to call us at 270-745-2551 (WKU Office of Admissions) or 270-745-4158 (for help with or questions pertaining to WKU On-Demand), or you may visit https://www.wku.edu/admissions/ask/index.php to send us an email or https://www.wku.edu/ondemand/contact.php\",\n                    \"Keywords\": [\"demand\", \"register / registering / registration / sign up / signing up / enroll / enrolling\"]\n                },\n                {\n                    \"Name\": \"How to register for WKU On-Demand classes\",\n                    \"Data\": \"https://www.wku.edu/ondemand/register.php\",\n                    \"Keywords\": [\"demand\", \"register / registering / registration / sign up / signing up\", \"\"]\n                },\n\n                {\n                    \"Name\": \"List of online degrees offered at WKU\",\n                    \"Data\": \"https://www.wku.edu/online/degrees/index.php\",\n                    \"Keywords\": [\"list/all/total\", \"degree/degrees/program/programs\", \"offered/offers/offer/offering/available\", \"online\"]\n                },\n\n                {\n                    \"Name\": \"100% Online Undergraduate degrees offered at WKU\",\n                    \"Data\": \"https://www.wku.edu/online/degrees/undergrad.php\",\n                    \"Keywords\": [\"degree/degrees/program/programs\", \"offered/offers/offer/offering/available\", \"online\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"undergraduate / undergaduates / ugrad / ugrads / undergrad / undergrads / freshman / freshmen / sophomore / sophomores / junior / juniors / senior/ seniors / ug / ugs / first year / 1st year / second year / 2nd year / third year / 3rd year / fourth year / 4th year\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"Online Graduate (Master's/Doctorate's/etc.) programs offered at WKU\",\n                    \"Data\": \"https://www.wku.edu/online/degrees/grad.php\",\n                    \"Keywords\": [\"degree/degrees/program/programs\", \"offered/offers/offer/offering/available\", \"online\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"graduate / gaduates / grad / grads / upper level / master / masters / master's / doctorate / doctorates / doctorate's / doctoral\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"100% Online certificate programs offered at WKU\",\n                    \"Data\": \"https://www.wku.edu/online/degrees/certificates.php\",\n                    \"Keywords\": [\"degree/degrees/program/programs\", \"offered/offers/offer/offering/available\", \"online\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"certificate/certificates/cert/certs/certification/certifications\", \"Weight\": 2 }\n                    ]\n                }\n            ]\n        }\n    ]\n}";
  return C;
}();

var Chatbot =
/** @class */
function () {
  function Chatbot() {
    this._IsConfigLoaded = false;
    this._IsDisabled = false;
    this._IsPageLoaded = false;
    window.addEventListener("load", this._OnPageLoaded);
  }

  Chatbot.GetInstance = function () {
    // If the Chatbot instance exists, just return it./
    if (!!this._Instance) return this._Instance;
    this._Instance = new Chatbot();
    this._Instance._IsConfigLoaded = false;
    this._Instance._NumIncorrectResponses = 0;
    UI.GetInstance(); // Cause the UI to initialize itself.

    this._Instance._LoadConfigFile(C.CONFIG_FILE_CONTENTS);

    return this._Instance;
  };

  Chatbot.prototype.BeginChooseTopic = function (chatbotMessage) {
    // Get a list of the topic names.
    var topicNames = new Array();

    this._TopicIterator.Reset();

    var iteration = this._TopicIterator.Next();

    do {
      topicNames.push(iteration.topic.Name);
      iteration = this._TopicIterator.Next();
    } while (!iteration.hasCycled);

    UI.GetInstance().EnableInput(false);
    return UI.GetInstance().DisplayButtons(topicNames, chatbotMessage, this._OnChooseTopicTopicSelected);
  };

  Chatbot.prototype.ReplyToMessage = function (userMessage) {
    this._LastUserMessage = userMessage; // Figure out how to respond to user's message.

    var messageKeywords = this._ParseMessageForKeywords(userMessage);

    var resource = this._SearchForResource(userMessage, messageKeywords); // If the resource could not be found.


    if (resource === null) {
      this._DoCouldNotFindCorrectResourceProcess(this._LastUserMessage);
    } else // If the resource was found.
      {
        if (Resource.IsDataJustURL(resource)) {
          UI.GetInstance().DisplayChatbotMessageUsingResource(resource);
        } else this._SendMessage(resource.Data);

        UI.GetInstance().EnableInput(false);
        UI.GetInstance().DisplayButtons(["Yes!", "No"], "Was this what you were looking for?", this._YesOrNoButtonsCallback);
      }
  };

  Chatbot.prototype._ChangeTopic = function (topicName) {
    this._CurrentTopic = this._GetTopic(topicName);
    this._ResourceIterator = new ResourceCyclicIterator(this._CurrentTopic.Resources);
  };

  Chatbot.prototype._CleanUserMessage = function (message) {
    var clean = "";
    var lastChar = "";

    for (var i = 0; i < message.length; i++) {
      // 1) Allow only one space at a time (no double spaces, i.e. "  ").
      // 2) Do not keep "?" or "." characters.
      // 3) Replace dashes with spaces (however, allow only one space at a time).
      if (message[i] === "-" && lastChar !== " ") {
        clean += " ";
        lastChar = " ";
      } else if (message[i] === " " && lastChar !== " " || message[i] !== "?" && message[i] !== ".") {
        clean += message[i];
        lastChar = message[i];
      } else lastChar = message[i];
    }

    return clean;
  };

  Chatbot.prototype._GetTopic = function (topicName) {
    this._TopicIterator.Reset();

    var iteration = this._TopicIterator.Next();

    do {
      if (topicName === iteration.topic.Name) return iteration.topic;
      iteration = this._TopicIterator.Next();
    } while (!iteration.hasCycled);

    {}
    return null;
  };

  Chatbot.prototype._DoCouldNotFindCorrectResourceProcess = function (originalUserMessage) {
    var cleanedUserMessage = this._CleanUserMessage(originalUserMessage); // Try and show helpful tips to the user, if possible, but try not to be
    // annoying about it.


    this._TipsCountdown--;

    if (this._TipsCountdown === 0) {
      // If the user's message contains at least two question marks, separated
      // by one or more of any character that isn't a question mark. This is
      // to test whether or not the user may be asking more than one question
      // at a time.
      if (originalUserMessage.match(/\?[^\?][^\?].*\?/g) !== null) {
        this._SendMessage("Tip: It looks like you may be asking more than one question; however, " + "I was only made to answer one question at a time, so I may be able to " + "better help you find what you're looking for if the message is in that format :)");
      } else if (cleanedUserMessage.length < 9) {
        this._SendMessage("Tip: It looks like there may not be enough information in your message " + "for me to go on - perhaps providing some more details about what " + "you're looking for may help me to find it for you :)");
      } // The regular expression below matches any period char followed by something that isn't
      // the words, "edu", "com", "gov", "org", or "net".
      else if (cleanedUserMessage.length > 110 || originalUserMessage.match(/[\.\?\!](?!\b(?:edu|com|gov|org|net)\b)..*/g) !== null) {
          this._SendMessage("Tip: It looks like there may be too much information in your message " + "for me to figure out what you're looking for - perhaps whittling down " + "your question / search terms to something more simple and direct may help " + "me to find it for you :)");
        }

      this._TipsCountdown = this._Config.TipsFrequency;
    }

    this._NumIncorrectResponses++;

    if (this._NumIncorrectResponses >= 3) {
      this._SendMessage(this._Config.StumpedApologyMessage);

      this._NumIncorrectResponses = 0;
    } else this._SendMessage(this._Config.ApologyMessage);
  };

  Chatbot.prototype._Init = function () {
    UI.GetInstance().Init(); // Initialize the UI.

    this.BeginChooseTopic(this._Config.WelcomeMessage);
  };

  Chatbot.prototype._LoadConfigFile = function (configJson) {
    this._IsConfigLoaded = false;

    try {
      this._Config = JSON.parse(configJson); // Make sure that all dashes within a resource's keyword (if any) are
      // replaced by a space. This is done so that the _SearchForResource(...) method
      // can save some processing time.

      for (var topicIndex = 0; topicIndex < this._Config.Topics.length; topicIndex++) {
        var topic = this._Config.Topics[topicIndex];

        for (var resIndex = 0; resIndex < topic.Resources.length; resIndex++) {
          var res = topic.Resources[resIndex]; // Default-weight keywords.

          for (var kwIndex = 0; kwIndex < res.Keywords.length; kwIndex++) {
            res.Keywords[kwIndex] = res.Keywords[kwIndex].replace("-", " ");
          } // Varying-weight keywords.


          if (res.WeightedKeywords !== undefined) {
            for (var kwIndex = 0; kwIndex < res.WeightedKeywords.length; kwIndex++) {
              res.WeightedKeywords[kwIndex].Keyword = res.WeightedKeywords[kwIndex].Keyword.replace("-", " ");
            }
          }
        }
      } // Load the topics into a new TopicCyclicIterator.


      this._TopicIterator = new TopicCyclicIterator(this._Config.Topics);
      this._TipsCountdown = this._Config.TipsFrequency;
      this._IsConfigLoaded = true;
    } catch (e) {
      // An error occurred in loading the config file; disable the Chatbot,
      // display an error message on the screen, and print the actual error
      // that occured into the console.
      this._IsDisabled = true; // Chatbot._OnPageLoaded(...) will check for _IsDisabled.

      console.log("Error: _LoadConfigFile(...) failed to load the config file. Details:");
      console.error(e);
    }
  };

  Chatbot.prototype._OnChooseTopicTopicSelected = function (e) {
    Chatbot._Instance._ChangeTopic(this.innerHTML);

    UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
    UI.GetInstance().DisplayMessage(MessageType.System, "The topic was changed to: " + this.innerHTML);

    Chatbot._Instance._SendMessage("What would you like more information about?");

    UI.GetInstance().EnableInput(true);
  };

  Chatbot.prototype._OnPageLoaded = function (e) {
    // Make sure that the config has been fully loaded into memory before contiuing.
    // This can be done by waiting for the Chatbot instance to be instantiated
    // (if it hasn't been already), and then waiting for the configuration file to
    // be loaded.
    while (!!!Chatbot._Instance || !Chatbot._Instance._IsConfigLoaded) {
      // If the Chatbot has been marked as 'disabled' due to an error, functionally disable
      // the Chatbot and print an error message to the screen (via a MessageType.System message).
      if (Chatbot._Instance._IsDisabled) {
        UI.GetInstance().Init();
        UI.GetInstance().EnableInput(false);
        UI.GetInstance().DeleteAllMessages();

        Chatbot._Instance._SendMessageAsType(MessageType.System, "We are sorry for the inconvenience, there seems to be an error within the application! " + "We are working on the problem, and will have the Chatbot back up and " + "running as soon as possible! In the meantime, however, you may visit our " + "website at https://wku.edu for more information about WKU housing, academics, " + "financial aid, and much more!");

        return;
      } // Wait 300ms and try again.


      setTimeout(function () {}, 300);
    } // Initialize the Chatbot.


    Chatbot._Instance._Init();
  };

  Chatbot.prototype._ParseMessageForKeywords = function (message) {
    var keywords = new HashMap(); // Clean the message (e.g. removing double spaces, replacing dashes with spaces, etc.).

    message = this._CleanUserMessage(message.toLowerCase());
    message.split(" ").forEach(function (word) {
      // If there is already an entry for the 'word' in the HashMap,
      // add onto that existing value. Otherwise, add a new entry.
      var times = keywords.Get(word);
      if (times !== undefined) keywords.Set(word, times + 1);else keywords.Set(word, 1);
    });
    return keywords;
  };

  Chatbot.prototype._SearchForResource = function (message, inputKeywords) {
    // Clean the message (e.g. removing double spaces, replacing dashes with spaces, etc.).
    message = this._CleanUserMessage(message.toLowerCase());
    var scores = new Array();

    this._ResourceIterator.Reset();

    var iteration = this._ResourceIterator.Next();

    do {
      var goal = 0;
      var score = 0; // Calculate the score for the default-weight keywords.

      iteration.resource.Keywords.forEach(function (resourceKeyword, index, array) {
        if (resourceKeyword.indexOf(" / ") !== -1) // 'Or' operator, phrase sub-type.
          {
            var split = resourceKeyword.split(" / ");

            for (var i = 0; i < split.length; i++) {
              // If it matches, increment the score.
              if (message.indexOf(split[i]) !== -1) {
                score++;
                break;
              }
            }
          } else if (resourceKeyword.indexOf(" ") !== -1) {
          // If the resource keyword has a space in it, treat the keyword as having
          // multiple words (to be matched as one string).
          // Also, if the original message contains the keyword phrase, increment the score.
          // We do this because the inputKeywords parameter is of the type HashMap<number>,
          // and since it's a hashmap, the words are not in order (and keyword phrases
          // need to be matched in the order that their words are specified).
          if (message.indexOf(resourceKeyword) !== -1) score++;
        } else if (resourceKeyword.indexOf("/") !== -1) // 'Or' operator, word sub-type.
          {
            var split = resourceKeyword.split("/");

            for (var i = 0; i < split.length; i++) {
              // If it matches, increment the score.
              if (inputKeywords.Contains(split[i])) {
                score++;
                break;
              }
            }
          } else if (inputKeywords.Contains(resourceKeyword)) score++;

        goal++;
      }); // Calculate the score for the varying-weight keywords, if any.

      if (iteration.resource.WeightedKeywords !== undefined) {
        for (var i = 0; i < iteration.resource.WeightedKeywords.length; i++) {
          var weightedKeyword = iteration.resource.WeightedKeywords[i];

          if (weightedKeyword.Keyword.indexOf(" / ") !== -1) // 'Or' operator, phrase sub-type.
            {
              var split = weightedKeyword.Keyword.split(" / ");

              for (var i = 0; i < split.length; i++) {
                // If it matches, increment the score.
                if (message.indexOf(split[i]) !== -1) {
                  score += weightedKeyword.Weight;
                  break;
                }
              }
            } else if (weightedKeyword.Keyword.indexOf(" ") !== -1) {
            // If the resource keyword has a space in it, treat the keyword as having
            // multiple words (to be matched as one string).
            // Also, if the original message contains the keyword phrase, increment the score.
            if (message.indexOf(weightedKeyword.Keyword) !== -1) {
              score += weightedKeyword.Weight;
            }
          } else if (weightedKeyword.Keyword.indexOf("/") !== -1) // 'Or' operator, word sub-type.
            {
              var split = weightedKeyword.Keyword.split("/");

              for (var i = 0; i < split.length; i++) {
                // If it matches, increment the score.
                if (inputKeywords.Contains(split[i])) {
                  score += weightedKeyword.Weight;
                  break;
                }
              }
            } else if (inputKeywords.Contains(weightedKeyword.Keyword)) score += weightedKeyword.Weight;

          goal += weightedKeyword.Weight;
        }
      }

      scores.push({
        score: score / goal,
        resName: iteration.resource.Name
      });
      iteration = this._ResourceIterator.Next();
    } while (!iteration.hasCycled);

    {} // Sort the scores from highest to lowest.

    scores = scores.sort(function (a, b) {
      return a.score - b.score;
    });
    var highScore = scores[scores.length - 1]; // If the highest score was less than or equal to 0.3, disregard it.

    if (highScore.score <= 0.3) {
      console.log("highScore <= 0.3; returning null.");
      return null;
    } // If the highest score is NaN, this is likely due to an error in the config file; return null.
    else if (Number.isNaN(highScore.score)) {
        console.log("highScore === NaN; returning null.");
        return null;
      } else if (scores.length > 1 && highScore.score === scores[scores.length - 2].score) {
        console.log("The top two scores were equal to one another; returning null.");
        return null;
      }

    this._ResourceIterator.Reset();

    var iteration = this._ResourceIterator.Next();

    do {
      if (iteration.resource.Name === highScore.resName) return iteration.resource;
      iteration = this._ResourceIterator.Next();
    } while (!iteration.hasCycled);

    {}
    return null;
  };

  Chatbot.prototype._SendMessage = function (message) {
    return UI.GetInstance().DisplayMessage(MessageType.Chatbot, message);
  };

  Chatbot.prototype._SendMessageAsType = function (type, message) {
    return UI.GetInstance().DisplayMessage(type, message);
  };

  Chatbot.prototype._YesOrNoButtonsCallback = function (e) {
    UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
    UI.GetInstance().DisplayMessage(MessageType.System, "Was this helpful? Selected: " + this.innerHTML);
    UI.GetInstance().EnableInput(true); // Button name === "Yes!".

    var chooseDifferentTopic = false;

    if (this.innerHTML === "Yes!") {
      Chatbot._Instance._SendMessage(Chatbot._Instance._Config.SuccessMessage);

      Chatbot._Instance._NumIncorrectResponses = 0;
    } else // Button name === "No".
      {
        Chatbot._Instance._DoCouldNotFindCorrectResourceProcess(Chatbot._Instance._LastUserMessage);
      }
  };

  return Chatbot;
}();

var HashMap =
/** @class */
function () {
  function HashMap(obj) {
    if (obj === void 0) {
      obj = null;
    }

    if (obj === null) this.InnerMap = {};else {
      console.log("obj !== null");
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        this.Set(key, obj[key]);
      }
    }
  }

  HashMap.prototype.Contains = function (key) {
    return this.InnerMap[this._Hash(key)] !== undefined;
  };

  HashMap.prototype.Get = function (key) {
    var pair = this.InnerMap[this._Hash(key)];

    if (pair !== undefined) return pair.value;else return undefined;
  };

  HashMap.prototype.GetKeys = function () {
    return Object.keys(this.InnerMap);
  };

  HashMap.prototype.GetLength = function () {
    return Object.keys(this.InnerMap).length;
  };

  HashMap.prototype.Set = function (key, value) {
    this.InnerMap[this._Hash(key)] = {
      key: key,
      value: value
    };
  };

  HashMap.prototype._Hash = function (key) {
    /*
        Borrowed from "https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/".
        All credit goes to them. Modified slightly.
    */
    var hash = 0;
    var ch;

    for (var i = 0; i < key.length; i++) {
      ch = key.charCodeAt(i);
      hash = (hash << 5) - hash + ch;
      hash |= 0; // Convert to 32bit integer
    }

    return hash.toString();
  };

  return HashMap;
}();

var MessageType;

(function (MessageType) {
  MessageType[MessageType["Chatbot"] = 0] = "Chatbot";
  MessageType[MessageType["System"] = 1] = "System";
  MessageType[MessageType["User"] = 2] = "User";
})(MessageType || (MessageType = {}));

var Resource =
/** @class */
function () {
  function Resource() {}

  Resource.IsDataJustURL = function (res) {
    // If the Data starts with "http" and only a URL exists (no other words/URLs/etc.),
    // return true. Otherwise, return false.
    return res.Data.startsWith("http") && res.Data.split(" ").length == 1;
  };

  return Resource;
}();

var ResourceCyclicIterator =
/** @class */
function () {
  function ResourceCyclicIterator(resources) {
    if (resources.length === 0) {
      throw new Error("At least one resource must be supplied to ResourceCyclicIterator.");
    }

    this._Index = 0;
    this._Resources = resources;
  }

  ResourceCyclicIterator.prototype.GetNumResources = function () {
    return this._Resources.length;
  };

  ResourceCyclicIterator.prototype.HasNext = function () {
    return this._Index < this._Resources.length;
  };

  ResourceCyclicIterator.prototype.Next = function () {
    if (this.HasNext()) {
      var resource = this._Resources[this._Index];
      this._Index++;
      return {
        resource: resource,
        hasCycled: false
      };
    } else {
      // Reset the index to 0, and start again from there.
      this._Index = 0;
      var resource = this._Resources[this._Index];
      this._Index++;
      return {
        resource: resource,
        hasCycled: true
      };
    }
  };

  ResourceCyclicIterator.prototype.Reset = function () {
    this._Index = 0;
  };

  return ResourceCyclicIterator;
}();

var Topic =
/** @class */
function () {
  function Topic() {}

  return Topic;
}();

var TopicCyclicIterator =
/** @class */
function () {
  function TopicCyclicIterator(topics) {
    if (topics.length === 0) {
      throw new Error("At least one topic must be supplied to TopicCyclicIterator.");
    }

    this._Index = 0;
    this._Topics = topics;
  }

  TopicCyclicIterator.prototype.GetNumTopics = function () {
    return this._Topics.length;
  };

  TopicCyclicIterator.prototype.HasNext = function () {
    return this._Index < this._Topics.length;
  };

  TopicCyclicIterator.prototype.Next = function () {
    if (this.HasNext()) {
      var topic = this._Topics[this._Index];
      this._Index++;
      return {
        topic: topic,
        hasCycled: false
      };
    } else {
      // Reset the index to 0, and start again from there.
      this._Index = 0;
      var topic = this._Topics[this._Index];
      this._Index++;
      return {
        topic: topic,
        hasCycled: true
      };
    }
  };

  TopicCyclicIterator.prototype.Reset = function () {
    this._Index = 0;
  };

  return TopicCyclicIterator;
}();

var UI =
/** @class */
function () {
  function UI() {
    this._Inited = false;
    this._LastMessageID = -1;
  }

  UI.GetInstance = function () {
    if (!!this._Instance) {
      return this._Instance;
    }

    this._Instance = new UI();
    return this._Instance;
  };

  UI.prototype.DeleteAllMessages = function () {
    this._MessageList.textContent = "";
    this._LastMessageID = -1;
  };

  UI.prototype.DeleteAllMessagesWithID = function (messageID) {
    // Go through the whole list of messages and search for one with the ID specified.
    for (var i = 0; i < this._MessageList.children.length; i++) {
      if (Number(this._MessageList.children[i].id) === messageID) {
        this._MessageList.children[i].remove();

        i--;
      }
    }
  };

  UI.prototype.DisplayButtons = function (buttonNames, message, clickCallback) {
    var messageID = this.DisplayMessage(MessageType.Chatbot, message);
    var element = document.createElement("div");
    element.classList.add("choicesContainer");
    element.id = messageID.toString();

    for (var i = 0; i < buttonNames.length; i++) {
      var button = document.createElement("button");
      button.classList.add("choiceButton");
      button.innerHTML = buttonNames[i];
      button.addEventListener("click", clickCallback);
      element.appendChild(button);
    }

    this._MessageList.appendChild(element);

    this.ScrollToBottomOfMessageList();
    return messageID;
  };

  UI.prototype.DisplayMessage = function (type, message) {
    var element = document.createElement("div");
    if (type === MessageType.Chatbot) element.classList.add("chatbotMessage");else if (type === MessageType.User) element.classList.add("userMessage");else if (type === MessageType.System) element.classList.add("systemMessage");else throw new Error("UI.DisplayMessage: A valid MessageType must be supplied!"); // If the message contains any URls or email addresses, make them hyperlinks.

    if (message.indexOf("http") !== -1 || message.indexOf("@") !== -1) {
      var parts = message.split(" ");

      for (var i = 0; i < parts.length; i++) {
        if (parts[i].startsWith("http")) {
          element.innerHTML += "<a href=\"" + parts[i] + "\" target=\"_blank\">" + parts[i] + "</a> ";
        } else if (parts[i].indexOf("@") !== -1 && parts[i].length > 1) {
          element.innerHTML += "<a href=\"mailto:" + parts[i] + "\">" + parts[i] + "</a> ";
        } else element.innerHTML += parts[i] + " ";
      } // Remove the trailing space at the end of the element's innerHTML field.


      element.innerHTML = "<p>" + element.innerHTML.substring(0, element.innerHTML.length - 1) + "</p>";
    } // Or, if no URLs were found in the message, just use the message as-is.
    else element.innerHTML = "<p>" + message + "</p>";

    element.id = this._GetNewMessageID().toString();

    this._MessageList.appendChild(element);

    this.ScrollToBottomOfMessageList();
    return this._LastMessageID; // Return the current element ID.
  };

  UI.prototype.DisplayChatbotMessageUsingResource = function (resource) {
    var element = document.createElement("div");
    element.classList.add("chatbotMessage");
    element.innerHTML = "<p><a href=\"" + resource.Data + "\" target=\"_blank\">" + resource.Name + "</a></p>";
    element.id = this._GetNewMessageID().toString();

    this._MessageList.appendChild(element);

    this.ScrollToBottomOfMessageList();
    return this._LastMessageID; // Return the current element ID.
  };

  UI.prototype.EnableInput = function (enabled) {
    this._ChangeTopicButton.disabled = !enabled;
    this._MessageBox.disabled = !enabled; // The MessageBox is in charge of enabling the Send button, so
    // only allow disabling of the Send button through this method.

    if (!enabled) this._SendButton.disabled = true;
  };

  UI.prototype.Init = function () {
    if (this._Inited) return;
    this._ChangeTopicButton = document.getElementById(UI._ID_CHANGE_TOPIC_BUTTON);
    this._MessageBox = document.getElementById(UI._ID_MESSAGE_BOX);
    this._MessageList = document.getElementById(UI._ID_MESSAGE_LIST);
    this._SendButton = document.getElementById(UI._ID_SEND_BUTTON);

    this._ChangeTopicButton.addEventListener("click", this._OnChangeTopicButtonClicked);

    this._MessageBox.addEventListener("input", this._OnMessageBoxTextChanged);

    this._SendButton.addEventListener("click", this._OnSendButtonClicked);

    this._Inited = true;
  };

  UI.prototype.ScrollToBottomOfMessageList = function () {
    this._MessageList.scrollTop = this._MessageList.scrollHeight;
  };

  UI.prototype._GetNewMessageID = function () {
    this._LastMessageID++;
    return this._LastMessageID;
  };

  UI.prototype._OnChangeTopicButtonClicked = function (e) {
    Chatbot.GetInstance().BeginChooseTopic("Please select a topic from the following:");
  };

  UI.prototype._OnMessageBoxTextChanged = function (e) {
    // Condense the message's space character to one space max between each character (that isn't a space).
    // Like so: "some    user      message  is   here" -> "some user message is here", and "    " -> "".
    var message = UI._Instance._MessageBox.value;

    if (!!message && message.length > 0) {
      // If there is text in the message box, disable the send button. 
      UI._Instance._SendButton.disabled = false;
    } // Otherwise, enable the send button.
    else UI._Instance._SendButton.disabled = true;
  };

  UI.prototype._OnPageLoaded = function (e) {
    // Initialize the UI.
    UI._Instance.Init();
  };

  UI.prototype._OnSendButtonClicked = function (e) {
    // Send the message to the chatbot.
    UI._Instance._SendButton.disabled = true;

    UI._Instance.DisplayMessage(MessageType.User, UI._Instance._MessageBox.value);

    Chatbot.GetInstance().ReplyToMessage(UI._Instance._MessageBox.value); // Remove the text from the message box.

    UI._Instance._MessageBox.value = "";
  };

  UI._ID_CHANGE_TOPIC_BUTTON = "changeTopicButton";
  UI._ID_MESSAGE_BOX = "messageBox";
  UI._ID_MESSAGE_LIST = "messageList";
  UI._ID_SEND_BUTTON = "sendButton";
  return UI;
}();

Chatbot.GetInstance(); // Start the Chatbot app!
},{}],"../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51279" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/app.ts"], null)
//# sourceMappingURL=/app.a0488aa9.js.map