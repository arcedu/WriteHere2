using System;

namespace DataAccess
{
    public class User
    {
        public Guid Id;
        public string UserName;
        public string LoginPassword;
        public string FirstName;
        public string LastName;
        public int Grade;
        public bool ShowGrade;
        public string Country;
        public bool ShowCountry;
        public string State;
        public bool ShowState;
        public bool ShowProfile;
        public bool ShowInHall;
        public bool IsAdmin;
        public bool IsReader;
        public bool IsWriter;
        public bool IsEditor;
        public bool IsAuditor;
        public bool IsDrawer;
        public bool IsTutor;
    }
}
