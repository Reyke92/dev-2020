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

  C.CONFIG_FILE_CONTENTS = "{\n    \"StumpedApologyMessage\": \"I'm sorry, I'm having trouble finding what you're looking for. You may still try and keep searching for this however. Alternatively, please feel free to email us with further questions at:\",\n    \"SuccessMessage\": \"I'm glad I was able to be of help to you! May I help you with anything else?\",\n    \"WelcomeMessage\": \"Hey there! What topic may I help you with today?\",\n    \"TeamEmailAddress\": \"wkuchatbotteam@wku.com\",\n    \"Topics\":\n    [\n        {\n            \"Name\": \"Dining\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"on-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/oncampus.php\",\n                    \"Keywords\": [\"on campus\", \"meal/meals\", \"plan/plans\"]\n                },\n\n                {\n                    \"Name\": \"off-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/offcampus.php\",\n                    \"Keywords\": [\"off campus\", \"meal/meals\", \"plan/plans\"]\n                },\n\n                {\n                    \"Name\": \"flex meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/flexplan.php\",\n                    \"Keywords\": [\"meal/meals\", \"plan/plans\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"flex\", \"Weight\": 2 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"hours of operation\",\n                    \"Data\": \"https://www.wku.edu/wkurg/documents/fall2020hoursofoperation.pdf\",\n                    \"Keywords\":[\"open/opens/opening\", \"close/closes/closing\", \"hours\", \"time/times\", \"operation\"]\n                },\n\n                {\n                    \"Name\": \"campus restaurant map\",\n                    \"Data\": \"https://www.wku.edu/wkurg/images/2020-21campusrestaurantmap.jpg\",\n                    \"Keywords\": [\"campus\", \"restaurant/restaurants\", \"map\", \"list\", \"eat\"]\n                },\n\n                {\n                    \"Name\": \"add additional money\",\n                    \"Data\": \"https://www.wku.edu/wkurg/dbdollars.php\",\n                    \"Keywords\": [\"add\", \"money\", \"account\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"big red dollars / dining dollars / meal dollars / meal plan dollars / flex dollars / flex plan dollars\", \"Weight\": 3 }\n                    ]\n                }\n            ]\n        },\n        \n        {\n            \"Name\": \"Housing\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Academics\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"information about the Colonnade program\",\n                    \"Data\": \"https://www.wku.edu/colonnade/index.php\",\n                    \"Keywords\": [\"program\", \"information\", \"requirements\", \"about/regarding\"],\n                    \"WeightedKeywords\":\n                    [\n                        { \"Keyword\": \"colonnade\", \"Weight\": 3 }\n                    ]\n                },\n\n                {\n                    \"Name\": \"2017-2018 academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2017_2018.pdf\",\n                    \"Keywords\": [\"17/2017\", \"18/2018\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2018-2019 academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2018_2019.pdf\",\n                    \"Keywords\": [\"18/2018\", \"19/2019\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2019-2020 academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/acadcal2019_2020_update_covid19.pdf\",\n                    \"Keywords\": [\"19/2019\", \"20/2020\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                },\n\n                {\n                    \"Name\": \"2020-2021 academic calendar\",\n                    \"Data\": \"https://www.wku.edu/registrar/academic_calendars/final_fall20_spring21_updated11-20.pdf\",\n                    \"Keywords\": [\"20/2020\", \"21/2021\", \"academic\", \"calendar\", \"semester\", \"schedule\"]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Advising\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": []\n                }\n            ]\n        }\n    ]\n}";
  return C;
}();

var Chatbot =
/** @class */
function () {
  function Chatbot() {
    window.addEventListener("load", this._OnPageLoaded);
  }

  Chatbot.GetInstance = function () {
    // If the Chatbot instance exists, just return it./
    if (!!this._Instance) return this._Instance;
    this._Instance = new Chatbot();
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
    // Figure out how to respond to user's message.
    var messageKeywords = this._ParseMessageForKeywords(userMessage);

    var resource = this._SearchForResource(userMessage, messageKeywords); // If the resource could not be found.


    if (resource == null) {
      this._NumIncorrectResponses++;

      if (this._NumIncorrectResponses >= 3) {
        this._SendMessage(this._StumpedApologyMessage);

        this._SendMessage(this._TeamEmailAddress);

        this._NumIncorrectResponses = 0;
      } else {
        this._SendMessage("I'm sorry, I wasn't able to find anything from what you typed. " + "How about we try again?");
      }
    } else // If the resource was found.
      {
        this._SendMessage(resource.Data);

        UI.GetInstance().EnableInput(false);
        UI.GetInstance().DisplayButtons(["Yes!", "No"], "Was this what you were looking for?", this._YesOrNoButtonsCallback);
      }
  };

  Chatbot.prototype._CalculateNumCharsInString = function (text, searchChar) {
    var numChars = 0;

    for (var i = 0; i < text.length; i++) {
      if (text[i] === searchChar) numChars++;
    }

    return numChars;
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

  Chatbot.prototype._Init = function () {
    // Initialize the UI first.
    UI.GetInstance().Init();
    this.BeginChooseTopic(this._WelcomeMessage);
  };

  Chatbot.prototype._LoadConfigFile = function (configJson) {
    var config = JSON.parse(configJson); // Make sure that all dashes within a resource's keyword (if any) are
    // replaced by a space. This is done so that the _SearchForResource(...) method
    // can save some processing time.

    for (var topicIndex = 0; topicIndex < config.Topics.length; topicIndex++) {
      var topic = config.Topics[topicIndex];

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
    }

    this._StumpedApologyMessage = config.StumpedApologyMessage;
    this._SuccessMessage = config.SuccessMessage;
    this._WelcomeMessage = config.WelcomeMessage;
    this._TeamEmailAddress = config.TeamEmailAddress;
    this._TopicIterator = new TopicCyclicIterator(config.Topics);
  };

  Chatbot.prototype._OnChooseTopicTopicSelected = function (e) {
    Chatbot._Instance._ChangeTopic(this.innerHTML);

    UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
    UI.GetInstance().DisplayMessage(MessageType.System, "The topic was changed to: " + this.innerHTML);

    Chatbot._Instance._SendMessage("What would you like more information about?");

    UI.GetInstance().EnableInput(true);
  };

  Chatbot.prototype._OnPageLoaded = function (e) {
    // Initialize the Chatbot.
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
        // If the resource keyword has a space in it, treat the keyword as having
        // multiple words (to be matched as one string).
        if (resourceKeyword.indexOf(" ") !== -1) {
          // If the original message contains the keyword phrase, increment the score.
          // We do this because the inputKeywords parameter is of the type HashMap<number>,
          // and since it's a hashmap, the words are not in order (and keyword phrases
          // need to be matched in the order that their words are specified).
          if (message.indexOf(resourceKeyword) !== -1) score++;
        } else if (resourceKeyword.indexOf(" / ") !== -1) // 'Or' operator, phrase sub-type.
          {
            var split = resourceKeyword.split(" / ");

            for (var i = 0; i < split.length; i++) {
              // If it matches, increment the score.
              if (message.indexOf(split[i]) !== -1) {
                score++;
                break;
              }
            }
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
      }); // Calculate the score for the varying-weight keywords.

      if (iteration.resource.WeightedKeywords !== undefined) {
        for (var i = 0; i < iteration.resource.WeightedKeywords.length; i++) {
          var weightedKeyword = iteration.resource.WeightedKeywords[i]; // If the resource keyword has a space in it, treat the keyword as having
          // multiple words (to be matched as one string).

          if (weightedKeyword.Keyword.indexOf(" ") !== -1) {
            // If the original message contains the keyword phrase, increment the score.
            if (message.indexOf(weightedKeyword.Keyword) !== -1) {
              score += weightedKeyword.Weight;
            }
          } else if (weightedKeyword.Keyword.indexOf(" / ")) // 'Or' operator, phrase sub-type.
            {
              var split = weightedKeyword.Keyword.split(" / ");

              for (var i = 0; i < split.length; i++) {
                // If it matches, increment the score.
                if (message.indexOf(split[i]) !== -1) {
                  score += weightedKeyword.Weight;
                  break;
                }
              }
            } else if (weightedKeyword.Keyword.indexOf("/")) // 'Or' operator, word sub-type.
            {
              var split = weightedKeyword.Keyword.split("/");

              for (var i = 0; i < split.length; i++) {
                // If it matches, increment the score.
                if (inputKeywords.Contains(split[i])) {
                  score += weightedKeyword.Weight;
                  break;
                }
              }
            }

          if (inputKeywords.Contains(weightedKeyword.Keyword)) score += weightedKeyword.Weight;
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
      }

    console.log(scores);
    console.log("Resource: \"" + highScore.resName + "\"\tScore: " + highScore.score);

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
      Chatbot._Instance._SendMessage(Chatbot._Instance._SuccessMessage);

      Chatbot._Instance._NumIncorrectResponses = 0;
      chooseDifferentTopic = true;
    } else // Button name === "No".
      {
        Chatbot._Instance._NumIncorrectResponses++;

        if (Chatbot._Instance._NumIncorrectResponses >= 3) {
          Chatbot._Instance._SendMessage(Chatbot._Instance._StumpedApologyMessage);

          Chatbot._Instance._SendMessage(Chatbot._Instance._TeamEmailAddress);

          Chatbot._Instance._NumIncorrectResponses = 0;
        } else Chatbot._Instance._SendMessage("I'm sorry. How about we try again?");
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
    if (type === MessageType.Chatbot) element.classList.add("chatbotMessage");else if (type === MessageType.User) element.classList.add("userMessage");else if (type === MessageType.System) element.classList.add("systemMessage");else throw new Error("UI.DisplayMessage: A valid MessageType must be supplied!"); // If the message is a URL, make it a hyperlink.

    if (message.startsWith("http")) {
      element.innerHTML = "<p><a href=\"" + message + "\">" + message + "</a></p>";
    } else element.innerHTML = "<p>" + message + "</p>";

    element.id = this._GetNewMessageID().toString();

    this._MessageList.appendChild(element);

    this.ScrollToBottomOfMessageList();
    return this._LastMessageID;
  };

  UI.prototype.EnableInput = function (enabled) {
    this._ChangeTopicButton.disabled = !enabled;
    this._MessageBox.disabled = !enabled;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55223" + '/');

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