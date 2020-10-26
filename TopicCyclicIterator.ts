class TopicCyclicIterator
{
    private _Index : number;
    private _Topics : Topic[];

    constructor(topics : Topic[])
    {
        this._Index = 0;
        this._Topics = topics;
    }

    public HasNext()
    {
        return this._Index < this._Topics.length;
    }

    public Next()
    {
        if (this.HasNext())
        {
            var topic = this._Topics[this._Index];
            this._Index++;
            return { value: topic, done: false }
        }

        else
        {
            // Reset the index to 0 so the iterator can be used again.
            this._Index = 0;
            return { value: null, done: true}
        }
    }

    public Reset()
    {
        this._Index = 0;
    }
}