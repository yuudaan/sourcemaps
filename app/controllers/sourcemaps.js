function allowed(ip) {
    const WhiteList = [
        '218.17.158.233', // 深圳 office
        '218.104.142.203', // 厦门 office
        '47.99.133.85',  // sentry.hlgdata.com
    ];
    return WhiteList.indexOf(ip) > -1;
}

exports.verifyHeader = ctx => {
    if (allowed(ctx.headers['x-real-ip']) || allowed(ctx.headers['x-forwarded-for'])) {
        ctx.status = 302;
        ctx.redirect(`http://cdn.dancf.com/odyssey-editor${ctx.url}`);
    } else {
        ctx.status = 404;
    }
};
