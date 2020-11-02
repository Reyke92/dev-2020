class ResourceCyclicIterator
{
    private _Index: number;
    private _Resources: Resource[];

    constructor(resources : Resource[])
    {
        if (resources.length === 0)
        {
            throw new Error("At least one resource must be supplied to ResourceCyclicIterator.");
        }

        this._Index = 0;
        this._Resources = resources;
    }

    public GetNumResources(): number
    {
        return this._Resources.length;
    }

    public HasNext(): boolean
    {
        return this._Index < this._Resources.length;
    }

    public Next(): { resource: Resource, hasCycled: boolean}
    {
        if (this.HasNext())
        {
            var resource = this._Resources[this._Index];
            this._Index++;
            return { resource: resource, hasCycled: false }
        }

        else
        {
            // Reset the index to 0, and start again from there.
            this._Index = 0;
            var resource = this._Resources[this._Index];
            this._Index++;
            return { resource: resource, hasCycled: true}
        }
    }

    public Reset(): void
    {
        this._Index = 0;
    }
}