import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

class TwitterPoster {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    this.rwClient = this.client.readWrite;
  }

  async postTweet(text) {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Tweet text cannot be empty');
      }

      if (text.length > 280) {
        throw new Error('Tweet text exceeds 280 character limit');
      }

      const tweet = await this.rwClient.v2.tweet(text);
      
      console.log('Tweet posted successfully!');
      console.log('Tweet ID:', tweet.data.id);
      console.log('Tweet URL:', `https://twitter.com/user/status/${tweet.data.id}`);
      
      return {
        success: true,
        tweetId: tweet.data.id,
        url: `https://twitter.com/user/status/${tweet.data.id}`,
        text: text
      };
    } catch (error) {
      console.error('Error posting tweet:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifyCredentials() {
    try {
      const user = await this.rwClient.v2.me();
      console.log('Connected as:', user.data.username);
      return {
        success: true,
        username: user.data.username,
        userId: user.data.id
      };
    } catch (error) {
      console.error('Error verifying credentials:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.error('Usage: node TwitterPoster.js "tweet text"');
    process.exit(1);
  }
  
  const tweetText = process.argv.slice(2).join(' ');
  const poster = new TwitterPoster();
  
  const result = await poster.postTweet(tweetText);
  
  if (result.success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default TwitterPoster;