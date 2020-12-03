class UI
{
    private static _ID_CHANGE_TOPIC_BUTTON: string  = "changeTopicButton";
    private static _ID_MESSAGE_BOX: string          = "messageBox";
    private static _ID_MESSAGE_LIST: string         = "messageList";
    private static _ID_SEND_BUTTON: string          = "sendButton";

    private static _Instance: UI;

    private _ChangeTopicButton: HTMLButtonElement;
    private _Inited: boolean;
    private _MessageBox: HTMLInputElement;
    private _MessageList: HTMLDivElement;
    private _SendButton: HTMLButtonElement;
    private _LastMessageID: number;

    private constructor()
    {
        this._Inited = false;
        this._LastMessageID = -1;
    }

    public static GetInstance(): UI
    {
        if (!!this._Instance) { return this._Instance; }

        this._Instance = new UI();
        return this._Instance;
    }

    public DeleteAllMessagesWithID(messageID: number): void
    {
        // Go through the whole list of messages and search for one with the ID specified.
        for (var i = 0; i < this._MessageList.children.length; i++)
        {
            if (Number(this._MessageList.children[i].id) === messageID)
            {
                this._MessageList.children[i].remove();
                i--;
            }
        }
    }

    public DisplayButtons(
        buttonNames: string[],
        message: string,
        clickCallback: (this: HTMLButtonElement, e: Event) => void
    ): number
    {
        var messageID: number = this.DisplayMessage(MessageType.Chatbot, message);

        var element: HTMLDivElement = document.createElement("div");
        element.classList.add("choicesContainer");
        element.id = messageID.toString();
        for (var i = 0; i < buttonNames.length; i++)
        {
            var button: HTMLButtonElement = document.createElement("button");
            button.classList.add("choiceButton");
            button.innerHTML = buttonNames[i];
            button.addEventListener("click", clickCallback);
            element.appendChild(button);
        }
        this._MessageList.appendChild(element);
        this.ScrollToBottomOfMessageList();

        return messageID;
    }

    public DisplayMessage(type: MessageType, message: string): number
    {
        var element: HTMLDivElement = document.createElement("div");
        if (type === MessageType.Chatbot) element.classList.add("chatbotMessage");
        else if (type === MessageType.User) element.classList.add("userMessage");
        else if (type === MessageType.System) element.classList.add("systemMessage");
        else throw(new Error("UI.DisplayMessage: A valid MessageType must be supplied!"));

        // If the message is a URL, make it a hyperlink.
        if (message.startsWith("http"))
        {
            element.innerHTML = "<p><a href=\"" + message + "\">" + message + "</a></p>";
        }
        else element.innerHTML = "<p>" + message + "</p>";

        element.id = this._GetNewMessageID().toString();
        this._MessageList.appendChild(element);
        this.ScrollToBottomOfMessageList();

        return this._LastMessageID;
    }

    public EnableInput(enabled: boolean): void
    {
        this._ChangeTopicButton.disabled = !enabled;
        this._MessageBox.disabled = !enabled;
    }

    public Init(): void
    {
        if (this._Inited) return;

        this._ChangeTopicButton = <HTMLButtonElement>document.getElementById(UI._ID_CHANGE_TOPIC_BUTTON);
        this._MessageBox = <HTMLInputElement>document.getElementById(UI._ID_MESSAGE_BOX);
        this._MessageList = <HTMLDivElement>document.getElementById(UI._ID_MESSAGE_LIST);
        this._SendButton = <HTMLButtonElement>document.getElementById(UI._ID_SEND_BUTTON);

        this._ChangeTopicButton.addEventListener("click", this._OnChangeTopicButtonClicked)
        this._MessageBox.addEventListener("input", this._OnMessageBoxTextChanged);
        this._SendButton.addEventListener("click", this._OnSendButtonClicked);

        this._Inited = true;
    }

    public ScrollToBottomOfMessageList(): void
    {
        this._MessageList.scrollTop = this._MessageList.scrollHeight;
    }

    private _GetNewMessageID(): number
    {
        this._LastMessageID++;
        return this._LastMessageID;
    }

    private _OnChangeTopicButtonClicked(this: HTMLButtonElement, e: MouseEvent): void
    {
        Chatbot.GetInstance().BeginChooseTopic("Please select a topic from the following:");
    }

    private _OnMessageBoxTextChanged(this: HTMLInputElement, e: Event)
    {
        // Condense the message's space character to one space max between each character (that isn't a space).
        // Like so: "some    user      message  is   here" -> "some user message is here", and "    " -> "".
        var message = UI._Instance._MessageBox.value;
        if (!!message && message.length > 0)
        {
            // If there is text in the message box, disable the send button. 
            UI._Instance._SendButton.disabled = false;
        }
        // Otherwise, enable the send button.
        else UI._Instance._SendButton.disabled = true;
    }

    private _OnPageLoaded(this: Document, e: Event): void
    {
        // Initialize the UI.
        UI._Instance.Init();
    }

    private _OnSendButtonClicked(this: HTMLButtonElement, e: MouseEvent): void
    {
        // Send the message to the chatbot.
        UI._Instance._SendButton.disabled = true;
        UI._Instance.DisplayMessage(MessageType.User, UI._Instance._MessageBox.value);
        Chatbot.GetInstance().ReplyToMessage(UI._Instance._MessageBox.value);

        // Remove the text from the message box.
        UI._Instance._MessageBox.value = "";
    }
}