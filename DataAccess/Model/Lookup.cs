using System.Collections.Generic;


namespace DataAccess
{
    public class Lookup
    {
        public short Value;
        public string Text;
    }

    public class LookupPack
    {
        public List<Lookup> Genre;
        public List<Lookup> AssignPurpose;
    }
}
