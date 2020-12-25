interface SlackField {
    short: boolean;
    title: string;
    value: string;
}

interface SlackAttachment {
    actions?: any;
    author_icon?: any;
    author_link?: any;
    author_name?: any;
    callback_id?: any;
    color: string;
    fallback?: any;
    fields: SlackField[];
    footer?: any;
    footer_icon?: any;
    image_url?: any;
    mrkdwn_in?: any;
    pretext?: any;
    text?: any;
    thumb_url?: any;
    title?: any;
    title_link?: any;
    ts?: any;
}

interface SlackWebHookBody {
    attachments: SlackAttachment[];
    channel: string;
    text: string;
    username: string;
}
