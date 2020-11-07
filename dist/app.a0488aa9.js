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
var Chatbot =
/** @class */
function () {
  function Chatbot() {}

  Chatbot.GetInstance = function () {
    console.log("CHATBOT GETINSTANCE METHOD CALLED."); // If the Chatbot instance exists, just return it./

    if (!!this._Instance) return this._Instance;
    this._Instance = new Chatbot();
    this._Instance._NumIncorrectResponses = 0;
    UI.GetInstance(); // Cause the UI to initialize itself.

    this._Instance._LoadConfigFile(C.CONFIG_FILE_CONTENTS);

    this._Instance._ChangeTopic("Dining");

    return this._Instance;
  };

  Chatbot.prototype.DisplayTopics = function () {
    // Get a list of the topic names.
    var topicNames = new Array();

    this._TopicIterator.Reset();

    do {
      var iteration = this._TopicIterator.Next();

      topicNames.push(iteration.topic.Name);
    } while (!iteration.hasCycled); // Show the buttons.


    UI.GetInstance().DisplayButtons(topicNames, "Please choose from these topics", this._OnDisplayTopicsTopicSelected);
  };

  Chatbot.prototype.ReplyToMessage = function (userMessage) {
    var _this = this;

    console.log("ReplyToMessage(\"" + userMessage + "\");"); // Figure out how to respond to user's message.

    var messageKeywords = this._ParseMessageForKeywords(userMessage);

    var resource = this._SearchForResource(messageKeywords); // If the resource could not be found.


    if (resource == null) {
      console.log("RESOURCE === null");
      this._NumIncorrectResponses++;

      this._SendMessage("I'm sorry, I wasn't able to find anything from what you typed. " + "How about we try again?");

      if (this._NumIncorrectResponses >= 3) {
        this._SendMessage(this._StumpedApologyMessage);

        this._SendMessage(this._TeamEmailAddress);

        this._NumIncorrectResponses = 0;
      }
    } else // If the resource was found.
      {
        this._SendMessage(resource.Data);

        UI.GetInstance().DisplayButtons(["Yes!", "No"], "Was this what you were looking for?", function (buttonName) {
          if (buttonName === "Yes!") {
            _this._SendMessage(_this._SuccessMessage);

            _this._NumIncorrectResponses = 0;
          } else // buttonName === "No"
            {
              _this._NumIncorrectResponses++;

              if (_this._NumIncorrectResponses >= 3) {
                _this._SendMessage(_this._StumpedApologyMessage);

                _this._SendMessage("Please feel free to email us at " + _this._TeamEmailAddress + " for any other questions you may have!");

                _this._NumIncorrectResponses = 0;
              }
            }
        });
      }
  };

  Chatbot.prototype._ChangeTopic = function (topicName) {
    this._CurrentTopic = this._GetTopic(topicName);
    this._ResourceIterator = new ResourceCyclicIterator(this._CurrentTopic.Resources);
  };

  Chatbot.prototype._GetTopic = function (topicName) {
    this._TopicIterator.Reset();

    do {
      var topic = this._TopicIterator.Next();

      if (topicName === topic.topic.Name) return topic.topic;
    } while (!topic.hasCycled);

    {}
    return null;
  };

  Chatbot.prototype._LoadConfigFile = function (configJson) {
    var config = JSON.parse(configJson);
    this._StumpedApologyMessage = config.StumpedApologyMessage;
    this._SuccessMessage = config.SuccessMessage;
    this._WelcomeMessage = config.WelcomeMessage;
    this._TeamEmailAddress = config.TeamEmailAddress;
    this._TopicIterator = new TopicCyclicIterator(config.Topics);
  };

  Chatbot.prototype._OnDisplayTopicsTopicSelected = function (e) {
    Chatbot._Instance._ChangeTopic(this.value);

    Chatbot._Instance._SendMessage("What would you like more information about?");
  };

  Chatbot.prototype._ParseMessageForKeywords = function (message) {
    console.log("PARSE message: string = \"" + message + "\"");
    var keywords = new HashMap(); // Make sure only one space character exists between each keyword.

    message = message.toLowerCase();

    while (message.indexOf("  ") != -1) {
      message = message.replace("  ", " ");
    }

    console.log("PARSE message: string = \"" + message + "\"");
    message.split(new RegExp("[ -]")).forEach(function (word) {
      console.log("PARSE FOR KEYWORDS: 'word'=" + word + " keywords.Get(word)=" + keywords.Get(word)); // If there is already an entry for the 'word' in the HashMap,
      // add onto that existing value. Otherwise, add a new entry.

      var times = keywords.Get(word);
      if (times !== undefined) keywords.Set(word, times + 1);else keywords.Set(word, 1);
    });
    return keywords;
  };

  Chatbot.prototype._SearchForResource = function (inputKeywords) {
    var scores = new Array();
    console.log("SEARCHING FOR RESOURCE");
    console.log(inputKeywords);

    this._ResourceIterator.Reset();

    do {
      var resource = this._ResourceIterator.Next();

      var goal = 0;
      var score = 0; // Calculate the score for the keywords.

      resource.resource.Keywords.forEach(function (resourceKeyword, index, array) {
        if (inputKeywords.Contains(resourceKeyword)) score++;
        goal++;
      }); // Calculate the score for the weighted keywords.

      if (resource.resource.WeightedKeywords !== undefined) {
        /*
        var hashMapKeys: string[] = Object.keys(resource.resource.WeightedKeywords.Map);
        for (var i = 0; i < hashMapKeys.length; i++)
        {
        var hash = hashMapKeys[i];
        var weightedKeyword: { key: string, value: number } =
        resource.resource.WeightedKeywords.Map[hash];
        if (inputKeywords.Contains(weightedKeyword.key)) score += weightedKeyword.value;
        goal += weightedKeyword.value;
        }*/
        for (var i = 0; i < resource.resource.WeightedKeywords.length; i++) {
          var weightedKeyword = resource.resource.WeightedKeywords[i];
          if (inputKeywords.Contains(weightedKeyword.keyword)) score += weightedKeyword.weight;
          goal += weightedKeyword.weight;
        }
      }

      scores.push({
        score: score / goal,
        resName: resource.resource.Name
      });
    } while (!resource.hasCycled);

    {} // Sort the scores from highest to lowest.

    scores = scores.sort(function (a, b) {
      return a.score - b.score;
    });
    var highScore = scores[scores.length - 1]; // If the highest score was less than or equal to 0.3, disregard it.

    if (highScore.score <= 0.3) {
      console.log("highScore <= 0.3; returning null.");
      return null;
    }

    console.log(scores);
    console.log("Resource: \"" + highScore.resName + "\"\tScore: " + highScore.score);

    this._ResourceIterator.Reset();

    do {
      var resource = this._ResourceIterator.Next();

      if (resource.resource.Name === highScore.resName) {
        console.log("RESOURCE FOUND:");
        console.log(resource.resource);
        return resource.resource;
      }
    } while (!resource.hasCycled);

    {}
    console.log("RESOURCE NOT FOUND");
    return null;
  };

  Chatbot.prototype._SendMessage = function (message) {
    console.log("SEND_MESSAGE: \"" + message + "\"");
    return UI.GetInstance().DisplayMessage(MessageType.Chatbot, message);
  };

  Chatbot.prototype._SendMessageAsType = function (type, message) {
    console.log("SEND_MESSAGE(" + type + "): \"" + message + "\"");
    return UI.GetInstance().DisplayMessage(type, message);
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

    if (obj === null) this.Map = {};else {
      console.log("obj !== null");
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        this.Set(key, obj[key]);
      }
    }
  }

  HashMap.prototype.Contains = function (key) {
    return this.Map[this._Hash(key)] !== undefined;
  };

  HashMap.prototype.Get = function (key) {
    var pair = this.Map[this._Hash(key)];

    if (pair !== undefined) return pair.value;else return undefined;
  };

  HashMap.prototype.GetLength = function () {
    return Object.keys(this.Map).length;
  };

  HashMap.prototype.Set = function (key, value) {
    this.Map[this._Hash(key)] = {
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
  function Resource() {} // Return true if data starts with http; false otherwise.


  Resource.prototype.IsDataURL = function () {
    return this.Data.startsWith("http");
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
    window.addEventListener("load", this._OnPageLoaded);
  }

  UI.GetInstance = function () {
    console.log("UI GETINSTANCE METHOD CALLED.");

    if (!!this._Instance) {
      return this._Instance;
    }

    this._Instance = new UI();
    return this._Instance;
  };

  UI.prototype.DeleteMessage = function (messageID) {};

  UI.prototype.DisplayButtons = function (buttonNames, message, callback) {// IMPORTANT: For each button created, make button.id = messageID.
  };

  UI.prototype.DisplayMessage = function (type, message) {};

  UI.prototype._GetNewMessageID = function () {
    this._LastMessageID++;
    return this._LastMessageID;
  };

  UI.prototype._Init = function () {
    //this._ChangeTopicButton = <HTMLButtonElement>document.getElementById(UI._ID_CHANGE_TOPIC_BUTTON);
    this._MessageBox = document.getElementById(UI._ID_MESSAGE_BOX);
    this._SendButton = document.getElementById(UI._ID_SEND_BUTTON); //this._ChangeTopicButton.addEventListener("click", this._OnChangeTopicButtonClicked)

    this._MessageBox.addEventListener("change", this._OnMessageBoxTextChanged);

    this._SendButton.addEventListener("click", this._OnSendButtonClicked);
  };

  UI.prototype._OnChangeTopicButtonClicked = function (e) {
    Chatbot.GetInstance().DisplayTopics();
  };

  UI.prototype._OnDisplayButtonClicked = function (e) {
    // Delete message because a topic was selected.
    UI.GetInstance().DeleteMessage(Number(this.parentElement.id));
  };

  UI.prototype._OnMessageBoxTextChanged = function (e) {
    // Condense the message's space character to one space max between each character (that isn't a space).
    // Like so: "some    user      message  is   here" -> "some user message is here", and "    " -> "".
    var message = UI._Instance._MessageBox.value;

    if (!!message && message.length > 0) {
      console.log("UI._OnMessageBoxTextChanged (message=\"" + message + "\")"); // If there is text in the message box, disable the send button. 

      UI._Instance._SendButton.disabled = false;
    } // Otherwise, enable the send button.
    else UI._Instance._SendButton.disabled = true;
  };

  UI.prototype._OnPageLoaded = function (e) {
    console.log("UI._OnPageLoaded"); // Initialize the UI.

    UI._Instance._Init();
  };

  UI.prototype._OnSendButtonClicked = function (e) {
    console.log("SEND BUTTON CLICKED."); // Send the message to the chatbot.

    console.log(UI._Instance._MessageBox.value);
    Chatbot.GetInstance().ReplyToMessage(UI._Instance._MessageBox.value); // Remove the text from the message box.

    UI._Instance._MessageBox.value = "";
  };

  UI._ID_CHANGE_TOPIC_BUTTON = "";
  UI._ID_MESSAGE_BOX = "message-box";
  UI._ID_SEND_BUTTON = "send-button";
  return UI;
}();

var C =
/** @class */
function () {
  function C() {}

  C.CONFIG_FILE_CONTENTS = "{\n    \"StumpedApologyMessage\": \"\",\n    \"SuccessMessage\": \"\",\n    \"WelcomeMessage\": \"\",\n    \"TeamEmailAddress\": \"\",\n    \"Topics\":\n    [\n        {\n            \"Name\": \"Dining\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"on-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/oncampus.php\",\n                    \"Keywords\": [\"on\", \"campus\", \"meal\", \"meals\", \"plan\", \"plans\"]\n                },\n\n                {\n                    \"Name\": \"off-campus meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/offcampus.php\",\n                    \"Keywords\": [\"off\", \"campus\", \"meal\", \"meals\", \"plan\", \"plans\"]\n                },\n\n                {\n                    \"Name\": \"flex meal plans\",\n                    \"Data\": \"https://www.wku.edu/wkurg/flexplan.php\",\n                    \"Keywords\": [\"meal\", \"meals\", \"plan\", \"plans\"],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"flex\",\n                            \"weight\": 2\n                        }\n                    ]\n                },\n\n                {\n                    \"Name\": \"hours of operation\",\n                    \"Data\": \"https://www.wku.edu/wkurg/documents/fall2020hoursofoperation.pdf\",\n                    \"Keywords\": [\"eat\", \"hours\", \"times\", \"opening\", \"closing\", \"operation\"]\n                },\n\n                {\n                    \"Name\": \"campus restaurant map\",\n                    \"Data\": \"https://www.wku.edu/wkurg/images/2020-21campusrestaurantmap.jpg\",\n                    \"Keywords\": [\"campus\", \"restaurant\", \"map\", \"list\"]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n        \n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        },\n\n        {\n            \"Name\": \"Name\",\n            \"Resources\":\n            [\n                {\n                    \"Name\": \"Name\",\n                    \"Data\": \"Either a URL or some text.\",\n                    \"Keywords\": [],\n                    \"WeightedKeywords\":\n                    [\n                        {\n                            \"keyword\": \"keyword\",\n                            \"weight\": 1\n                        }\n                    ]\n                }\n            ]\n        }\n    ]\n}";
  return C;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60763" + '/');

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