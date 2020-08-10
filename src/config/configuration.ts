export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  MONGODB_URI: 'mongodb+srv://airtek:airtek1@airtek.k6ggs.mongodb.net/demoapp?retryWrites=true&w=majority'
});