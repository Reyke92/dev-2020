class Chatbot
{
    private static _Instance : Chatbot;

    private _CurrentTopic : Topic;
    private _NumIncorrectResponses : number;
    private _StumpedApologyMessage : string;
    private _TeamEmailAddress : string;
    private _TopicIterator : TopicCyclicIterator;
    private _WelcomeMessage : string;

    private constructor() { }
    
    public static GetInstance() : Chatbot
    {

    }

    public ChangeTopic(topicName : string) : void
    {

    }

    public DisplayTopics() : void
    {

    }

    public ReplyToMessage(userMessage : string) : void
    {

    }

    private _GetJsonConfig() : string
    {

    }

    private _GetTopic(topicName : string) : Topic
    {

    }

    private _LoadConfigFile(configJson : string) : void
    {

    }

    private _SendMessage(message : string) : void
    {

    }

    private _SendMessage(type : MessageType, message : string) : void
    {

    }
}