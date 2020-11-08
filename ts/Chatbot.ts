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
        var resource: Resource = this._SearchForResource(messageKeywords);

        // If the resource could not be found.
        if (resource == null)
        {
            this._NumIncorrectResponses++;
            this._SendMessage(
                "I'm sorry, I wasn't able to find anything from what you typed. " +
                "How about we try again?"
            );

            if (this._NumIncorrectResponses >= 3)
            {
                this._SendMessage(this._StumpedApologyMessage);
                this._SendMessage(this._TeamEmailAddress);
                this._NumIncorrectResponses = 0;
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

    private _ChangeTopic(topicName: string): void
    {
        this._CurrentTopic = this._GetTopic(topicName);
        this._ResourceIterator = new ResourceCyclicIterator(this._CurrentTopic.Resources);
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

        // Make sure only one space character exists between each keyword.
        message = message.toLowerCase();
        while (message.indexOf("  ") != -1) message = message.replace("  ", " ");

        message.split(new RegExp("[ -]")).forEach((word: string) =>
        {
            // If there is already an entry for the 'word' in the HashMap,
            // add onto that existing value. Otherwise, add a new entry.
            var times: number = keywords.Get(word);
            if (times !== undefined)    keywords.Set(word, times + 1);
            else                        keywords.Set(word, 1);
        });

        return keywords;
    }

    private _SearchForResource(inputKeywords: HashMap<number>): Resource
    {
        var scores: Array<{ score: number, resName: string }> =
            new Array<{ score: number, resName: string }>();

        this._ResourceIterator.Reset();
        var iteration: { resource: Resource, hasCycled: boolean } = this._ResourceIterator.Next();
        do
        {
            var goal = 0;
            var score = 0;

            // Calculate the score for the keywords.
            iteration.resource.Keywords.forEach((resourceKeyword: string, index, array) =>
            {
                if (inputKeywords.Contains(resourceKeyword)) score++;
                goal++;
            });

            // Calculate the score for the weighted keywords.
            if (iteration.resource.WeightedKeywords !== undefined)
            {/*
                var hashMapKeys: string[] = Object.keys(iteration.resource.WeightedKeywords.Map);
                for (var i = 0; i < hashMapKeys.length; i++)
                {
                    var hash = hashMapKeys[i];
                    var weightedKeyword: { key: string, value: number } =
                        iteration.resource.WeightedKeywords.Map[hash];
                    
                    if (inputKeywords.Contains(weightedKeyword.key)) score += weightedKeyword.value;
                    goal += weightedKeyword.value;
                }*/

                for (var i = 0; i < iteration.resource.WeightedKeywords.length; i++)
                {
                    var weightedKeyword: { keyword: string, weight: number } =
                        iteration.resource.WeightedKeywords[i];
                    
                    if (inputKeywords.Contains(weightedKeyword.keyword)) score += weightedKeyword.weight;
                    goal += weightedKeyword.weight;
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
            Chatbot._Instance._SendMessage("I'm sorry. How about we try again?");

            if (Chatbot._Instance._NumIncorrectResponses >= 3)
            {
                Chatbot._Instance._SendMessage(Chatbot._Instance._StumpedApologyMessage);
                Chatbot._Instance._SendMessage(Chatbot._Instance._TeamEmailAddress)
                Chatbot._Instance._NumIncorrectResponses = 0;
            }
        }

        UI.GetInstance().DeleteAllMessagesWithID(Number(this.parentElement.id));
        UI.GetInstance().DisplayMessage(MessageType.System, "Was this helpful? Selected: " + this.innerHTML);
        UI.GetInstance().EnableInput(true);

        if (chooseDifferentTopic) Chatbot._Instance.BeginChooseTopic(Chatbot._Instance._WelcomeMessage);
    }
}