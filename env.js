const enviroment = {
  enviroment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  isDev: () => {
    if (this.enviroment === 'development') return true;
    return false;
  },
  isTest: () => {
    if (this.enviroment === 'test') return true;
    return false;
  },
};

module.exports = enviroment;
