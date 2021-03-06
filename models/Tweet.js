var User = require(require('path').join(__dirname, 'User.js'));

/**
 * Tweet Model
 * @class Tweet
 * @param {Tweet~Json} Tweet json of the Tweet
 * @constructor
 */
function Tweet(Tweet) {
  this.tweet = Tweet;
}

/**
 * @return {Tweet~Json|*}
 */
Tweet.prototype.getJson = function() {
  return this.tweet;
};

/**
 * @return {string}
 */
Tweet.prototype.getId = function() {
  return this.tweet.id_str;
};

/**
 * @return {Number}
 */
Tweet.prototype.getIdNumber = function() {
  return this.tweet.id;
};

/**
 * @returns {string}
 */
Tweet.prototype.getCreatedAt = function () {
  return this.tweet.created_at;
};

/**
 * @returns {Number}
 */
Tweet.prototype.getTimestamp = function () {
  return new Date(this.tweet.created_at.replace('+0000 ', '')).getTime();
};

/**
 * @returns {Number}
 */
Tweet.prototype.getLocalTimestamp = function () {
  return new Date(this.tweet.created_at).getTime();
};

/**
 * @param fulltext
 * @returns {string}
 */
Tweet.prototype.getText = function (fulltext) {
  fulltext = fulltext || true;
  if(fulltext && this.tweet.truncated) {
    return this.tweet.retweeted_status;
  }
  return this.tweet.text;
};

/**
 * @returns {string}
 */
Tweet.prototype.getSource = function () {
  return this.tweet.source;
};

/**
 * @returns {boolean}
 */
Tweet.prototype.isTruncated = function () {
  return this.tweet.truncated;
};

/**
 * @returns {boolean}
 */
Tweet.prototype.isReply = function () {
  return this.tweet.in_reply_to_status_id !== null;
};

/**
 * @returns {string}
 */
Tweet.prototype.getReplyToId = function () {
  return this.tweet.in_reply_to_status_id_str;
};

/**
 * @returns {string}
 */
Tweet.prototype.getReplyToUserId = function () {
  return this.tweet.in_reply_to_user_id_str;
};

/**
 * @returns {string}
 */
Tweet.prototype.getReplyToUserScreenName = function () {
  return this.tweet.in_reply_to_screen_name;
};

/**
 * @returns {{id: string, screen_name: string}}
 */
Tweet.prototype.getReplyToUser = function () {
  return {
    id: this.tweet.in_reply_to_user_id_str,
    screen_name: this.tweet.in_reply_to_screen_name
  };
};

/**
 * @returns {User}
 */
Tweet.prototype.getUser = function () {
  return new User(this.tweet.user);
};

/**
 * @returns {User~Json}
 */
Tweet.prototype.getUserJson = function () {
  return this.tweet.user;
};

/**
 * @returns {Object}
 */
Tweet.prototype.getCoordinates = function () {
  return this.tweet.coordinates;
};

Tweet.prototype.getPlace = function () {
  return this.tweet.place;
};

Tweet.prototype.getPlaceName = function () {
  if(this.tweet.place !== null) {
    return this.tweet.place.name;
  }

  return null;
};

Tweet.prototype.getPlaceFullName = function () {
  if(this.tweet.place !== null) {
    return this.tweet.place.full_name;
  }

  return null;
};

Tweet.prototype.getCountry = function () {
  if(this.tweet.place !== null) {
    return this.tweet.place.country;
  }

  return null;
};

Tweet.prototype.getCountryCode = function () {
  if(this.tweet.place !== null) {
    return this.tweet.place.country_code;
  }

  return null;
};

Tweet.prototype.getContributors = function () {
  return this.tweet.contributors;
};

/**
 * @returns {boolean}
 */
Tweet.prototype.isRetweet = function () {
  return this.tweet['retweeted_status'] !== undefined;
};

Tweet.prototype.getRetweet = function () {
  return new Tweet(this.tweet.retweeted_status);
};

Tweet.prototype.getRetweetJson = function () {
  return this.tweet.retweeted_status;
};

/**
 * @returns {Number}
 */
Tweet.prototype.getRetweetCount = function () {
  return this.tweet.retweet_count;
};

/**
 * @returns {Number}
 */
Tweet.prototype.getFavoriteCount = function () {
  return this.tweet.favorite_count;
};

Tweet.prototype.getHashtags = function () {
  var hashtags = [];

  for (var i = 0; i < this.tweet.entities.hashtags.length; i++) {
    hashtags.push(this.tweet.entities.hashtags[i].text);
  }

  return hashtags;
};

Tweet.prototype.hasHashtag = function (hashtag) {
  for (var i = 0; i < this.tweet.entities.hashtags.length; i++) {
    if(this.tweet.entities.hashtags[i].text === hashtag) {
      return true;
    }
  }

  return false;
};

Tweet.prototype.getSymbols = function () {
  var symbols = [];

  for (var i = 0; i < this.tweet.entities.symbols.length; i++) {
    symbols.push(this.tweet.entities.symbols[i].text);
  }

  return symbols;
};

Tweet.prototype.getMentions = function () {
  var mentions = [];

  for (var i = 0; i < this.tweet.entities.user_mentions.length; i++) {
    mentions.push({
      id: this.tweet.entities.user_mentions[i].id_str,
      screen_name: this.tweet.entities.user_mentions[i].screen_name,
      name: this.tweet.entities.user_mentions[i].name
    });
  }

  return mentions;
};

Tweet.prototype.getMentionsId = function () {
  var mentions = [];

  for (var i = 0; i < this.tweet.entities.user_mentions.length; i++) {
    mentions.push(this.tweet.entities.user_mentions[i].id_str);
  }

  return mentions;
};

Tweet.prototype.getMentionsScreenName = function () {
  var mentions = [];

  for (var i = 0; i < this.tweet.entities.user_mentions.length; i++) {
    mentions.push(this.tweet.entities.user_mentions[i].screen_name);
  }

  return mentions;
};

Tweet.prototype.getMentionsName = function () {
  var mentions = [];

  for (var i = 0; i < this.tweet.entities.user_mentions.length; i++) {
    mentions.push(this.tweet.entities.user_mentions[i].name);
  }

  return mentions;
};

Tweet.prototype.getUrls = function () {
  var urls = [];

  for (var i = 0; i < this.tweet.entities.urls.length; i++) {
    urls.push({
      url: this.tweet.entities.urls[i].expanded_url,
      twitter_url: this.tweet.entities.urls[i].url
    });
  }

  return urls;
};

Tweet.prototype.getMedias = function (videoFormat) {
  var videoFormat = videoFormat || 'mp4';
  var medias = [];

  function getExtension(string) {
    return string.substr(string.lastIndexOf('.'));
  };

  if(this.tweet.entities['media'] === undefined) {
    return medias;
  }

  if(this.tweet['extended_entities'] !== undefined) {
    for (var i = 0; i < this.tweet.extended_entities.media.length; i++) {

      if(this.tweet.extended_entities.media[i].type === 'photo') {
        medias.push({
          id: this.tweet.extended_entities.media[i].id_str,
          name: this.tweet.extended_entities.media[i].id_str + getExtension(this.tweet.extended_entities.media[i].media_url),
          url: this.tweet.extended_entities.media[i].media_url,
          poster: this.tweet.extended_entities.media[i].media_url,
          twitter_url: this.tweet.extended_entities.media[i].url,
          type: this.tweet.extended_entities.media[i].type
        });
      }

      else if(this.tweet.extended_entities.media[i].type === 'video' || this.tweet.extended_entities.media[i].type === 'animated_gif') {
        var url;
        var name = this.tweet.extended_entities.media[i].id_str;

        if(videoFormat === 'all') {
          url = this.tweet.extended_entities.media[i].video_info.variants;
        }
        else if(videoFormat === 'mp4') {
          for (var j = 0; j < this.tweet.extended_entities.media[i].video_info.variants.length; j++) {
            if(this.tweet.extended_entities.media[i].video_info.variants[j].content_type === 'video/mp4') {
              url = this.tweet.extended_entities.media[i].video_info.variants[j].url;
              name+= '.mp4';
              break;
            }
          }
        }
        else if(videoFormat === 'webm') {
          for (var j = 0; j < this.tweet.extended_entities.media[i].video_info.variants.length; j++) {
            if(this.tweet.extended_entities.media[i].video_info.variants[j].content_type === 'video/webm') {
              url = this.tweet.extended_entities.media[i].video_info.variants[j].url;
              name+= '.webm';
              break;
            }
          }
        }

        medias.push({
          id: this.tweet.extended_entities.media[i].id_str,
          name: name,
          url: url,
          poster: this.tweet.extended_entities.media[i].media_url,
          twitter_url: this.tweet.extended_entities.media[i].url,
          type: this.tweet.extended_entities.media[i].type
        });
      }

      else {
        medias.push({
          id: this.tweet.extended_entities.media[i].id_str,
          name: this.tweet.extended_entities.media[i].id_str + getExtension(this.tweet.extended_entities.media[i].media_url),
          url: this.tweet.extended_entities.media[i].media_url,
          poster: '',
          twitter_url: this.tweet.extended_entities.media[i].url,
          type: this.tweet.extended_entities.media[i].type
        });
      }
    }
  }

  return medias;
};

Tweet.prototype.isFavoritedByMe = function () {
  return this.tweet.favorited;
};

Tweet.prototype.isRetweetedByMe = function () {
  return this.tweet.retweeted;
};

Tweet.prototype.isSensitive = function () {
  return this.tweet.possibly_sensitive === true;
};

Tweet.prototype.getLang = function () {
  return this.tweet.lang;
};

Tweet.prototype.isMyLang = function (lang) {
  return this.tweet.lang === lang;
};

Tweet.prototype.getTwitterUrl = function () {
  return "https://twitter.com/" + this.tweet.user.screen_name + "/statuses/" + this.tweet.id_str;
};

module.exports = Tweet;

/**
 * Tweet Json
 * @typedef {Object} Tweet~Json
 * @property {Number} id
 * @property {string} id_str
 * @property {string} created_at
 * @property {boolean} truncated
 * @property {string} retweeted_status
 * @property {string} text
 * @property {string} source
 * @property {string} in_reply_to_status_id
 * @property {string} in_reply_to_status_id_str
 * @property {string} in_reply_to_user_id
 * @property {string} in_reply_to_user_id_str
 * @property {string} in_reply_to_screen_name
 * @property {User~Json} user
 * @property {Object} coordinates
 * @property {Object} place
 * @property {Number} retweet_count
 * @property {Number} favorite_count
 */