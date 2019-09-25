function allowed(ip) {
    const WhiteList = [
        '218.17.158.233', // 深圳 office
        '218.104.142.203', // 厦门 office
        '47.99.133.85',  // ping sentry.hlgdata.com
        '47.110.227.158', // log 里记录的 sentry 地址
    ];
    return WhiteList.indexOf(ip) > -1;
}

exports.verifyHeader = ctx => {
    if (allowed(ctx.headers['x-real-ip']) || allowed(ctx.headers['x-forwarded-for']) || ctx.headers['x-sentry-token'] === 'a668d1a891a911e98d19965914fd28fc') {
        ctx.status = 302;
        ctx.redirect(`http://cdn.dancf.com/odyssey-editor${ctx.url}`);
    } else {
        ctx.status = 404;
    }
};
