module.exports = {
  signUp: async (req, res, next) => {
    console.log(req.value.body);
    console.log('Sign up function called from the Controller');
  },
  signIn: async (req, res, next) => {
    console.log('Sign in function called from the Controller');
  },
  dashboard: async (req, res, next) => {
    console.log('Dashboard function called from the Controller');
  }
};
