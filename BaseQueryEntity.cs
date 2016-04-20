using Hoomon.DataAccess.QueryAttribute;

namespace Hoomon.DataAccess
{
    public abstract class BaseQueryEntity
    {
        [ConditionIgnore]
        public int? PageIndex { get; set; }

        [ConditionIgnore]
        public int? PageSize { get; set; }

        [ConditionIgnore]
        [ExecuteIgnore]
        public string SortField { get; set; }

        [ConditionIgnore]
        [ExecuteIgnore]
        public string SortType { get; set; }
    }
}