class UI
{
    private static _ID_CHANGE_TOPIC_BUTTON: string  = "";
    private static _ID_MESSAGE_BOX: string          = "messageBox";
    private static _ID_SEND_BUTTON: string          = "sendButton";

    private static _Instance: UI;

    private _ChangeTopicButton: HTMLButtonElement;
    private _MessageBox: HTMLInputElement;
    private _SendButton: HTMLButtonElement;
    private _LastMessageID: number;

    private constructor()
    {
        window.addEventListener("load", this._OnPageLoaded);
    }

    public static GetInstance(): UI
    {
        console.log("UI GETINSTANCE METHOD CALLED.");
        if (!!this._Instance) { return this._Instance; }

        this._Instance = new UI();
        return this._Instance;
    }

    public DeleteMessage(messageID: number): void
    {

    }

    public DisplayButtons(buttonNames: string[], message: string, callback: Function): number
    {
        // IMPORTANT: For each button created, make button.id = messageID.
    }

    public DisplayMessage(type: MessageType, message: string): number
    {
        
    }

    private _GetNewMessageID(): number
    {
        this._LastMessageID++;
        return this._LastMessageID;
    }

    private _Init(): void
    {
        //this._ChangeTopicButton = <HTMLButtonElement>document.getElementById(UI._ID_CHANGE_TOPIC_BUTTON);
        this._MessageBox = <HTMLInputElement>document.getElementById(UI._ID_MESSAGE_BOX);
        this._SendButton = <HTMLButtonElement>document.getElementById(UI._ID_SEND_BUTTON);

        //this._ChangeTopicButton.addEventListener("click", this._OnChangeTopicButtonClicked)
        this._MessageBox.addEventListener("change", this._OnMessageBoxTextChanged);
        this._SendButton.addEventListener("click", this._OnSendButtonClicked);
    }

    private _OnChangeTopicButtonClicked(this: HTMLButtonElement, e: MouseEvent): void
    {
        Chatbot.GetInstance().DisplayTopics();
    }

    private _OnDisplayButtonClicked(this: HTMLButtonElement, e: MouseEvent): void
    {
        // Delete message because a topic was selected.
        UI.GetInstance().DeleteMessage(Number(this.parentElement.id));
    }

    private _OnMessageBoxTextChanged(this: HTMLInputElement, e: Event)
    {
        // Condense the message's space character to one space max between each character (that isn't a space).
        // Like so: "some    user      message  is   here" -> "some user message is here", and "    " -> "".
        var message = UI._Instance._MessageBox.value;
        if (!!message && message.length > 0)
        {
            console.log("UI._OnMessageBoxTextChanged (message=\"" + message + "\")");

            // If there is text in the message box, disable the send button. 
            UI._Instance._SendButton.disabled = false;
        }
        // Otherwise, enable the send button.
        else UI._Instance._SendButton.disabled = true;
    }

    private _OnPageLoaded(this: Document, e: Event): void
    {
        console.log("UI._OnPageLoaded");
        // Initialize the UI.
        UI._Instance._Init();
    }

    private _OnSendButtonClicked(this: HTMLButtonElement, e: MouseEvent): void
    {
        console.log("SEND BUTTON CLICKED.");
        // Send the message to the chatbot.
        console.log(UI._Instance._MessageBox.value);
        Chatbot.GetInstance().ReplyToMessage(UI._Instance._MessageBox.value);

        // Remove the text from the message box.
        UI._Instance._MessageBox.value = "";
    }
}