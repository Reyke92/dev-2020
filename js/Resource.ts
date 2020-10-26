class Resource
{
    public Data : string;
    public Name : string;
    public Keywords : Array<string>;
    public WeightedKeywords : Array<string>;

    // Return true if data starts with http; false otherwise.
    public IsDataURL() : boolean
    {
        return this.Data.startsWith("http");
    }
}