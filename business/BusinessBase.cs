using System;
using System.Collections.Generic;
using Hoomon.Context;
using Hoomon.Respository;

namespace Hoomon.Public.Write.BusinessLogic
{
    public abstract class BusinessLogicBase<TEntity> : Context.Context where TEntity : class, new()
    {
        private readonly BaseWRespository<TEntity> _dbSession;

        protected BusinessLogicBase()
        {
            _dbSession = new BaseWRespository<TEntity>();
        }

        protected virtual void Create(string commandName, TEntity entity)
        {
            string connectionName = Enum.GetName(typeof (CityCode), ServiceContext.CityCode);
            _dbSession.ExecuteNonQuery(commandName, connectionName, entity);
        }

        protected virtual void Delete(string commandName, object entity)
        {
            string connectionName = Enum.GetName(typeof (CityCode), ServiceContext.CityCode);
            _dbSession.ExecuteNonQuery(commandName, connectionName, entity);
        }

        protected virtual void Update(string commandName, object entity)
        {
            string connectionName = Enum.GetName(typeof (CityCode), ServiceContext.CityCode);
            _dbSession.ExecuteNonQuery(commandName, connectionName, entity);
        }

        protected virtual TEntity GetEntity(string commandName, object entity)
        {
            string connectionName = Enum.GetName(typeof (CityCode), ServiceContext.CityCode);
            return _dbSession.GetEntity(commandName, connectionName, entity);
        }

        protected virtual List<TEntity> GetList(string commandName, object entity = null)
        {
            string connectionName = Enum.GetName(typeof (CityCode), ServiceContext.CityCode);
            return _dbSession.GetList(commandName, connectionName, entity);
        }

        public abstract TEntity GetEntity(Guid id);
    }
}
