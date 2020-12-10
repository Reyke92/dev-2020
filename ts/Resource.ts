class Resource
{
    public Data: string;
    public Name: string;
    public Keywords: Array<string>;
    public WeightedKeywords: Array<{ Keyword: string, Weight: number }>;

    public static IsDataJustURL(res: Resource): boolean
    {
        // If the Data starts with "http" and only a URL exists (no other words/URLs/etc.),
        // return true. Otherwise, return false.
        return res.Data.startsWith("http") && res.Data.split(" ").length == 1;
    }
}