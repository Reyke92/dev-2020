class Chatbot
{
    private static _Instance: Chatbot;

    private _CurrentTopic: Topic;
    private _NumIncorrectResponses: number;
    private _ResourceIterator: ResourceCyclicIterator;
    private _StumpedApologyMessage: string;
    private _SuccessMessage: string;
    private _TeamEmailAddress: string;
    private _TopicIterator: TopicCyclicIterator;
    private _WelcomeMessage: string;

    private constructor()
    {
        window.addEventListener("load", this._OnPageLoaded);
    }
    
    public static GetInstance(): Chatbot
    {
        // If the Chatbot instance exists, just return it./
        if (!!this._Instance) return this._Instance;

        this._Instance = new Chatbot();
        this._Instance._NumIncorrectResponses = 0;
        UI.GetInstance(); // Cause the UI to initialize itself.
        this._Instance._LoadConfigFile(C.CONFIG_FILE_CONTENTS);

        return this._Instance;
    }

    public BeginChooseTopic(chatbotMessage: string): number
    {
        // Get a list of the topic names.
        var topicNames: Array<string> = new Array<string>();
        this._TopicIterator.Reset();
        var iteration: { topic: Topic, hasCycled: boolean } = this._TopicIterator.Next();
        do
        {
            topicNames.push(iteration.topic.Name);
            iteration = this._TopicIterator.Next();
        }
        while (!iteration.hasCycled);

        UI.GetInstance().EnableInput(false);
        return UI.GetInstance().DisplayButtons(
            topicNames,
            chatbotMessage,
            this._OnChooseTopicTopicSelected
        );
    }

    public ReplyToMessage(userMessage: string): void
    {
        // Figure out how to respond to user's message.
        var messageKeywords: HashMap<number> = this._ParseMessageForKeywords(userMessage);
        var resource: Resource = this._SearchForResource(userMessage, messageKeywords);

        // If the resource could not be found.
        if (resource == null)
        {
            this._NumIncorrectResponses++;

            if (this._NumIncorrectResponses >= 3)
            {
                this._SendMessage(this._StumpedApologyMessage);
                this._SendMessage(this._TeamEmailAddress);
                this._NumIncorrectResponses = 0;
            }
            else
            {
                this._SendMessage(
                    "I'm sorry, I wasn't able to find anything from what you typed. " +
                    "How about we try again?"
                );
            }
        }
        else // If the resource was found.
        {
            this._SendMessage(resource.Data);

            UI.GetInstance().EnableInput(false);
            UI.GetInstance().DisplayButtons(
                ["Yes!", "No"],
                "Was this what you were looking for?",
                this._YesOrNoButtonsCallback
            );
        }
    }

    private _CalculateNumCharsInString(text: string, searchChar: string): number
    {
        var numChars: number = 0;
        for (var i = 0; i < text.length; i++)
        {
            if (text[i] === searchChar) numChars++;
        }

        return numChars;
    }

    private _ChangeTopic(topicName: string): void
    {
        this._CurrentTopic = this._GetTopic(topicName);
        this._ResourceIterator = new ResourceCyclicIterator(this._CurrentTopic.Resources);
    }

    private _CleanUserMessage(message: string): string
    {
        var clean: string = "";
        var lastChar: string = "";
        for (var i = 0; i < message.length; i++)
        {
            // 1) Allow only one space at a time (no double spaces, i.e. "  ").
            // 2) Do not keep "?" or "." characters.
            // 3) Replace dashes with spaces (however, allow only one space at a time).
            if (message[i] === "-" && lastChar !== " ")
            {
                clean += " ";
                lastChar = " ";
            }
            else if (message[i] === " " && lastChar !== " " ||
                     message[i] !== "?" && message[i] !== ".")
            {
                clean += message[i];
                lastChar = message[i];
            }
            else lastChar = message[i];
        }
        
        return clean;
    }

    private _GetTopic(topicName: string): Topic
    {
        this._TopicIterator.Reset();
        var iteration: { topic: Topic, hasCycled: boolean } = this._TopicIterator.Next();
        do
        {
            if (topicName === iteration.topic.Name) return iteration.topic;
            iteration = this._TopicIterator.Next();
        }
        while (!iteration.hasCycled) { }

        return null;
    }

    private _Init(): void
    {
        // Initialize the UI first.
        UI.GetInstance().Init();

        this.BeginChooseTopic(this._WelcomeMessage);
    }

    private _LoadConfigFile(configJson: string): void
    {
        var config: Config = JSON.parse(configJson);

        // Make sure that all dashes within a resource's keyword (if any) are
        // replaced by a space. This is done so that the _SearchForResource(...) method
        // can save some processing time.
        for (var topicIndex = 0; topicIndex < config.Topics.length; topicIndex++)
        {
            var topic: Topic = config.Topics[topicIndex];
            for (var resIndex = 0; resIndex < topic.Resources.length; resIndex++)
            {
                var res: Resource = topic.Resources[resIndex];

                // Default-weight keywords.
                for (var kwIndex = 0; kwIndex < res.Keywords.length; kwIndex++)
                {
                    res.Keywords[kwIndex] = res.Keywords[kwIndex].replace("-", " ");
                }

                // Varying-weight keywords.
                if (res.WeightedKeywords !== undefined)
                {
                    for (var kwIndex = 0; kwIndex < res.WeightedKeywords.length; kwIndex++)
                    {
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
    }

    private _OnChooseTopicTopicSelected(this: HTMLButtonElement, e: Event): void
    {
        Chatbot._Instance._ChangeTopic(this.innerHTML);
        UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
        UI.GetInstance().DisplayMessage(MessageType.System, "The topic was changed to: " + this.innerHTML);
        Chatbot._Instance._SendMessage("What would you like more information about?");
        UI.GetInstance().EnableInput(true);
    }

    private _OnPageLoaded(this: Document, e: Event): void
    {
        // Initialize the Chatbot.
        Chatbot._Instance._Init();
    }

    private _ParseMessageForKeywords(message: string): HashMap<number>
    {
        var keywords: HashMap<number> = new HashMap<number>();

        // Clean the message (e.g. removing double spaces, replacing dashes with spaces, etc.).
        message = this._CleanUserMessage(message.toLowerCase());

        message.split(" ").forEach((word: string) =>
        {
            // If there is already an entry for the 'word' in the HashMap,
            // add onto that existing value. Otherwise, add a new entry.
            var times: number = keywords.Get(word);
            if (times !== undefined)    keywords.Set(word, times + 1);
            else                        keywords.Set(word, 1);
        });

        return keywords;
    }

    private _SearchForResource(message: string, inputKeywords: HashMap<number>): Resource
    {
        // Clean the message (e.g. removing double spaces, replacing dashes with spaces, etc.).
        message = this._CleanUserMessage(message.toLowerCase());

        var scores: Array<{ score: number, resName: string }> =
            new Array<{ score: number, resName: string }>();

        this._ResourceIterator.Reset();
        var iteration: { resource: Resource, hasCycled: boolean } = this._ResourceIterator.Next();
        do
        {
            var goal = 0;
            var score = 0;

            // Calculate the score for the default-weight keywords.
            iteration.resource.Keywords.forEach((resourceKeyword: string, index, array) =>
            {
                // If the resource keyword has a space in it, treat the keyword as having
                // multiple words (to be matched as one string).
                if (resourceKeyword.indexOf(" ") !== -1)
                {
                    // If the original message contains the keyword phrase, increment the score.
                    // We do this because the inputKeywords parameter is of the type HashMap<number>,
                    // and since it's a hashmap, the words are not in order (and keyword phrases
                    // need to be matched in the order that their words are specified).
                    if (message.indexOf(resourceKeyword) !== -1) score++;
                }
                else if (resourceKeyword.indexOf(" / ") !== -1) // 'Or' operator, phrase sub-type.
                {
                    var split: string[] = resourceKeyword.split(" / ");
                    
                    for (var i = 0; i < split.length; i++)
                    {
                        // If it matches, increment the score.
                        if (message.indexOf(split[i]) !== -1)
                        {
                            score++;
                            break;
                        }
                    }
                }
                else if (resourceKeyword.indexOf("/") !== -1) // 'Or' operator, word sub-type.
                {
                    var split: string[] = resourceKeyword.split("/");

                    for (var i = 0; i < split.length; i++)
                    {
                        // If it matches, increment the score.
                        if (inputKeywords.Contains(split[i]))
                        {
                            score++;
                            break;
                        }
                    }
                }
                else if (inputKeywords.Contains(resourceKeyword)) score++;

                goal++;
            });

            // Calculate the score for the varying-weight keywords.
            if (iteration.resource.WeightedKeywords !== undefined)
            {
                for (var i = 0; i < iteration.resource.WeightedKeywords.length; i++)
                {
                    var weightedKeyword: { Keyword: string, Weight: number } =
                        iteration.resource.WeightedKeywords[i];
                    
                    // If the resource keyword has a space in it, treat the keyword as having
                    // multiple words (to be matched as one string).
                    if (weightedKeyword.Keyword.indexOf(" ") !== -1)
                    {
                        // If the original message contains the keyword phrase, increment the score.
                        if (message.indexOf(weightedKeyword.Keyword) !== -1)
                        {
                            score += weightedKeyword.Weight;
                        }
                    }
                    else if (weightedKeyword.Keyword.indexOf(" / ")) // 'Or' operator, phrase sub-type.
                    {
                        var split: string[] = weightedKeyword.Keyword.split(" / ");
                        
                        for (var i = 0; i < split.length; i++)
                        {
                            // If it matches, increment the score.
                            if (message.indexOf(split[i]) !== -1)
                            {
                                score += weightedKeyword.Weight;
                                break;
                            }
                        }
                    }
                    else if (weightedKeyword.Keyword.indexOf("/")) // 'Or' operator, word sub-type.
                    {
                        var split: string[] = weightedKeyword.Keyword.split("/");
                        
                        for (var i = 0; i < split.length; i++)
                        {
                            // If it matches, increment the score.
                            if (inputKeywords.Contains(split[i]))
                            {
                                score += weightedKeyword.Weight;
                                break;
                            }
                        }
                    }

                    if (inputKeywords.Contains(weightedKeyword.Keyword)) score += weightedKeyword.Weight;
                    goal += weightedKeyword.Weight;
                }
            }

            scores.push({ score: score / goal, resName: iteration.resource.Name });
            iteration = this._ResourceIterator.Next();
        }
        while (!iteration.hasCycled) { }

        // Sort the scores from highest to lowest.
        scores = scores.sort((a, b) => a.score - b.score);
        var highScore = scores[scores.length - 1];

        // If the highest score was less than or equal to 0.3, disregard it.
        if (highScore.score <= 0.3) { console.log("highScore <= 0.3; returning null."); return null; }

        console.log(scores);
        console.log("Resource: \"" + highScore.resName + "\"\tScore: " + highScore.score);
        
        this._ResourceIterator.Reset();
        var iteration: { resource: Resource, hasCycled: boolean } = this._ResourceIterator.Next();
        do
        {
            if (iteration.resource.Name === highScore.resName) return iteration.resource;
            iteration = this._ResourceIterator.Next();
        }
        while (!iteration.hasCycled) { }
        return null;
    }

    private _SendMessage(message: string): number
    {
        return UI.GetInstance().DisplayMessage(MessageType.Chatbot, message);
    }

    private _SendMessageAsType(type: MessageType, message: string): number
    {
        return UI.GetInstance().DisplayMessage(type, message);
    }

    private _YesOrNoButtonsCallback(this: HTMLButtonElement, e: Event): void
    {
        UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
        UI.GetInstance().DisplayMessage(MessageType.System, "Was this helpful? Selected: " + this.innerHTML);
        UI.GetInstance().EnableInput(true);

        // Button name === "Yes!".
        var chooseDifferentTopic = false;
        if (this.innerHTML === "Yes!")
        {
            Chatbot._Instance._SendMessage(Chatbot._Instance._SuccessMessage);
            Chatbot._Instance._NumIncorrectResponses = 0;
            chooseDifferentTopic = true;
        }
        else // Button name === "No".
        {
            Chatbot._Instance._NumIncorrectResponses++;

            if (Chatbot._Instance._NumIncorrectResponses >= 3)
            {
                Chatbot._Instance._SendMessage(Chatbot._Instance._StumpedApologyMessage);
                Chatbot._Instance._SendMessage(Chatbot._Instance._TeamEmailAddress)
                Chatbot._Instance._NumIncorrectResponses = 0;
            }
            else Chatbot._Instance._SendMessage("I'm sorry. How about we try again?");
        }
    }
}