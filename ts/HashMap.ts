class HashMap<T>
{
    public length;
    public Map;

    constructor(obj = null)
    {
        if (obj === null) this.Map = { };
        else
        {
            console.log("obj !== null");
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                this.Set(key, obj[key]);
            }
        }
    }

    public Contains(key: string): boolean
    {
        return this.Map[this._Hash(key)] !== undefined;
    }

    public Get(key: string): T
    {
        var pair: { key: string, value: T } = this.Map[this._Hash(key)];
        if (pair !== undefined) return pair.value;
        else return undefined;
    }

    public GetLength(): number
    {
        return Object.keys(this.Map).length;
    }

    public Set(key: string, value: T)
    {
        this.Map[this._Hash(key)] = { key: key, value: value };
    }

    private _Hash(key: string): string
    {
        /*
            Borrowed from "https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/".
            All credit goes to them. Modified slightly.
        */
        var hash: number = 0;
        var ch: number;
        for (var i = 0; i < key.length; i++) {
          ch   = key.charCodeAt(i);
          hash  = ((hash << 5) - hash) + ch;
          hash |= 0; // Convert to 32bit integer
        }

        return hash.toString();
    }
}