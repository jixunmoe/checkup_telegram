Checkup Slack/WebAPI Receiver
=============================

Checkup Slack/WebAPI receiver <--> Telegram Channel

```json
{
  "token": "bot-token",
  "checkup": "checkup token",
  "channel": "channel id",
  "cache": "/var/cache/checkup_tg_bot_history.json",
  "port": 3000
}
```

* `token`: Telegram Bot Token.
* `channel`: Channel id you want to post.
* `checkup`: Checkup token, see "Checkup setup" below.
* `cache`: Cache json file to calculate service uptime/downtime.
* `port`: Port for Slack WebHook service.

## Checkup setup

You can use the `slack` notifier, or my fork with `webapi` notifier.

### Slack receiver

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

### Webapi

You will need to use [jixunmoe-go/checkup](https://github.com/jixunmoe-go/checkup).

Setup the config:

```json
{
  "type": "webapi",
  "url": "http://example.com:3000/batch"
}
```

Where:

* `http://example.com:3000/` is your public accessible address.

Note:
No user auth required in this endpoint, protect it behind a firewall.

## Fetch chat id

* Make bot a member of the channel
* Post this message: `get my chat id`
* Copy this chat id.
