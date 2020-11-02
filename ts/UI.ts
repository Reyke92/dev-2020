class UI
{
    private static _ID_CHANGE_TOPIC_BUTTON: string  = "";
    private static _ID_MESSAGE_BOX: string          = "message-box";
    private static _ID_SEND_BUTTON: string          = "send-button";

    private static _Instance : UI;

    public ChangeTopicButton : HTMLButtonElement;
    public MessageBox : HTMLInputElement;
    public SendButton : HTMLButtonElement;

    private _LastMessageID : number;

    private constructor() { }

    public static GetInstance() : UI
    {
        if (!!this._Instance) return this._Instance;

        this._Instance = new UI();
        //this._Instance.ChangeTopicButton =
        //  <HTMLButtonElement>document.getElementById(this._ID_CHANGE_TOPIC_BUTTON);
        this._Instance.MessageBox = <HTMLInputElement>document.getElementById(this._ID_MESSAGE_BOX);
        this._Instance.SendButton = <HTMLButtonElement>document.getElementById(this._ID_SEND_BUTTON);
    }

    public ChangeTopicButtonClicked() : void
    {

    }

    public DeleteMessage(messageID : number) : void
    {

    }

    public DisplayButtonClicked(buttonName : string) : void
    {

    }

    public DisplayButtons(buttonNames : string[], message : string, callback : Function) : number
    {

    }

    public DisplayMessage(message : string) : number
    {
        
    }

    public SendMessageButtonClicked() : void
    {

    }

    private _GetNewMessageID() : number
    {
        this._LastMessageID++;
        return this._LastMessageID;
    }
}