/*
 get_mutes_users_ids

 Usage:
   node job <bot_name> get_mutes_users_ids (-a | --app) <app_name> (-u | --user) <user_name>

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
  bot.api.rest.getMutesUsersIds(function (error, data) {
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