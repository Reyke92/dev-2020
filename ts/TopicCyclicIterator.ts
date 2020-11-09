class TopicCyclicIterator
{
    private _Index: number;
    private _Topics: Topic[];

    constructor(topics: Topic[])
    {
        if (topics.length === 0)
        {
            throw new Error("At least one topic must be supplied to TopicCyclicIterator.");
        }

        this._Index = 0;
        this._Topics = topics;
    }

    public GetNumTopics(): number
    {
        return this._Topics.length;
    }

    public HasNext(): boolean
    {
        return this._Index < this._Topics.length;
    }

    public Next(): { topic: Topic, hasCycled: boolean}
    {
        if (this.HasNext())
        {
            var topic = this._Topics[this._Index];
            this._Index++;
            return { topic: topic, hasCycled: false }
        }
        else
        {
            // Reset the index to 0, and start again from there.
            this._Index = 0;
            var topic = this._Topics[this._Index];
            this._Index++;
            return { topic: topic, hasCycled: true}
        }
    }

    public Reset(): void
    {
        this._Index = 0;
    }
}
