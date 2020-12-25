Checkup Slack Receiver
======================

Slack receiver <--> Telegram Channel/Chat

```json
{
  "token": "bot-token",
  "checkup": "checkup token",
  "channel": "channel id",
  "port": 3000
}
```

* `token`: Telegram Bot Token.
* `channel`: Channel id you want to post.
* `checkup`: Checkup token, see "Checkup setup" below.
* `port`: Port for Slack WebHook service.

## Checkup setup

Include the following notifier to your checkup config:

```json
    {
      "type": "slack",
      "username": "<checkup token>",
      "channel": "(ignored)",
      "webhook": "http://example.com:3000/slack"
    }
```

Where:

* `http://example.com:3000/` is your public accessible address.
* `username` should be your checkup token.

## Fetch chat id

* Make bot a member of the channel
* Post this message: `get my chat id`
* Copy this chat id.
