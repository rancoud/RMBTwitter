/*
 post_statuses_retweet

 Usage:
   node job <bot_name> post_statuses_retweet (-a | --app) <app_name> (-u | --user) <user_name>

 API endpoint used:
   GET /

 Scope:
   xxx
*/
/**
 * @param {Twitter} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  bot.postStatusesRetweet(function (error, data) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, data);
    }
  });
};