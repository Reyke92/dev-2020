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

    private constructor() { }
    
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

    public ChangeTopic(topicName: string): void
    {
        this._CurrentTopic = this._GetTopic(topicName);
        this._ResourceIterator = new ResourceCyclicIterator(this._CurrentTopic.Resources);
    }

    public DisplayTopics(): void
    {

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

            UI.GetInstance().DisplayButtons(
                ["Yes!", "No"],
                "Was this what you were looking for?",
                (buttonName: string) =>
                {
                    if (buttonName === "Yes!")
                    {
                        this._SendMessage(this._SuccessMessage);
                        this._NumIncorrectResponses = 0;
                    }
                    else // buttonName === "No"
                    {
                        this._NumIncorrectResponses++;

                        if (this._NumIncorrectResponses >= 3)
                        {
                            this._SendMessage(this._StumpedApologyMessage);
                            this._SendMessage(
                                "Please feel free to email us at " + this._TeamEmailAddress +
                                " for any other questions you may have!"
                            );
                            this._NumIncorrectResponses = 0;
                        }
                    }
                }
            );
        }
    }

    private _GetTopic(topicName: string): Topic
    {
        this._TopicIterator.Reset();
        do
        {
            var topic: { topic: Topic, hasCycled: boolean } = this._TopicIterator.Next();
            if (topicName === topic.topic.Name) return topic.topic;
        }
        while (!topic.hasCycled) { }

        return null;
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

    private _ParseMessageForKeywords(message: string): HashMap<number>
    {
        //var keywords: Array<{ keyword: string, times: number }> = new Array<{ keyword: string, times: number }>(0);
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
        do
        {
            var resource: { resource: Resource, hasCycled: boolean } = this._ResourceIterator.Next();
            var goal = 0;
            var score = 0;

            // Calculate the score for the keywords.
            resource.resource.Keywords.forEach((resourceKeyword: string, index, array) =>
            {
                if (inputKeywords.Contains(resourceKeyword)) score++;
                goal++;
            });

            // Calculate the score for the weighted keywords.
            if (resource.resource.WeightedKeywords !== undefined)
            {/*
                var hashMapKeys: string[] = Object.keys(resource.resource.WeightedKeywords.Map);
                for (var i = 0; i < hashMapKeys.length; i++)
                {
                    var hash = hashMapKeys[i];
                    var weightedKeyword: { key: string, value: number } =
                        resource.resource.WeightedKeywords.Map[hash];
                    
                    if (inputKeywords.Contains(weightedKeyword.key)) score += weightedKeyword.value;
                    goal += weightedKeyword.value;
                }*/

                for (var i = 0; i < resource.resource.WeightedKeywords.length; i++)
                {
                    var weightedKeyword: { keyword: string, weight: number } =
                        resource.resource.WeightedKeywords[i];
                    
                    if (inputKeywords.Contains(weightedKeyword.keyword)) score += weightedKeyword.weight;
                    goal += weightedKeyword.weight;
                }
            }

            scores.push({ score: score / goal, resName: resource.resource.Name });
        }
        while (!resource.hasCycled) { }

        // Sort the scores from highest to lowest.
        scores = scores.sort((a, b) => a.score - b.score);
        var highScore = scores[scores.length - 1];

        // If the highest score was less than or equal to 0.3, disregard it.
        if (highScore.score <= 0.3) return null;

        console.log(scores);
        console.log("Resource: \"" + highScore.resName + "\"\tScore: " + highScore.score);
        
        this._ResourceIterator.Reset();
        do
        {
            var resource: { resource: Resource, hasCycled: boolean } = this._ResourceIterator.Next();

            if (resource.resource.Name === highScore.resName) return resource.resource;
        }
        while (!resource.hasCycled) { }
        
        return null;
    }

    private _SendMessage(message: string): void
    {
        UI.GetInstance().DisplayMessage(MessageType.Chatbot, message);
    }

    private _SendMessage(type: MessageType, message: string): void
    {
        UI.GetInstance().DisplayMessage(type, message);
    }
}